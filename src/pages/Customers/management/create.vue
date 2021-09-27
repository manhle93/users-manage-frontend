<template>
  <v-container fluid>
    <v-form ref="form">
      <v-row>
        <v-col lg="8" sm="12" md="8" xs="12">
          <v-card>
            <v-card-title class="pt-4 pl-6">Customer Infomation</v-card-title>
            <v-layout column class="pl-6 pr-6">
              <v-row>
                <v-col cols="5" class="zero-vertical">
                  <div class="label-form">
                    Company Name <span style="color: red">(*)</span>
                  </div>
                  <v-text-field
                    v-model="form.company_name"
                    :rules="nameRules"
                    placeholder="Company name"
                    outlined
                    dense
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" class="zero-vertical">
                  <div class="label-form">
                    Industry <span style="color: red">(*)</span>
                  </div>
                  <v-select
                    prepend-inner-icon="mdi-home"
                    :rules="industryRules"
                    v-model="form.industry_id"
                    :items="Industries"
                    outlined
                    dense
                    item-text="name"
                    item-value="id"
                  >
                  </v-select>
                </v-col>
                <v-col cols="3" class="zero-vertical">
                  <div class="label-form">
                    Postal Code <span style="color: red">(*)</span>
                  </div>
                  <v-text-field
                    v-model="form.postal_code"
                    placeholder="Postal code"
                    :rules="poscodeRules"
                    outlined
                    type="number"
                    dense
                    prepend-inner-icon="mdi-map-marker"
                  ></v-text-field>
                </v-col>
                <v-col cols="5" class="zero-vertical">
                  <div class="label-form">Representative name</div>
                  <v-text-field
                    v-model="form.representative_name"
                    placeholder="Representative name"
                    outlined
                    dense
                    prepend-inner-icon="mdi-home-modern"
                  ></v-text-field>
                </v-col>
                <v-col cols="7" class="zero-vertical">
                  <div class="label-form">
                    Address <span style="color: red">(*)</span>
                  </div>
                  <v-text-field
                    v-model="form.address"
                    placeholder="address"
                    :rules="addressRules"
                    outlined
                    dense
                    prepend-inner-icon="mdi-map"
                  ></v-text-field>
                </v-col>
                <v-col cols="5" class="zero-vertical">
                  <div class="label-form">Phone number</div>
                  <v-text-field
                    v-model="form.phone_number"
                    placeholder="Phone number"
                    outlined
                    dense
                    prepend-inner-icon="mdi-phone"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" class="zero-vertical">
                  <div class="label-form">Home page Url</div>
                  <v-text-field
                    v-model="form.homepage_url"
                    placeholder="homepage Url"
                    outlined
                    dense
                    prepend-inner-icon="mdi-web"
                  ></v-text-field>
                </v-col>
                <v-col cols="3" class="zero-vertical">
                  <div class="label-form">
                    Status <span style="color: red">(*)</span>
                  </div>
                  <v-select
                    prepend-inner-icon="mdi-pen"
                    v-model="form.signed"
                    :rules="statusRules"
                    :items="status"
                    outlined
                    dense
                    item-text="name"
                    item-value="value"
                  >
                  </v-select>
                </v-col>

                <v-col cols="5" class="zero-vertical">
                  <div class="label-form">Manager name</div>
                  <v-text-field
                    v-model="form.manager_name"
                    placeholder="Manager name"
                    outlined
                    dense
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" class="zero-vertical">
                  <div class="label-form">Manager email</div>
                  <v-text-field
                    v-model="form.manager_email"
                    placeholder="Manager email"
                    outlined
                    dense
                    prepend-inner-icon="mdi-email"
                  ></v-text-field>
                </v-col>
                <v-col cols="3" class="zero-vertical">
                  <div class="label-form">Manager phone</div>
                  <v-text-field
                    v-model="form.manager_phone"
                    placeholder="Manager Phone"
                    outlined
                    dense
                    prepend-inner-icon="mdi-phone"
                  ></v-text-field>
                </v-col>

                <v-col cols="5" class="zero-vertical">
                  <div class="label-form">Person in charge name</div>
                  <v-text-field
                    v-model="form.person_in_charge_name"
                    placeholder="Person in charge name"
                    outlined
                    dense
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" class="zero-vertical">
                  <div class="label-form">Person in charge email</div>
                  <v-text-field
                    v-model="form.person_in_charge_email"
                    placeholder="Person in charge email"
                    outlined
                    dense
                    prepend-inner-icon="mdi-email"
                  ></v-text-field>
                </v-col>
                <v-col cols="3" class="zero-vertical">
                  <div class="label-form">Person in charge phone</div>
                  <v-text-field
                    v-model="form.person_in_charge_phone"
                    placeholder="Manager Phone"
                    outlined
                    dense
                    prepend-inner-icon="mdi-phone"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-layout>
            <br />
            <v-layout class="pr-6" align-center>
              <v-card-title class="pl-6"
                >Comments
                <span class="pl-3" style="color: red; font-weight: bold"
                  >({{ comments ? comments.length : 0 }})</span
                ></v-card-title
              >
              <v-spacer></v-spacer>
              <v-btn
                depressed
                color="primary"
                @click="pushComment"
                :loading="btnLoading"
                v-if="editing && form.comment && form.comment.length > 0"
              >
                Comment
              </v-btn>
            </v-layout>
            <v-layout column class="pl-6 pr-6">
              <hr />
              <v-card-text>
                <v-textarea
                  class="mx-2"
                  v-model="form.comment"
                  filled
                  rows="2"
                  prepend-icon="mdi-comment"
                ></v-textarea>
              </v-card-text>
              <v-layout
                column
                class="pl-8 pr-6 pb-5"
                v-if="editing && comments && comments.length > 0"
              >
                <v-layout
                  class="py-2"
                  v-for="item in comments"
                  :key="item.key"
                >
                  <v-avatar size="40">
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/lists/2.jpg"
                    ></v-img>
                  </v-avatar>
                  <div
                    class="ml-4"
                    style="
                      min-height: 50px;
                      width: 100%;
                      background-color: #edeef2;
                      border-radius: 5px;
                    "
                  >
                    <v-layout column style="width: 100%" class="pa-3">
                      <v-layout style="width: 100%" align-end>
                        <span
                          style="
                            font-size: 15px;
                            font-weight: bold;
                            color: #0870bf;
                          "
                          >{{
                            item.user_comment ? item.user_comment.name : null
                          }}</span
                        >
                        <span
                          class="pl-2"
                          style="
                            font-size: 13px;
                            font-weight: bold;
                            color: #d9aa00;
                          "
                          >{{ item.company_name }}</span
                        >
                        <span
                          class="pl-2"
                          style="font-size: 11px; color: #b5b5b5"
                          >{{item.thoi_gian}}</span
                        >
                      </v-layout>
                      <v-layout class="pt-3">
                        <p>
                          {{ item.content }}
                        </p>
                      </v-layout>
                    </v-layout>
                  </div>
                </v-layout>
              </v-layout>
            </v-layout>
          </v-card>
        </v-col>
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
                  placeholder="Tên đăng nhập"
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
            <v-card-title>Note</v-card-title>
            <v-card-text>
              <v-textarea
                class="mx-2"
                v-model="form.note"
                filled
                rows="2"
                prepend-icon="mdi-note"
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
            <v-btn
              tile
              color="success"
              @click="submitUpdate"
              v-if="editing"
              :loading="btnLoading"
            >
              <v-icon left>mdi-account-edit</v-icon>
              Cập nhật
            </v-btn>
            <v-btn
              tile
              color="success"
              @click="submit"
              v-else
              :loading="btnLoading"
            >
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
import {
  addCustomer,
  getCategories,
  getCustomerInfo,
  editCustomerInfo,
  addComment,
  getComments,
} from "@/api/customer";

