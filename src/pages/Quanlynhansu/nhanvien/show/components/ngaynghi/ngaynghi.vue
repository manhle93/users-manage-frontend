<template>
  <v-container>
    <div style="font-size: 16px" class="pb-2" >Số ngày công: <b>{{dataInfoWorkDay.number_of_days_off}} ngày</b></div>
    <div style="font-size: 16px" class="pb-2">
      Số ngày đã nghỉ phép: <b>{{dataInfoWorkDay.num_was_day_off}} ngày</b>
    </div>
    <div style="font-size: 16px" class="pb-2" >
      Số ngày công còn lại: <b>{{handleMinus(dataInfoWorkDay.number_of_days_off, dataInfoWorkDay.num_was_day_off)}} ngày</b>
    </div>
    <div class="title pt-2 pb-2">Danh sách đăng ký nghỉ</div>
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
            v-if="item.nguoi_gui.url_image"
            :src="imageEndpoint + item.nguoi_gui.url_image"
            alt="ManhLe"
          />
          <span style="color: white" v-else-if="item && item.nguoi_gui.name">{{
            item.name.charAt(0).toUpperCase()
          }}</span>
          <v-icon v-else dark>mdi-account</v-icon>
        </v-avatar>
        <span class="ml-3" style="font-size: 16px">{{
          item.nguoi_gui.name
        }}</span>
      </template>
      <template v-slot:[`item.thoi_gian_nghi`]="{ item }">
        {{ formatDate(item.bat_dau) }} -
        {{ formatDate(item.ket_thuc) }}
      </template>
      <template v-slot:[`item.trang_thai`]="{ item }">
        <v-chip
          v-if="
            TRANG_THAI.CHO_DUYET == item.trang_thai &&
            new Date(item.ket_thuc) >= Date.now()
          "
          color="primary"
          dark
          small
        >
          Chờ duyệt
        </v-chip>
        <v-chip
          v-if="TRANG_THAI.TU_CHOI == item.trang_thai"
          color="pink"
          dark
          small
        >
          Từ chối
        </v-chip>
        <v-chip
          v-if="TRANG_THAI.DA_DUYET == item.trang_thai"
          color="success"
          dark
          small
        >
          Được phê duyệt
        </v-chip>
        <v-chip
          v-if="
            TRANG_THAI.CHO_DUYET == item.trang_thai &&
            new Date(item.ket_thuc) <= Date.now()
          "
          color="orange"
          dark
          small
        >
          Hết hạn
        </v-chip>
      </template>
      <template v-slot:[`item.nguoi_duyet`]="{ item }">
        <div v-if="item.nguoi_duyet">
          <v-avatar color="indigo" size="28">
            <img
              v-if="item.nguoi_duyet && item.nguoi_duyet.url_image"
              :src="imageEndpoint + item.nguoi_duyet.url_image"
              alt="ManhLe"
            />
            <span
              style="color: white"
              v-else-if="item.nguoi_duyet && item.nguoi_duyet.name"
              >{{ item.name.charAt(0).toUpperCase() }}</span
            >
          </v-avatar>
          <span v-if="item.nguoi_duyet" class="ml-3" style="font-size: 16px">{{
            item.nguoi_duyet.name
          }}</span>
        </div>
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
                Xóa lịch nghỉ</v-list-item-title
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
    <create-edit ref="thaisan" @on-done="getData"></create-edit>
  </v-container>
</template>

<script>
import {
  getLichNghiCaNhan,
  getSoNgayCong,
  xoaDangKy,
  TRANG_THAI,
} from "@/api/dangkynghi";
import CreateEdit from "./create-edit";

export default {
  components: { CreateEdit },
  data: () => ({
    TRANG_THAI,
    page: 1,
    pageCount: 1,
    itemsPerPage: 10,
    totalDesserts: 0,
    tableData: [],
    loading: false,
    imageEndpoint: process.env.VUE_APP_BASE,
    headers: [
      { text: "Họ tên", value: "name", sortable: false },
      {
        text: "Phòng ban",
        align: "start",
        sortable: false,
        value: "nguoi_gui.phong_ban",
      },
      {
        text: "Chức vụ",
        align: "start",
        sortable: false,
        value: "nguoi_gui.chuc_vu",
      },
      {
        text: "Nhóm tổ",
        align: "start",
        sortable: false,
        value: "nguoi_gui.nhom_to",
      },
      {
        text: "Thời gian nghỉ",
        align: "start",
        sortable: false,
        value: "thoi_gian_nghi",
      },
      {
        text: "Trạng thái",
        align: "start",
        sortable: false,
        value: "trang_thai",
      },
      {
        text: "Người duyệt",
        align: "start",
        sortable: false,
        value: "nguoi_duyet",
      },
      {
        text: "Hành động",
        value: "action",
        sortable: false,
        align: "center",
        width: "150",
      },
    ],
    dataInfoWorkDay: {
      number_of_days_off: 0,
      num_was_day_off: 0
    },
  }),
  mounted() {
    this.getSoNgayCongData();
    this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      let data = await getLichNghiCaNhan({
        nhan_vien_id: this.$route.params.id,
      });
      this.tableData = data.data;
      this.loading = false;
      this.pageCount = data.meta.last_page;
    },
    async getSoNgayCongData() {
      const res = await getSoNgayCong(this.$route.params.id);
      
      this.dataInfoWorkDay = res.data;
    },
    formatDate(e) {
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
    handleMinus(a, b){
      return (a - b) < 0 ? 0 : a - b
    },
    edit(menu) {
      this.$refs.thaisan.showFormEdit(menu);
    },
    create() {
      this.$refs.thaisan.showFormAdd();
    },
    xoaLichNghi(data) {
      this.$confirmBox.show({
        title: "Xóa lịch nghỉ",
        width: 480,
        body:
          "Bạn có chắc chắn muốn xóa lịch đăng ký nghỉ của nhân viên:  " +
          "<strong>" +
          data.nguoi_gui.name +
          " ?" +
          "</strong><br>" +
          "Từ ngày: " +
          this.formatDate(data.bat_dau) +
          " đến ngày: " +
          this.formatDate(data.ket_thuc),
        action: () => xoaDangKy({ lich_nghi_id: data.id }),
        onDone: this.getData,
      });
    },

    changePage(val) {
      this.page = val;
      this.getData();
    },
  },
};
</script>

<style>
</style>