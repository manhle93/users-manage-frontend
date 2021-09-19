<template>
  <v-container fluid>
    <v-row>
      <v-col offset="1" :cols="6" class="pl-8">
        <div class="title black--text mb-8">Thông tin về sổ BHXH nhân viên</div>
        <v-layout class="tieu-de pb-4" align-center
          >Số sổ: <b class="pl-3">017878151515</b>
          <v-spacer></v-spacer>
          <v-btn icon color="green darken-4">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-layout>
        <v-layout class="tieu-de pb-4" align-center
          >Ngày cấp: 01/12/2018
          <v-spacer></v-spacer>
          <v-btn icon color="green darken-4">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-layout>
        <v-layout class="tieu-de pb-4" align-center
          >Số cấp lần 2
          <v-spacer></v-spacer>
          <v-btn icon color="green darken-4">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-layout>
        <v-layout class="tieu-de pb-4" align-center
          >Ngày nhận sổ BHXH: <b>01/03/2021</b>
          <v-spacer></v-spacer>
          <v-btn icon color="green darken-4">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-layout>
        <v-layout class="tieu-de pt-6 pb-8" align-center>
          <b>Ghi chú:</b>
          <i class="pl-3"
            >Sổ lần một bị mất không rõ lý do, đã xin cấp sổ mới</i
          >
          <v-spacer></v-spacer>
          <v-btn icon color="green darken-4">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-layout>
        <div class="pt-8">
          <v-btn tile color="success">
            <v-icon left> mdi-pencil </v-icon>
            Cập nhật
          </v-btn>
        </div>
      </v-col>
      <v-col :cols="4" style="text-align: center">
        <img
          height="400"
          src="https://baohiemxahoidientu.vn/main/download/getckfinderimage?path=/images/IMG_3647.jpg"
        />
        <br />
        <v-btn color="teal" dark class="mt-2">
          Upload
          <v-icon right dark> mdi-cloud-upload </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
.tieu-de {
  font-size: 18px;
  color: black;
}
</style>