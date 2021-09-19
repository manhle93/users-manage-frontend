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
              :src="MailPic"
              class="mr-4"
            ></v-img>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                HỘP THƯ TRUYỀN THÔNG</v-list-item-title
              >
              <v-list-item-subtitle
                >Danh sách các thư đã gửi và nhận</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-layout>
        </v-list-item>
        <div style="width: 350px" class="pr-4">
          <v-menu
            ref="menu"
            v-model="showDate"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateRangeText"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                clearable
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title range>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="showDate = false">
                Hủy
              </v-btn>
              <v-btn text color="primary" @click="changeDate()"> OK </v-btn>
            </v-date-picker>
          </v-menu>
        </div>
      </v-layout>
    </v-card>
    <v-row class="mt-4">
      <v-col sm="6" lg="4" md="4" xs="6">
        <v-card max-width="100%" class="mx-auto">
          <v-toolbar color="teal darken-3" dark>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>Hộp thư</v-toolbar-title>
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
          </v-toolbar>

          <v-list three-line>
            <v-list-item-group v-model="selected" active-class="primary--text">
              <template v-for="(item, index) in tableData">
                <v-list-item :key="item.id" @click="showChiTiet(item)">
                  <v-list-item-avatar color="indigo">
                    <img
                      v-if="item.nguoi_gui && item.nguoi_gui.url_image"
                      :src="imageEndpoint + item.nguoi_gui.url_image"
                      alt="ManhLe"
                    />
                    <span
                      style="color: white"
                      v-else-if="item.nguoi_gui && item.nguoi_gui.name"
                      >{{ item.nguoi_gui.name.charAt(0).toUpperCase() }}</span
                    >
                    <v-icon v-else dark>mdi-account</v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>
                      <div style="font-size: 18px; font-weight: 400">
                        {{ item.chu_de }}
                      </div>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <div v-if="item.nhom">
                        Đến:
                        <span class="text--primary pl-1"
                          >{{ item.nhom }} <i> (Nhóm)</i>
                        </span>
                      </div>
                      <div
                        v-else-if="!item.nhom && item.nguoi_nhans.length < 4"
                      >
                        Đến:
                        <span
                          class="text--primary pl-1"
                          v-for="nguoiNhan in item.nguoi_nhans"
                          :key="nguoiNhan.id"
                        >
                          {{ nguoiNhan.name }},
                        </span>
                      </div>
                      <div v-else>
                        Đến:
                        <span class="text--primary pl-1"
                          >{{ item.nguoi_nhans[0].name }},
                        </span>
                        <span class="text--primary pl-1"
                          >{{ item.nguoi_nhans[1].name }},
                        </span>
                        <span class="text--primary pl-1"
                          ><i
                            >và {{ item.nguoi_nhans.length - 2 }} người khác</i
                          >
                        </span>
                      </div>
                    </v-list-item-subtitle>
                    <!-- <v-list-item-subtitle>
                      {{
                        item.noi_dung.length > 30
                          ? String(item.noi_dung).substr(0, 30) + "..."
                          : item.noi_dung
                      }}
                    </v-list-item-subtitle> -->
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-list-item-action-text
                      v-text="item.thoi_gian"
                    ></v-list-item-action-text>

                    <v-chip class="mt-2" color="red" text-color="white" small>
                      {{ item.so_binh_luan }}
                      Bình luận
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
        <chi-tiet :mailId="mailId"></chi-tiet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MailPic from "../../../assets/images/mail.svg";
import { getThuCaNhan } from "@/api/guithu";
import ChiTiet from "./chitiet";

export default {
  components: { ChiTiet },
  data: () => ({
    imageEndpoint: process.env.VUE_APP_BASE,
    searhBox: false,
    search: "",
    date: [],
    selected: null,
    MailPic,
    showDate: false,
    dateRangeText: "",
    page: 1,
    pageCount: 1,
    itemsPerPage: 5,
    tableData: [],
    loading: false,
    mailId: null,
  }),
  watch: {
    date(val) {
      if (val && val.length == 2) {
        if (new Date(this.date[0]) > new Date(this.date[1])) {
          let temp = this.date[0];
          this.date[0] = this.date[1];
          this.date[1] = temp;
        }
        let newDate = [...this.date];
        newDate[0] = this.formatDate(newDate[0]);
        newDate[1] = this.formatDate(newDate[1]);
        this.dateRangeText = newDate.join(" - ");
      }
    },
    dateRangeText(val) {
      if (val == null) {
        this.date = null;
        this.getData();
      }
    },
  },
  mounted() {
    this.getData();
    this.getChiTiet();
  },
  methods: {
    async getData() {
      this.loading = true;
      let data = await getThuCaNhan({
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
        this.mailId = Number(this.$route.params.id);
      } else return;
    },
    changeDate() {
      this.$refs.menu.save(this.date);
      this.getData();
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
      this.mailId = item.id;
    },
  },
};
</script>

<style>
</style>