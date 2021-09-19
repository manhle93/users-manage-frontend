<template>
  <v-container fluid>
    <v-card>
      <v-layout>
        <v-list-item three-line>
          <v-layout>
            <v-img
              max-height="100"
              max-width="100"
              :size="40"
              :src="Selfie"
            ></v-img>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                DANH SÁCH CHẤM CÔNG</v-list-item-title
              >
              <v-list-item-subtitle
                >Danh sách chấm công của nhân viên</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-layout>
        </v-list-item>
        <v-layout style="width: 630px" class="pr-4">
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
              <v-btn text color="primary" @click="changeDate()"> OK </v-btn>
            </v-date-picker>
          </v-menu>
          <v-btn color="#33691E" class="ml-4 mt-3" @click="exportExcel">
            <v-avatar size="30" class="mr-2">
              <img :src="excelPic" />
            </v-avatar>
            <span style="color: white" class="btn-add">Xuất Excel</span>
          </v-btn>
        </v-layout>
      </v-layout>
    </v-card>
    <br />
    <v-card class="mb-1">
      <v-card-title class="pa-6 pb-4 mb-3">
        <div style="width: 90%" class="mr-4">
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
        <template v-slot:[`item.ngay`]="{ item }">
          {{ formatDate(item.time_check_in) }}
        </template>
        <template v-slot:[`item.trang_thai`]="{ item }">
          <v-chip v-if="item.hop_le" color="success" dark small>
            Hợp lệ
          </v-chip>
          <v-chip v-else color="pink" dark small> Không hợp lệ </v-chip>
        </template>
        <template v-slot:[`item.checkin`]="{ item }">
          <v-layout column class="pb-3 pt-1" align-center>
            <v-img
              class="image-box"
              :src="imageEndpoint + item.url_image_check_in"
              max-height="100"
              max-width="130"
            >
              <div class="chip-time">
                <v-chip small dark color="teal darken-3">
                  <v-icon left small> mdi-clock </v-icon>
                  <strong>{{ formatTime(item.time_check_in) }}</strong></v-chip
                >
              </div>
            </v-img>
          </v-layout>
        </template>
        <template v-slot:[`item.checkout`]="{ item }">
          <v-layout column class="pb-3 pt-1" align-center>
            <v-img
              class="image-box"
              :src="imageEndpoint + item.url_image_check_out"
              max-height="100"
              max-width="130"
            >
              <div class="chip-time">
                <v-chip small dark color="teal darken-3">
                  <v-icon left small> mdi-clock </v-icon>
                  <strong>{{ formatTime(item.time_check_out) }}</strong></v-chip
                >
              </div>
            </v-img>
          </v-layout>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <router-link :to="'/chamcong/chitiet/' + item.id">
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
    <create-edit ref="thaisan" @on-done="getData"></create-edit>
  </v-container>
</template>
<script>
import { debounce } from "lodash";
import { getList, exportChamCong } from "@/api/chamcong";
import CreateEdit from "./create-edit";
import Selfie from "../../../assets/images/selfie.png";
import { getPhongBan } from "@/api/phongban";
import { getNhomToTrucThuoc } from "@/api/nhomto";
import { getDanhMucCon } from "@/api/danhmuc";
import excelPic from "../../../assets/images/excel.png";
import { saveAs } from "file-saver";

