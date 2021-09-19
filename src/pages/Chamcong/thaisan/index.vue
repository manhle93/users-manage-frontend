<template>
  <v-container fluid>
    <v-card>
      <v-list-item three-line>
        <v-layout>
          <v-img
            max-height="120"
            max-width="120"
            :src="thaiSanPic"
          ></v-img>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">
              LỊCH NGHỈ THAI SẢN</v-list-item-title
            >
            <v-list-item-subtitle
              >Danh sách thời gian nghỉ thai sản của nhân
              viên</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-layout>

        <v-btn color="teal" @click="create">
          <v-icon color="white">mdi-plus</v-icon>
          <span style="color: white" class="btn-add">Thêm lịch nghỉ</span>
        </v-btn>
        <v-btn color="#33691E" class="ml-3">
          <v-avatar size="30" class="mr-2">
            <img :src="excelPic" />
          </v-avatar>
          <span style="color: white" class="btn-add">Xuất Excel</span>
        </v-btn>
      </v-list-item>
    </v-card>
    <br />
    <v-card class="mb-1">
      <v-card-title class="pa-6 pb-4">
        <div style="width: 60%" class="mr-4">
          <v-row>
            <v-col cols="3">
              <v-select
                v-model="phong_ban_id"
                item-text="name"
                item-value="id"
                :items="phongBans"
                placeholder="Phòng ban"
                hide-details
                clearable
                @change="getData"
              ></v-select
            ></v-col>
            <v-col cols="6">
              <v-text-field
                append-icon="mdi-magnify"
                v-model="search"
                label="Tìm kiếm"
                clearable
                single-line
                hide-details
              ></v-text-field
            ></v-col>
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
        <template v-slot:[`item.ngay_sinh`]="{ item }">
          {{ formatDate(item.ngay_sinh) }}
        </template>
        <template v-slot:[`item.thoi_gian_nghi`]="{ item }">
          {{ formatDate(item.ngay_bat_dau) }} -
          {{ formatDate(item.ngay_ket_thuc) }}
        </template>
        <template v-slot:[`item.trang_thai`]="{ item }">
          <v-chip
            v-if="
              new Date(item.ngay_bat_dau) <= Date.now() &&
              new Date(item.ngay_ket_thuc) >= Date.now()
            "
            color="success"
            dark
            small
          >
            Đang nghỉ
          </v-chip>
          <v-chip
            v-if="new Date(item.ngay_bat_dau) > Date.now()"
            color="primary"
            dark
            small
          >
            Chưa đến ngày nghỉ
          </v-chip>
          <v-chip
            v-if="new Date(item.ngay_ket_thuc) < Date.now()"
            color="pink"
            dark
            small
          >
            Hết hạn nghỉ
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
                  Cập nhật</v-list-item-title
                >
              </v-list-item>
              <v-list-item @click="xoaLichNghiThaiSan(item)">
                <v-list-item-title>
                  <v-icon class="mr-2"> mdi-delete </v-icon>
                  Xóa lịch nghỉ</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>
    <div class="pt-2">
      <v-pagination v-model="page" :length="pageCount" @input="changePage"
        >></v-pagination
      >
    </div>
    <create-edit ref="thaisan" @on-done="getData"></create-edit>
  </v-container>
</template>
<script>
import { debounce } from "lodash";
import { getList, xoaLichNghi } from "@/api/thaisan";
import { getPhongBan } from "@/api/phongban";
import CreateEdit from "./create-edit";
import excelPic from "../../../assets/images/excel.png";
import thaiSanPic from "../../../assets/images/thaisan.svg";

export default {
  components: { CreateEdit },
  data() {
    return {
      excelPic,
      thaiSanPic,
      page: 1,
      pageCount: 1,
      itemsPerPage: 10,
      totalDesserts: 0,
      tableData: [],
      btnLoading: false,
      loading: false,
      search: "",
      imageEndpoint: process.env.VUE_APP_BASE,
      phongBans: [],
      phong_ban_id: null,
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
          text: "Hành động",
          value: "action",
          sortable: false,
          align: "center",
          width: "150",
        },
      ],
    };
  },
  created() {
    this.getData();
    this.getDanhMuc();
  },
  watch: {
    search: debounce(async function (val) {
      this.loading = true;
      let data = await getList({
        page: this.page,
        perPage: this.itemsPerPage,
        search: val,
        phong_ban_id: this.phong_ban_id,
      });
      this.loading = false;
      this.tableData = data.data;
      this.pageCount = data.last_page;
    }, 300),
  },
  methods: {
    async getData() {
      this.loading = true;
      let data = await getList({
        page: this.page,
        perPage: this.itemsPerPage,
        phong_ban_id: this.phong_ban_id,
        search: this.search,
      });
      this.tableData = data.data;
      this.loading = false;
      this.pageCount = data.meta.last_page;
    },
    async getDanhMuc() {
      let phongbans = await getPhongBan({
        perPage: 999,
      });
      this.phongBans = phongbans.data;
    },
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
    edit(menu) {
      this.$refs.thaisan.showFormEdit(menu);
    },
    create() {
      this.$refs.thaisan.showFormAdd();
    },
    xoaLichNghiThaiSan(data) {
      this.$confirmBox.show({
        title: "Xóa lịch nghỉ thai sản",
        width: 480,
        body:
          "Bạn có chắc chắn muốn xóa lịch nghỉ thai sản của nhân viên:  " +
          "<strong>" +
          data.name +
          " ?" +
          "</strong><br>" +
          "Từ ngày: " +
          this.formatDate(data.ngay_bat_dau) +
          " đến ngày: " +
          this.formatDate(data.ngay_ket_thuc),
        action: () => xoaLichNghi({ lich_nghi_id: data.id }),
        onDone: this.getData,
      });
    },
  },
};
</script>
<style scoped>
@media only screen and (max-width: 600px) {
  .btn-add {
    display: none;
  }
}
</style>
