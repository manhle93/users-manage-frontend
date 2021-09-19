<template>
  <v-dialog v-model="show" persistent width="620">
    <v-card>
      <v-card-title class="headline">{{
        edit ? "CẬP NHẬT TỔ - NHÓM" : "THÊM TỔ - NHÓM"
      }}</v-card-title>
      <br />
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="7">
              <div class="label-form">Tên Nhóm - Tổ</div>
              <v-text-field
                v-model="form.name"
                :rules="nameRules"
                placeholder="Nhập tên phòng ban"
                outlined
                dense
                prepend-inner-icon="mdi-home-variant"
              ></v-text-field>
            </v-col>
            <v-col cols="5">
              <div class="label-form">Mã Nhóm - Tổ</div>
              <v-text-field
                v-model="form.code"
                :rules="codeRules"
                placeholder="Nhập mã phòng ban"
                outlined
                dense
                prepend-inner-icon="mdi-barcode"
              ></v-text-field>
            </v-col>

            <v-col cols="7">
              <div class="label-form">Trực thuộc Phòng ban</div>
              <v-select
                v-model="form.phong_ban_id"
                :items="phongBans"
                outlined
                dense
                item-text="name"
                item-value="id"
                prepend-inner-icon="mdi-home"
              >
              </v-select>
            </v-col>
            <v-col cols="5">
              <div class="label-form">Số điện thoại</div>
              <v-text-field
                v-model="form.so_dien_thoai"
                placeholder="Nhập SĐT"
                outlined
                dense
                prepend-inner-icon="mdi-phone-classic"
              ></v-text-field>
            </v-col>

            <v-col cols="7">
              <div class="label-form">Người liên hệ</div>
              <v-text-field
                v-model="form.nguoi_lien_he"
                placeholder="Họ tên người liên hệ"
                outlined
                dense
                prepend-inner-icon="mdi-account"
              ></v-text-field>
            </v-col>
            <v-col cols="5">
              <div class="label-form">Trạng thái</div>
              <v-select
                v-model="form.active"
                :items="actives"
                outlined
                dense
                item-text="name"
                item-value="value"
                :prepend-inner-icon="
                  form.active
                    ? 'mdi-checkbox-marked-circle-outline'
                    : 'mdi-close'
                "
              >
              </v-select>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="pr-8 pb-3">
        <v-spacer></v-spacer>
        <v-btn text @click="show = false" class="mr-4">Đóng</v-btn>
        <v-btn
          :loading="btnLoading"
          color="primary"
          @click="themNhomTo"
          v-if="!edit"
        >
          <v-icon left>mdi-plus</v-icon>
          Thêm mới
        </v-btn>
        <v-btn :loading="btnLoading" color="primary" @click="capNhatNhomTo" v-else>
          <v-icon left>mdi-pencil</v-icon>
          Cập nhật
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>

import {addNhomTo, editNhomTo} from "@/api/nhomto";
import { getPhongBan } from "@/api/phongban";

export default {
  data: () => ({
    show: false,
    edit: false,
    btnLoading: false,
    phongBans: [],
    form: {
      code: null,
      name: null,
      phong_ban_id: null,
      so_dien_thoai: null,
      nguoi_lien_he: null,
      active: true,
    },
    actives: [
      { name: "Hoạt động", value: true },
      { name: "Ngừng hoạt động", value: false },
    ],
    nameRules: [
      (v) => !!v || "Tên Nhóm tổ không thể bỏ trống",
      (v) => (v && v.length >= 3) || "Tên Nhóm tổ tối thiểu 3 ký tự",
    ],
    codeRules: [
      (v) => !!v || "Mã Nhóm tổ không thể bỏ trống",
      (v) => (v && v.length >= 3) || "Mã Nhóm tổ tối thiểu 3 ký tự",
    ],
    emailRules: [(v) => /.+@.+\..+/.test(v) || "E-mail không hợp lệ"],
  }),
  computed: {},

  methods: {
    showFormAdd() {
      this.show = true;
      this.edit = false;
      this.form = {
        code: null,
        name: null,
        phong_ban_id: null,
        so_dien_thoai: null,
        nguoi_lien_he: null,
        active: true,
      };
      this.getDanhSachPhongBan()
    },
    async showFormEdit(data) {
      this.edit = true;
      this.show = true;
      this.form = { ...data };
      this.getDanhSachPhongBan()
    },
    async getDanhSachPhongBan() {
      let data = await getPhongBan({
        perPage: 9999999,
      });
      this.phongBans = data.data;
    },
    async themNhomTo() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {
          await addNhomTo(this.form);
          this.show = false;
          this.btnLoading = false;
          this.$emit("on-done");
          this.$toast.info("Thêm phòng ban thành công", {
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
    async capNhatNhomTo() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {
          await editNhomTo(this.form);
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
