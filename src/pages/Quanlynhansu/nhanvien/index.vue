<template>
  <v-container fluid>
    <v-card>
      <!-- <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1"
            ><v-icon size="40">mdi-account-multiple</v-icon> QUẢN LÝ NHÂN
            VIÊN</v-list-item-title
          >
          <v-list-item-subtitle
            >Danh sách nhân viên công ty</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item> -->
      <v-list-item three-line>
        <v-layout>
          <v-img
            max-height="100"
            max-width="100"
            :size="40"
            :src="NhanVienPic"
            class="mr-4"
          ></v-img>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">
              QUẢN LÝ NHÂN VIÊN</v-list-item-title
            >
            <v-list-item-subtitle
              >Danh sách nhân viên công ty</v-list-item-subtitle
            >
          </v-list-item-content>

          <div class="pt-3">
            <v-btn color="#33691E" class="mr-4" @click="exportExcel">
              <v-avatar size="30" class="mr-2">
                <img :src="excelPic" />
              </v-avatar>
              <span style="color: white" class="btn-add">Xuất Excel</span>
            </v-btn>
            <router-link to="/nhansu/themnhanvien">
              <v-btn color="teal">
                <v-icon color="white">mdi-plus</v-icon>
                <span style="color: white" class="btn-add">Thêm Nhân Viên</span>
              </v-btn>
            </router-link>
          </div>
        </v-layout>
      </v-list-item>
    </v-card>
    <br />
    <v-card class="mb-1">
      <v-card-title class="pa-6 pb-4">
        <!-- <div style="width: 500px" class="mr-4">
          <v-row>
            <v-col cols="5">
            </v-col>
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
          </v-row>
        </div> -->

        <v-card-title class="pa-6 pb-4 mb-3">
          <div style="width: 90%" class="mr-2">
            <v-row>
              <v-col cols="2">
                <v-select
                  v-model="trang_thai"
                  item-text="name"
                  item-value="value"
                  :items="trangThai"
                  placeholder="Trạng thái"
                  hide-details
                  clearable
                  @change="getData"
                ></v-select
              ></v-col>
              <v-col cols="2">
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
              <v-col cols="2">
                <v-select
                  v-model="nhom_to_id"
                  item-text="name"
                  item-value="id"
                  :items="nhomTos"
                  placeholder="Nhóm tổ"
                  hide-details
                  clearable
                  @change="getData"
                ></v-select
              ></v-col>
              <v-col cols="2">
                <v-select
                  v-model="chuc_vu_id"
                  item-text="name"
                  item-value="id"
                  :items="chucVus"
                  placeholder="Chức vụ"
                  hide-details
                  clearable
                  @change="getData"
                ></v-select
              ></v-col>
              <v-col cols="4">
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
        <template v-slot:[`item.da_nghi_viec`]="{ item }">
          <v-chip v-if="item.da_nghi_viec" color="pink" dark small>
            Đã nghỉ việc
          </v-chip>
          <v-chip v-else color="success" dark small> Đang hoạt động </v-chip>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="textColor">mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="xemChiTiet(item)">
                <v-list-item-title>
                  <v-icon>mdi-pencil</v-icon> Xem chi tiết
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="nghiViec(item)">
                <v-list-item-title>
                  <div v-if="!item.da_nghi_viec">
                    <v-icon class="mr-2"> mdi-close </v-icon>
                    Nghỉ việc
                  </div>
                  <div v-else>
                    <v-icon class="mr-2"> mdi-check </v-icon>
                    Trở lại làm việc
                  </div>
                </v-list-item-title>
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
  </v-container>
</template>
<script>
import { debounce } from "lodash";
import { getNhanVien, nghiViec, exportNhanVien } from "@/api/nhanvien";
import NhanVienPic from "../../../assets/images/nhanvien.svg";
import excelPic from "../../../assets/images/excel.png";
import { getPhongBan } from "@/api/phongban";
import { getNhomToTrucThuoc } from "@/api/nhomto";
import { getDanhMucCon } from "@/api/danhmuc";
import { saveAs } from 'file-saver'

