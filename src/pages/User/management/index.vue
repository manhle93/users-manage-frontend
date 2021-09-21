<template>
  <v-container fluid>
    <v-list-item three-line>
      <v-layout>
        <v-img
          max-height="100"
          max-width="100"
          :size="40"
          :src="UserPic"
          class="mr-4"
        ></v-img>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">
            QUẢN LÝ NGƯỜI DÙNG</v-list-item-title
          >
          <v-list-item-subtitle
            >Danh sách người dùng hệ thống</v-list-item-subtitle
          >
        </v-list-item-content>

        <div class="pt-3">
          <v-btn color="indigo" dark @click="addUser">
            <v-icon left> mdi-plus </v-icon>
            ADD USER
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
      <v-spacer></v-spacer>
      <div style="width: 800px" class="mr-4">
        <v-row>
          <v-col cols="4">
            <v-select
              v-model="roleId"
              item-text="name"
              item-value="id"
              :items="roles"
              placeholder="Quyền"
              hide-details
              clearable
              @change="changeRoleSearch"
            ></v-select
          ></v-col>
          <v-col cols="4">
            <v-select
              v-model="trang_thai"
              item-text="name"
              item-value="value"
              :items="trangThais"
              placeholder="Trạng thái"
              hide-details
              clearable
              @change="changeRoleSearch"
            ></v-select
          ></v-col>

          <v-col cols="4">
            <v-text-field
              append-icon="mdi-magnify"
              v-model="search"
              label="Tìm kiếm"
              clearable
              single-line
              hide-details
            ></v-text-field
          ></v-col>
        </v-row>
      </div>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="tableData"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      :loading="loading"
      class="elevation-1"
      loading-text="Đang tải dữ liệu ..."
    >
      <template v-slot:[`item.name`]="{ item }">
        <v-layout>
          <v-avatar color="indigo" size="38">
            <img
              v-if="item && item.url_image"
              :src="imageEndpoint + item.url_image"
              alt="John"
            />
            <span style="color: white" v-else-if="item && item.name">{{
              item.name.charAt(0).toUpperCase()
            }}</span>
            <v-icon v-else dark>mdi-account</v-icon>
          </v-avatar>
          <v-layout column class="pl-3">
            <div style="font-size: 15px; font-weight: bold">{{ item.name }}</div>
            <div style="font-size: 13px; color: green" v-if="item.active">Active</div>
             <div style="font-size: 13px; color: red" v-else>Not Active</div>
          </v-layout>
        </v-layout>
      </template>
      <template v-slot:[`item.role`]="{ item }">
        <v-list style="background-color: rgba(0, 0, 0, 0)">
          <v-list-item-title>{{
            item.role ? item.role.description : ""
          }}</v-list-item-title>
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
                Cập nhật</v-list-item-title
              >
            </v-list-item>
            <v-list-item
              v-if="item.active && item.id !== USER.id"
              @click="deactivateUser(item)"
            >
              <v-list-item-title>
                <v-icon class="mr-2"> mdi-lock-outline </v-icon>
                Hủy kích hoạt</v-list-item-title
              >
            </v-list-item>
            <v-list-item
              v-if="!item.active && item.id !== USER.id"
              @click="activeUser(item)"
            >
              <v-list-item-title>
                <v-icon class="mr-2"> mdi-lock-open-outline </v-icon>
                Kích hoạt tài khoản</v-list-item-title
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
    <create-edit
      ref="menuForm"
      @on-done="getDataUsers"
      :roles="roles"
    ></create-edit>
  </v-container>
</template>
<script>
import CreateEdit from "./create-edit";
import { debounce } from "lodash";
import { listUser, activeUser } from "@/api/user";
import { getRoles } from "@/api/menu";
import UserPic from "@/assets/images/users_manage.svg";
export default {
  components: { CreateEdit },
  data() {
    return {
      UserPic,
      page: 1,
      pageCount: 1,
      itemsPerPage: 10,
      options: {},
      trangThais: [
        { name: "Đang hoạt đông", value: true },
        { name: "Ngừng hoạt đông", value: false },
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
        // { text: "STT", width: "100", sortable: false, value: "stt" },
        { text: "Người dùng", value: "name", sortable: false, width: "220", },
        {
          text: "代表者名",
          align: "start",
          sortable: false,
          value: "user_name",
        },
        {
          text: "E-Mail",
          align: "start",
          sortable: false,
          value: "email",
        },
        { text: "Quyền", value: "role" },
        { text: "Company", value: "company_name" },
        {
          text: "Hành động",
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
    this.getDataUsers();
    this.getAllRoles();
  },
  watch: {
    search: debounce(async function (val) {
      this.loading = true;
      let data = await listUser({
        page: 1,
        perPage: this.itemsPerPage,
        search: val,
        role_id: this.roleId,
        trang_thai: this.trang_thai,
      });
      this.loading = false;
      this.tableData = data.data;
      this.pageCount = data.last_page;
    }, 300),
  },
  methods: {
    async getDataUsers() {
      this.loading = true;
      let data = await listUser({
        page: this.page,
        perPage: this.itemsPerPage,
        role_id: this.roleId,
        search: this.search,
        trang_thai: this.trang_thai,
      });
      this.tableData = data.data;
      this.loading = false;
      this.pageCount = data.last_page;
    },
    changePage(val) {
      this.page = val;
      this.getDataUsers();
    },
    editMenu(menu) {
      this.$refs.menuForm.showFormEdit(menu);
    },
    addUser() {
      this.$refs.menuForm.showFormAdd();
    },
    async activeUser(user) {
      this.$confirmBox.show({
        title: "Kích hoạt tài khoản người dùng",
        width: 500,
        body:
          "Bạn có chắc chắn muốn kích hoạt khoản người dùng " +
          "<strong>" +
          user.name +
          " ?" +
          "</strong><br>" +
          "<strong>" +
          user.name +
          "</strong>" +
          " có thể đăng nhập và sử dụng hệ thống",
        action: () => activeUser({ userId: user.id, active: true }),
        onDone: this.getDataUsers,
      });
    },
    async deactivateUser(user) {
      this.$confirmBox.show({
        title: "Hủy kích hoạt tài khoản người dùng",
        width: 480,
        body:
          "Bạn có chắc chắn muốn hủy kích hoạt tài khoản của người dùng " +
          "<strong>" +
          user.name +
          " ?" +
          "</strong><br>" +
          "<strong>" +
          user.name +
          "</strong>" +
          " sẽ không đăng nhập hệ thống",
        action: () => activeUser({ userId: user.id, active: false }),
        onDone: this.getDataUsers,
      });
    },
    async changeRoleSearch() {
      this.getDataUsers();
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
