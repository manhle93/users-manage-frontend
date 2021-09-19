<template>
  <v-container>
    <v-card>
      <v-toolbar color="#00695C" dark flat>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>{{ nameHeader }}</v-toolbar-title>
        <template v-slot:extension>
          <v-tabs v-model="tab" align-with-title>
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab>THÔNG TIN</v-tab>
            <v-tab>CHẤM CÔNG</v-tab>
            <v-tab>BHXH</v-tab>
            <v-tab>NGÀY NGHỈ</v-tab>
            <v-tab>HỢP ĐỒNG</v-tab>
            <v-tab>CÔNG TÁC</v-tab>
            <v-tab>HỒ SƠ</v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
            <v-card-text><Edit @set-name="nameHeader = $event" /></v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text><cham-cong></cham-cong></v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text><bao-hiem></bao-hiem></v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text><ngay-nghi></ngay-nghi></v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text><hop-dong></hop-dong></v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text><cong-tac></cong-tac></v-card-text>
          </v-card>
        </v-tab-item>
                <v-tab-item>
          <v-card flat>
            <v-card-text><ho-so></ho-so></v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import Edit from "../create";
import ChamCong from "./components/chamcong";
import BaoHiem from "./components/baohiem/baohiem";
import NgayNghi from "./components/ngaynghi/ngaynghi";
import HopDong from "./components/hopdong/hopdong";
import CongTac from "./components/congtac/congtac";
import HoSo from "./components/hoso/hoso";

export default {
  components: { Edit, ChamCong, BaoHiem, NgayNghi, HopDong, CongTac,HoSo },
  data: () => ({
    tab: null,
    nameHeader: "Người dùng",
  }),

  methods: {},
};
</script>

<style>
.custom-vtap .v-tab {
  justify-content: start;
}
</style>