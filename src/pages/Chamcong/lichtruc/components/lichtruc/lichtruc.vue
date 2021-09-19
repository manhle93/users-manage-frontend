<template>
  <v-card class="mx-auto">
    <v-toolbar color="#00695C" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Lịch trực</v-toolbar-title>

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
        <span>Thêm lịch trực</span>
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
      <v-subheader inset>Danh sách lịch trực</v-subheader>
      <v-list-item v-for="diaDiem in diaDiems" :key="diaDiem.title">
        <v-list-item-avatar>
          <v-icon class="grey lighten-1" dark> mdi-calendar</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="diaDiem.loai ? diaDiem.loai.name: ''"></v-list-item-title>

          <v-list-item-subtitle>{{
            "Thời gian: " +
            formatDate(diaDiem.bat_dau) +
            " - " +
            formatDate(diaDiem.ket_thuc)
          }}</v-list-item-subtitle>
                    <v-list-item-subtitle>Trưởng ca: {{diaDiem.truong_ca ? diaDiem.truong_ca.name: ""}}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-chip
            v-if="
              new Date(diaDiem.bat_dau) <= Date.now() &&
              new Date(diaDiem.ket_thuc) >= Date.now()
            "
            color="success"
            dark
            small
          >
            Ngày trực hôm nay
          </v-chip>
          <v-chip
            v-if="new Date(diaDiem.bat_dau) > Date.now()"
            color="primary"
            dark
            small
          >
            Chưa đến ngày trực
          </v-chip>
          <v-chip
            v-if="new Date(diaDiem.ket_thuc) < Date.now()"
            color="pink"
            dark
            small
          >
            Ngày trực đã qua
          </v-chip>
        </v-list-item-action>
        <v-list-item-action>
          <v-btn icon @click="editDiaDiem(diaDiem)">
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
    <create-edit ref="diadiem" @on-done="getDanhSachDiaDiem"></create-edit>
  </v-card>
</template>

<script>
import CreateEdit from "./create-edit";
import { getLichTruc } from "@/api/lichtruc";
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
    diaDiems: [],
  }),
  watch: {
    search: debounce(async function (val) {
      this.loadingList = true;
      let data = await getLichTruc({
        page: 1,
        perPage: this.itemsPerPage,
        search: val,
      });
      this.loadingList = false;
      this.diaDiems = data.data;
      this.pageCount = data.last_page;
    }, 300),
  },

  mounted() {
    this.getDanhSachDiaDiem();
  },
  methods: {
    themPhongBan() {
      this.$refs.diadiem.showFormAdd();
    },
    editDiaDiem(data) {
      this.$refs.diadiem.showFormEdit(data);
    },
    async getDanhSachDiaDiem() {
      this.loadingList = true;
      let data = await getLichTruc({
        page: this.page,
        perPage: this.perPage,
        search: this.search,
      });
      this.diaDiems = data.data;
      this.loadingList = false;
      this.pageCount = data.last_page;
    },
    changePage(val) {
      this.page = val;
      this.getDanhSachDiaDiem();
    },
    formatDate(e) {
      if (!e) return null;
      try {
        let date = new Date(e);
        let gio =
          date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let phut =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let ngay = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let thang =
          Number(date.getMonth() + 1) < 10
            ? "0" + Number(date.getMonth() + 1)
            : Number(date.getMonth() + 1);
        return (
          gio +
          "h " +
          phut +
          " Ngày " +
          ngay +
          "/" +
          thang +
          "/" +
          date.getFullYear()
        );
      } catch (error) {
        return "";
      }
    },
  },
};
</script>

