<template>
  <v-container>
    <v-row>
      <v-col sm="6" lg="4" md="4" xs="6">
        <v-card max-width="100%" class="mx-auto">
          <v-toolbar color="teal darken-3" dark>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>Thông báo</v-toolbar-title>
          </v-toolbar>

          <v-list three-line v-if="!loading">
            <v-list-item-group v-model="selected" active-class="green--text">
              <template v-for="(item, index) in thongBaos">
                <v-list-item :key="item.id">
                  <v-list-item-avatar color="indigo" size="60">
                    <img
                      v-if="item.from_user && item.from_user.url_image"
                      :src="imageEndpoint + item.from_user.url_image"
                      alt="ManhLe"
                    />
                    <span
                      style="color: white"
                      v-else-if="item.from_user && !item.from_user.url_image"
                      >{{ item.from_user.name.charAt(0).toUpperCase() }}</span
                    >
                    <v-icon v-else dark>mdi-account</v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.noi_dung }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      item.thoi_gian_nhan_thong_bao
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-icon color="green darken-3"> mdi-bell </v-icon>
                  </v-list-item-action>
                </v-list-item>
                <v-divider inset :key="index"></v-divider>
              </template>
            </v-list-item-group>
          </v-list>
          <v-layout
            v-else
            column
            style="height: 500px"
            align-center
            justify-center
          >
            <v-progress-circular
              :size="70"
              :width="7"
              color="purple"
              indeterminate
            ></v-progress-circular>
          </v-layout>
          <div class="pt-2 pb-3">
            <v-pagination v-model="page" :length="pageCount" @input="changePage"
              >></v-pagination
            >
          </div>
        </v-card></v-col
      >
      <v-col sm="6" lg="8" md="8" xs="6" class="pt-0">
        <chi-tiet :mailId="selected"></chi-tiet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getThongBao } from "@/api/thongbao";
import ChiTiet from "./chitiet";
export default {
  components: { ChiTiet },
  data: () => ({
    selected: null,
    thongBaos: [],
    loading: false,
    page: 1,
    pageCount: 1,
    itemsPerPage: 5,
    imageEndpoint: process.env.VUE_APP_BASE,
  }),
  mounted() {
    //this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      let data = await getThongBao({
        page: this.page,
        perPage: this.itemsPerPage,
      });
      this.loading = false;
      this.thongBaos = data.data;
      this.pageCount = data.meta.last_page;
    },
    changePage(val) {
      this.page = val;
      this.getData();
    },
  },
};
</script>