<template>
  <v-container fluid>
    <v-card class="mx-auto mb-3">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1"
            ><v-icon size="40">mdi-calendar-clock</v-icon> LỊCH TRỰC</v-list-item-title
          >
          <v-list-item-subtitle
            >Danh sách lịch trực của nhân
            viên</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-row>
      <v-col sm="12" lg="8" md="8" xs="12"><lich-truc></lich-truc></v-col>
      <v-col sm="12" lg="4" md="4" xs="12"><loai-truc></loai-truc></v-col>
    </v-row>
  </v-container>
</template>

<script>
import LichTruc from "./components/lichtruc/lichtruc";
import LoaiTruc from "./components/loaitruc/loaitruc";
import Logo from "../../../assets/images/logoGreenStar.png";
export default {
  components: { LichTruc, LoaiTruc },
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