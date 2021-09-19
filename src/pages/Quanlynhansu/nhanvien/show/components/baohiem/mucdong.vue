<template>
  <v-container fluid>
    <v-layout align-center>
      <div style="font-size: 20px; color: black" class="mb-4">
        Mức đóng BHXH các tháng
      </div>
      <v-spacer></v-spacer>
      <v-btn color="teal" dark @click="showFormAdd">
        <v-icon left> mdi-plus </v-icon> Thêm mức đóng
      </v-btn>
    </v-layout>
    <br />
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
                <v-icon class="mr-2" @click="showFormEdit"> mdi-pencil </v-icon>
                Chi tiết</v-list-item-title
              >
            </v-list-item>
            <v-list-item @click="xoaLichNghi(item)">
              <v-list-item-title>
                <v-icon class="mr-2"> mdi-delete </v-icon>
                Xóa mức đóng</v-list-item-title
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
    <v-dialog v-model="showForm" persistent width="500">
      <v-card>
        <v-card-title class="headline">{{
          edit ? "CẬP NHẬT MỨC ĐÓNG" : "THÊM MỨC ĐÓNG"
        }}</v-card-title>
        <br />
        <v-card-text>
          <v-form ref="form">
            <div class="label-form">Thời gian bắt đầu áp dụng</div>
            <v-text-field
              placeholder="Ngày bắt đầu áp dụng"
              outlined
              type="date"
              dense
              prepend-inner-icon="mdi-calendar"
            ></v-text-field>
            <div class="label-form">Thời gian hết hạn</div>
            <v-text-field
              placeholder="Nhập mật khẩu mới"
              type="date"
              outlined
              dense
              prepend-inner-icon="mdi-calendar"
            ></v-text-field>
            <div class="label-form">Mức đóng / Tháng</div>
            <v-text-field
              placeholder="VNĐ / Tháng"
              outlined
              type="number"
              dense
              prepend-inner-icon="mdi-cash-usd"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="showForm = false" class="mr-4">Đóng</v-btn>
          <v-btn :loading="btnLoading" color="primary">
            <v-icon left>mdi-pencil</v-icon>
            Cập nhật
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    edit: false,
    page: 1,
    pageCount: 1,
    itemsPerPage: 10,
    loading: false,
    showForm: false,
    tableData: [
      {
        bat_dau: "01/01/2021",
        ket_thuc: "05/05/2021",
        muc_dong: "4.800.000 VnĐ",
        trang_thai: "",
      },
      {
        loai: "Hợp đồng chính thức",
        bat_dau: "05/05/2021",
        ket_thuc: "12/12/2021",
        muc_dong: "5.500.000 VnĐ",
        trang_thai: "",
      },
      {
        loai: "Hợp đồng không thời hạn",
        bat_dau: "12/12/2021",
        ket_thuc: null,
        muc_dong: "7.000.000 VnĐ",
        trang_thai: "",
      },
    ],
    headers: [
      {
        text: "Ngày bắt đầu áp dụng",
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
        text: "Mức đóng",
        align: "start",
        sortable: false,
        value: "muc_dong",
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
    showFormAdd() {
      this.showForm = true;
    },
    showFormEdit() {
      this.showForm = true;
    },
  },
};
</script>

<style>
</style>