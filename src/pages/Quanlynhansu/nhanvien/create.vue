<template>
  <v-container fluid>
    <v-form ref="form">
      <v-row>
        <v-col lg="8" sm="12" md="8" xs="12">
          <v-card>
            <!-- <v-toolbar color="primary" dark flat>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>Thông tin nhân sự</v-toolbar-title>
          </v-toolbar> -->
            <v-card-title class="pt-4 pl-6">情報</v-card-title>
            <v-layout column class="pl-6 pr-6">
              <v-row>
                <v-col cols="5" class="zero-vertical">
                  <div class="label-form">
                    ユーザ名 <span style="color: red">(*)</span>
                  </div>
                  <v-text-field
                    v-model="form.name"
                    :rules="nameRules"
                    placeholder="Nhập họ tên nhân viên"
                    outlined
                    dense
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" class="zero-vertical">
                  <div class="label-form">Date of birth</div>
                  <v-menu
                    v-model="showPickNgaySinh"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.ngay_sinh"
                        prepend-inner-icon="mdi-calendar"
                        readonly
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.ngay_sinh"
                      @input="showPickNgaySinh = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="3" class="zero-vertical">
                  <div class="label-form">Sex</div>
                  <v-select
                    prepend-inner-icon="mdi-human"
                    v-model="form.gioi_tinh"
                    :items="gioiTinhs"
                    outlined
                    dense
                    item-text="name"
                    item-value="value"
                  >
                  </v-select>
                </v-col>
                <v-col cols="5" class="zero-vertical">
                  <div class="label-form">Place of birth</div>
                  <v-text-field
                    v-model="form.noi_sinh"
                    placeholder="Nơi sinh, quê quán"
                    outlined
                    dense
                    prepend-inner-icon="mdi-map-marker"
                  ></v-text-field>
                </v-col>
                <v-col cols="7" class="zero-vertical">
                  <div class="label-form">Adress</div>
                  <v-text-field
                    v-model="form.dia_chi_hien_tai"
                    placeholder="Chỗ ở hiện nay"
                    outlined
                    dense
                    prepend-inner-icon="mdi-map"
                  ></v-text-field>
                </v-col>
                <v-col cols="5" class="zero-vertical">
                  <div class="label-form">Phone</div>
                  <v-text-field
                    v-model="form.so_dien_thoai"
                    placeholder="Số điện thoại"
                    outlined
                    dense
                    prepend-inner-icon="mdi-phone"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" class="zero-vertical">
                  <div class="label-form">ID number</div>
                  <v-text-field
                    v-model="form.so_cmt"
                    placeholder="Số CMND"
                    outlined
                    dense
                    prepend-inner-icon="mdi-code-brackets"
                  ></v-text-field>
                </v-col>
                <v-col cols="3" class="zero-vertical">
                  <div class="label-form">Nơi cấp</div>
                  <v-text-field
                    v-model="form.noi_cap"
                    placeholder="Nơi cấp CMT"
                    outlined
                    dense
                    prepend-inner-icon="mdi-map-marker"
                  ></v-text-field>
                </v-col>

                <v-col cols="5" class="zero-vertical">
                  <div class="label-form">SĐT Người thân</div>
                  <v-text-field
                    v-model="form.so_dien_thoai_nguoi_than"
                    placeholder="Số điện thoại người thân"
                    outlined
                    dense
                    prepend-inner-icon="mdi-phone"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" class="zero-vertical">
                  <div class="label-form">Người giới thiệu</div>
                  <v-text-field
                    v-model="form.nguoi_gioi_thieu"
                    placeholder="Tên người giới thiệu"
                    outlined
                    dense
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>
                </v-col>
                <v-col cols="3" class="zero-vertical">
                  <div class="label-form">SĐT Người giới thiệu</div>
                  <v-text-field
                    v-model="form.so_dien_thoai_nguoi_gioi_thieu"
                    placeholder="SĐT Người giới thiệu"
                    outlined
                    dense
                    prepend-inner-icon="mdi-phone"
                  ></v-text-field>
                </v-col>

                <v-col cols="5" class="zero-vertical">
                  <div class="label-form">Ngày vào công ty</div>
                  <v-menu
                    v-model="showPickNgayLamViec"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.ngay_vao_cong_ty"
                        prepend-inner-icon="mdi-calendar"
                        readonly
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.ngay_vao_cong_ty"
                      @input="showPickNgayLamViec = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="4" class="zero-vertical">
                  <div class="label-form">Trình độ chuyên môn</div>
                  <v-text-field
                    v-model="form.trinh_do_chuyen_mon"
                    placeholder="Trình độ chuyên môn"
                    outlined
                    dense
                    prepend-inner-icon="mdi-decagram-outline"
                  ></v-text-field>
                </v-col>
                <v-col cols="3" class="zero-vertical">
                  <div class="label-form">Chuyên ngành</div>
                  <v-text-field
                    v-model="form.chuyen_nganh"
                    placeholder="Số CMND"
                    outlined
                    dense
                    prepend-inner-icon="mdi-book"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-layout>
            <v-card-title class="pl-6">Vị trí làm việc</v-card-title>
            <v-layout column class="pl-6 pr-6">
              <v-row>
                <v-col cols="5" class="zero-vertical">
                  <div class="label-form">
                    Phòng ban <span style="color: red">(*)</span>
                  </div>
                  <v-select
                    prepend-inner-icon="mdi-home"
                    :rules="phongBanRules"
                    v-model="form.phong_ban_id"
                    :items="phongBans"
                    outlined
                    dense
                    item-text="name"
                    item-value="id"
                    @change="getNhomTo"
                  >
                  </v-select>
                </v-col>
                <v-col cols="4" class="zero-vertical">
                  <div class="label-form">Chức vụ</div>
                  <v-select
                    prepend-inner-icon="mdi-account-convert"
                    v-model="form.chuc_vu_id"
                    :items="chucVus"
                    outlined
                    dense
                    item-text="name"
                    item-value="id"
                  >
                  </v-select>
                </v-col>
                <v-col cols="3" class="zero-vertical">
                  <div class="label-form">Nhóm tổ</div>
                  <v-select
                    prepend-inner-icon="mdi-account-multiple-outline"
                    v-model="form.nhom_to_id"
                    :items="nhomTos"
                    outlined
                    dense
                    item-text="name"
                    item-value="id"
                  >
                  </v-select>
                </v-col>

                <v-col cols="5" class="zero-vertical">
                  <div class="label-form">Mã số thuế</div>
                  <v-text-field
                    v-model="form.ma_so_thue"
                    placeholder="Mã số thuế"
                    outlined
                    dense
                    prepend-inner-icon="mdi-barcode"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" class="zero-vertical">
                  <div class="label-form">Tài khoản ngân hàng</div>
                  <v-text-field
                    v-model="form.tai_khoan_ngan_hang"
                    placeholder="Số TK ngân hàng"
                    outlined
                    dense
                    prepend-inner-icon="mdi-code-braces"
                  ></v-text-field>
                </v-col>
                <v-col cols="3" class="zero-vertical">
                  <div class="label-form">Ngân hàng</div>
                  <v-text-field
                    v-model="form.ngan_hang"
                    placeholder="Tên ngân hàng - Chi nhánh"
                    outlined
                    dense
                    prepend-inner-icon="mdi-bank"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-layout>
          </v-card>
        </v-col>
        <v-col sm="12" lg="4" md="4" xs="12">
          <v-card>
            <!-- <v-toolbar color="primary" dark flat>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>Tài khoản người dùng</v-toolbar-title>
          </v-toolbar> -->
            <v-img height="230px" :src="masterialPic">
              <v-card-text>
                <v-layout column class="align-center">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-avatar
                        size="200"
                        style="border: 4px solid white"
                        v-bind="attrs"
                        v-on="on"
                        @click="uploadAvatar"
                      >
                        <img
                          :src="
                            form.url_image
                              ? imageEndpoint + form.url_image
                              : avatarNone
                          "
                          alt="ManhLe"
                        />
                        <v-btn
                          color="blue"
                          fab
                          x-small
                          style="position: absolute; top: 155px; right: 50px"
                        >
                          <v-icon color="white">mdi-pencil</v-icon>
                        </v-btn>
                      </v-avatar>
                    </template>
                    <span>Upload Ảnh đại diện</span>
                  </v-tooltip>
                </v-layout>
                <input
                  name="file"
                  ref="upload-image"
                  style="display: none"
                  type="file"
                  @change="handleUpload($event)"
                />
              </v-card-text>
            </v-img>
            <v-layout column class="align-center">
              <v-layout align-center>
                <v-text-field
                  placeholder="E-Mail"
                  prepend-inner-icon="mdi-email"
                  v-model="form.email"
                  :rules="emailRules"
                ></v-text-field>
                <span style="color: red" class="pl-6">(*)</span>
              </v-layout>
              <v-layout align-center>
                <v-text-field
                  style="width: 70%"
                  placeholder="代表者名"
                  prepend-inner-icon="mdi-account"
                  v-model="form.user_name"
                  :rules="userNameRules"
                ></v-text-field>
                <span style="color: red" class="pl-6">(*)</span>
              </v-layout>
              <br />
              <!-- <div class="pb-4 pt-6">
                Mật khẩu đăng nhập mặc định:
                <span style="font-weight: bold; font-style: italic"
                  >12345678</span
                >
              </div> -->
            </v-layout>
          </v-card>
          <v-card class="mx-auto mt-3">
            <v-card-title>Ghi chú</v-card-title>
            <v-card-text>
              <v-textarea
                class="mx-2"
                v-model="form.ghi_chu"
                filled
                rows="2"
                prepend-icon="mdi-comment"
              ></v-textarea>
            </v-card-text>
          </v-card>
          <div class="mt-3 d-flex">
            <router-link to="/nhansu/nhanvien">
              <v-btn tile color="orange">
                <v-icon left>mdi-keyboard-backspace </v-icon>
                Quay lại
              </v-btn>
            </router-link>
            <v-spacer></v-spacer>
            <v-btn tile color="success" @click="submitUpdate" v-if="editing">
              <v-icon left>mdi-account-edit</v-icon>
              Cập nhật
            </v-btn>
            <v-btn tile color="success" @click="submit" v-else>
              <v-icon left>mdi-account-plus </v-icon>
              Thêm mới
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import avatarNone from "../../../../docs/img/avatar_none.png";
import masterialPic from "../../../../docs/img/masterial.png";
import { uploadAvatar } from "@/api/user";
import { getPhongBan } from "@/api/phongban";
import { getDanhMucCon } from "@/api/danhmuc";
import { getNhomToTrucThuoc } from "@/api/nhomto";
import { addNhanVien, showNhanVien, editNhanVien } from "@/api/nhanvien";

