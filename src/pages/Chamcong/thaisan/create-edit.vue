<template>
  <v-dialog v-model="show" persistent width="800">
    <v-card>
      <v-card-title class="headline">{{
        edit ? "CẬP NHẬT LỊCH NGHỈ THAI SẢN" : "THÊM LỊCH NGHỈ THAI SẢN"
      }}</v-card-title>
      <br />
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-row>
              <v-col cols="7">
                <v-col cols="12">
                  <div class="label-form">Nhân viên</div>
                  <v-autocomplete
                    v-model="form.nhan_vien_id"
                    prepend-inner-icon="mdi-account"
                    :items="people"
                    chips
                    placeholder="Nhân viên"
                    item-text="name"
                    item-value="id"
                    :filter="fullTextFilter"
                    clearable
                    :rules="nameRules"
                  >
                    <template v-slot:selection="data">
                      <v-chip v-bind="data.attrs" :input-value="data.selected">
                        <v-avatar left color="indigo">
                          <img
                            v-if="data.item.url_image"
                            :src="imageEndpoint + data.item.url_image"
                            alt="ManhLe"
                          />
                          <span
                            style="color: white"
                            v-else-if="data.item && data.item.name"
                            >{{ data.item.name.charAt(0).toUpperCase() }}</span
                          >
                          <v-icon v-else dark>mdi-account</v-icon>
                        </v-avatar>
                        {{ data.item.name }}
                      </v-chip>
                    </template>

                    <template v-slot:item="data">
                      <template>
                        <v-list-item-avatar color="indigo">
                          <img
                            v-if="data.item.url_image"
                            :src="imageEndpoint + data.item.url_image"
                            alt="ManhLe"
                          />
                          <span
                            style="color: white"
                            v-else-if="data.item && data.item.name"
                            >{{ data.item.name.charAt(0).toUpperCase() }}</span
                          >
                          <v-icon v-else dark>mdi-account</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>{{
                            data.item.name
                          }}</v-list-item-title>
                          <v-list-item-subtitle
                            >{{ data.item.email }} -
                            {{
                              data.item.so_dien_thoai
                                ? "SĐT: " + data.item.so_dien_thoai
                                : ""
                            }}</v-list-item-subtitle
                          >
                        </v-list-item-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <div class="d-flex">
                    <v-icon size="40" color="green darken-2">
                      mdi-calendar-clock
                    </v-icon>
                    <div class="pl-2">
                      <div class="title">Thời gian nghỉ thai sản</div>
                      <div>Vui lòng chọn thời gian nghỉ trên lịch bên phải</div>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="label-form">
                    Từ ngày: {{ formatDate(form.ngay_bat_dau) }}
                  </div>
                  <br />
                  <div class="label-form">
                    Đến ngày: {{ formatDate(form.ngay_ket_thuc) }}
                  </div>
                </v-col>
              </v-col>
              <v-col cols="5">
                <v-date-picker v-model="dates" range no-title></v-date-picker>
              </v-col>
            </v-row>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="pr-8 pb-3">
        <v-spacer></v-spacer>
        <v-btn text @click="show = false" class="mr-4">Đóng</v-btn>
        <v-btn
          :loading="btnLoading"
          color="primary"
          @click="themLichNghi"
          v-if="!edit"
        >
          <v-icon left>mdi-plus</v-icon>
          Thêm mới
        </v-btn>
        <v-btn
          :loading="btnLoading"
          color="primary"
          @click="capNhatLichNghi"
          v-else
        >
          <v-icon left>mdi-pencil</v-icon>
          Cập nhật
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { addLichNghi, editLichNghi } from "@/api/thaisan";
import { fullTextFilter } from "../../../utils/stringHelper";
import { getNhanVien } from "@/api/nhanvien";

export default {
  data: () => ({
    imageEndpoint: process.env.VUE_APP_BASE,
    show: false,
    edit: false,
    fullTextFilter,
    dates: [],
    people: [],
    btnLoading: false,
    form: {
      nhan_vien_id: null,
      ngay_bat_dau: null,
      ngay_ket_thuc: null,
    },

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
  mounted() {
    this.getListNhanVien();
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

    async getListNhanVien() {
      let data = await getNhanVien({
        perPage: 999,
      });
      this.people = data.data;
    },
    async showFormEdit(data) {
      this.edit = true;
      this.show = true;
      this.form = {
        id: data.id,
        nhan_vien_id: data.nhan_vien_id,
        ngay_bat_dau: data.ngay_bat_dau,
        ngay_ket_thuc: data.ngay_ket_thuc,
      };
      this.dates[0] = data.ngay_bat_dau
      this.dates[1] = data.ngay_ket_thuc
      this.getListNhanVien();
    },

    async themLichNghi() {
      this.$refs.form.validate();
      if (!this.form.ngay_bat_dau || !this.form.ngay_ket_thuc) {
        this.$toast.warning("Hãy chọn thời gian nghỉ", {
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
        return;
      }
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {
          await addLichNghi(this.form);
          this.show = false;
          this.btnLoading = false;
          this.$emit("on-done");
          this.$toast.info("Thêm lịch nghỉ thành công", {
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
      }
    },
    async capNhatLichNghi() {
      this.$refs.form.validate();
      if (!this.form.ngay_bat_dau || !this.form.ngay_ket_thuc) {
        this.$toast.warning("Hãy chọn thời gian nghỉ", {
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
        return;
      }
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {
          await editLichNghi(this.form);
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
      }
    },
  },
};
</script>
