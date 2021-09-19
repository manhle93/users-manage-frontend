<template>
  <v-container>
    <v-card max-width="100%" class="mx-auto" v-if="mailId">
      <v-toolbar color="teal darken-3" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Chi tiết thông báo</v-toolbar-title>
      </v-toolbar>
      <div class="d-flex pt-4">
        <span class="title pl-6" style="flex: 1">{{ dataMail.chu_de }}</span>
      </div>
      <v-divider class="mt-2"></v-divider>
      <div>
        <v-list subheader two-line>
          <v-list-item>
            <v-list-item-avatar color="indigo">
              <img
                v-if="dataMail.nguoi_gui.url_image"
                :src="imageEndpoint + dataMail.nguoi_gui.url_image"
                alt="ManhLe"
              />
              <span
                style="color: white"
                v-else-if="dataMail.nguoi_gui && dataMail.nguoi_gui.name"
                >{{ dataMail.nguoi_gui.name.charAt(0).toUpperCase() }}</span
              >
              <v-icon v-else dark>mdi-account</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{
                dataMail.nguoi_gui.name
              }}</v-list-item-title>

              <v-list-item-subtitle>
                <div v-if="dataMail.nguoi_nhans.length < 4">
                  Đến:
                  <span
                    class="text--primary pl-1"
                    v-for="nguoiNhan in dataMail.nguoi_nhans"
                    :key="nguoiNhan.id"
                  >
                    {{ nguoiNhan.name }},
                  </span>
                </div>
                <div v-else>
                  Đến:
                  <span class="text--primary pl-1"
                    >{{ dataMail.nguoi_nhans[0].name }}
                  </span>
                  <span class="text--primary pl-1"
                    >{{ dataMail.nguoi_nhans[1].name }}
                  </span>
                  <span class="text--primary pl-1"
                    >{{ dataMail.nguoi_nhans[2].name }}
                  </span>
                  <span class="text--primary pl-1"
                    >Và {{ dataMail.nguoi_nhans.length - 3 }} người khác
                  </span>
                </div>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-action-text
                v-text="dataMail.thoi_gian"
              ></v-list-item-action-text>

              <v-chip class="mt-2" color="red" text-color="white" small>
                {{ dataMail.so_binh_luan }}
                Bình luận
              </v-chip>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </div>
      <div class="comment pl-6">
        {{ dataMail.noi_dung }}
      </div>
      <div class="mt-6">
        <div class="d-flex align-center pl-6">
          <v-icon medium color="green darken-2"> mdi-file </v-icon>
          <span class="pl-2" style="font-size: 17px">Tệp đính kèm</span>
        </div>
        <div class="mt-4 d-flex pl-8">
          <v-card
            width="180"
            height="150"
            class="mr-4"
            v-for="(item, index) in dataMail.tap_tins"
            :key="item.id"
            style="background-color: #a5d6a7"
            @click="dowloadFile(item)"
          >
            <v-card-text>
              <v-icon color="indigo darken-4">mdi-pin</v-icon>
              Tập tin {{ +index + 1 }}
            </v-card-text>
            <v-layout align-center justify-center>
              <v-icon large color="indigo darken-4">mdi-download</v-icon>
            </v-layout>
            <v-card-text
              >...{{ item.name.substr(-8) }} -
              {{ Math.round(item.size / 1024) }} Kb</v-card-text
            >
          </v-card>
        </div>
      </div>
      <div class="mt-6">
        <v-list-item class="mt-2 ml-2">
          <v-list-item-content
            style="background-color: #eceff1; border-radius: 10px"
            class="pl-2 pr-2"
          >
            <div
              style="font-size: 14px; color: #01579b; font-weight: bold"
              class="pb-2"
            >
              <v-list-item-avatar color="indigo">
                <img
                  v-if="USER.url_image"
                  :src="imageEndpoint + USER.url_image"
                  alt="ManhLe"
                />
                <span style="color: white" v-else-if="USER && USER.name">{{
                  USER.name.charAt(0).toUpperCase()
                }}</span>
                <v-icon v-else dark>mdi-account</v-icon>
              </v-list-item-avatar>
              {{ USER.name }}
            </div>
            <v-textarea
              color="black"
              rows="1"
              :placeholder="USER.name + ' ơi! Hãy gửi bình luận cho mọi người.'"
              v-model="comment"
            ></v-textarea>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              elevation="10"
              rounded
              color="#1A237E"
              dark
              @click="traLoiComment"
            >
              Bình Luận<v-icon right> mdi-send </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-layout
          class="d-flex justify-center align-center"
          v-if="loadingComment"
        >
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-layout>

        <v-list disabled v-else>
          <v-subheader>BÌNH LUẬN</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item v-for="(item, i) in binhLuans" :key="i" class="mt-2">
              <v-list-item-avatar color="indigo">
                <img
                  v-if="item.user.url_image"
                  :src="imageEndpoint + item.user.url_image"
                  alt="ManhLe"
                />
                <span
                  style="color: white"
                  v-else-if="item.user && item.user.name"
                  >{{ item.user.name.charAt(0).toUpperCase() }}</span
                >
                <v-icon v-else dark>mdi-account</v-icon>
              </v-list-item-avatar>
              <v-list-item-content
                style="background-color: #eceff1; border-radius: 10px"
                class="pl-2 pr-2"
              >
                <div
                  style="font-size: 14px; color: #01579b; font-weight: bold"
                  class="pb-2"
                >
                  {{ item.user.name }}
                </div>
                <v-list-item-title v-text="item.noi_dung"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                {{ item.thoi_gian }}
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <div class="pt-2 pb-3">
          <v-pagination v-model="page" :length="pageCount" @input="changePage"
            >></v-pagination
          >
        </div>
      </div>
    </v-card>
    <v-card v-else class="mx-auto">
      <v-toolbar color="teal darken-3" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Chi tiết thông báo</v-toolbar-title>
      </v-toolbar>
      <v-layout column align-center justify-center style="height: 450px">
        <v-btn icon color="pink">
          <v-icon style="font-size: 80px">mdi-bell</v-icon>
        </v-btn>
        <div class="pt-6" style="font-size: 24px">Chọn thông báo để xem</div>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import { getSingleMail, getBinhLuan, guiBinhLuan } from "@/api/guithu";

