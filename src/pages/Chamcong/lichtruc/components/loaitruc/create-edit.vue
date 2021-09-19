<template>
  <v-dialog v-model="show" persistent width="620">
    <v-card>
      <v-card-title class="headline">{{
        edit ? "CẬP NHẬT HÌNH THỨC TRỰC" : "THÊM HÌNH THỨC TRỰC"
      }}</v-card-title>
      <br />
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="7" class="zero-vertical">
              <div class="label-form">Tên loại hình thức trực</div>
              <v-text-field
                v-model="form.name"
                :rules="nameRules"
                placeholder="Nhập tên hình thức"
                outlined
                dense
                prepend-inner-icon="mdi-calendar-clock"
              ></v-text-field>
            </v-col>
            <v-col cols="5" class="zero-vertical">
              <div class="label-form">Mã loại</div>
              <v-text-field
                v-model="form.code"
                :rules="codeRules"
                placeholder="Nhập mã hình thức"
                outlined
                dense
                prepend-inner-icon="mdi-barcode"
              ></v-text-field>
            </v-col>
            <v-col cols="7" class="zero-vertical">
              <div class="label-form">Hệ số công</div>
              <v-text-field
                v-model="form.he_so"
                :rules="heSoRules"
                placeholder="Hệ số công"
                outlined
                type="number"
                dense
                prepend-inner-icon="mdi-lead-pencil"
              ></v-text-field>
            </v-col>
            <v-col cols="5" class="zero-vertical">
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
            <v-col cols="12" class="zero-vertical">
              <div class="label-form">Mô tả</div>
              <v-textarea
                placeholder="Mô tả"
                rows="2"
                dense
                outlined
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
          @click="themLoaiLichTruc"
          v-if="!edit"
        >
          <v-icon left>mdi-plus</v-icon>
          Thêm mới
        </v-btn>
        <v-btn
          :loading="btnLoading"
          color="primary"
          @click="capNhatLoaiLichTruc"
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
import { addLoaiTruc, editLoaiTruc } from "@/api/lichtruc";

export default {
  data: () => ({
    show: false,
    edit: false,
    btnLoading: false,
    form: {
      code: null,
      name: null,
      mo_ta: null,
      active: true,
      he_so: 1
    },
    actives: [
      { name: "Hoạt động", value: true },
      { name: "Ngừng hoạt động", value: false },
    ],
    nameRules: [
      (v) => !!v || "Tên hình thức không thể bỏ trống",
      (v) => (v && v.length >= 3) || "Tên hình thức tối thiểu 3 ký tự",
    ],
    codeRules: [
      (v) => !!v || "Mã hình thức không thể bỏ trống",
      (v) => (v && v.length >= 3) || "Mã hình thức tối thiểu 3 ký tự",
    ],
    heSoRules: [(v) => !!v || "Hệ số công không hợp lệ"],
  }),
  computed: {},

  methods: {
    showFormAdd() {
      this.show = true;
      this.edit = false;
      this.form = {
        code: null,
        name: null,
        mo_ta: null,
        active: true,
        he_so: 1
      };
    },
    async showFormEdit(data) {
      this.edit = true;
      this.show = true;
      this.form = { ...data };
    },
    async themLoaiLichTruc() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {
          await addLoaiTruc(this.form);
          this.show = false;
          this.btnLoading = false;
          this.$emit("on-done");
          this.$toast.info("Thêm mới thành công", {
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
    async capNhatLoaiLichTruc() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {
          await editLoaiTruc(this.form);
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
<style scoped>
.zero-vertical {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
</style>
