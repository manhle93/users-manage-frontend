<template>
  <v-dialog v-model="show" persistent width="1000">
    <v-card>
      <v-card-title class="headline">PHIẾU BÁO LÀM THÊM GIỜ</v-card-title>
      <br />
      <v-card-text>
        <div class="text-title pb-2">
          Địa Điểm - Khu Vực:
          <b>{{ form.dia_diem.name }} - {{ form.dia_diem.dia_chi }}</b>
        </div>
        <div class="text-title pb-2">
          Tổ trưởng: <b>{{ form.to_truong.name }}</b> - SĐT:
          {{ form.so_dien_thoai_to_truong }} - Tổ: {{ form.nhom_to }}
        </div>
        <div class="text-title pb-2">
          Thời gian:
          <b>
            {{ formatDateTime(form.bat_dau) }} -
            {{ formatDateTime(form.ket_thuc) }}</b
          >
        </div>
        <div class="text-title pb-2">Số giờ tăng ca: <b>3 giờ</b></div>

        <div class="text-title pb-2">
          Nội dung tăng ca: <i>{{ form.ghi_chu }}</i>
        </div>
        <div class="text-title pb-2">
          Trạng thái:
          <v-chip v-if="form.trang_thai == 'CHO_DUYET'" color="teal" dark
            ><b>Chờ phê duyệt</b></v-chip
          >
          <v-chip v-if="form.trang_thai == 'CHAP_NHAN'" color="success" dark
            ><b>Chấp nhận bởi NVKD</b></v-chip
          >
          <v-chip v-if="form.trang_thai == 'TU_CHOI'" color="pink" dark
            ><b>Từ chối bởi NVKD</b></v-chip
          >
        </div>
        <div class="text-title pb-3">
          Nhân viên kinh doanh:
          <b>
            {{
              form.nhan_vien_kinh_doanh ? form.nhan_vien_kinh_doanh.name : ""
            }}</b
          >
        </div>
        <div class="text-title pb-3 pt-4" style="font-size: 20px">
          Danh sách thành viên
        </div>
        <v-data-table
          :headers="headers"
          :items="form.cong_nhan"
          hide-default-footer
        >
          <template v-slot:[`item.time`]="{ item }">
            <v-layout column v-if="item.checking && item.checking.length > 0">
              <div
                v-for="(chamcong, index) in item.checking"
                :key="index"
                class="pb-4"
              >
                <b>{{ chamcong.ca.name }}</b> :
                {{ formatTime(chamcong.time_check_in) }} đến
                {{ formatTime(chamcong.time_check_out) }}
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      color="teal darken-4"
                      v-bind="attrs"
                      v-on="on"
                      @click="viewChecking(chamcong)"
                    >
                      <v-icon>mdi-eye</v-icon>
                    </v-btn>
                  </template>
                  <span>Chi tiết chấm công</span>
                </v-tooltip>
              </div>
            </v-layout>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions class="pr-8 pb-3">
        <v-btn color="#33691E" class="ml-3">
          <v-avatar size="30" class="mr-2">
            <img :src="excelPic" />
          </v-avatar>
          <span style="color: white" class="btn-add">Xuất Excel</span>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text @click="show = false" class="mr-4">Đóng</v-btn>
        <v-btn color="pink" class="ml-3" dark>
          <v-icon left> mdi-close </v-icon>
          <span style="color: white" class="btn-add">Từ chối</span>
        </v-btn>

        <v-btn color="success" class="ml-3">
          <v-icon left> mdi-check </v-icon>
          <span style="color: white" class="btn-add">Phê duyệt</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import excelPic from "../../../assets/images/excel.png";

export default {
  data: () => ({
    excelPic,
    show: false,
    edit: false,
    iconParentMenu: "mdi-menu",
    parentMenus: [],
    roles: [],
    btnLoading: false,
    headers: [
      {
        text: "Họ tên",
        align: "start",
        sortable: false,
        value: "name",
      },
      {
        text: "Số điện thoại",
        align: "start",
        sortable: false,
        value: "so_dien_thoai",
      },
      {
        text: "Thời gian chấm công",
        value: "time",
        sortable: false,
        align: "start",
      },
    ],

    form: {
      dia_diem: {},
      checking: [],
      nhan_vien_kinh_doanh: {},
      ghi_chu: "",
      to_truong: {},
      cong_nhan: [],
    },
    actives: [
      { name: "Hoạt động", value: true },
      { name: "Ngừng hoạt động", value: false },
    ],
    nameRules: [
      (v) => !!v || "Tên khu vực không thể bỏ trống",
      (v) => (v && v.length >= 3) || "Tên khu vực tối thiểu 3 ký tự",
    ],
    heSoRules: [(v) => !!v || "Hệ số không hợp lệ"],
    latLongRules: [(v) => !!v || "Hãy chọn một địa điểm trên bản đồ"],
  }),
  computed: {},
  methods: {
    showFormAdd() {
      this.show = true;
      this.edit = false;
      this.form = {
        dia_diem: {},
        checking: [],
        nhan_vien_kinh_doanh: {},
        ghi_chu: "",
        to_truong: {},
        cong_nhan: [],
      };
    },
    async showFormEdit(data) {
      this.edit = true;
      this.show = true;
      this.form = {
        dia_diem: {},
        checking: [],
        nhan_vien_kinh_doanh: {},
        ghi_chu: "",
        to_truong: {},
        cong_nhan: [],
      };
      this.form = { ...data };
    },
    formatDateTime(e) {
      if (!e) return null;
      try {
        let date = new Date(e);
        let gio =
          date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let phut =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let ngay = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let thang =
          Number(date.getMonth() + 1) < 10
            ? "0" + Number(date.getMonth() + 1)
            : Number(date.getMonth() + 1);
        return (
          gio +
          "h " +
          phut +
          " Ngày " +
          ngay +
          "/" +
          thang +
          "/" +
          date.getFullYear()
        );
      } catch (error) {
        return "";
      }
    },
    formatTime(e) {
      if (!e) return null;
      try {
        let date = new Date(e);
        let gio =
          date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let phut =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        return gio + "h " + phut;
      } catch (error) {
        return "";
      }
    },
    viewChecking(data) {
      this.$router.push("/chamcong/chitiet/" + data.id);
    },
  },
};
</script>
<style scoped>
.zero-vertical {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
.text-title {
  font-size: 16px;
  color: black;
}
</style>