<template>
  <v-container fluid>
    <v-card class="mb-3">
      <v-list-item three-line>
        <v-layout align-center>
          <v-img
            max-height="150"
            max-width="150"
            :src="BaoCaoPic"
            class="mr-4"
          ></v-img>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1 black--text">
              BÁO CÁO HỆ THỐNG</v-list-item-title
            >
            <v-list-item-subtitle
              >Báo cáo tổng hợp theo thời gian</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-layout>
      </v-list-item>
    </v-card>
    <br>
    <v-row>
      <v-col cols="3" v-for="(item, index) in baocaos" :key="index">
        <v-card
          class="mx-auto"
          :color="item.color"
          dark
          max-width="400"
          height="250"
          @click="xemBaoCao(item.id)"
        >
          <v-layout column>
            <v-card-title>
              <v-icon large left> mdi-book </v-icon>
              <span class="title font-weight-light"
                >Báo cáo {{ "0" + (index + 1) }}</span
              >
            </v-card-title>

            <v-layout
              column
              style="flex: 1"
              align-center
              justify-center
              class="pt-7"
            >
              <v-icon size="60">{{ item.icon }}</v-icon>
              <div class="pt-2" style="font-size: 18px; font-weight: bold">
                {{ item.name }}
              </div>
            </v-layout>
          </v-layout>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BaoCaoPic from "../../assets/images/baocao.svg";

export default {
  data: () => ({
    BaoCaoPic,
    baocaos: [
      {
        name: "Báo cáo chấm công",
        color: "#00897B",
        icon: "mdi-account-check",
        id: 1,
      },
      {
        name: "Báo Cáo hồ sơ nhân sự",
        icon: "mdi-file-document",
        color: "#26c6da",
        id: 1,
      },
      {
        name: "Báo Cáo đánh giá nhân sự",
        color: "#43A047",
        icon: "mdi-account-multiple",
        id: 1,
      },
      {
        name: "Báo Cáo Nghỉ phép",
        color: "#01579B",
        id: 1,
        icon: "mdi-calendar-range",
      },
      {
        name: "Báo Cáo thai sản",
        color: "#F57F17",
        id: 1,
        icon: "mdi-gender-male-female",
      },
      {
        name: "Báo Cáo Tổng Hợp Nhân Sự",
        color: "#4A148C",
        icon: "mdi-account-multiple",
        id: 1,
      },
      {
        name: "Báo Cáo Bảo Hiểm Xã Hội",
        color: "#C2185B",
        icon: "mdi-heart-pulse",
        id: 1,
      },
    ],
  }),
  methods: {
    xemBaoCao(id) {
      this.$router.push("/baocao/" + id);
    },
  },
};
</script>

<style>
</style>