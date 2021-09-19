<template>
  <v-dialog v-model="show" persistent width="800">
    <v-card>
      <v-card-title class="headline"> CHI TIẾT LỊCH NGHỈ </v-card-title>
      <br />
      <v-card-text>
        <v-chip
          v-if="
            TRANG_THAI.CHO_DUYET == form.trang_thai &&
            new Date(form.ket_thuc) >= Date.now()
          "
          color="primary"
          dark
        >
          Chờ duyệt
        </v-chip>
        <v-chip v-if="TRANG_THAI.TU_CHOI == form.trang_thai" color="pink" dark>
          Từ chối
        </v-chip>
        <v-chip
          v-if="TRANG_THAI.DA_DUYET == form.trang_thai"
          color="success"
          dark
        >
          Được phê duyệt
        </v-chip>
        <v-chip
          v-if="
            TRANG_THAI.CHO_DUYET == form.trang_thai &&
            new Date(form.ket_thuc) <= Date.now()
          "
          color="orange"
          dark
        >
          Hết hạn
        </v-chip>
        <v-form ref="form">
          <v-row>
            <v-col cols="7">
              <v-col cols="12">
                <div class="d-flex">
                  <v-icon size="30" color="green darken-2">
                    mdi-account
                  </v-icon>
                  <div class="pl-2">
                    <div class="title">Nhân viên</div>
                  </div>
                </div>
                <div class="pt-3 pl-3" v-if="form.nguoi_gui">
                  <div class="label-form">
                    Họ tên: <strong>{{ form.nguoi_gui.name }}</strong>
                  </div>
                  <div class="label-form">
                    Phòng ban: <strong>{{ form.nguoi_gui.phong_ban }}</strong>
                  </div>
                  <div class="label-form">
                    Chức vụ: <strong>{{ form.nguoi_gui.chuc_vu }}</strong>
                  </div>
                  <div class="label-form">
                    Tổ: <strong>{{ form.nguoi_gui.nhom_to }}</strong>
                  </div>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="d-flex">
                  <v-icon size="30" color="green darken-2">
                    mdi-calendar-clock
                  </v-icon>
                  <div class="pl-2">
                    <div class="title">Thời gian xin nghỉ</div>
                  </div>
                </div>
                <div class="label-form pt-3 pl-3">
                <div>Từ ngày: <strong>{{ formatDate(form.bat_dau) }}</strong> </div>  
                <div class="pt-2">Đến ngày:  <strong>{{ formatDate(form.ket_thuc) }} </strong></div>  
                </div>
              </v-col>

              <v-col cols="12">
                <div class="d-flex">
                  <v-icon size="30" color="green darken-2">
                    mdi-help-circle
                  </v-icon>
                  <div class="pl-2">
                    <div class="title">Lý do</div>
                  </div>
                </div>
                <div class="label-form pl-3 pt-3">{{ form.ly_do_nghi }}</div>
              </v-col>
              <v-col cols="12" class="pt-3 pl-6" v-if="form.nguoi_duyet">
                <div class="label-form">
                  Người duyệt: <strong>{{ form.nguoi_duyet.name }}</strong>
                </div>
              </v-col>
            </v-col>
            <v-col cols="5">
              <v-date-picker v-model="dates" range disabled no-title></v-date-picker>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="pr-8 pb-3">
        <v-spacer></v-spacer>
        <v-btn text @click="show = false" class="mr-6">Đóng</v-btn>
        <div>
          <v-btn
            :loading="btnLoading"
            color="success"
            @click="pheDuyetTuChoi(true)"
          >
            <v-icon left>mdi-check</v-icon>
            Phê duyệt
          </v-btn>
          <v-btn
            class="ml-4"
            :loading="btnLoading"
            dark
            color="pink"
            @click="pheDuyetTuChoi(false)"
          >
            <v-icon left>mdi-close</v-icon>
            Từ chối
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { fullTextFilter } from "../../../../../../utils/stringHelper";
import { TRANG_THAI, xuLyDangKy } from "@/api/dangkynghi";

export default {
  data: () => ({
    TRANG_THAI,
    imageEndpoint: process.env.VUE_APP_BASE,
    show: false,
    edit: false,
    fullTextFilter,
    dates: [],
    people: [],
    btnLoading: false,
    form: {},

    nameRules: [(v) => !!v || "Nhân viên không thể bỏ trống"],
  }),
  watch: {
    dates(val) {
      if (val && val.length == 2) {
        if (new Date(val[0]) < new Date(val[1])) {
          this.form.ngay_bat_dau = new Date(val[0]);
          this.form.ngay_ket_thuc = new Date(val[1]);
        } else {
          this.form.ngay_bat_dau = new Date(val[1]);
          this.form.ngay_ket_thuc = new Date(val[0]);
        }
      } else {
        this.form.ngay_bat_dau = null;
        this.form.ngay_ket_thuc = null;
      }
    },
  },

  methods: {
    showFormAdd() {
      this.show = true;
      this.edit = false;
      this.form = {
        nhan_vien_id: null,
        ngay_bat_dau: null,
        ngay_ket_thuc: null,
      };
      this.dates = [];
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
        return gio+"h "+phut+ ' Ngày '+ ngay + "/" + thang + "/" + date.getFullYear();
      } catch (error) {
        return "";
      }
    },

    async showFormEdit(data) {
      this.edit = true;
      this.show = true;
      this.form = {
        ...data,
      };
      this.dates[0] = data.bat_dau;
      this.dates[1] = data.ket_thuc;
    },

    async pheDuyetTuChoi(trangThaiDuyet) {
      this.btnLoading = true;
      try {
        await xuLyDangKy({
          pheDuyet: trangThaiDuyet,
          lich_nghi_id: this.form.id,
        });
        this.show = false;
        this.btnLoading = false;
        this.$emit("on-done");
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
        this.btnLoading = false;
        this.show = false;
      }
    },
  },
};
</script>
