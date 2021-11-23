<template>
  <v-container fluid>
    <v-list-item three-line>
      <v-layout>
        <v-img
          max-height="100"
          max-width="100"
          :size="40"
          :src="CustomerPic"
          class="mr-4"
        ></v-img>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1"> 顧客</v-list-item-title>
          <v-list-item-subtitle>顧客管理</v-list-item-subtitle>
        </v-list-item-content>
        <div class="pt-3">
          <v-btn color="indigo" dark @click="addUser">
            <v-icon left> mdi-plus </v-icon>
            新規作成
          </v-btn>
        </div>
        <div class="pl-3 pt-3">
          <v-menu offset-y class="menu_print">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                title="ツール"
                color="indigo"
                dark
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-toolbox</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item @click="goToImport">
                <v-list-item-title>
                  <v-layout align-center>
                    <v-list-item-icon>
                      <v-icon color="green">mdi-database-import</v-icon>
                    </v-list-item-icon>
                    インポート
                  </v-layout>
                </v-list-item-title>
              </v-list-item>
              <!-- <v-list-item style="cursor: pointer">
                <v-list-item-title>
                  <v-layout align-center>
                    <v-list-item-icon>
                      <v-icon color="#3949ab">mdi-database-export</v-icon>
                    </v-list-item-icon>
                    <download-csv :data="tableData">
                      エクスポート
                    </download-csv>
                  </v-layout>
                </v-list-item-title>
              </v-list-item> -->
              <v-list-item @click="printPDF(4)">
                <v-list-item-title>
                  <v-layout align-center>
                    <v-list-item-icon>
                      <v-icon color="#fb8c00">mdi-printer</v-icon>
                    </v-list-item-icon>
                    宛名出力8分割
                  </v-layout>
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="printPDF(6)">
                <v-list-item-title>
                  <v-layout align-center>
                    <v-list-item-icon>
                      <v-icon color="#fb8c00">mdi-printer</v-icon>
                    </v-list-item-icon>
                    宛名出力12分割
                  </v-layout>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-layout>
    </v-list-item>
    <v-progress-linear
      height="2"
      color="indigo"
      rounded
      value="100"
    ></v-progress-linear>
    <v-card-title class="pa-6 pb-4">
      <!-- <p>Danh sách người dùng</p> -->
      <v-row>
        <v-col cols="4">
          <v-text-field
            append-icon="mdi-magnify"
            v-model="search"
            label="検索"
            clearable
            single-line
            style="width: 100%"
            hide-details
          ></v-text-field
        ></v-col>
        <v-col cols="2">
          <v-select
            v-model="industry_search"
            item-text="name"
            item-value="value"
            :items="industrys"
            placeholder="業種を選択してください"
            hide-details
            clearable
            @change="changeIndustrySearch"
          ></v-select
        ></v-col>
        <v-col cols="2">
          <v-select
            v-model="search_status"
            item-text="name"
            item-value="value"
            :items="trangThais"
            placeholder="ステータスを選択してください"
            hide-details
            clearable
            @change="changeRoleSearch"
          ></v-select
        ></v-col>
        <v-col cols="4">
          <v-layout
            justify-end
            align-end
            class="fill-height"
            v-if="selectedRow && selectedRow.length > 0"
          >
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  title="ステータス更新"
                  color="pink"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  medium
                  fab
                >
                  <v-icon>mdi-pencil-box-outline</v-icon>
                </v-btn>
              </template>
              <v-list dense>
                <div class="pa-2" style="font-size: 14px; font-weight: bold">
                  ステータス更新
                </div>
                <v-list-item
                  style="cursor: pointer"
                  @click="signCustomer(true)"
                >
                  <v-list-item-title>
                    <v-layout align-center>
                      <v-icon class="mr-4" color="green">
                        mdi-comment-check</v-icon
                      >
                      契約済
                    </v-layout>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title @click="signCustomer(false)">
                    <v-layout align-center>
                      <v-icon class="mr-4" color="pink"
                        >mdi-comment-remove-outline</v-icon
                      >
                      未契約
                    </v-layout>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-layout>
        </v-col>
      </v-row>
    </v-card-title>
    <v-hover v-slot="{ hover }">
      <v-data-table
        :style="{ cursor: hover ? 'pointer' : '' }"
        :headers="headers"
        :items="tableData"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        :loading="loading"
        class="elevation-1"
        show-select
        v-model="selectedRow"
        @click:row="editMenu"
        loading-text="データを取得しています ..."
      >
        <template v-slot:[`item.company_name`]="{ item }">
          <v-layout align-center>
            <!-- <v-avatar color="indigo" size="38">
              <img
                v-if="item && item.url_image"
                :src="imageEndpoint + item.url_image"
                alt="John"
              />
              <span
                style="color: white"
                v-else-if="item && item.company_name"
                >{{ item.company_name.charAt(0).toUpperCase() }}</span
              >
              <v-icon v-else dark>mdi-account</v-icon>
            </v-avatar> -->
            <v-layout column class="pl-3">
              <div style="font-size: 15px;">
                {{ item.company_name }}
              </div>
            </v-layout>
          </v-layout>
        </template>
        <template v-slot:[`item.role`]="{ item }">
          <v-list style="background-color: rgba(0, 0, 0, 0)">
            <v-list-item-subtitle>{{
              item.role ? item.role.name : ""
            }}</v-list-item-subtitle>
          </v-list>
        </template>
        <template v-slot:[`item.print_count`]="{ item }">
          <b>{{ item.print_count }}</b>
        </template>
        <template v-slot:[`item.created_at`]="{ item }">
          {{ item.created_at.substr(0, 10) }}
        </template>
        <template v-slot:[`item.signed`]="{ item }">
          <v-chip dark :color="item.signed ? 'green' : 'red'" small>
            {{ item.signed ? "契約済" : "未契約" }}
          </v-chip>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <v-btn
            icon
            color="primary"
            small
            @click.prevent.stop="goToEditForm(item)"
            ><v-icon>mdi-pencil</v-icon></v-btn
          >
        </template>
      </v-data-table>
    </v-hover>
    <div class="pt-2">
      <v-pagination v-model="page" :length="pageCount" @input="changePage"
        >></v-pagination
      >
    </div>
    <v-dialog v-model="printForm" width="600">
      <v-card>
        <v-card-title>宛名出力</v-card-title>
        <v-card-text v-if="viewPrint">
          <v-img :src="print8pic" v-if="printRow == 4"></v-img>
          <v-img :src="print12pic" v-else></v-img>
        </v-card-text>
        <v-card-text v-else>
          <v-layout align-center justify-center>
            <v-progress-circular
              :size="70"
              :width="7"
              color="purple"
              indeterminate
            ></v-progress-circular>
          </v-layout>
        </v-card-text>

        <v-card-actions class="pb-4">
          <v-btn color="orange" @click="printForm = false" class="ml-3" dark>
            <v-icon left> mdi-close</v-icon>
            キャンセル</v-btn
          >
          <v-spacer> </v-spacer>
          <v-btn color="primary" v-if="printRow == 4" @click="submitPrint" class="mr-3">
            <v-icon left> mdi-printer</v-icon>
            出力
          </v-btn>
          <v-btn color="primary" v-else @click="submitPrint12" class="mr-3">
            <v-icon left> mdi-printer</v-icon>
            出力
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-show="false">
      <div id="printbody">
        <PrintView :data="dataPrint" :row="printRow" />
      </div>
    </div>
    <div v-show="false">
      <div id="printbody12">
        <PrintView12 :data="dataPrint" :row="printRow" />
      </div>
    </div>
    <popupdetail ref="detail" />
  </v-container>