export default {
  props: {
    mailId: {
      type: Number,
    },
  },
  data: () => ({
    endpoint: process.env.VUE_APP_BASE,
    comment: "",
    imageEndpoint: process.env.VUE_APP_BASE,
    page: 1,
    pageCount: 1,
    itemsPerPage: 5,
    loadingComment: false,
    binhLuans: [],
    dataMail: {
      nguoi_nhans: [],
      nguoi_gui: {},
    },
  }),
  watch: {
    async mailId(val) {
      if (val) {
        await this.getData(val);
        await this.getListBinhLuan(val);
        this.page = 1
      }
    },
  },

  computed: {
    USER() {
      return this.$store.state.User.me;
    },
  },
  methods: {
    async getData(mailId) {
      let data = await getSingleMail({ message_id: mailId });
      this.dataMail = data;
    },
    async getListBinhLuan(mailId) {
      this.loadingComment = true;
      let data = await getBinhLuan({
        page: this.page,
        perPage: this.itemsPerPage,
        message_id: mailId,
      });
      this.loadingComment = false;
      this.binhLuans = data.data;
      this.pageCount = data.last_page;
    },
    changePage(val) {
      this.page = val;
      this.getListBinhLuan(this.mailId);
    },
    async traLoiComment() {
      if (!this.comment) {
        this.$toast.info("Vui lòng nhập nội dung bình luận!", {
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
        return;
      }
      await guiBinhLuan({ message_id: this.mailId, noi_dung: this.comment });
      this.comment = "";
      this.getListBinhLuan(this.mailId);
    },
    backToInBox() {
      this.$emit("back-to-inbox");
      this.dataMail = {
        nguoi_nhans: [],
        nguoi_gui: {},
      };
      this.binhLuans = [];
    },
    dowloadFile(item) {
      window.open(this.endpoint + item.link, "_blank");

      // location.assign(this.endpoint + item.link);
    },
  },
};
</script>

<style>
.comment {
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
}
</style>