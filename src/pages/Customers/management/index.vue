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
      </v-row>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="tableData"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      :loading="loading"
      class="elevation-1"
      loading-text="データを取得しています ..."
    >
      <template v-slot:[`item.company_name`]="{ item }">
        <v-layout>
          <v-avatar color="indigo" size="38">
            <img
              v-if="item && item.url_image"
              :src="imageEndpoint + item.url_image"
              alt="John"
            />
            <span style="color: white" v-else-if="item && item.company_name">{{
              item.company_name.charAt(0).toUpperCase()
            }}</span>
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
      <template v-slot:[`item.action`]="{ item }">
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon color="textColor">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="editMenu(item)">
              <v-list-item-title>
                <v-icon class="mr-2"> mdi-pencil </v-icon>
                編集</v-list-item-title
              >
            </v-list-item>
            <v-list-item
              v-if="item.active && item.id !== USER.id"
              @click="deactivateUser(item)"
            >
              <v-list-item-title>
                <v-icon class="mr-2"> mdi-lock-outline </v-icon>
                無効</v-list-item-title
              >
            </v-list-item>
            <v-list-item
              v-if="!item.active && item.id !== USER.id"
              @click="activeUser(item)"
            >
              <v-list-item-title>
                <v-icon class="mr-2"> mdi-lock-open-outline </v-icon>
                有効</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    <div class="pt-2">
      <v-pagination v-model="page" :length="pageCount" @input="changePage"
        >></v-pagination
      >
    </div>
  </v-container>
</template>
<script>
import { debounce } from "lodash";
import { activeUser } from "@/api/user";
import { getCustomers } from "@/api/customer";

import { getRoles } from "@/api/menu";
import CustomerPic from "@/assets/images/customers.svg";
export default {
  data() {
    return {
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
      loading: false,
      search: "",
      roleId: null,
      imageEndpoint: process.env.VUE_APP_BASE,
      roles: [],
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
        },
        {
          text: "Phone number",
          align: "start",
          sortable: false,
          value: "phone_number",
        },
        { text: "Manager name", value: "signed" },
        {
          text: "アクション",
          value: "action",
          sortable: false,
          align: "center",
          width: "150",
        },
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
      this.$router.push("/customer/show/" + item.id);
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
