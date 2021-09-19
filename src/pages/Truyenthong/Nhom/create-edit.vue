<template>
  <v-dialog v-model="show" persistent width="620">
    <v-card>
      <v-card-title class="headline">{{
        edit ? "CẬP NHẬT NHÓM" : "THÊM NHÓM"
      }}</v-card-title>
      <br />
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12">
              <div class="label-form">Tên nhóm</div>
              <v-text-field
                v-model="form.name"
                :rules="nameRules"
                placeholder="Nhập tên phòng ban"
                outlined
                dense
                prepend-inner-icon="mdi-home-variant"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <div class="label-form">Mô tả nhóm</div>
              <v-textarea
                placeholder="Mô tả về nhóm"
                rows="2"
                outlined
                dense
                prepend-inner-icon="mdi-note"
                v-model="form.mo_ta"
              ></v-textarea>
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
          @click="themPhongBan"
          v-if="!edit"
        >
          <v-icon left>mdi-plus</v-icon>
          Thêm mới
        </v-btn>
        <v-btn
          :loading="btnLoading"
          color="primary"
          @click="capNhatPhongBan"
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
import { addNhom,editNhom } from "@/api/nhom";

export default {
  data: () => ({
    show: false,
    edit: false,
    iconParentMenu: "mdi-menu",
    parentMenus: [],
    roles: [],
    btnLoading: false,
    form: {
      name: null,
      mo_ta: null,
    },
    actives: [
      { name: "Hoạt động", value: true },
      { name: "Ngừng hoạt động", value: false },
    ],
    nameRules: [
      (v) => !!v || "Tên nhóm ban không thể bỏ trống",
      (v) => (v && v.length >= 3) || "Tên nhóm tối thiểu 3 ký tự",
    ],
  }),
  computed: {},
  methods: {
    showFormAdd() {
      this.show = true;
      this.edit = false;
      this.form = {
        mo_ta: null,
        name: null,
      };
    },
    async showFormEdit(data) {
      this.edit = true;
      this.show = true;
      console.log(data)
      this.form = { ...data };
    },

    async themPhongBan() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {
          await addNhom(this.form);
          this.show = false;
          this.btnLoading = false;
          this.$emit("on-done");
          this.$toast.info("Thêm nhóm thành công", {
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
    async capNhatPhongBan() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {
          await editNhom(this.form);
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
