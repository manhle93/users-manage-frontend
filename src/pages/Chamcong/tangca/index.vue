<template>
  <v-container>
    <v-card>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1"
            ><v-icon size="40">mdi-alarm-multiple</v-icon> PHIẾU TĂNG
            CA</v-list-item-title
          >
          <v-list-item-subtitle
            >Danh sách phiếu báo làm thêm giờ</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <br />
    <v-card class="mb-1">
      <v-card-title class="pa-6 pb-4">
        <div style="width: 80%" class="mr-4">
          <v-row>
            <v-col cols="3">
              <v-select
                v-model="dia_diem_id"
                item-text="name"
                item-value="id"
                :items="diaDiems"
                placeholder="Địa điểm - khu vực"
                hide-details
                clearable
                @change="getData"
              ></v-select
            ></v-col>
            <v-col cols="4">
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
            </v-col>
            <!-- <v-col cols="5">
              <v-text-field
                append-icon="mdi-magnify"
                v-model="search"
                label="Tìm kiếm"
                clearable
                single-line
                hide-details
              ></v-text-field
            ></v-col> -->
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
              v-if="item.nguoi_gui.url_image"
              :src="imageEndpoint + item.nguoi_gui.url_image"
              alt="ManhLe"
            />
            <span
              style="color: white"
              v-else-if="item && item.nguoi_gui.name"
              >{{ item.name.charAt(0).toUpperCase() }}</span
            >
            <v-icon v-else dark>mdi-account</v-icon>
          </v-avatar>
          <span class="ml-3" style="font-size: 16px">{{
            item.nguoi_gui.name
          }}</span>
        </template>
        <template v-slot:[`item.thoi_gian`]="{ item }">
          {{ formatDateTime(item.bat_dau) }} -
          {{ formatDateTime(item.ket_thuc) }}
        </template>
        <template v-slot:[`item.trang_thai`]="{ item }">
          <v-chip v-if="item.trang_thai == 'CHO_DUYET'" color="primary"
            >Chờ duyệt</v-chip
          >
          <v-chip v-if="item.trang_thai == 'CHAP_NHAN'" color="success"
            >Chấp nhận bởi NVKD</v-chip
          >
          <v-chip v-if="item.trang_thai == 'TU_CHOI'" color="pink"
            >Từ chối bởi NVKD</v-chip
          >
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
            <span
              v-if="item.nguoi_duyet"
              class="ml-3"
              style="font-size: 16px"
              >{{ item.nguoi_duyet.name }}</span
            >
          </div>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <v-btn color="primary" fab x-small dark @click="showChiTiet(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <!-- <v-menu>
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
                  Xóa đơn tăng ca</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu> -->
        </template>
      </v-data-table>
    </v-card>
    <div class="pt-2">
      <v-pagination v-model="page" :length="pageCount" @input="changePage"
        >></v-pagination
      >
    </div>
    <Show ref="chitiet" />
  </v-container>
</template>

<script>
import { debounce } from "lodash";
import { getTangCa } from "@/api/tangca";
import { getDiaDiem } from "@/api/diadiem";
import Show from "./show";
export default {
  components: {Show},
  data() {
    return {
      page: 1,
      pageCount: 1,
      date: [],
      itemsPerPage: 10,
      totalDesserts: 0,
      tableData: [],
      showDate: false,
      btnLoading: false,
      loading: false,
      search: "",
      imageEndpoint: process.env.VUE_APP_BASE,
      diaDiems: [],
      dia_diem_id: null,
      dateRangeText: "",
      headers: [
        { text: "Tổ trưởng", value: "to_truong.name", sortable: false },
        {
          text: "Nhóm tổ",
          align: "start",
          sortable: false,
          value: "nhom_to",
        },
        {
          text: "Địa điểm",
          align: "start",
          sortable: false,
          value: "dia_diem.name",
        },
        {
          text: "Thời gian tăng ca",
          align: "start",
          sortable: false,
          value: "thoi_gian",
        },
        {
          text: "Trạng thái",
          align: "start",
          sortable: false,
          value: "trang_thai",
        },
        {
          text: "Người duyệt NVKD",
          align: "start",
          sortable: false,
          value: "nhan_vien_kinh_doanh.name",
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
    this.getDanhSachDiaDiem();
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
      let data = await getTangCa({
        page: this.page,
        perPage: this.itemsPerPage,
        search: val,
        dia_diem_id: this.dia_diem_id,
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
    async getData() {
      this.loading = true;
      let data = await getTangCa({
        page: this.page,
        perPage: this.itemsPerPage,
        dia_diem_id: this.dia_diem_id,
        search: this.search,
        date:
          this.date && this.date.length
            ? [new Date(this.date[0]), new Date(this.date[1])]
            : null,
      });
      this.tableData = data.data;
      this.loading = false;
      this.pageCount = data.last_page;
    },
    async getDanhSachDiaDiem() {
      let data = await getDiaDiem({
        perPage: 9999,
      });
      this.diaDiems = data.data;
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
    changeDate() {
      this.$refs.menu.save(this.date);
      this.getData();
    },
    changePage(val) {
      this.page = val;
      this.getData();
    },
    showChiTiet(data) {
      console.log(data)
      this.$refs.chitiet.showFormEdit(data);
    },
    // xoaLichNghi(data) {
    //   this.$confirmBox.show({
    //     title: "Xóa lịch nghỉ",
    //     width: 480,
    //     body:
    //       "Bạn có chắc chắn muốn xóa lịch đăng ký nghỉ của nhân viên:  " +
    //       "<strong>" +
    //       data.nguoi_gui.name +
    //       " ?" +
    //       "</strong><br>" +
    //       "Từ ngày: " +
    //       this.formatDate(data.bat_dau) +
    //       " đến ngày: " +
    //       this.formatDate(data.ket_thuc),
    //     action: () => xoaTangCa({ lich_nghi_id: data.id }),
    //     onDone: this.getData,
    //   });
    // },
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
