<template>
  <v-container fluid>
    <v-layout class="pb-6">
      <div style="font-size: 22px; color: black">Danh sách hồ sơ nhân viên</div>
      <v-spacer></v-spacer>
      <v-btn color="teal" @click="showCreate">
        <v-icon color="white">mdi-plus</v-icon>
        <span style="color: white" class="btn-add">Thêm Hồ Sơ</span>
      </v-btn>
    </v-layout>
    <v-row dense>
      <v-col v-for="card in cards" :key="card.title" cols="3" class="mr-8 mb-8">
        <v-card elevation="8">
          <v-img
            :src="card.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="250px"
          >
            <v-card-title v-text="card.title"></v-card-title>
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-download</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
     <create-edit ref="hoso" @on-done="getData"></create-edit>
  </v-container>
</template>

<script>
import CreateEdit from "./create-edit";

export default {
  components: { CreateEdit },
  data: () => ({
    cards: [
      {
        title: "CV xin việc",
        src:
          "https://cdn.dribbble.com/users/2833180/screenshots/12265045/media/f18a5838101f1165b20ad556828fe351.png?compress=1&resize=400x300",
        flex: 12,
      },
      {
        title: "Sơ yếu lý lịch",
        src: "https://timviec365.vn/cv365/upload/images/cv-tim-viec-lam-49.jpg",
        flex: 6,
      },
      {
        title: "Giấy khám sức khỏe",
        src:
          "https://image.freepik.com/free-psd/top-view-medical-check-up-with-mock-up_23-2148610036.jpg",
        flex: 6,
      },
      {
        title: "Bằng cấp",
        src:
          "https://img.freepik.com/free-vector/elegant-blue-gold-diploma-certificate-template_1017-17257.jpg?size=626&ext=jpg",
        flex: 6,
      },
    ],
  }),
  methods: {
    getData(){},
    showCreate() {
       this.$refs.hoso.showFormAdd();
    },
  },
};
</script>

<style>
</style>