export default {
  components: { CreateEdit },
  data() {
    return {
      Selfie,
      excelPic,
      page: 1,
      date: [],
      showDate: false,
      pageCount: 1,
      itemsPerPage: 10,
      totalDesserts: 0,
      tableData: [],
      btnLoading: false,
      loading: false,
      search: "",
      imageEndpoint: process.env.VUE_APP_BASE,
      phongBans: [],
      nhomTos: [],
      phong_ban_id: null,
      nhom_to_id: null,
      chuc_vu_id: null,
      chucVus: [],
      trang_thai: null,
      dateRangeText: "",
      trangThai: [
        { name: "Hợp lệ", value: true },
        { name: "Không hợp lệ", value: false },
      ],
      headers: [
        { text: "Họ tên", value: "name", sortable: true, width: 220 },
        {
          text: "Ngày",
          align: "start",
          sortable: true,
          value: "ngay",
        },
        {
          text: "Ca làm việc",
          align: "start",
          sortable: true,
          value: "ca",
        },
        {
          text: "Chức vụ",
          align: "start",
          sortable: false,
          value: "chuc_vu",
        },
        {
          text: "Nhóm tổ",
          align: "start",
          sortable: true,
          value: "nhom_to",
        },
        {
          text: "Địa điểm",
          align: "start",
          sortable: true,
          value: "dia_diem",
        },
        {
          text: "CHECK IN",
          align: "center",
          sortable: false,
          value: "checkin",
          width: "200",
        },
        {
          text: "CHECK OUT",
          align: "center",
          sortable: false,
          value: "checkout",
          width: "200",
        },
        {
          text: "Tăng ca",
          align: "center",
          sortable: false,
          value: "tang_ca",
          width: "100",
        },
        {
          text: "Trạng thái",
          align: "center",
          sortable: true,
          value: "trang_thai",
        },
        {
          text: "Chi tiết",
          value: "action",
          sortable: false,
          align: "center",
          width: "120",
        },
      ],
    };
  },
  created() {
    this.date = [this.getDateNow(), this.getDateNow()];
    this.getData();
    this.getDanhMuc();
  },
  watch: {
    date(val) {
      if (val && val.length == 2) {
        if (new Date(this.date[0]) > new Date(this.date[1])) {
          let temp = this.date[0];
          this.date[0] = this.date[1];
          this.date[1] = temp;
        }
        let newDate = [...this.date];
        newDate[0] = this.formatDate(newDate[0]);
        newDate[1] = this.formatDate(newDate[1]);
        this.dateRangeText = newDate.join(" - ");
      }
    },
    dateRangeText(val) {
      if (val == null) {
        this.date = null;
        this.getData();
      }
    },
    search: debounce(async function (val) {
      this.loading = true;
      let data = await getList({
        page: this.page,
        perPage: this.itemsPerPage,
        search: val,
        phong_ban_id: this.phong_ban_id,
        trang_thai: this.trang_thai,
        nhom_to_id: this.nhom_to_id,
        chuc_vu_id: this.chuc_vu_id,
        date:
          this.date && this.date.length
            ? [new Date(this.date[0]), new Date(this.date[1])]
            : null,
      });
      this.loading = false;
      this.tableData = data.data;
      this.pageCount = data.last_page;
    }, 300),
  },
  methods: {
    async exportExcel() {
      const res = await exportChamCong({
        page: this.page,
        perPage: this.itemsPerPage,
        phong_ban_id: this.phong_ban_id,
        search: this.search,
        trang_thai: this.trang_thai,
        nhom_to_id: this.nhom_to_id,
        chuc_vu_id: this.chuc_vu_id,
        date:
          this.date && this.date.length
            ? [new Date(this.date[0]), new Date(this.date[1])]
            : null,
      });
      saveAs(new Blob([res]), `Cham_cong.xlsx`);
    },
    async getData() {
      this.loading = true;
      let data = await getList({
        page: this.page,
        perPage: this.itemsPerPage,
        phong_ban_id: this.phong_ban_id,
        search: this.search,
        trang_thai: this.trang_thai,
        nhom_to_id: this.nhom_to_id,
        chuc_vu_id: this.chuc_vu_id,
        date:
          this.date && this.date.length
            ? [new Date(this.date[0]), new Date(this.date[1])]
            : null,
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

    getDateNow() {
      let e = Date.now();
      if (!e) return null;
      try {
        let date = new Date(e);
        let ngay = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let thang =
          Number(date.getMonth() + 1) < 10
            ? "0" + Number(date.getMonth() + 1)
            : Number(date.getMonth() + 1);
        return date.getFullYear() + "-" + thang + "-" + ngay;
      } catch (error) {
        return "";
      }
    },
    changeDate() {
      this.$refs.menu.save(this.date);
      this.getData();
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

.image-box {
  border-radius: 6px;
  border: 1px solid #1a5276;
}
.chip-time {
  position: absolute;
  top: 3px;
  left: 3px;
}
</style>
