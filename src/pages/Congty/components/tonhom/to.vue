<template>
  <v-card class="mx-auto">
    <v-toolbar color="#00695C" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Quản lý Tổ - Nhóm</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-text-field
        v-show="searhBox"
        append-icon="mdi-magnify"
        v-model="search"
        label="Tìm kiếm"
        clearable
        single-line
        hide-details
        @blur="searhBox = false"
      ></v-text-field>
      <v-btn icon @click="searhBox = true" v-show="!searhBox">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="themPhongBan">
            <v-icon>mdi-playlist-plus</v-icon>
          </v-btn>
        </template>
        <span>Thêm phòng ban</span>
      </v-tooltip>
    </v-toolbar>
    <v-layout class="d-flex justify-center pt-8 pb-8" v-if="loadingList">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-layout>
    <v-list subheader two-line v-else>
      <v-layout class="pr-8" align-center>
        <v-subheader inset>Danh sách tổ nhóm</v-subheader>
        <v-spacer></v-spacer>
        <div>
          <v-select
            v-model="filter"
            :items="typeFilters"
            item-text="name"
            item-value="value"
            placeholder="Sắp xếp theo"
          >
          </v-select>
        </div>
      </v-layout>
      <v-list-item v-for="nhom in nhomTos" :key="nhom.title">
        <v-list-item-avatar>
          <v-icon class="grey lighten-1" dark> mdi-account-multiple </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="nhom.name"></v-list-item-title>

          <v-list-item-subtitle
            >{{ nhom.phong_ban ? "Trực thuộc: " + nhom.phong_ban.name : "" }}
            {{
              nhom.so_dien_thoai ? " - SĐT: " + nhom.so_dien_thoai : ""
            }}</v-list-item-subtitle
          >
        </v-list-item-content>

        <v-list-item-action>
          <v-chip color="success" dark small v-if="nhom.active">
            Đang hoạt động
          </v-chip>
          <v-chip color="pink" dark small v-else> Không hoạt động </v-chip>
        </v-list-item-action>
        <v-list-item-action>
          <v-btn icon @click="editPhongBan(nhom)">
            <v-icon color="grey lighten-1">mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <div class="pt-2">
        <v-pagination
          circle
          v-model="page"
          :length="pageCount"
          @input="changePage"
          >></v-pagination
        >
      </div>
    </v-list>
    <create-edit ref="room" @on-done="getDanhSachNhomTo"></create-edit>
  </v-card>
</template>

<script>
import CreateEdit from "./create-edit";
import { getNhomTo } from "@/api/nhomto";
import { debounce } from "lodash";

export default {
  components: { CreateEdit },
  data: () => ({
    searhBox: false,
    search: "",
    page: 1,
    perPage: 5,
    loadingList: false,
    pageCount: 1,
    nhomTos: [],
    typeFilters: [
      { name: "Tên (A -> Z)", value: "name" },
      { name: "Thời gian tạo", value: "created_at" },
      { name: "Thời gian cập nhật", value: "updated_at" },
    ],
    filter: null,
  }),
  watch: {
    search: debounce(async function (val) {
      this.loadingList = true;
      let data = await getNhomTo({
        page: 1,
        perPage: this.itemsPerPage,
        search: val,
      });
      this.loadingList = false;
      this.nhomTos = data.data;
      this.pageCount = data.last_page;
    }, 300),
  },

  mounted() {
    this.getDanhSachNhomTo();
  },
  methods: {
    themPhongBan() {
      this.$refs.room.showFormAdd();
    },
    editPhongBan(data) {
      this.$refs.room.showFormEdit(data);
    },
    async getDanhSachNhomTo() {
      this.loadingList = true;
      let data = await getNhomTo({
        page: this.page,
        perPage: this.perPage,
        search: this.search,
      });
      this.nhomTos = data.data;
      this.loadingList = false;
      this.pageCount = data.last_page;
    },
    changePage(val) {
      this.page = val;
      this.getDanhSachNhomTo();
    },
  },
};
</script>

<style>
</style>