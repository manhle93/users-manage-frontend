<template>
  <v-dialog v-model="show" persistent width="600">
    <v-card>
      <v-card-title class="headline">{{
        edit ? "CẬP NHẬT CA TRỰC" : "THÊM CA TRỰC"
      }}</v-card-title>
      <br />
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="6" class="zero-vertical">
              <div class="label-form">Thời gian bắt đầu</div>
              <v-datetime-picker
                v-model="form.bat_dau"
                outlined
                dense
                dateFormat="dd/MM/yyyy"
              >
                <template v-slot:dateIcon> Ngày</template>
                <template v-slot:timeIcon> Giờ</template>
              </v-datetime-picker>
            </v-col>
            <v-col cols="6" class="zero-vertical">
              <div class="label-form">Thời gian kết thúc</div>
              <v-datetime-picker
                v-model="form.ket_thuc"
                outlined
                dense
                dateFormat="dd/MM/yyyy"
              >
                <template v-slot:dateIcon> Ngày</template>
                <template v-slot:timeIcon> Giờ</template>
              </v-datetime-picker>
            </v-col>
            <v-col cols="6" class="zero-vertical">
              <div class="label-form">Loại hình trực</div>
              <v-select
                v-model="form.loai_truc_id"
                :items="loaiTrucs"
                :rules="loaiHinhRules"
                outlined
                dense
                item-text="name"
                item-value="id"
                prepend-inner-icon="mdi-calendar-clock"
              >
              </v-select>
            </v-col>
            <v-col cols="6" class="zero-vertical">
              <div class="label-form">Trưởng ca trực</div>
              <v-autocomplete
                v-model="form.user_id_truong_ca"
                prepend-inner-icon="mdi-account"
                :items="people"
                outlined
                single-line
                dense
                placeholder="Nhân viên"
                item-text="name"
                item-value="user_id"
                :filter="fullTextFilter"
                clearable
                @change="chonTruongCa"
              >
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
            <v-col cols="12" class="zero-vertical">
              <div class="label-form">Nhân viên tham gia</div>
              <v-autocomplete
                v-model="form.users"
                prepend-inner-icon="mdi-account-multiple"
                :items="people"
                :rules="nhanVienRules"
                chips
                placeholder="Người tham gia trực"
                item-text="name"
                item-value="user_id"
                multiple
                :filter="fullTextFilter"
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="remove(data.item)"
                  >
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
            <v-col cols="12" class="zero-vertical">
              <div class="label-form">Ghi chú</div>
              <v-textarea
                v-model="form.ghi_chu"
                placeholder="Ghi chú"
                outlined
                dense
                prepend-inner-icon="mdi-grease-pencil"
                rows="2"
              ></v-textarea>
            </v-col>
            <v-col cols="12" class="zero-vertical">
              <div class="label-form">Phân công</div>
              <v-textarea
                v-model="form.phan_cong"
                placeholder="Trưởng ca phân công"
                outlined
                dense
                prepend-inner-icon="mdi-book-open-page-variant"
                rows="2"
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
          @click="themLichTruc"
          v-if="!edit"
        >
          <v-icon left>mdi-plus</v-icon>
          Thêm mới
        </v-btn>
        <v-btn
          :loading="btnLoading"
          color="primary"
          @click="capNhatLichTruc"
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
import { getNhanVien } from "@/api/nhanvien";
import { fullTextFilter } from "../../../../../utils/stringHelper";
import { getLoaiTruc, addLichTruc, editLichTruc } from "@/api/lichtruc";

export default {
  data: () => ({
    imageEndpoint: process.env.VUE_APP_BASE,
    fullTextFilter,
    show: false,
    edit: false,
    iconParentMenu: "mdi-menu",
    parentMenus: [],
    roles: [],
    btnLoading: false,
    form: {
      bat_dau: null,
      ket_thuc: null,
      ghi_chu: null,
      phan_cong: null,
      loai_truc_id: null,
      user_id_truong_ca: null,
      users: [],
    },
    loaiTrucs: [],
    people: [],
    actives: [
      { name: "Hoạt động", value: true },
      { name: "Ngừng hoạt động", value: false },
    ],
    nameRules: [
      (v) => !!v || "Tên khu vực không thể bỏ trống",
      (v) => (v && v.length >= 3) || "Tên khu vực tối thiểu 3 ký tự",
    ],
    loaiHinhRules: [(v) => !!v || "Loại hình không thể bỏ trống"],
    nhanVienRules: [
      (v) => !!v || "Hãy chọn nhân viên tham gia trực",
      (v) => (v && v.length > 0) || "Hãy chọn nhân viên tham gia trực",
    ],
  }),
  mounted() {
    this.getListNhanVien();
    this.getLoaiTruc();
  },
  methods: {
    showFormAdd() {
      this.show = true;
      this.edit = false;
      this.form = {
        bat_dau: new Date(),
        ket_thuc: new Date(),
        ghi_chu: null,
        phan_cong: null,
        loai_truc_id: null,
        user_id_truong_ca: null,
        users: [],
      };
    },
    async showFormEdit(data) {
      this.edit = true;
      this.show = true;
      this.form = { ...data };
      this.form.bat_dau = new Date(data.bat_dau)
      this.form.ket_thuc = new Date(data.ket_thuc)
      this.form.users = []
      data.nhan_viens.forEach(el => {
        this.form.users.push(el.id)
      })
    },

    async themLichTruc() {
      this.$refs.form.validate();
      let check = this.checkTime();
      if (!check) return;
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {
          await addLichTruc(this.form);
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
    async capNhatLichTruc() {
      this.$refs.form.validate();
      let check = this.checkTime();
      if (!check) return;
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {
          await editLichTruc(this.form);
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
    async getListNhanVien() {
      let data = await getNhanVien({
        perPage: 999,
      });
      this.people = data.data;
      console.log(this.people);
    },
    async getLoaiTruc() {
      let data = await getLoaiTruc({
        perPage: 999,
      });
      this.loaiTrucs = data.data;
    },
    remove(item) {
      const index = this.form.users.indexOf(item.user_id);
      if (index >= 0) this.form.users.splice(index, 1);
    },
    chonTruongCa() {
      if (
        this.form.user_id_truong_ca &&
        !this.form.users.includes(this.form.user_id_truong_ca)
      ) {
        this.form.users.push(this.form.user_id_truong_ca);
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
<style scoped>
.zero-vertical {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
</style>