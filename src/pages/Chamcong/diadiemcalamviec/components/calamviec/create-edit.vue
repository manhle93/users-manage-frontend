<template>
  <v-dialog v-model="show" persistent width="620">
    <v-card>
      <v-card-title class="headline">{{
        edit ? "CẬP NHẬT CA LÀM VIỆC" : "THÊM CA LÀM VIỆC"
      }}</v-card-title>
      <br />
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="8" class="zero-vertical">
              <div class="label-form">Tên ca</div>
              <v-text-field
                v-model="form.name"
                :rules="nameRules"
                placeholder="Nhập tên ca"
                outlined
                dense
                prepend-inner-icon="mdi-calendar-clock"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="zero-vertical">
              <div class="label-form">Hệ số công</div>
              <v-text-field
                v-model="form.he_so"
                :rules="heSoRules"
                placeholder="Hệ số tính công"
                outlined
                type="number"
                dense
                prepend-inner-icon="mdi-grease-pencil"
              ></v-text-field>
            </v-col>

            <v-col cols="6" class="zero-vertical">
              <div class="label-form">Thời gian bắt đầu</div>
              <v-text-field
                v-model="form.bat_dau"
                placeholder="Giờ bắt đầu"
                type="time"
                outlined
                dense
                prepend-inner-icon="mdi-clock"
              ></v-text-field>
            </v-col>
            <v-col cols="6" class="zero-vertical">
              <div class="label-form">Thời gian kết thúc</div>
              <v-text-field
                v-model="form.ket_thuc"
                placeholder="Giờ kết thúc"
                type="time"
                outlined
                dense
                prepend-inner-icon="mdi-clock"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="zero-vertical">
              <div class="label-form">Ghi chú</div>
              <v-textarea
                placeholder="Ghi chú về ca trực"
                rows="2"
                outlined
                dense
                prepend-inner-icon="mdi-note"
                v-model="form.ghi_chu"
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
          @click="themCa"
          v-if="!edit"
        >
          <v-icon left>mdi-plus</v-icon>
          Thêm mới
        </v-btn>
        <v-btn :loading="btnLoading" color="primary" @click="capNhatCa" v-else>
          <v-icon left>mdi-pencil</v-icon>
          Cập nhật
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { addCa, editCa } from "@/api/calamviec";

export default {
  data: () => ({
    show: false,
    edit: false,
    btnLoading: false,
    phongBans: [],
    form: {
      he_so: 1,
      name: null,
      bat_dau: null,
      ket_thuc: null,
      ghi_chu: null,
    },
    actives: [
      { name: "Hoạt động", value: true },
      { name: "Ngừng hoạt động", value: false },
    ],
    nameRules: [
      (v) => !!v || "Tên ca không thể bỏ trống",
      (v) => (v && v.length >= 3) || "Tên ca tối thiểu 3 ký tự",
    ],
    heSoRules: [(v) => !!v || "Hệ số không hợp lệ"],
    emailRules: [(v) => /.+@.+\..+/.test(v) || "E-mail không hợp lệ"],
  }),
  computed: {},

  methods: {
    showFormAdd() {
      this.show = true;
      this.edit = false;
      this.form = {
        he_so: 1,
        name: null,
        bat_dau: null,
        ket_thuc: null,
        ghi_chu: null,
      };
    },
    async showFormEdit(data) {
      this.edit = true;
      this.show = true;
      this.form = { ...data };
    },
    async themCa() {
      this.$refs.form.validate();
      let check = this.checkTime();
      if (!check) return;
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {
          await addCa(this.form);
          this.show = false;
          this.btnLoading = false;
          this.$emit("on-done");
          this.$toast.info("Thêm ca thành công", {
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
    async capNhatCa() {
      this.$refs.form.validate();
      let check = this.checkTime();
      if (!check) return;
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {
          await editCa(this.form);
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
    checkTime() {
      if (!this.form.bat_dau || !this.form.ket_thuc) {
        this.$toast.warning("Hãy nhập thời gian bắt đầu và kết thúc !", {
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
        return false;
      }
      if (new Date(this.form.bat_dau) > new Date(this.form.ket_thuc)) {
        this.$toast.warning(
          "Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc !",
          {
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
          }
        );
        return false;
      }
      return true;
    },
  },
};
</script>
