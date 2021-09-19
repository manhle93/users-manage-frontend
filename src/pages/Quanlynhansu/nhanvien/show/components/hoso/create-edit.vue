<template>
  <v-dialog v-model="show" persistent width="600">
    <v-card>
      <v-card-title class="headline">{{
        edit ? "CẬP NHẬT HỒ SƠ" : "THÊM HỒ SƠ"
      }}</v-card-title>
      <br />
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" class="zero-vertical">
              <div class="label-form">Loại hồ sơ</div>
              <v-text-field
                v-model="form.gia_tri"
                :rules="numberRules"
                placeholder="Nhập tham số"
                outlined
                type="number"
                dense
                prepend-inner-icon="mdi-pencil"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="zero-vertical">
              <div class="label-form">Ghi chú</div>
              <v-textarea
                v-model="form.ghi_chu"
                placeholder="Ghi chú"
                outlined
                dense
                prepend-inner-icon="mdi-grease-pencil"
                rows="3"
              ></v-textarea>
            </v-col>
            <v-col cols="12" class="zero-vertical">
              <div class="label-form">Tệp đính kèm</div>
              <div class='file-container'>
                <div style="background: #B9F6CA" class='box-file align-center justify-center mr-6 ml-2'>
                  <v-icon large color="green darken-2"> mdi-plus </v-icon>
                </div>
                <div class='box-file align-center justify-center mr-6 mb-4 ml-2' v-for="(item, index) in files" :key="index">
                  <v-icon large color="green darken-2"> mdi-book</v-icon>
                  <div>Tập tin {{index+1}}</div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="pr-8 pb-3">
        <v-spacer></v-spacer>
        <v-btn text @click="show = false" class="mr-4">Đóng</v-btn>
        <v-btn :loading="btnLoading" color="primary" @click="capNhatThamSo">
          <v-icon left>mdi-pencil</v-icon>
          Cập nhật
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { capNhatCauHinh } from "@/api/thamsohethong";

export default {
  data: () => ({
    btnLoading: false,
    name: "",
    edit: false,
    show: false,
    files: [1,2,3,45,6,7,8,9,0,654,565,46,7],
    form: {
      code: null,
      gia_tri: null,
      don_vi: null,
      name: "",
    },
    actives: [
      { name: "Hoạt động", value: true },
      { name: "Ngừng hoạt động", value: false },
    ],
    numberRules: [
      (v) => !!v || "Giá trị không hợp lệ",
      (v) => (v && v >= 0) || "Giá trị phải lơn hơn 0",
    ],
  }),
  computed: {},
  methods: {
    async showFormEdit(data) {
      this.show = true;
      this.form = { ...data };
    },
    showFormAdd() {
      this.show = true;
      this.edit = false;
    },

    async capNhatThamSo() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {
          await capNhatCauHinh(this.form);
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
.box-file {
    height: 100px;
    width: 100px;
    display: flex;
    flex-direction: column;
    background: #CFD8DC;
}
.file-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap
}
</style>