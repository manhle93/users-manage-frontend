<template>
  <v-container fluid>
    <v-card class="mx-auto mb-3">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1"
            ><v-icon size="40">mdi-wrench</v-icon> CẤU HÌNH THAM SỐ HỆ THỐNG</v-list-item-title
          >
          <v-list-item-subtitle
            >Cài đặt hệ số tính công, cấu hình chấm công</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-row>
      <v-col sm="12" lg="6" md="6" xs="12"><cham-cong></cham-cong></v-col>
      <v-col sm="12" lg="6" md="6" xs="12"><he-so></he-so></v-col>
    </v-row>
  </v-container>
</template>

<script>
import ChamCong from "./components/chamcong";
import HeSo from "./components/heso";
import Logo from "../../assets/images/logoGreenStar.png";
export default {
  components: { ChamCong, HeSo },
  data: () => ({
    company: {
      name: "Công Ty Thương Mại Dịch Vụ & Môi Trường Ngôi Sao Xanh",
      avatar: Logo,
      address: "Xã Khắc Niệm, Khắc Niệm, Bắc Ninh",
      phone: "0222 3717 103",
    },
  }),
};
</script>

<style>
</style>