</template>
<script>
import { debounce } from "lodash";
import { activeUser } from "@/api/user";
import { getCustomers, setSinged, countPrint} from "@/api/customer";
import { getRoles } from "@/api/menu";
import CustomerPic from "@/assets/images/customers.svg";
import print8pic from "@/assets/print8.jpg";

import print12pic from "@/assets/print12.png";

import PrintView from "./print8.vue";
import PrintView12 from "./print12.vue";
import Popupdetail from "@/pages/Customers/management/popupdetail";
export default {
  components: { Popupdetail, PrintView, PrintView12 },
  data() {
    return {
      print8pic,
      print12pic,
      printForm: false,
      CustomerPic,
      page: 1,
      pageCount: 1,
      itemsPerPage: 20,
      customerPrint: [],
      options: {},
      trangThais: [
        { name: "未契約", value: false },
        { name: "契約済", value: true },
      ],
      industrys: [
        { name: "新規事業", value: 1 },
        { name: "美容サロン", value: 2 },
        { name: "美容院", value: 3 },
        { name: "マッサージ", value: 4 },
      ],
      totalDesserts: 0,
      tableData: [],
      btnLoading: false,
      menu: {},
      selectedRow: [],
      loading: false,
      search: "",
      industry_search: null,
      search_status: null,
      roleId: null,
      imageEndpoint: process.env.VUE_APP_BASE,
      roles: [],
      printRow: 4,
      dataPrint: [],
      viewPrint: false,
      loadingPrint: false,
      trang_thai: null,
      headers: [
        // {
        //   text: "REP名ID",
        //   value: "user_id",
        //   sortable: false,
        //   width: "100",
        // },
        {
          text: "REP店名",
          value: "user.company_name",
          sortable: false,
          width: "150",
        },
        {
          text: "業種",
          value: "industry.name",
          sortable: false,
          width: "100",
        },
        {
          text: "会社名/店名",
          value: "company_name",
          sortable: false,
          width: "200",
        },
        {
          text: "代表者名",
          value: "representative_name",
          sortable: false,
          width: "100",
        },
        {
          text: "住所",
          align: "start",
          sortable: false,
          value: "address",
          width: "200",
        },
        {
          text: "登録日",
          align: "start",
          sortable: false,
          value: "created_at",
          width: "150",
        },
        { text: "宛名出力回数", 
          align: "start", 
          value: "print_count",
          width: "150",
        },
        {
          text: "ステータス",
          sortable: false,
          align: "center",
          value: "signed",
        },
        { text: "編集", sortable: false, value: "action" },
      ],
    };
  },
  computed: {
    USER() {
      return this.$store.state.User.me;
    },
  },
  created() {
    this.getData();
    this.getAllRoles();
  },
  watch: {
    search: debounce(async function (val) {
      this.loading = true;
      let data = await getCustomers({
        page: 1,
        perPage: this.itemsPerPage,
        search: val,
      });
      this.loading = false;
      this.tableData = data.data;
      this.pageCount = data.last_page;
    }, 300),
  },
  methods: {
    async printPDF(row) {
      this.printForm = true;
      // this.viewPrint = false;
      this.viewPrint = true;
      this.loadingPrint = false;

      this.dataPrint = this.selectedRow;

      this.printRow = row;
    },
    async signCustomer(status) {
      let ids = this.selectedRow.map((el) => el.id);
      await setSinged({ ids: ids, status: status });
      this.getData();
      this.$toast.info("更新は完了しました。", {
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
    },
    submitPrint() {
      let printId = []
      this.selectedRow.forEach(el => {
        printId.push(el.id)
      })
      this.addPrint(printId)
      var divContents = document.getElementById("printbody").innerHTML;
      
      var a = window.open("", "", "height=800, width=1200", "_self");
      a.document.write("<html>");
      a.document.write("<body > <h1><br>");
      a.document.write(divContents);
      a.document.write("</body></html>");
      a.document.close();
      a.print();
    },
    submitPrint12() {
      let printId = []
      this.selectedRow.forEach(el => {
        printId.push(el.id)
      })
      this.addPrint(printId)
      var divContents = document.getElementById("printbody12").innerHTML;
      
      var a = window.open("", "", "height=800, width=1200", "_self");
      a.document.write("<html>");
      a.document.write("<body > <h1><br>");
      a.document.write(divContents);
      a.document.write("</body></html>");
      a.document.close();
      a.print();
    },
    async getData() {
      this.loading = true;
      let data = await getCustomers({
        page: this.page,
        perPage: this.itemsPerPage,
        search: this.search,
        search_industry: this.industry_search,
        search_status: this.search_status,
      });
      this.tableData = data.data;
      this.loading = false;
      this.pageCount = data.last_page;
    },

    changePage(val) {
      this.page = val;
      this.getData();
    },
    async addPrint(val) {
      await countPrint({countprint: val})
      this.getData();
    },
    editMenu(item) {
      this.$refs.detail.openDialog(item.id);
      // this.$router.push("/customer/show/" + item.id);
    },
    goToEditForm(item) {
      this.$router.push("/customer/edit/" + item.id);
    },
    addUser() {
      this.$router.push("/customer/add");
    },
    async activeUser(user) {
      this.$confirmBox.show({
        title: "ユーザーのアカウントを有効にします",
        width: 500,
        body:
          "<strong>" +
          user.name +
          "のアカウントを有効にしますか" +
          " ?" +
          "</strong><br>" +
          "<strong>" +
          user.name +
          "</strong>" +
          "はシステムにログイン可能になります",
        action: () => activeUser({ userId: user.id, active: true }),
        onDone: this.getData,
      });
    },
    async deactivateUser(user) {
      this.$confirmBox.show({
        title: "ユーザーのアカウントを無効にします",
        width: 480,
        body:
          "<strong>" +
          user.name +
          "のアカウントを無効にしますか" +
          " ?" +
          "</strong><br>" +
          "<strong>" +
          user.name +
          "</strong>" +
          "はシステムにログイン不可能になります",
        action: () => activeUser({ userId: user.id, active: false }),
        onDone: this.getData,
      });
    },
    async changeRoleSearch() {
      this.getData();
    },
    async changeIndustrySearch() {
      this.getData();
    },
    goToImport() {
      this.$router.push("/customer/import/");
    },
    async getAllRoles() {
      let data = await getRoles();
      this.roles = data;
    },
  },
};
</script>
<style scoped>
@media only screen and (max-width: 600px) {
  .btn-add {
    display: none;
  }
}
</style>
<style>
.menu_print.v-menu__content {
  box-shadow: 0 3px 11px 0 #101756, 0 3px 3px -2px #b2b2b21a,
    0 1px 8px 0 #9a9a9a1a !important;
}
</style>
