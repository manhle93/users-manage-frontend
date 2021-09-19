<template>
  <v-container>
    <v-card>
      <v-layout>
        <v-list-item three-line>
          <v-layout>
            <v-img
              max-height="100"
              max-width="100"
              :size="40"
              :src="GroupPic"
              class="mr-4"
            ></v-img>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                NHÓM TRUYỀN THÔNG</v-list-item-title
              >
              <v-list-item-subtitle
                >Danh sách các các nhóm truyền thông</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-layout>
        </v-list-item>
      </v-layout>
    </v-card>
    <v-row class="mt-4">
      <v-col sm="6" lg="4" md="4" xs="6">
        <v-card max-width="100%" class="mx-auto">
          <v-toolbar color="teal darken-3" dark>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>Nhóm truyền thông</v-toolbar-title>
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
              <v-icon>mdi-magnify</v-icon> </v-btn>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" @click="addGroup">
                  <v-icon>mdi-playlist-plus</v-icon>
                </v-btn>
              </template>
              <span>Tạo nhóm mới</span>
            </v-tooltip>
          </v-toolbar>

          <v-list three-line>
            <v-list-item-group v-model="selected" active-class="primary--text">
              <template v-for="(item, index) in tableData">
                <v-list-item :key="item.id" @click="showChiTiet(item)">
                  <v-list-item-avatar color="indigo">
                    <span style="color: white">{{
                      item.name.charAt(0).toUpperCase()
                    }}</span>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>
                      <div style="font-size: 18px; font-weight: 400">
                        {{ item.name }}
                      </div>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{
                        item.mo_ta > 90
                          ? String(item.mo_ta).substr(0, 90) + "..."
                          : item.mo_ta
                      }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      Người tạo:
                      {{ item.nguoi_tao.name }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon color="green" @click="editGroup(item)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-chip class="mt-2" color="red" text-color="white" small>
                      {{ item.so_thanh_vien }} Thành viên
                    </v-chip>
                  </v-list-item-action>
                </v-list-item>
                <v-divider
                  :key="item.id + '-' + index"
                  :inset="true"
                ></v-divider>
              </template>
            </v-list-item-group>
          </v-list>
          <div class="pt-2 pb-3">
            <v-pagination v-model="page" :length="pageCount" @input="changePage"
              >></v-pagination
            >
          </div>
        </v-card></v-col
      >
      <v-col sm="6" lg="8" md="8" xs="6" class="pt-0">
        <Nhom :nhomId="nhomId" :groupName="groupName" />
      </v-col>
    </v-row>
    <create-edit ref="group" @on-done="getData"></create-edit>
  </v-container>
</template>

<script>
import GroupPic from "../../../assets/images/group.png";
import { getNhom } from "@/api/nhom";
import Nhom from "./thanhvien";
import CreateEdit from "./create-edit";

export default {
  components: { Nhom, CreateEdit },
  data: () => ({
    imageEndpoint: process.env.VUE_APP_BASE,
    searhBox: false,
    search: "",
    date: [],
    selected: null,
    GroupPic,
    showDate: false,
    dateRangeText: "",
    page: 1,
    pageCount: 1,
    itemsPerPage: 5,
    tableData: [],
    loading: false,
    nhomId: null,
    groupName: null,
  }),

  mounted() {
    this.getData();
    this.getChiTiet();
  },
  methods: {
    async getData() {
      this.loading = true;
      let data = await getNhom({
        page: this.page,
        perPage: this.itemsPerPage,
        search: this.search,
      });
      this.loading = false;
      this.tableData = data.data;
      this.pageCount = data.meta.last_page;
    },
    async getChiTiet() {
      if (Number.isInteger(Number(this.$route.params.id))) {
        this.nhomId = Number(this.$route.params.id);
      } else return;
    },
    addGroup() {
      this.$refs.group.showFormAdd();
    },
    editGroup(data) {
      this.$refs.group.showFormEdit(data);
    },
    formatDate(e) {
      if (!e) return null;
      try {
        let date = new Date(e);
        let ngay = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let thang =
          Number(date.getMonth() + 1) < 10
            ? "0" + Number(date.getMonth() + 1)
            : Number(date.getMonth() + 1);
        return ngay + "/" + thang + "/" + date.getFullYear();
      } catch (error) {
        return "";
      }
    },
    changePage(val) {
      this.page = val;
      this.getData();
    },
    showChiTiet(item) {
      if (item.id != this.$route.params.id) {
        this.$router.push({ params: { id: item.id } });
      }
      this.nhomId = item.id;
      this.groupName = item.name;
    },
  },
};
</script>

<style>
</style>