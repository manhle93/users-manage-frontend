<template>
  <v-dialog v-model="show" persistent width="400">
    <v-card>
      <v-card-title class="headline">CẬP NHẬT THAM SỐ</v-card-title>
      <br />
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12">
              <div style="font-size: 18px; color: black">{{form.name}}</div>
            </v-col>
            <v-col cols="12">
              <div class="label-form">Giá trị cho phép - {{form.don_vi}}</div>
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
    show: false,
    form: {
      code: null,
      gia_tri: null,
      don_vi: null,
      name: ''
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
