<template>
  <v-dialog v-model="show" persistent width="800">
    <v-card>
      <v-card-title class="headline">{{
        edit ? "CẬP NHẬT ĐỊA ĐIỂM" : "THÊM ĐỊA ĐIỂM"
      }}</v-card-title>
      <br />
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="5" class="zero-vertical">
              <div class="label-form">Tên khu vực</div>
              <v-text-field
                v-model="form.name"
                :rules="nameRules"
                placeholder="Nhập tên khu vực"
                outlined
                dense
                prepend-inner-icon="mdi-map"
              ></v-text-field>
            </v-col>
            <v-col cols="3" class="zero-vertical">
              <div class="label-form">Hệ số công</div>
              <v-text-field
                v-model="form.he_so"
                :rules="heSoRules"
                placeholder="Hệ số tính công"
                type="number"
                outlined
                dense
                prepend-inner-icon="mdi-calendar-check"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="zero-vertical">
              <div class="label-form">Thời gian đi đường (phút)</div>
              <v-text-field
                v-model="form.thoi_gian_di_duong"
                :rules="heSoRules"
                placeholder="Số phút đi đường"
                type="number"
                outlined
                dense
                prepend-inner-icon="mdi-clock"
              ></v-text-field>
            </v-col>
            <v-col cols="8" class="zero-vertical">
              <div class="label-form">Địa chỉ khu vực</div>
              <v-text-field
                v-model="form.dia_chi"
                placeholder="Nhập địa chỉ khu vực"
                outlined
                dense
                prepend-inner-icon="mdi-map-marker"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="zero-vertical">
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
            <v-col cols="6" class="zero-vertical">
              <div class="label-form">Kinh độ</div>
              <v-text-field
                v-model="form.long"
                :rules="latLongRules"
                disabled
                placeholder="Vui lòng chọn vị trí trên bản đồ"
                outlined
                dense
                prepend-inner-icon="mdi-map-marker"
              ></v-text-field>
            </v-col>
            <v-col cols="6" class="zero-vertical">
              <div class="label-form">Vĩ độ</div>
              <v-text-field
                v-model="form.lat"
                :rules="latLongRules"
                disabled
                placeholder="Vui lòng chọn vị trí trên bản đồ"
                outlined
                dense
                prepend-inner-icon="mdi-map-marker"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <tracking-map
                ref="map"
                @get-address="(addr) => handleMap(addr)"
              ></tracking-map>
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
          @click="themDiaDiem"
          v-if="!edit"
        >
          <v-icon left>mdi-plus</v-icon>
          Thêm mới
        </v-btn>
        <v-btn
          :loading="btnLoading"
          color="primary"
          @click="capNhatDiaDiem"
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
import { addDiaDiem, editDiaDiem } from "@/api/diadiem";
import TrackingMap from "./map";

export default {
  components: {
    TrackingMap,
  },
  data: () => ({
    show: false,
    edit: false,
    iconParentMenu: "mdi-menu",
    parentMenus: [],
    roles: [],
    btnLoading: false,
    form: {
      name: null,
      he_so: 1,
      dia_chi: null,
      lat: null,
      long: null,
      active: true,
      thoi_gian_di_duong: 0
    },
    actives: [
      { name: "Hoạt động", value: true },
      { name: "Ngừng hoạt động", value: false },
    ],
    nameRules: [
      (v) => !!v || "Tên khu vực không thể bỏ trống",
      (v) => (v && v.length >= 3) || "Tên khu vực tối thiểu 3 ký tự",
    ],
    heSoRules: [(v) => !!v || "Hệ số không hợp lệ"],
    latLongRules: [(v) => !!v || "Hãy chọn một địa điểm trên bản đồ"],
  }),
  computed: {},
  methods: {
    showFormAdd() {
      this.show = true;
      this.edit = false;
      this.form = {
        name: null,
        he_so: 1,
        dia_chi: null,
        lat: null,
        long: null,
        active: true,
        thoi_gian_di_duong: 0
      };
    },
    async showFormEdit(data) {
      this.edit = true;
      this.show = true;
      this.form = { ...data };
      var map = await this.$refs;
      map.map.setMarker({ lat: data.lat, long: data.long });
    },

    async themDiaDiem() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {
          await addDiaDiem(this.form);
          this.show = false;
          this.btnLoading = false;
          this.$emit("on-done");
          this.$toast.info("Thêm địa điểm thành công", {
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
    async capNhatDiaDiem() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {
          await editDiaDiem(this.form);
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
    handleMap(data) {
      this.form.lat = data.lat;
      this.form.long = data.lng;
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