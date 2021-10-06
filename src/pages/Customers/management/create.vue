<template>
  <v-container fluid>
    <v-form ref="form">
      <v-row>
        <v-col lg="8" sm="12" md="8" xs="12">
          <v-card style="height: 100%;">
            <v-card-title class="pt-4 pl-6 mb-2">
              <v-btn class="mr-2" @click="gotoLink('/customer/manage')" fab color="primary" x-small><v-icon>mdi-chevron-left</v-icon></v-btn>
              顧客情報作成
              <v-spacer/>
              <v-btn width="120"
                     class="mr-2"
                     @click="submitUpdate"
                     v-if="editing"
                     :loading="btnLoading" color="success">
                <v-icon size="18" class="mr-2">mdi-account-edit</v-icon>
                更新
              </v-btn>
              <v-btn width="120"
                  class="mr-2"
                  color="success"
                  @click="submit"
                  v-else
                  :loading="btnLoading"
              >
                <v-icon size="18" class="mr-2">mdi-account-plus</v-icon>
                作成
              </v-btn>
            </v-card-title>
            <v-layout column class="pl-6 pr-6">
              <v-row>
                <v-col cols="5" class="zero-vertical">
                  <div class="label-form">
                    会社名/店名 <span style="color: red">(*)</span>
                  </div>
                  <v-text-field
                    v-model="form.company_name"
                    :rules="nameRules"
                    placeholder="REP店名"
                    outlined
                    dense
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" class="zero-vertical">
                  <div class="label-form">
                    業種 <span style="color: red">(*)</span>
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
                    郵便番号 <span style="color: red">(*)</span>
                  </div>
                  <v-text-field
                    v-model="form.postal_code"
                    placeholder="郵便番号"
                    :rules="poscodeRules"
                    outlined
                    type="number"
                    dense
                    prepend-inner-icon="mdi-map-marker"
                  ></v-text-field>
                </v-col>
                <v-col cols="5" class="zero-vertical">
                  <div class="label-form">代表者名</div>
                  <v-text-field
                    v-model="form.representative_name"
                    placeholder="代表者名"
                    outlined
                    dense
                    prepend-inner-icon="mdi-home-modern"
                  ></v-text-field>
                </v-col>
                <v-col cols="7" class="zero-vertical">
                  <div class="label-form">
                    住所 <span style="color: red">(*)</span>
                  </div>
                  <v-text-field
                    v-model="form.address"
                    placeholder="住所"
                    :rules="addressRules"
                    outlined
                    dense
                    prepend-inner-icon="mdi-map"
                  ></v-text-field>
                </v-col>
                <v-col cols="5" class="zero-vertical">
                  <div class="label-form">電話番号</div>
                  <v-text-field
                    v-model="form.phone_number"
                    placeholder="電話番号"
                    outlined
                    dense
                    prepend-inner-icon="mdi-phone"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" class="zero-vertical">
                  <div class="label-form">HPのURL</div>
                  <v-text-field
                    v-model="form.homepage_url"
                    placeholder="HPのURL"
                    outlined
                    dense
                    prepend-inner-icon="mdi-web"
                  ></v-text-field>
                </v-col>
                <v-col cols="3" class="zero-vertical">
                  <div class="label-form">
                    ステータス <span style="color: red">(*)</span>
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
                  <div class="label-form">管理者名</div>
                  <v-text-field
                    v-model="form.manager_name"
                    placeholder="管理者名"
                    outlined
                    dense
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" class="zero-vertical">
                  <div class="label-form">管理者Eメールアドレス</div>
                  <v-text-field
                    v-model="form.manager_email"
                    placeholder="管理者Eメールアドレス"
                    outlined
                    dense
                    prepend-inner-icon="mdi-email"
                  ></v-text-field>
                </v-col>
                <!-- <v-col cols="3" class="zero-vertical">
                  <div class="label-form">Manager phone</div>
                  <v-text-field
                    v-model="form.manager_phone"
                    placeholder="Manager Phone"
                    outlined
                    dense
                    prepend-inner-icon="mdi-phone"
                  ></v-text-field>
                </v-col> -->

                <v-col cols="5" class="zero-vertical">
                  <div class="label-form">担当者名</div>
                  <v-text-field
                    v-model="form.person_in_charge_name"
                    placeholder="担当者名"
                    outlined
                    dense
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" class="zero-vertical">
                  <div class="label-form">担当者Eメールアドレス</div>
                  <v-text-field
                    v-model="form.person_in_charge_email"
                    placeholder="担当者Eメールアドレス"
                    outlined
                    dense
                    prepend-inner-icon="mdi-email"
                  ></v-text-field>
                </v-col>
                <!-- <v-col cols="3" class="zero-vertical">
                  <div class="label-form">Person in charge phone</div>
                  <v-text-field
                    v-model="form.person_in_charge_phone"
                    placeholder="Manager Phone"
                    outlined
                    dense
                    prepend-inner-icon="mdi-phone"
                  ></v-text-field>
                </v-col> -->
              </v-row>
            </v-layout>
            <br />
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
                  placeholder="Eメールアドレス"
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
            <v-card-title>メモ</v-card-title>
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
      (v) => !!v || "会社名/店名を入力してください",
      (v) => (v && v.length >= 2) || "会社名/店名は２文字以上で入力してください",
    ],
    poscodeRules: [
      (v) => !!v || "郵便番号を入力してください",
      (v) => (v && v.length >= 2) || "郵便番号は２文字以上で入力してください",
    ],
    addressRules: [
      (v) => !!v || "住所を入力してください",
      (v) => (v && v.length >= 5) || "住所は５文字以上で入力してください",
    ],
    statusRules: [(v) => v != null || "Hãy chọn một loại hình!"],
    industryRules: [(v) => !!v || "Hãy chọn một loại hình!"],
    userNameRules: [
      (v) => !!v || "Tên đăng nhập không thể bỏ trống",
      (v) => (v && v.length >= 3) || "Tên đăng nhập tối thiểu 3 ký tự",
    ],
    emailRules: [
      (v) => !!v || "Eメールアドレスを入力してください",
      (v) => /.+@.+\..+/.test(v) || "Eメールアドレスは正しく入力してください",
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
  computed: {
    currentUser() {
      return this.$store.state.User.me;
    }
  },
  methods: {
    gotoLink (link) {
      this.$router.push(link)
    },
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
          this.$toast.info("顧客情報作成は完了しました。", {
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
          this.gotoLink('/customer/manage')
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
    async submitUpdate() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {
          await editCustomerInfo(this.form);
          this.show = false;
          this.btnLoading = false;
          this.$emit("on-done");
          this.$toast.info("更新は完了しました。", {
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
    }
  },
};
</script>
<style scoped>
.zero-vertical {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
</style>
