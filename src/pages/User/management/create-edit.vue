<template>
  <v-dialog v-model="show" persistent width="800">
    <v-card>
      <v-card-title class="headline">{{
        edit ? "ユーザー情報編集" : "新規ユーザー作成"
      }}</v-card-title>
      <br />
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-row>
            <v-col
              xs="12"
              sm="5"
              md="5"
              class="d-flex flex-column align-center"
            >
              <v-img height="200px" :src="masterialPic">
                <v-card-text>
                  <v-layout column class="align-center">
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-avatar
                          size="180"
                          v-bind="attrs"
                          v-on="on"
                          @click="uploadAvatar"
                        >
                          <v-img
                            :src="
                              form.url_image
                                ? imageEndpoint + form.url_image
                                : avatarNone
                            "
                          ></v-img>
                          <v-btn
                            color="blue"
                            fab
                            x-small
                            style="position: absolute; top: 130px; right: 40px"
                          >
                            <v-icon color="white">mdi-pencil</v-icon>
                          </v-btn>
                        </v-avatar>
                      </template>
                      <span>アバターアップロード</span>
                    </v-tooltip>
                  </v-layout>
                  <input
                    ref="upload-image"
                    name="avatar"
                    style="display: none"
                    type="file"
                    @change="handleUpload($event)"
                  />
                </v-card-text>
              </v-img>
              <v-layout column class="align-center">
                <v-text-field
                  placeholder="Eメールアドレス"
                  prepend-inner-icon="mdi-email"
                  v-model="form.email"
                  :rules="formValidate.email"
                ></v-text-field>
                <v-text-field
                  placeholder="代表者名"
                  prepend-inner-icon="mdi-account"
                  v-model="form.name"
                  :rules="formValidate.name"
                ></v-text-field>
              </v-layout>
            </v-col>
            <v-col xs="12" sm="7" md="7">
              <div class="label-form">ユーザー名</div>
              <v-text-field
                placeholder="ユーザー名を入力してください。"
                :rules="formValidate.user_name"
                outlined
                dense
                prepend-inner-icon="mdi-account"
                v-model="form.user_name"
              ></v-text-field>
              <div class="label-form">権限</div>
              <v-select
                v-model="form.role_id"
                :items="roles"
                :rules="formValidate.role_id"
                outlined
                dense
                item-text="name"
                item-value="id"
                prepend-inner-icon="mdi-wrench"
                placeholder="権限を選択してください。"
              >
                <template v-slot:selection="{ item }">
                  {{ item.name + " - " + item.description }}
                </template>
                <template v-slot:item="{ item, attrs, on }">
                  <v-list-item v-on="on" v-bind="attrs" #default="{ active }">
                    <v-list-item-action>
                      <v-checkbox :input-value="active"></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-row no-gutters align="center">
                          <span>{{ item.name }}</span>
                          <v-spacer></v-spacer>
                          <v-chip text-color="white" color="green" small>{{
                            item.description
                          }}</v-chip>
                        </v-row>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-select>
              <div class="label-form">会社名</div>
                <v-text-field
                  placeholder="会社名を入力してください"
                  outlined
                  dense
                  prepend-inner-icon="mdi-home-modern"
                  v-model="form.company_name"
                ></v-text-field>
              <br />
              <div class="label-form" style="font-weight: bold">パスワード</div>
              <v-row>
                <v-col cols="6"
                  ><v-combobox
                    v-model="form.password"
                    placeholder="パスワード"
                    outlined
                    :items="passwords"
                    dense
                    :rules="edit ? [] : formValidate.password"
                    type="password"
                    prepend-inner-icon="mdi-lock"
                    @focus="showText = true"
                  >
                    <template v-slot:item="{ item }">
                      <v-layout align-end @click="selectPass(item)">
                        <div style="height: 24px">{{ item }}</div>
                        <v-spacer />
                        <div style="font-size: 12px; color: gray; height: 20px">
                          おすすめ
                        </div>
                      </v-layout>
                    </template>
                  </v-combobox></v-col
                >
                <v-col cols="6"
                  ><v-text-field
                    v-model="form.confirmPassword"
                    placeholder="パスワードを再度入力してください。"
                    outlined
                    type="password"
                    :rules="[confirmPassword]"
                    dense
                    prepend-inner-icon="mdi-lock"
                  ></v-text-field
                ></v-col>
                <div class="pl-3" v-if="showText">
                  Mật khẩu tối thiểu 8 ký tự bao gồm chữ viết hoa, chữ thường,
                  ký thự đặc biệt và số
                </div>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="show = false" class="mr-4">キャンセル</v-btn>
        <v-btn
          :loading="btnLoading"
          color="primary"
          @click="addUser"
          v-if="!edit"
        >
          <v-icon left>mdi-plus</v-icon>
          登録
        </v-btn>
        <v-btn :loading="btnLoading" color="primary" @click="updateUser" v-else>
          <v-icon left>mdi-pencil</v-icon>
          更新
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import avatarNone from "../../../../docs/img/avatar_none.png";
import masterialPic from "../../../../docs/img/masterial.png";
import { updateUser, createUser, uploadAvatar } from "@/api/user";
export default {
  props: ["roles"],
  data: () => ({
    avatarNone,
    masterialPic,
    show: false,
    edit: false,
    parentMenus: [],
    imageEndpoint: process.env.VUE_APP_BASE,
    btnLoading: false,
    src: null,
    showText: false,
    passwords: ["Abc@2021", "123456@Dk"],
    form: {
      role_id: null,
      email: "",
      name: null,
      password: null,
      confirmPassword: null,
      user_name: null,
      url_image: null,
    },
    formValidate: {
      name: [
        (v) => !!v || "ユーザー名を入力してください。",
        (v) =>
          (v && v.length >= 3) || "ユーザー名は最低３文字で入力してください。",
      ],
      email: [
        (v) => !!v || "Eメールアドレスを入力してください。",
        (v) =>
          /.+@.+\..+/.test(v) || "Eメールアドバイスは正しく入力してください。",
      ],
      role_id: [(v) => !!v || "権限を選択してください。"],
      password: [(v) => !!v || "パスワードを入力してください。"],
      user_name: [
        (v) => !!v || "ユーザー名を入力してください。",
        (v) =>
          (v && v.length >= 3) || "ユーザー名は最低３文字で入力してください。",
      ],
    },
    rulesPassword: {
      length: { value: 8, pass: false },
      digit: { value: 1, pass: false },
      lower: { value: 1, pass: false },
      upper: { value: 1, pass: false },
    },
  }),
  computed: {
    confirmPassword() {
      return () =>
        this.form.confirmPassword === this.form.password ||
        "パスワード確認はパスワードと一致していません。";
    },
    USER() {
      return this.$store.state.User.me;
    },
  },
  methods: {
    showFormAdd() {
      this.show = true;
      this.edit = false;
      this.form = {
        role_id: null,
        email: "",
        name: null,
        password: null,
        confirmPassword: null,
        user_name: null,
        url_image: null,
      };
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
      this.showText = false
    },
    async showFormEdit(data) {
      this.edit = true;
      this.show = true;
      this.form = { ...data };
    },
    selectPass(item) {
      this.form.confirmPassword = item;
      this.form.password = this.form.confirmPassword;
      this.showText = false
    },
    async addUser() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {
          await createUser(this.form);
          this.show = false;
          this.btnLoading = false;
          this.$emit("on-done");
          this.$toast.info("ユーザー登録は完了しました。", {
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
          // this.show = false;
        }
      }
    },
    uploadAvatar() {
      this.$refs["upload-image"].click();
    },
    handleUpload(e) {
      let files = e.target.files;
      let data = new FormData();
      data.append("file", files[0]);
      var filePath = files[0].name.split(".").pop(); //lấy định dạng file
      var dinhDangChoPhep = ["jpg", "jpeg", "png"]; //các tập tin cho phép
      const isLt2M = files[0].size / 1024 / 1024 < 20;
      if (!isLt2M) {
        this.form.fileList.pop();
        this.$toast.warning(
          "ファイルのサイズは最大２０MBでアップロードしてください。",
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
      if (!dinhDangChoPhep.find((el) => el == filePath.toLowerCase())) {
        this.loadingUpload = false;
        this.listLoading = false;
        this.iconUpload = "el-icon-bottom";
        this.$toast.warning("正しくファイルをアップロードしてください。", {
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
      uploadAvatar(data)
        .then((res) => {
          this.form.url_image = res;
        })
        .catch((error) => {
          console.log(error);
        });

      this.$refs["upload-image"].value = null;
    },
    async updateUser() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.btnLoading = true;
        try {
          await updateUser(this.form);
          this.show = false;
          this.btnLoading = false;
          this.$emit("on-done");
          this.$toast.info("ユーザー更新は完了しました。", {
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
          if (this.form.id === this.USER.id && this.form.password) {
            window.location.reload();
          }
          if (this.form.id === this.USER.id) {
            this.$store.dispatch("User/getMe");
          }
        } catch (error) {
          this.btnLoading = false;
          // this.show = false;
        }
      }
    },
  },
};
</script>
