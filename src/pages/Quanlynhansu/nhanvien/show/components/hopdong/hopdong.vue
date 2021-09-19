<template>
  <v-container>
    <v-layout>
      <v-img
        max-height="100"
        max-width="100"
        :size="40"
        :src="HopDongPic"
        class="mr-4"
      ></v-img>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          HỢP ĐỒNG NHÂN SỰ</v-list-item-title
        >
        <v-list-item-subtitle>Danh sách hợp đồng nhân sự</v-list-item-subtitle>
      </v-list-item-content>
      <v-btn color="teal">
        <v-icon color="white">mdi-plus</v-icon>
        <span style="color: white" class="btn-add">Thêm hợp đồng</span>
      </v-btn>
    </v-layout>
    <div class="pt-6 pb-3" style="font-size: 20px; color: black">
      Danh sách hợp đồng
    </div>
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
      <template v-slot:[`item.bat_dau`]="{ item }">
        {{ formatDate(item.bat_dau) }}
      </template>
      <template v-slot:[`item.ket_thuc`]="{ item }">
        {{ formatDate(item.ket_thuc) }}
      </template>
      <template v-slot:[`item.ky_duyet`]="{ item }">
        <v-chip v-if="item.ky_duyet" color="success" dark small>Đã ký</v-chip>
        <v-chip v-else color="red" small dark>Chưa ký</v-chip>
      </template>
      <template v-slot:[`item.trang_thai`]="{ item }">
        <v-chip
          v-if="new Date(item.bat_dau) > Date.now()"
          color="primary"
          dark
          small
        >
          Chưa bắt đầu
        </v-chip>
        <v-chip
          v-if="
            new Date(item.bat_dau) <= Date.now() &&
            new Date(item.ket_thuc) >= Date.now()
          "
          color="success"
          dark
          small
        >
          Đang áp dụng
        </v-chip>
        <v-chip
          v-if="new Date(item.ket_thuc) <= Date.now() && item.ket_thuc"
          color="orange"
          dark
          small
        >
          Hết hạn
        </v-chip>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon color="textColor">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="edit(item)">
              <v-list-item-title>
                <v-icon class="mr-2"> mdi-pencil </v-icon>
                Chi tiết</v-list-item-title
              >
            </v-list-item>
            <v-list-item @click="xoaLichNghi(item)">
              <v-list-item-title>
                <v-icon class="mr-2"> mdi-delete </v-icon>
                Xóa hợp đồng</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    <div class="pt-2">
      <v-pagination v-model="page" :length="pageCount" @input="changePage"
        >></v-pagination
      >
    </div>
  </v-container>
</template>

<script>
import HopDongPic from "../../../../../../assets/images/hopdong.svg";
export default {
  data: () => ({
    HopDongPic,
    page: 1,
    pageCount: 1,
    itemsPerPage: 10,
    loading: false,
    tableData: [
      {
        loai: "Hợp đồng thử việc",
        bat_dau: "01/01/2021",
        ket_thuc: "05/01/2021",
        ky_duyet: true,
        trang_thai: "",
      },
      {
        loai: "Hợp đồng chính thức",
        bat_dau: "05/01/2021",
        ket_thuc: "12/12/2021",
        ky_duyet: false,
        trang_thai: "",
      },
      {
        loai: "Hợp đồng không thời hạn",
        bat_dau: "12/12/2021",
        ket_thuc: null,
        ky_duyet: false,
        trang_thai: "",
      },
    ],
    headers: [
      {
        text: "Loại hợp đồng",
        align: "start",
        sortable: false,
        value: "loai",
      },
      {
        text: "Ngay bắt đầu",
        align: "start",
        sortable: false,
        value: "bat_dau",
      },
      {
        text: "Ngày kết thúc",
        align: "start",
        sortable: false,
        value: "ket_thuc",
      },
      {
        text: "Ký duyệt",
        align: "start",
        sortable: false,
        value: "ky_duyet",
      },
      {
        text: "Trạng thái",
        align: "start",
        sortable: false,
        value: "trang_thai",
      },
      {
        text: "Hành động",
        value: "action",
        sortable: false,
        align: "center",
        width: "150",
      },
    ],
  }),
  methods: {
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
    getData() {},
  },
};
</script>

<style>
</style>