export default {
  data: () => ({
    editing: false,
    Industries: [],
    status: [
      { value: false, name: "未契約" },
      { value: true, name: "契約済" },
    ],
    comments: [],
    avatarNone,
    masterialPic,
    tab: null,
    imageEndpoint: process.env.VUE_APP_BASE,
    btnLoading: false,
    nameRules: [
      (v) => !!v || "Tên công ty không thể bỏ trống",
      (v) => (v && v.length >= 2) || "Tên công ty tối thiểu 2 ký tự",
    ],
    poscodeRules: [
      (v) => !!v || "Postal code không thể bỏ trống",
      (v) => (v && v.length >= 2) || "Postal code tối thiểu 2 ký tự",
    ],
    addressRules: [
      (v) => !!v || "Address không thể bỏ trống",
      (v) => (v && v.length >= 5) || "Address tối thiểu 5 ký tự",
    ],
    statusRules: [(v) => v != null || "Hãy chọn một loại hình!"],
    industryRules: [(v) => !!v || "Hãy chọn một loại hình!"],
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
      company_name: "",
      industry_id: null,
      postal_code: null,
      representative_name: null,
      address: null,
      phone_number: null,
      homepage_url: null,
      signed: false,
      manager_name: null,
      manager_email: null,
      manager_phone: null,
      person_in_charge_name: null,
      person_in_charge_email: null,
      person_in_charge_phone: null,
      comment: null,
      url_image: null,
      note: null,
    },
  }),

  mounted() {
    // this.getDanhMuc();
    // this.getNhanVienEdit();
    this.getIndustries();
    this.getCustomer();
  },
  methods: {
    async getIndustries() {
      let data = await getCategories({ group: "industry" });
      this.Industries = data;
    },
    async fetchComments() {
      let data = await getComments({ user_id: this.form.user_id });
      this.comments = data;
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
          await addCustomer(this.form);
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
    async getCustomer() {
      let id = this.$route.params.id;
      this.editing = false;
      if (id) {
        this.editing = true;
        let data = await getCustomerInfo({ customer_id: id });
        this.form = { ...data };
        this.form.user_name = data.user.user_name;
        this.form.email = data.user.email;
        this.fetchComments()
      } else return;
    },
    async pushComment() {
      if (this.form.comment) {
        this.btnLoading = true;
        await addComment({
          user_id: this.form.user_id,
          content: this.form.comment,
        });
        this.form.comment = null;
        this.fetchComments();
        this.btnLoading = false;
      }
    },
    async submitUpdate() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {
          await editCustomerInfo(this.form);
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
