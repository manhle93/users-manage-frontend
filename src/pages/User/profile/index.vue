<template>
  <v-container>
    <v-list-item>
      <v-layout>
        <v-img
          max-height="100"
          max-width="100"
          :size="40"
          :src="UserPic"
          class="mr-4"
        ></v-img>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">
            情報</v-list-item-title
          >
          <v-list-item-subtitle
            >設定 情報</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-layout>
    </v-list-item>
    <v-progress-linear
      height="2"
      color="indigo"
      rounded
      class="mt-1"
      value="100"
    ></v-progress-linear>
    <br />
    <v-row>
      <v-col sm="12" lg="4" md="4" xs="12">
        <v-card>
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
                          USER.url_image
                            ? imageEndpoint + USER.url_image
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
                  <span>Upload your images</span>
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
            <v-card-title>{{ USER.name }}</v-card-title>
            <v-card-subtitle>{{ USER.email }}</v-card-subtitle>
            <v-btn rounded color="primary" dark small @click="changePass()">
              <v-icon left small> mdi-key </v-icon>
              Change password
            </v-btn>
          </v-layout>
          <v-card-title class="pt-0 pb-2 pl-8">情報</v-card-title>
          <v-layout column class="pl-8 pb-6">
            <div class="mb-2">
              Date created: <strong>{{ formatDate(USER.created_at) }}</strong>
            </div>
            <div class="mb-2">
              代表者名: <strong>{{ USER.user_name }}</strong>
            </div>
            <div class="mb-2">
              権限:
              {{
                USER && USER.role
                  ? USER.role.name + " - " + USER.role.description
                  : ""
              }}
            </div>
            <span></span>
          </v-layout>
        </v-card>
      </v-col>
      <v-col lg="8" sm="12" md="8" xs="12">
        <v-card>
          <v-toolbar color="indigo darken-3" dark flat>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>Your Office</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn> -->
            <template v-slot:extension>
              <v-tabs v-model="tab" align-with-title>
                <v-tabs-slider color="yellow"></v-tabs-slider>
                <v-tab>Update your information</v-tab>
                <v-tab>Office</v-tab>
                <v-tab>Group</v-tab>
              </v-tabs>
            </template>
          </v-toolbar>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-form ref="form">
                <div
                  class="d-flex"
                  style="width: 100%; justify-content: center"
                >
                  <div column class="pt-6" style="width: 50%">
                    <div class="label-form">代表者名</div>
                    <v-text-field
                      placeholder="Nhập họ và tên"
                      :rules="nameRules"
                      outlined
                      dense
                      prepend-inner-icon="mdi-account"
                      v-model="form.name"
                    ></v-text-field>
                    <div class="label-form">ユーザ名</div>
                    <v-text-field
                      placeholder="代表者名"
                      :rules="userNameRules"
                      outlined
                      dense
                      prepend-inner-icon="mdi-account"
                      v-model="form.user_name"
                    ></v-text-field>
                    <div class="label-form">E-Mail</div>
                    <v-text-field
                      placeholder="Nhập địa chỉ email"
                      :rules="emailRules"
                      outlined
                      dense
                      prepend-inner-icon="mdi-mail"
                      v-model="form.email"
                    ></v-text-field>
                    <div class="label-form">会社名</div>
                    <v-text-field
                      placeholder="Nhập tên công ty"
                      outlined
                      dense
                      prepend-inner-icon="mdi-home-modern"
                      v-model="form.company_name"
                    ></v-text-field>
                    <v-btn
                      class="mt-2 mb-2"
                      style="width: 100%"
                      color="indigo"
                      dark
                      @click="updateUser"
                    >
                      Update
                    </v-btn>
                  </div>
                </div>
              </v-form>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <!-- <v-card-text><Inbox /></v-card-text> -->
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <!-- <v-card-text><Nhom /></v-card-text> -->
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="showFormChangePass" persistent width="500">
      <v-card>
        <v-card-title class="headline">Change your password</v-card-title>
        <br />
        <v-card-text>
          <v-form ref="form">
            <div class="label-form">Current Password</div>
            <v-text-field
              type="password"
              v-model="changePassWord.currentPass"
              :rules="rulePass.currentPass"
              placeholder="Nhập mật khẩu hiện tại"
              outlined
              dense
              prepend-inner-icon="mdi-account-key"
            ></v-text-field>
            <div class="label-form">New Password</div>
            <v-text-field
              type="password"
              v-model="changePassWord.newPassWord"
              :rules="rulePass.newPassWord"
              placeholder="Nhập mật khẩu mới"
              outlined
              dense
              prepend-inner-icon="mdi-lock"
            ></v-text-field>
            <div class="label-form">Retype Password</div>
            <v-text-field
              type="password"
              v-model="changePassWord.reNewPassWord"
              :rules="[reNewPassWord]"
              placeholder="Nhập lại mật khẩu mới"
              outlined
              dense
              prepend-inner-icon="mdi-lock"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="showFormChangePass = false" class="mr-4"
            >Close</v-btn
          >
          <v-btn :loading="btnLoading" color="primary" @click="updatePass">
            <v-icon left>mdi-pencil</v-icon>
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import UserPic from "@/assets/images/users_manage.svg";
import { changePassword } from "@/api/user";
import avatarNone from "../../../../docs/img/avatar_none.png";
import masterialPic from "../../../../docs/img/masterial.png";
import { uploadAvatarProfile, updateMyUser } from "@/api/user";
export default {
  data: () => ({
    avatarNone,
    UserPic,
    masterialPic,
    tab: null,
    imageEndpoint: process.env.VUE_APP_BASE,
    showFormChangePass: false,
    changePassWord: {
      currentPass: null,
      newPassWord: null,
      reNewPassWord: null,
    },
    btnLoading: false,
    rulePass: {
      currentPass: [(v) => !!v || "Hãy nhập mật khẩu hiện tại"],
      newPassWord: [(v) => !!v || "Hãy nhập mật khẩu mới"],
    },
    form: {
      user_name: "",
      name: "",
      email: "",
      company_name: "",
    },
    nameRules: [
      (v) => !!v || "Tên nhân viên không thể bỏ trống",
      (v) => (v && v.length >= 2) || "Tên Nhân viên tối thiểu 2 ký tự",
    ],
    userNameRules: [
      (v) => !!v || "Tên đăng nhập không thể bỏ trống",
      (v) => (v && v.length >= 3) || "Tên đăng nhập tối thiểu 3 ký tự",
    ],
    emailRules: [
      (v) => !!v || "E-Mail không thể bỏ trống",
      (v) => /.+@.+\..+/.test(v) || "E-mail không hợp lệ",
    ],
  }),
  computed: {
    USER() {
      return this.$store.state.User.me;
    },
    reNewPassWord() {
      if (!this.changePassWord.reNewPassWord)
        return () => "Hãy nhập lại mật khẩu mới";
      return () =>
        this.changePassWord.newPassWord === this.changePassWord.reNewPassWord ||
        "Mật khẩu không trùng khớp";
    },
  },
  mounted() {
    this.form.name = this.USER.name;
    this.form.user_name = this.USER.user_name;
    this.form.email = this.USER.email;
    this.form.company_name = this.USER.company_name
  },
  methods: {
    formatDate(e) {
      try {
        let date = new Date(e);
        let ngay = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let thang =
          Number(date.getMonth() + 1) < 10
            ? "0" + Number(date.getMonth() + 1)
            : Number(date.getMonth() + 1);
        return ngay + "/" + thang + "/" + date.getFullYear();
      } catch (error) {
        return "";
      }
    },
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
        await uploadAvatarProfile(data);
        this.$store.dispatch("User/getMe");
      } catch (error) {
        console.log(error);
      }
      this.$refs["upload-image"].value = null;
    },
    changePass() {
      this.showFormChangePass = true;
      this.changePassWord = {
        currentPass: null,
        newPassWord: null,
        reNewPassWord: null,
      };
    },
    async updatePass() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        try {
          this.btnLoading = true;
          await changePassword(this.changePassWord);
          this.showFormChangePass = false;
          this.btnLoading = false;
          this.changePassWord = {
            currentPass: null,
            newPassWord: null,
            reNewPassWord: null,
          };
          this.$toast.info("Đổi mật khẩu thành công!", {
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
          window.location.reload();
        } catch (error) {
          this.btnLoading = false;
        }
      }
    },
    async updateUser() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {
          await updateMyUser(this.form);
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
  created() {},
};
</script>
<style scoped>
.label-form {
  font-size: 18px;
}
</style>
