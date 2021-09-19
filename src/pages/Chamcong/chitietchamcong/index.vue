<template>
  <v-container>
    <v-card class="mx-auto mb-4">
      <v-layout>
        <v-list three-line>
          <template>
            <v-list-item>
              <v-img :src="Selfie" max-height="100" max-width="100" />
              <v-list-item-content class="pl-3">
                <v-list-item-title
                  ><h5>
                    Chi tiết chấm công - nhân viên: {{ checkingData.name }}
                  </h5></v-list-item-title
                >
                <v-list-item-subtitle
                  ><b>Nơi làm việc:</b> {{ checkingData.dia_diem }}
                  <b> - Địa chỉ: </b> {{ checkingData.dia_chi }}
                </v-list-item-subtitle>
                <v-list-item-subtitle
                  >Chức vụ: {{ checkingData.chuc_vu }} - Phòng ban:
                  <b>{{ checkingData.phong_ban }}</b></v-list-item-subtitle
                >
                <v-list-item-subtitle
                  >Ca làm việc: {{ checkingData.ca }} - Thời gian:
                  <b>
                    {{ checkingData.bat_dau_ca }} -
                    {{ checkingData.ket_thuc_ca }}</b
                  ></v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
        <v-spacer></v-spacer>
        <v-select
          class="pt-4 pr-6"
          style="max-width: 300px"
          v-model="hop_le"
          :items="trangThais"
          outlined
          @change="updateTrangThai"
          dense
          item-text="name"
          item-value="value"
          :prepend-inner-icon="
            hop_le ? 'mdi-checkbox-marked-circle-outline' : 'mdi-alert'
          "
        >
        </v-select>
      </v-layout>
    </v-card>
    <v-row>
      <v-col sm="12" lg="6" md="6" xs="12">
        <v-card class="mx-auto">
          <v-toolbar color="#1565C0" dark>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>CHECK IN</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-container fluid>
            <v-row dense>
              <v-col>
                <v-card>
                  <div class="box-image">
                    <v-img
                      :src="
                        checkingData.url_image_check_in
                          ? imageEndpoint + checkingData.url_image_check_in
                          : checkingImage
                      "
                      class="white--text align-end checking-image"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      max-width="400px"
                      max-height="530px"
                    >
                      <v-card-title>{{
                        formatDate(checkingData.time_check_in)
                      }}</v-card-title>
                    </v-img>
                  </div>
                </v-card>
                <v-layout>
                  <div style="width: 45%" class="pt-3">
                    <div
                      style="font-size: 22px; font-weight: bold"
                      class="pt-4 pl-5"
                    >
                      Sai số chấm công
                    </div>
                    <v-list three-line>
                      <template v-for="(item, index) in loiCheckIn">
                        <v-list-item :key="item.title">
                          <v-list-item-avatar color="indigo" size="36">
                            <span class="white--text headline">{{
                              index + 1
                            }}</span>
                          </v-list-item-avatar>

                          <v-list-item-content>
                            <v-list-item-title
                              v-html="item.noi_dung"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                              >Sai lệch:
                              <b
                                >{{ item.sai_lech }}
                                {{ item.code == "FAR" ? "mét" : "phút" }}</b
                              >
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-list>
                  </div>
                  <div style="width: 55%" class="pt-3 pl-3">
                    <tracking-map ref="mapcheckin"></tracking-map>
                  </div>
                </v-layout>
              </v-col>
            </v-row>
          </v-container> </v-card
      ></v-col>
      <v-col sm="12" lg="6" md="6" xs="12">
        <v-card class="mx-auto">
          <v-toolbar color="#1565C0" dark>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>CHECK OUT</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-container fluid>
            <v-row dense>
              <v-col>
                <v-card>
                  <div class="box-image">
                    <v-img
                      style="border: 3px solid white"
                      :src="
                        checkingData.url_image_check_out
                          ? imageEndpoint + checkingData.url_image_check_out
                          : checkingImage
                      "
                      class="white--text align-end checking-image"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      max-width="400px"
                       max-height="530px"
                    >
                      <v-card-title>{{
                        formatDate(checkingData.time_check_out)
                      }}</v-card-title>
                    </v-img>
                  </div>
                </v-card>
                <v-layout>
                  <div style="width: 45%" class="pt-3">
                    <div
                      style="font-size: 22px; font-weight: bold"
                      class="pt-4 pl-5"
                    >
                      Sai số chấm công
                    </div>
                    <v-list three-line>
                      <template v-for="(item, index) in loiCheckOut">
                        <v-list-item :key="item.title">
                          <v-list-item-avatar color="indigo" size="36">
                            <span class="white--text headline">{{
                              index + 1
                            }}</span>
                          </v-list-item-avatar>

                          <v-list-item-content>
                            <v-list-item-title
                              v-html="item.noi_dung"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                              >Sai lệch:
                              <b
                                >{{ item.sai_lech }}
                                {{ item.code == "FAR" ? "mét" : "phút" }}</b
                              >
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-list>
                  </div>
                  <div style="width: 55%" class="pt-3 pl-3">
                    <!-- <checkout-map
                      ref="mapcheckout"
                    ></checkout-map> -->
                    <checkout-map ref="mapcheckout"></checkout-map>
                  </div>
                </v-layout>
              </v-col>
            </v-row>
          </v-container> </v-card
      ></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getChiTiet, capNhatTinhHopLe } from "@/api/chamcong";
