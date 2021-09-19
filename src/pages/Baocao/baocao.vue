<template>
  <v-container>
    <v-card>
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
          <v-btn color="#33691E">
            <v-avatar size="30" class="mr-2">
              <img :src="excelPic" />
            </v-avatar>
            <span style="color: white" class="btn-add">Xuất Excel</span>
          </v-btn>
        </v-layout>
      </v-list-item>
    </v-card>
    <v-card class="mb-1 mt-3">
      <v-card-title class="pa-6 pb-4">
        <p class="black--text">Báo cáo</p>
        <v-spacer></v-spacer>
        <div style="width: 600px" class="mr-4">
          <v-row>
            <v-col cols="7">
              <v-text-field
                append-icon="mdi-magnify"
                v-model="search"
                label="Tìm kiếm"
                clearable
                single-line
                hide-details
              ></v-text-field
            ></v-col>
            <v-col cols="5">
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
                    placeholder="Chọn thời gian"
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
                  <v-btn text color="primary"> OK </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </div>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="tableData"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        :loading="loading"
        class="elevation-1"
        loading-text="Đang tải dữ liệu ..."
      >
        <template v-slot:[`item.name`]="{ item }">
          <v-avatar color="indigo" size="28">
            <img
              v-if="item.url_image"
              :src="imageEndpoint + item.url_image"
              alt="ManhLe"
            />
            <span style="color: white" v-else-if="item && item.name">{{
              item.name.charAt(0).toUpperCase()
            }}</span>
            <v-icon v-else dark>mdi-account</v-icon>
          </v-avatar>
          <span class="ml-3" style="font-size: 16px">{{ item.name }}</span>
        </template>
        <template v-slot:[`item.gioi_tinh`]="{ item }">
          {{ item.gioi_tinh ? "Nam" : "Nữ" }}
        </template>
        <template v-slot:[`item.active`]="{ item }">
          <v-chip v-if="!item.active" color="pink" dark small>
            Chưa kích hoạt
          </v-chip>
          <v-chip v-else color="success" dark small> Đang hoạt động </v-chip>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <router-link :to="'/nhansu/thongtinnhanvien/' + item.id">
            <v-btn color="primary" fab x-small dark>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </router-link>
        </template>
      </v-data-table>
    </v-card>
    <div class="pt-2">
      <v-pagination v-model="page" :length="pageCount" @input="changePage"
        >></v-pagination
      >
    </div>
  </v-container>
</template>

<script>
import BaoCaoPic from "../../assets/images/baocao.svg";
import excelPic from "../../assets/images/excel.png";

export default {
  data: () => ({
    BaoCaoPic,
    excelPic,
    showDate: false,
    dateRangeText: [],
    tableData: [
      {
        name: "Lê Văn Mạnh",
        ngay_sinh: "11/11/1995",
        gioi_tinh: "Nam",
        chuc_vu: "Nhân viên văn phòng",
        phong_ban: "Phòng IT",
        nhom_to: null,
        thoi_gian: "920 giờ",
        danh_gia: "A",
      },
      {
        name: "Trân Chí Bình",
        ngay_sinh: "11/11/1987",
        gioi_tinh: "Nam",
        chuc_vu: "Tổ trưởng",
        phong_ban: "Phòng sản xuất",
        nhom_to: "Tổ CN Từ Sơn",
        thoi_gian: "620 giờ",
        danh_gia: "C",
      },
      {
        name: "Vương Trùng Dương",
        ngay_sinh: "11/11/1895",
        gioi_tinh: "Nam",
        chuc_vu: "Công nhân",
        phong_ban: "Phòng Sản Xuất",
        nhom_to: "Tổ BN 2",
        thoi_gian: "780 giờ",
        danh_gia: "B",
      },
      {
        name: "Đinh Công Mạnh",
        ngay_sinh: "11/11/1997",
        gioi_tinh: "Nam",
        chuc_vu: "Phó Phòng",
        phong_ban: "Phòng Sản Xuất",
        nhom_to: null,
        thoi_gian: "980 giờ",
        danh_gia: "A",
      },
    ],
    page: 1,
    pageCount: 1,
    itemsPerPage: 10,
    headers: [
      { text: "Họ tên", value: "name", sortable: false },
      {
        text: "Ngày sinh",
        align: "start",
        sortable: false,
        value: "ngay_sinh",
      },
      {
        text: "Giới tính",
        align: "start",
        sortable: false,
        value: "gioi_tinh",
      },
      {
        text: "Chức vụ",
        align: "start",
        sortable: false,
        value: "chuc_vu",
      },
      {
        text: "Phòng ban",
        align: "start",
        sortable: false,
        value: "phong_ban",
      },
      {
        text: "Nhóm tổ",
        align: "start",
        sortable: false,
        value: "nhom_to",
      },
      {
        text: "Thời gian làm việc",
        align: "start",
        value: "thoi_gian",
      },
      {
        text: "Đánh giá",
        align: "center",
        sortable: false,
        value: "danh_gia",
      },
    ],
  }),
  methods: {
    getData() {},
    changePage(val) {
      this.page = val;
      this.getData();
    },
  },
};
</script>

<style>
</style>