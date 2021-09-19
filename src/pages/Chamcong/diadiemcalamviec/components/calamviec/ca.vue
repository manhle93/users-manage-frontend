<template>
  <v-card class="mx-auto">
    <v-toolbar color="#00695C" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Ca làm việc</v-toolbar-title>

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
        <span>Thêm ca làm việc</span>
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
      <v-subheader inset>Danh sách ca làm việc</v-subheader>
      <v-list-item v-for="ca in caLamViecs" :key="ca.title">
        <v-list-item-avatar>
          <v-icon class="grey lighten-1" dark> mdi-clock </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="ca.name"></v-list-item-title>

          <v-list-item-subtitle
            >{{ 'Thời gian: ' +ca.bat_dau +' - ' + ca.ket_thuc}}</v-list-item-subtitle
          >
        </v-list-item-content>

        <!-- <v-list-item-action>
          <v-chip color="success" dark small v-if="nhom.active">
            Đang hoạt động
          </v-chip>
          <v-chip color="pink" dark small v-else> Không hoạt động </v-chip>
        </v-list-item-action> -->
        <v-list-item-action>
          <v-btn icon @click="editPhongBan(ca)">
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
    <create-edit ref="room" @on-done="getData"></create-edit>
  </v-card>
</template>

<script>
import CreateEdit from "./create-edit";
import { getCa } from "@/api/calamviec";
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
    caLamViecs: [],
  }),
  watch: {
    search: debounce(async function (val) {
      this.loadingList = true;
      let data = await getCa({
        page: 1,
        perPage: this.itemsPerPage,
        search: val,
      });
      this.loadingList = false;
      this.caLamViecs = data.data;
      this.pageCount = data.last_page;
    }, 300),
  },

  mounted() {
    this.getData();
  },
  methods: {
    themPhongBan() {
      this.$refs.room.showFormAdd();
    },
    editPhongBan(data) {
      this.$refs.room.showFormEdit(data);
    },
    async getData() {
      this.loadingList = true;
      let data = await getCa({
        page: this.page,
        perPage: this.perPage,
        search: this.search,
      });
      this.caLamViecs = data.data;
      this.loadingList = false;
      this.pageCount = data.last_page;
    },
    changePage(val) {
      this.page = val;
      this.getData();
    },
  },
};
</script>

<style scoped>
.zero-vertical {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
</style>