import TrackingMap from "./mapcheckin";
import CheckoutMap from "./mapcheckout";
import checkingImage from "../../../assets/images/checking.svg";
import Selfie from "../../../assets/images/selfie.png";

export default {
  components: {
    TrackingMap,
    CheckoutMap,
  },
  data: () => ({
    Selfie,
    hop_le: true,
    trangThais: [
      { name: "Hợp lệ", value: true },
      { name: "Không hợp lệ", value: false },
    ],
    checkingImage,
    checkingData: {},
    loiCheckIn: [],
    loiCheckOut: [],
    imageEndpoint: process.env.VUE_APP_BASE,
  }),
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      let data = await getChiTiet({ cham_cong_id: this.$route.params.id });
      this.checkingData = data.data;
      this.hop_le = this.checkingData.hop_le
      this.loiCheckIn = [];
      this.loiCheckOut = [];
      if (this.checkingData.loi && this.checkingData.loi.length > 0) {
        this.loiCheckIn = this.checkingData.loi.filter(
          (el) => el.type == "CHECKIN"
        );
        this.loiCheckOut = this.checkingData.loi.filter(
          (el) => el.type == "CHECKOUT"
        );
      }
      this.showMap();
    },
    showMap() {
      if (this.checkingData.lat_check_in && this.checkingData.long_check_in) {
        this.$refs.mapcheckin.setMarker(
          {
            lat: this.checkingData.vi_tri_lam_viec_lat,
            long: this.checkingData.vi_tri_lam_viec_long,
          },
          {
            lat: this.checkingData.lat_check_in,
            long: this.checkingData.long_check_in,
          }
        );
      }
      if (this.checkingData.lat_check_out && this.checkingData.long_check_out) {
        this.$refs.mapcheckout.setMarker(
          {
            lat: this.checkingData.vi_tri_lam_viec_lat,
            long: this.checkingData.vi_tri_lam_viec_long,
          },
          {
            lat: this.checkingData.lat_check_out,
            long: this.checkingData.long_check_out,
          }
        );
      }
    },
    async updateTrangThai() {
      try {
        await capNhatTinhHopLe({
          checking_id: this.$route.params.id,
          trang_thai: this.hop_le,
        });
        this.$toast.info("Cập nhật thành công", {
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
      } catch (error) {
        console.log(error)
      }
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

<style scoped>
.box-image {
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  background-image: url("https://wallpaperaccess.com/full/1558939.jpg");
  height: 580px;
  background-size: cover;
  background-position: center;
}
.checking-image {
  border: 4px solid white;
  border-radius: 8px;
}
</style>>

