<template>
  <v-container fluid>
    <v-list-item three-line>
      <v-layout>
        <v-img
          max-height="100"
          max-width="100"
          :size="40"
          :src="ExcelPic"
          class="mr-4"
        ></v-img>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">
            顧客情報インポート</v-list-item-title
          >
          <v-list-item-subtitle>
            サンプルファイルをダウンロードして、インポートする
          </v-list-item-subtitle>
        </v-list-item-content>
        <div class="pt-3">
          <v-btn color="indigo" dark @click="downloadFile">
            <v-icon left> mdi-download</v-icon>
            サンプルファイル
          </v-btn>
        </div>
      </v-layout>
    </v-list-item>
    <v-progress-linear
      height="2"
      color="indigo"
      rounded
      value="100"
      class="mt-2"
    ></v-progress-linear>
    <div v-if="loadingImport" class="pt-6">
      <v-layout align-center justify-center style="height: 300px">
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </v-layout>
    </div>
    <div v-else>
      <v-layout
        style="height: 400px; width: 100%"
        align-center
        justify-center
        v-if="!dataTable || dataTable.length == 0"
      >
        <v-hover v-slot="{ hover }">
          <v-card
            :class="{ 'on-hover': hover }"
            color="#3949AB"
            dark
            class="mx-auto"
            style="width: 60%; height: 90%"
            @click="clickUpload"
          >
            <v-card-text>
              <p class="text-h4 text--white">顧客情報ファイルをインポート</p>
              <p>こちらにクリックしてローカルファイルを選択してください</p>
              <v-layout align-center justify-center style="height: 200px">
                <v-icon size="80">mdi-upload</v-icon>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-layout>
      <div v-else class="pt-6">
        <v-layout class="pb-4">
          <v-btn depressed color="error" @click="closeImport">
            <v-icon left> mdi-close </v-icon> キャンセル
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn depressed color="primary" @click="importData">
            <v-icon left> mdi-import </v-icon>
            インポート
          </v-btn>
        </v-layout>
        <v-data-table
          :headers="headers"
          :items="dataTable"
          hide-default-footer
          class="elevation-1"
          loading-text="データを取得しています ..."
        >
          <template v-slot:[`item.manager_email`]="{ item }">
            <div class="pt-3" v-if="item.duplicate_email">
              <div>{{ item.manager_email }}</div>
              <p style="font-weight: bold; color: #e91e63">
                エクセルのデータに不備があります。入力項目を確認してください。
              </p>
            </div>
            <div v-else>{{ item.manager_email }}</div>
          </template>
          <template v-slot:[`item.action`]="{ item }">
          <div>
            <v-btn color="pink" fab x-small dark @click="removeCustomer(item)">
              <v-icon small>mdi-close</v-icon>
            </v-btn>
          </div>
        </template>
        </v-data-table>
      </div>
    </div>

    <input
      name="file"
      ref="upload-excel"
      style="display: none"
      type="file"
      @change="handleUpload($event)"
    />
  </v-container>
</template>

<script>
import XLSX from "xlsx";
import ExcelPic from "@/assets/images/excel.png";
import { getCategories, importCustomer } from "@/api/customer";
import { listUser } from "@/api/user";

export default {
  data: () => ({
    ExcelPic,
    dataTable: [],
    Industries: [],
    emails: [],
    validateImport: true,
    loadingImport: false,
    headers: [
      { text: "業種", 
        value: "industry",
        width: "100",
      },
      {
        text: "会社名/店名",
        value: "company_name",
        sortable: false,
        width: "150",
      },
      { text: "代表者名", value: "representative_name" },
      {
        text: "住所",
        align: "start",
        sortable: false,
        value: "address",
      },
      {
        text: "電話番号",
        align: "start",
        sortable: false,
        value: "phone_number",
      },
      {
        text: "郵便番号",
        align: "start",
        sortable: false,
        value: "postal_code",
      },
      { text: "HPのURL", align: "start", value: "homepage_url" },
      { text: "Eメールアドレス", sortable: false, value: "manager_email" },
        { text: "Action", sortable: false, value: "action" },
    ],
  }),
  mounted() {
    this.getIndustries();
    this.getUsers();
  },
  methods: {
    clickUpload() {
      this.$refs["upload-excel"].click();
    },
    closeImport() {
      this.getUsers();
      this.dataTable = [];
    },
    async getUsers() {
      let data = await listUser({
        perPage: 999,
      });
      const users = data.data;
      this.emails = [];
      users.forEach((el) => {
        this.emails.push(el.email.toLowerCase());
      });
    },
    async getIndustries() {
      let data = await getCategories({ group: "industry" });
      this.Industries = data;
    },
    handleUpload(event) {
      this.file = event.target.files ? event.target.files[0] : null;
      if (this.file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
          data.forEach((el, index) => {
            if (index > 0) {
              let industry = this.Industries.find((it) => it.name == el[0]);
              let duplicateEmail;
              if (el[6]) {
                duplicateEmail = this.emails.includes(el[6].toLowerCase());
                this.emails.push(el[6].toLowerCase());
              }
              let item = {
                id: index,
                industry: industry ? industry.name : "",
                industry_id: industry ? industry.id : null,
                company_name: el[1],
                representative_name: el[2],
                address: el[3],
                phone_number: el[4],
                homepage_url: el[5],
                manager_email: el[6],
                duplicate_email: duplicateEmail,
                postal_code: el[7],
              };
              this.dataTable.push(item);
              if (!industry || !el[1] || !el[3] || !el[6] || duplicateEmail) {
                this.validateImport = false;
              }
            }
          });
        };
        this.$refs["upload-excel"].value = null;
        reader.readAsBinaryString(this.file);
      }
    },
    removeCustomer(item) {
         this.dataTable  =  this.dataTable.filter(el => el.id !== item.id)
    },
    downloadFile(){
        window.open('/importTenTen.xlsx')
    },
    async importData() {
      if (!this.validateImport) {
        this.$toast.error("エクセルのデータに不備があります", {
          position: "top-center",
          timeout: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
        });
        return;
      }
      this.loadingImport = true;
      try {
        await importCustomer({ data: this.dataTable });
        this.$toast.info("インポートは完了しました", {
          position: "top-center",
          timeout: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
        });
        this.loadingImport = false;
        this.getUsers();
        this.dataTable = [];
      } catch (error) {
        this.loadingImport = false;
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
  cursor: pointer;
}

.v-card:not(.on-hover) {
  opacity: 0.8;
}
</style>