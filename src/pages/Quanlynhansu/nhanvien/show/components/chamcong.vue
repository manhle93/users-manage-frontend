<template>
  <v-container>
    <v-card class="mb-2">
      <v-card-title class="pl-6 pb-4">
        <p>Địa điểm làm việc</p>
      </v-card-title>
      <v-layout align-center class="pl-6 pr-6 pb-2">
        <v-spacer class="pr-10">
          <v-autocomplete
            v-model="diaDiem"
            prepend-inner-icon="mdi-map-marker"
            :items="danhSachDiaDiem"
            chips
            placeholder="Địa điểm làm việc"
            item-text="name"
            item-value="id"
            multiple
          >
            <template v-slot:prepend-item>
              <v-list-item ripple @click="selectAllUser">
                <v-list-item-action>
                  <v-icon :color="diaDiem.length > 0 ? 'indigo darken-4' : ''">
                    {{
                      diaDiem.length == danhSachDiaDiem.length
                        ? "mdi-close-box"
                        : "mdi-checkbox-blank-outline"
                    }}
                  </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title> Chọn tất cả </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mt-2"></v-divider>
            </template> </v-autocomplete
        ></v-spacer>
        <v-btn tile color="success" class="pl-6" @click="capNhatDiaDiem">
          <v-icon left> mdi-pencil </v-icon>
          CẬP NHẬT
        </v-btn>
      </v-layout>
    </v-card>
    <v-card class="mb-1">
      <v-card-title class="pa-6 pb-4">
        <p>Danh sách chấm công</p>
        <v-spacer></v-spacer>
        <div style="width: 300px">
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
        </div>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="chamCongs"
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
  </v-container>
</template>

<script>
import {
  getDiaDiem,
  addDiaDiemNhanVien,
  getDiaDiemNhanVien,
} from "@/api/diadiem";
import { getListCaNhan } from "@/api/chamcong";
export default {
  data: () => ({
    diaDiem: [],
    danhSachDiaDiem: [],
    chamCongs: [],
    page: 1,
    pageCount: 1,
    itemsPerPage: 10,
    loading: false,
    imageEndpoint: process.env.VUE_APP_BASE,
    dateRangeText: "",
    date: [],
    showDate: false,
    headers: [
      // { text: "Họ tên", value: "name", sortable: false },
      {
        text: "Ngày",
        align: "start",
        sortable: false,
        value: "ngay",
      },
      {
        text: "Ca làm việc",
        align: "start",
        sortable: false,
        value: "ca",
      },
      {
        text: "Phòng ban",
        align: "start",
        sortable: false,
        value: "phong_ban",
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
        sortable: false,
        value: "nhom_to",
      },
      {
        text: "Địa điểm",
        align: "start",
        sortable: false,
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
        text: "Trạng thái",
        align: "center",
        sortable: false,
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
  }),
  mounted() {
    this.date = [this.getDateNow(), this.getDateNow()];
    this.getDanhSachDiaDiem();
    this.getDiaDiemNhanVien();
    this.getListChamCong();
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
        this.getListChamCong();
      }
    },
  },
  methods: {
    async getListChamCong() {
      this.loading = true;
      let data = await getListCaNhan({
        nhan_vien_id: this.$route.params.id,
        page: this.page,
        perPage: this.itemsPerPage,
        date:
          this.date && this.date.length
            ? [new Date(this.date[0]), new Date(this.date[1])]
            : null,
      });
      this.loading = false;
      this.chamCongs = data.data;
      this.pageCount = data.meta.last_page;
    },
    async getDanhSachDiaDiem() {
      let data = await getDiaDiem({
        perPage: 9999,
      });
      this.danhSachDiaDiem = data.data;
    },
    async getDiaDiemNhanVien() {
      let data = await getDiaDiemNhanVien({
        nhan_vien_id: this.$route.params.id,
      });
      this.diaDiem = [];
      data.forEach((element) => {
        this.diaDiem.push(element.id);
      });
    },
    changePage(val) {
      this.page = val;
      this.getData();
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
    selectAllUser() {
      this.$nextTick(() => {
        if (this.diaDiem.length == this.danhSachDiaDiem.length) {
          this.diaDiem = [];
        } else {
          this.diaDiem = this.danhSachDiaDiem.slice();
        }
      });
    },
    remove(item) {
      const index = this.diaDiem.indexOf(item.id);
      if (index >= 0) this.diaDiem.splice(index, 1);
    },
    async capNhatDiaDiem() {
      try {
        await addDiaDiemNhanVien({
          nhan_vien_id: this.$route.params.id,
          dia_diem: this.diaDiem,
        });
        this.$toast.info("Cập nhật thành công", {
          position: "top-center",
          timeout: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
        });
      } catch (error) {
        console.log(error);
      }
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
      this.getListChamCong();
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