<template>
  <v-card class="mx-auto">
    <v-toolbar color="#00695C" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Tham số chấm công</v-toolbar-title>

      <v-spacer></v-spacer>
      <!-- <v-text-field
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
      </v-btn> -->
    </v-toolbar>
    <v-layout class="d-flex justify-center pt-8 pb-8" v-if="loadingList">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-layout>
    <v-list subheader two-line v-else>
      <v-subheader inset>Danh sách tham số độ lệch cho phép</v-subheader>
      <v-list-item v-for="phongBan in phongBans" :key="phongBan.title">
        <v-list-item-avatar>
          <v-icon class="grey lighten-1" dark> mdi-home-variant </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="phongBan.name"></v-list-item-title>

          <v-list-item-subtitle
            >Sai lệch cho phép:
            <strong
              >{{ phongBan.gia_tri }} {{ getDonVi(phongBan.code) }}</strong
            ></v-list-item-subtitle
          >
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click="editPhongBan(phongBan)">
            <v-icon color="grey lighten-1">mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <create-edit ref="room" @on-done="getDanhSachPhongBan"></create-edit>
  </v-card>
</template>

<script>
import CreateEdit from "./create-edit";
import { getCauHinhChamCong, CODE_CAU_HINH } from "@/api/thamsohethong";
// import { debounce } from "lodash";

export default {
  components: { CreateEdit },
  data: () => ({
    searhBox: false,
    CODE_CAU_HINH,
    search: "",
    loadingList: false,
    pageCount: 1,
    phongBans: [],
  }),
  // watch: {
  //   search: debounce(async function (val) {
  //     this.loadingList = true;
  //     let data = await getCauHinhChamCong({
  //       search: val
  //     });
  //     this.loadingList = false;
  //     this.phongBans = data;
  //   }, 300),
  // },

  mounted() {
    this.getDanhSachPhongBan();
  },
  methods: {
    themPhongBan() {
      this.$refs.room.showFormAdd();
    },
    editPhongBan(data) {
      let don_vi = this.getDonVi(data.code);
      data.don_vi = don_vi;
      this.$refs.room.showFormEdit(data);
    },
    getDonVi(code) {
      let cauhinh = CODE_CAU_HINH.find((el) => el.code == code);
      if (cauhinh) {
        return cauhinh.don_vi;
      }
      return "";
    },
    async getDanhSachPhongBan() {
      this.loadingList = true;
      let data = await getCauHinhChamCong();
      this.phongBans = data;
      this.loadingList = false;
    },
  },
};
</script>

<style>
</style>