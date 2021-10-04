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
          <v-list-item-title class="headline mb-1">
            Khách hàng</v-list-item-title
          >
          <v-list-item-subtitle>Quản lý khách hàng</v-list-item-subtitle>
        </v-list-item-content>
        <div class="pt-3">
          <v-btn color="indigo" dark @click="addUser">
            <v-icon left> mdi-plus </v-icon>
            Thêm khách hàng
          </v-btn>
        </div>
        <div class="pl-3 pt-3">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn title="Tool" color="indigo" dark v-bind="attrs" v-on="on">
                <v-icon>mdi-toolbox</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item @click="goToImport">
                <v-list-item-title>
                  <v-layout align-center>
                    <v-list-item-icon>
                      <v-icon>mdi-database-import</v-icon>
                    </v-list-item-icon>
                    Import data
                  </v-layout>
                </v-list-item-title>
              </v-list-item>
              <v-list-item style="cursor: pointer">
                <v-list-item-title>
                  <v-layout align-center>
                    <v-list-item-icon>
                      <v-icon>mdi-database-export</v-icon>
                    </v-list-item-icon>
                    <download-csv :data="tableData"> Export data </download-csv>
                  </v-layout>
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="printPDF(4)">
                <v-list-item-title>
                  <v-layout align-center>
                    <v-list-item-icon>
                      <v-icon>mdi-printer</v-icon>
                    </v-list-item-icon>
                    Print 8
                  </v-layout>
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="printPDF(6)">
                <v-list-item-title>
                  <v-layout align-center>
                    <v-list-item-icon>
                      <v-icon>mdi-printer</v-icon>
                    </v-list-item-icon>
                    Print 12
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
        <v-col cols="8">
          <v-layout
            justify-end
            align-end
            class="fill-height"
            v-if="selectedRow && selectedRow.length > 0"
          >
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  title="Tool"
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
                <div class="pa-2" style="font-size: 14px">Update status</div>
                <v-list-item
                  style="cursor: pointer"
                  @click="signCustomer(true)"
                >
                  <v-list-item-title>
                    <v-layout align-center>
                      <v-icon class="mr-4">mdi-pencil</v-icon>
                      契約済
                    </v-layout>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title @click="signCustomer(false)">
                    <v-layout align-center>
                      <v-icon class="mr-4">mdi-close</v-icon>
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
            <v-avatar color="indigo" size="38">
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
            </v-avatar>
            <v-layout column class="pl-3">
              <div style="font-size: 15px; font-weight: bold">
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
            {{ item.signed ? "Signed" : "Not sign" }}
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
        <v-card-title>Print List Customers</v-card-title>
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
            Close</v-btn
          >
          <v-spacer> </v-spacer>
          <v-btn color="primary" @click="submitPrint" class="mr-3">
            <v-icon left> mdi-printer</v-icon>
            Print</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-show="false">
      <div id="printbody">
        <PrintView :data="dataPrint" :row="printRow" />
      </div>
    </div>
    <popupdetail ref="detail"/>
  </v-container>
</template>
<script>
import { debounce } from "lodash";
import { activeUser } from "@/api/user";
import { getCustomers, setSinged } from "@/api/customer";
import { getRoles } from "@/api/menu";
import CustomerPic from "@/assets/images/customers.svg";
import print8pic from "@/assets/print8.jpg";

import print12pic from "@/assets/print12.png";

import PrintView from "./print.vue";
import Popupdetail from "@/pages/Customers/management/popupdetail";
export default {
  components: {Popupdetail, PrintView },
  data() {
    return {
      print8pic,
      print12pic,
      printForm: false,
      CustomerPic,
      page: 1,
      pageCount: 1,
      itemsPerPage: 10,
      options: {},
      trangThais: [
        { name: "有効", value: true },
        { name: "無効", value: false },
      ],
      totalDesserts: 0,
      tableData: [],
      btnLoading: false,
      menu: {},
      selectedRow: [],
      loading: false,
      search: "",
      roleId: null,
      imageEndpoint: process.env.VUE_APP_BASE,
      roles: [],
      printRow: 4,
      dataPrint: [],
      viewPrint: false,
      loadingPrint: false,
      trang_thai: null,
      headers: [
        {
          text: "Company name",
          value: "company_name",
          sortable: false,
          width: "220",
        },
        {
          text: "Address",
          align: "start",
          sortable: false,
          value: "address",
          width: "350",
        },
        {
          text: "Phone number",
          align: "start",
          sortable: false,
          value: "phone_number",
        },
        { text: "Manager name", value: "manager_name" },
        { text: "Industry", value: "industry.name" },
        { text: "Representative name", value: "representative_name" },
        { text: "Print count", align: "start", value: "print_count" },
        { text: "Status", sortable: false, align: "center", value: "signed" },
        { text: "", sortable: false, value: "action" },
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
      this.$toast.info("Cập nhật thành công", {
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
      var divContents = document.getElementById("printbody").innerHTML;
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
      });
      this.tableData = data.data;
      this.loading = false;
      this.pageCount = data.last_page;
    },
    changePage(val) {
      this.page = val;
      this.getData();
    },
    editMenu(item) {
      this.$refs.detail.openDialog(item.id)
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