export default {
  data: () => ({
    showPickNgaySinh: false,
    date: null,
    showPickNgayLamViec: false,
    gioiTinhs: [
      { name: "Nam", value: true },
      { name: "Nữ", value: false },
    ],
    editing: false,
    phongBans: [],
    nhomTos: [],
    chucVus: [],
    avatarNone,
    masterialPic,
    tab: null,
    imageEndpoint: process.env.VUE_APP_BASE,
    btnLoading: false,
    nameRules: [
      (v) => !!v || "Tên nhân viên không thể bỏ trống",
      (v) => (v && v.length >= 2) || "Tên Nhân viên tối thiểu 2 ký tự",
    ],
    phongBanRules: [(v) => !!v || "Hãy chọn một phòng ban!"],
    userNameRules: [
      (v) => !!v || "Tên đăng nhập không thể bỏ trống",
      (v) => (v && v.length >= 3) || "Tên đăng nhập tối thiểu 3 ký tự",
    ],
    emailRules: [
      (v) => !!v || "E-Mail không thể bỏ trống",
      (v) => /.+@.+\..+/.test(v) || "E-mail không hợp lệ",
    ],
    form: {
      email: "",
      user_name: "",
      name: "",
      ngay_sinh: null,
      gioi_tinh: true,
      noi_sinh: "",
      dia_chi_hien_tai: "",
      so_dien_thoai: "",
      so_cmt: "",
      noi_cap: "",
      ngay_vao_cong_ty: "",
      trinh_do_truyen_mon: null,
      chuyen_nganh: null,
      phong_ban_id: null,
      chuc_vu_id: null,
      nhom_to_id: null,
      ma_so_thue: "",
      tai_khoan_ngan_hang: "",
      ngan_hang: "",
      url_image: "",
      trinh_do_chuyen_mon: "",
      ghi_chu: "",
      so_dien_thoai_nguoi_gioi_thieu: "",
      nguoi_gioi_thieu: "",
      so_dien_thoai_nguoi_than: "",
    },
  }),

  mounted() {
    this.getDanhMuc();
    this.getNhanVienEdit();
  },
  methods: {
    uploadAvatar() {
      this.$refs["upload-image"].click();
    },
    async handleUpload(e) {
      let files = e.target.files;
      let data = new FormData();
      data.append("file", files[0]);

      var filePath = files[0].name.split(".").pop(); //lấy định dạng file
      var dinhDangChoPhep = ["jpg", "jpeg", "png"]; //các tập tin cho phép
      const isLt2M = files[0].size / 1024 / 1024 < 20;
      if (!isLt2M) {
        this.form.fileList.pop();
        this.$toast.warning("Kích thước file ảnh tối đa 20Mb!", {
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
      if (!dinhDangChoPhep.find((el) => el == filePath.toLowerCase())) {
        this.loadingUpload = false;
        this.listLoading = false;
        this.iconUpload = "el-icon-bottom";
        this.$toast.warning("Tập tin không hợp lệ!", {
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
      try {
        let imageUrl = await uploadAvatar(data);
        this.form.url_image = imageUrl;
      } catch (error) {
        console.log(error);
      }
      this.$refs["upload-image"].value = null;
    },
    async submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {
          await addNhanVien(this.form);
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
    async getDanhMuc() {
      let phongbans = await getPhongBan({
        perPage: 999,
      });
      this.chucVus = await getDanhMucCon({ code: "CHUCVU" });
      this.phongBans = phongbans.data;
    },
    async getNhomTo() {
      let data = await getNhomToTrucThuoc({
        phong_ban_id: this.form.phong_ban_id,
      });
      this.nhomTos = data;
    },
    async getNhanVienEdit() {
      let id = this.$route.params.id;
      this.editing = false;
      if (id) {
        this.editing = true;
        let data = await showNhanVien({ nhanVienId: id });
        this.form = { ...data.data };
        this.$emit("set-name", this.form.name);
        await this.getDanhMuc();
        await this.getNhomTo();
      } else return;
    },
    async submitUpdate() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {
          await editNhanVien(this.form);
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
