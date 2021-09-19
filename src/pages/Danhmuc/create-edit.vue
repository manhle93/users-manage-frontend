<template>
  <v-dialog v-model="show" persistent width="620">
    <v-card>
      <v-card-title class="headline">{{
        edit
          ? "CẬP NHẬT " + title.toUpperCase()
          : "THÊM MỚI " + title.toUpperCase()
      }}</v-card-title>
      <br />
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="7">
              <div class="label-form">Tên {{ title }}</div>
              <v-text-field
                v-model="form.name"
                :rules="nameRules"
                placeholder="Nhập tên chức vụ"
                outlined
                dense
                prepend-inner-icon="mdi-home-variant"
              ></v-text-field>
            </v-col>
            <v-col cols="5">
              <div class="label-form">Mã {{ title }}</div>
              <v-text-field
                :disabled="edit"
                v-model="form.code"
                :rules="codeRules"
                placeholder="Nhập mã chức vụ"
                outlined
                dense
                prepend-inner-icon="mdi-barcode"
              ></v-text-field>
            </v-col>
            <v-col cols="7">
              <div class="label-form">Thông tin mô tả</div>
              <v-textarea
                outlined
                rows="2"
                placeholder="Mô tả"
                v-model="form.mo_ta"
              ></v-textarea>
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
          @click="themMoi"
          v-if="!edit"
        >
          <v-icon left>mdi-plus</v-icon>
          Thêm mới
        </v-btn>
        <v-btn :loading="btnLoading" color="primary" @click="capNhat" v-else>
          <v-icon left>mdi-pencil</v-icon>
          Cập nhật
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { addDanhMuc, editDanhMuc } from "@/api/danhmuc";

export default {
  data: () => ({
    show: false,
    edit: false,
    iconParentMenu: "mdi-menu",
    parentMenus: [],
    roles: [],
    title: "",
    btnLoading: false,
    form: {
      parent_id: null,
      code: null,
      name: null,
      mo_ta: null,
      active: true,
    },
    actives: [
      { name: "Hoạt động", value: true },
      { name: "Ngừng hoạt động", value: false },
    ],
    nameRules: [
      (v) => !!v || "Tên không thể bỏ trống",
      (v) => (v && v.length >= 3) || "Tên thiểu 3 ký tự",
    ],
    codeRules: [
      (v) => !!v || "Mã không thể bỏ trống",
      (v) => (v && v.length >= 2) || "Mã tối thiểu 2 ký tự",
    ],
  }),
  computed: {},
  methods: {
    showFormAdd(data) {
      this.title = data.name;
      this.show = true;
      this.edit = false;
      this.form = {
        code: null,
        name: null,
        mo_ta: null,
        active: true,
      };
      this.form.parent_id = data.id;
    },
    async showFormEdit(data) {
      this.edit = true;
      this.show = true;
      this.form = { ...data };
    },

    async themMoi() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {
          await addDanhMuc(this.form);
          this.show = false;
          this.btnLoading = false;
          this.$emit("on-done");
          this.$toast.info("Thêm danh mục thành công", {
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
    async capNhat() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {
          await editDanhMuc(this.form);
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