export default {
  // components: { CreateEdit },
  data() {
    return {
      NhanVienPic,
      excelPic,
      phongBans: [],
      nhomTos: [],
      phong_ban_id: null,
      nhom_to_id: null,
      chuc_vu_id: null,
      chucVus: [],
      trang_thai: null,
      trangThai: [
        { name: "Đang hoạt động", value: false },
        { name: "Đã nghỉ việc", value: true },
      ],
      page: 1,
      pageCount: 1,
      itemsPerPage: 10,
      options: {},
      totalDesserts: 0,
      tableData: [],
      btnLoading: false,
      menu: {},
      loading: false,
      search: "",
      roleId: null,
      imageEndpoint: process.env.VUE_APP_BASE,
      roles: [],
      headers: [
        { text: "Họ tên", value: "name", sortable: true },
        {
          text: "Ngày sinh",
          align: "start",
          sortable: true,
          value: "ngay_sinh",
        },
        {
          text: "Giới tính",
          align: "start",
          sortable: true,
          value: "gioi_tinh",
        },
        {
          text: "Nơi sinh",
          align: "start",
          sortable: true,
          value: "noi_sinh",
        },
        {
          text: "Email",
          align: "start",
          sortable: false,
          value: "email",
        },
        {
          text: "Chức vụ",
          align: "start",
          sortable: true,
          value: "chuc_vu",
        },
        {
          text: "Phòng ban",
          align: "start",
          sortable: true,
          value: "phong_ban",
        },
        {
          text: "Nhóm tổ",
          align: "start",
          sortable: true,
          value: "nhom_to",
        },
        {
          text: "Trạng thái",
          align: "start",
          sortable: true,
          value: "da_nghi_viec",
        },
        {
          text: "Chi tiết",
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
      let data = await getNhanVien({
        page: this.page,
        perPage: this.itemsPerPage,
        search: val,
        role_id: this.roleId,
        trang_thai: this.trang_thai,
        nhom_to_id: this.nhom_to_id,
        phong_ban_id: this.phong_ban_id,
        chuc_vu_id: this.chuc_vu_id,
      });
      this.loading = false;
      this.tableData = data.data;
      this.pageCount = data.last_page;
    }, 300),
  },
  methods: {
    async exportExcel(){
      const res = await exportNhanVien();
      saveAs(new Blob([res]), `Nhan_vien.xlsx`)
    },
    async getData() {
      this.loading = true;
      let data = await getNhanVien({
        page: this.page,
        perPage: this.itemsPerPage,
        search: this.search,
        trang_thai: this.trang_thai,
        nhom_to_id: this.nhom_to_id,
        phong_ban_id: this.phong_ban_id,
        chuc_vu_id: this.chuc_vu_id,
      });
      this.tableData = data.data;
      this.loading = false;
      this.pageCount = data.meta.last_page;
      this.getNhomTo();
    },
    async getDanhMuc() {
      let phongbans = await getPhongBan({
        perPage: 999,
      });
      this.chucVus = await getDanhMucCon({ code: "CHUCVU" });
      this.phongBans = phongbans.data;
    },
    async getNhomTo() {
      if (this.phong_ban_id) {
        let data = await getNhomToTrucThuoc({
          phong_ban_id: this.phong_ban_id,
        });
        this.nhomTos = data;
      } else this.nhomTos = [];
    },
    changePage(val) {
      this.page = val;
      this.getData();
    },
    editMenu(menu) {
      this.$refs.menuForm.showFormEdit(menu);
    },
    createMenu() {
      this.$refs.menuForm.showFormAdd();
    },
    xemChiTiet(item) {
      this.$router.push("/nhansu/thongtinnhanvien/" + item.id);
    },
    async nghiViec(data) {
      this.$confirmBox.show({
        title: data.da_nghi_viec
          ? "Xác nhận trở lại công việc"
          : "Xác nhận nghỉ việc",
        width: 480,
        body:
          "Nhân viên  " +
          "<strong>" +
          data.name +
          "</strong>" +
          `${
            data.da_nghi_viec
              ? " Sẽ tiếp tục công việc và có thể sử dụng phần mềm"
              : " Sẽ không thể đăng nhập phần mềm"
          }`,
        action: () => nghiViec({ nhan_vien_id: data.id }),
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
