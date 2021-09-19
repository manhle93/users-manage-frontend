<template>
  <v-container fluid>
    <v-card class="mx-auto mb-4">
      <v-list three-line>
        <template>
          <v-subheader>{{ company.name }}</v-subheader>

          <v-list-item :key="company.title">
            <img :src="company.avatar" />

            <v-list-item-content class="pl-3">
              <v-list-item-title
                ><h5>{{ company.name }}</h5></v-list-item-title
              >
              <v-list-item-subtitle
                >Địa chỉ: {{ company.address }}</v-list-item-subtitle
              >
              <v-list-item-subtitle
                >SĐT: {{ company.phone }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
    <v-row >
      <v-col sm="12" lg="6" md="6" xs="12"><dia-diem></dia-diem></v-col>
      <v-col sm="12" lg="6" md="6" xs="12"><Ca /></v-col>
    </v-row>
  </v-container>
</template>

<script>
import DiaDiem from "./components/diadiem/diadiem";
import Ca from "./components/calamviec/ca"
import Logo from '../../../assets/images/logoGreenStar.png'
export default {
  components: { DiaDiem, Ca },
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