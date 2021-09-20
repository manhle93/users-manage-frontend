<template>
  <v-app-bar
    class="main-header"
    style="box-shadow: none"
    height="45"
    fixed
    color="indigo darken-4"
    dark
  >
    <v-progress-linear
      indeterminate
      color="yellow darken-2"
      style="position: fixed; bottom: 0; left: 0; width: 100%"
      height="4"
      v-show="loadingBar"
    ></v-progress-linear>
    <v-avatar size="38" class="mr-3">
      <img :src="Logo" alt="John" />
    </v-avatar>
    <v-toolbar-title style="font-size: 16px">Application</v-toolbar-title>
    <v-btn icon class="mx-1" @click.stop="TOGGLE_DRAWER">
      <template>
        <v-icon style="font-size: 20px">mdi-menu</v-icon>
      </template>
    </v-btn>
    <v-spacer></v-spacer>
    <!-- <Search /> -->

    <!-- <v-menu offset-y bottom nudge-bottom="10" left>
      <template v-slot:activator="{on, attrs}">
        <v-btn
          @click="notificationsBadge ? (notificationsBadge = !notificationsBadge) : ''"
          v-bind="attrs"
          v-on="on"
          style="font-size: 28px"
          icon
          class="mr-2"
        >
          <v-badge :value="notificationsBadge" color="error" content="4" overlap>
            <v-icon style="font-size: 28px" color="rgba(255, 255, 255, 0.35)">mdi-bell-outline</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in notifications" :key="i">
            <v-list-item-icon class="mr-4 mb-1">
              <v-icon :color="item.color" v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu> -->
    <v-menu width="400" offset-y bottom nudge-bottom="10" left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="messageBadge ? (messageBadge = !messageBadge) : ''"
          v-bind="attrs"
          v-on="on"
          style="font-size: 28px"
          icon
          class="mr-4"
        >
          <v-badge
            :value="soThongBao"
            color="pink"
            :content="soThongBao"
            overlap
          >
            <v-icon color="yellow lighten-4" style="font-size: 20px"
              >mdi-bell</v-icon
            >
          </v-badge>
        </v-btn>
      </template>
      <v-list max-height="500" min-height="200">
        <v-layout class="px-4 pt-3 pb-4" align-center style="width: 390px">
          <div class="text-h5 grey--text text--darken-3">Thông báo</div>
          <v-spacer></v-spacer>
          <router-link
            class="pr-4"
            style="font-size: 14px"
            :to="'/thongbao'"
            v-if="thongBaos && thongBaos.length > 0"
            >Xem tất cả</router-link
          >
        </v-layout>

        <div v-if="thongBaos && thongBaos.length > 0">
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(item, i) in thongBaos"
              :key="i"
              two-line
              @click="xemThongBao(item)"
              :style="{ background: !item.seen ? '#E3F2FD' : 'white' }"
            >
              <v-list-item-avatar color="indigo" size="40">
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
              <v-list-item-content style="width: 190px" class="pr-2">
                <div style="font-size: 15px">
                  {{
                    item.noi_dung.length > 45
                      ? String(item.noi_dung).substr(0, 45) + "..."
                      : item.noi_dung
                  }}
                </div>
                <v-list-item-subtitle
                  v-text="item.thoi_gian_nhan_thong_bao"
                  class="text-truncate"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </div>
        <v-layout v-else column align-center justify-center>
          <v-btn icon color="pink">
            <v-icon style="font-size: 30px">mdi-bell</v-icon>
          </v-btn>
          <div class="pt-2" style="font-size: 16px">Bạn chưa có thông báo</div>
        </v-layout>
      </v-list>
    </v-menu>
    <v-menu min-width="180" offset-y bottom left nudge-bottom="10">
      <template v-slot:activator="{ on, attrs }">
        <v-avatar v-bind="attrs" v-on="on" color="orange" size="30">
          <img
            v-if="USER && USER.url_image"
            :src="imageEndpoint + USER.url_image"
            alt="John"
          />
          <span class="white--text headline" v-else-if="USER && USER.name">{{
            USER.name.charAt(0).toUpperCase()
          }}</span>
          <v-icon v-else dark>mdi-account</v-icon>
        </v-avatar>
      </template>
      <v-list>
        <div class="text-h5 grey--text text--darken-3 px-4 pt-4">
          {{ USER ? USER.name : "User" }}
        </div>
        <div class="subtitle-2 primary--text font-weight-regular px-4">
          {{ USER ? USER.email : "Email@email.com" }}
        </div>
        <v-list-item-group color="primary">
          <v-list-item @click="profile">
            <v-list-item-icon class="mr-4">
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Thông tin</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="logOut">
            <v-list-item-icon class="mr-4">
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Đăng xuất</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <!-- <div class="d-flex justify-center my-3">
          <v-btn width="80%" large outlined color="primary" @click="logOut">
            <v-icon left>mdi-logout</v-icon>ĐĂNG XUẤT
          </v-btn>
        </div> -->
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapActions, mapState } from "vuex";
import config from "../../config";
// import Search from "@/components/Search/Search";

import store from "../../store/index";
import { getThongBao, docThongBao } from "@/api/thongbao";
import Logo from "@/assets/Logo.png";

export default {
  name: "Header",
  // components: {Search},
  data: () => ({
    config,
    Logo,
    imageEndpoint: process.env.VUE_APP_BASE,
    searchCollapse: true,
    thongBaos: [],
    soThongBao: 0,
    notificationsBadge: true,
    messageBadge: true,
  }),
  computed: {
    ...mapState(["drawer"]),
    USER() {
      return this.$store.state.User.me;
    },
    loadingBar() {
      return this.$store.state.routerRole.loading;
    },
    DRAWER_STATE: {
      get() {
        return this.drawer;
      },
    },
  },
  created() {
    //  this.getDataThongBao();
  },
  methods: {
    ...mapActions(["TOGGLE_DRAWER"]),
    logOut: async () => {
      try {
        await store.dispatch("User/logout");
        location.assign("/login");
      } catch (error) {
        console.log(error);
      }
    },
    async getDataThongBao() {
      this.loading = true;
      let data = await getThongBao({
        perPage: 50,
      });
      this.thongBaos = data.data;
      this.soThongBao = 0;
      this.thongBaos.forEach((el) => {
        if (!el.seen) {
          this.soThongBao++;
        }
      });
      console.log(this.soThongBao);
    },
    async docThongBao(id) {
      await docThongBao({ thong_bao_id: id });
    },
    async xemThongBao(item) {
      if (!item.seen) {
        await this.docThongBao(item.id);
        await this.getDataThongBao();
      }
      if (item.message_id != this.$route.params.id) {
        this.$router.push("/truyenthong/hopthu/" + item.message_id);
      } else return;
    },
    profile() {
      if (this.$route.name !== "Thông tin") {
        this.$router.push("/users/profile");
      }
      return;
    },
  },
};
</script>

<style src="./Header.scss" lang="scss"></style>
