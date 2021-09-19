<template>
  <v-container>
    <v-card width="700" class="mx-auto" v-if="!hideForm" elevation="23">
      <v-system-bar color="#004D40" dark>
        <v-spacer></v-spacer>
        <v-icon @click="miniForm">mdi-window-minimize</v-icon>
        <v-icon @click="closeForm">mdi-close</v-icon>
      </v-system-bar>

      <v-app-bar dark color="#00695C" v-show="!showMiniForm">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>Gửi thư thông báo</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn rounded color="primary" dark @click="submit">
          Gửi <v-icon right> mdi-send </v-icon>
        </v-btn>
      </v-app-bar>

      <v-container v-show="!showMiniForm">
        <v-layout column>
          <div class="mb-8 pr-2 pl-2">
            <v-autocomplete
              v-model="form.users"
              :disabled="isUpdating"
              prepend-inner-icon="mdi-account"
              :items="people"
              chips
              placeholder="Người nhận"
              item-text="name"
              item-value="id"
              multiple
              single-line
              :filter="fullTextFilter"
              ref="peoples"
              @blur="
                () => {
                  filterLength = 0;
                }
              "
            >
              <template v-slot:selection="{ item, index }">
                <v-chip
                  v-if="index < 2"
                  v-bind="item.attrs"
                  :input-value="item.selected"
                  close
                  @click:close="remove(item)"
                >
                  <v-avatar left color="indigo">
                    <img
                      v-if="item.url_image"
                      :src="imageEndpoint + item.url_image"
                      alt="ManhLe"
                    />
                    <span style="color: white" v-else-if="item && item.name">{{
                      item.name.charAt(0).toUpperCase()
                    }}</span>
                    <v-icon v-else dark>mdi-account</v-icon>
                  </v-avatar>
                  {{ item.name }}
                </v-chip>
                <div v-if="index === 2">
                  <v-chip>
                    <b class="pr-1">+{{ form.users.length - 2 }} </b> Người
                    khác</v-chip
                  >
                </div>
              </template>

              <template v-slot:prepend-item>
                <v-layout class="pt-2">
                  <div>
                    <v-list-item ripple @click="selectAllUser">
                      <v-list-item-action>
                        <v-icon
                          :color="
                            form.users.length > 0 ? 'indigo darken-4' : ''
                          "
                        >
                          {{
                            form.users.length == people.length ||
                            (form.users.length == filterLength &&
                              filterLength != 0)
                              ? "mdi-close-box"
                              : "mdi-checkbox-blank-outline"
                          }}
                        </v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title> Chọn tất cả </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </div>
                  <v-spacer></v-spacer>
                  <div style="width: 40%" class="pr-4">
                    <v-select
                      v-model="nhom_id"
                      :items="nhoms"
                      placeholder="Lọc theo nhóm"
                      dense
                      item-text="name"
                      item-value="id"
                      clearable
                      @change="filterGroup"
                    >
                    </v-select>
                  </div>
                </v-layout>

                <v-divider class="mt-2"></v-divider>
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
                    <v-list-item-title>{{ data.item.name }}</v-list-item-title>
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

            <v-text-field
              prepend-inner-icon="mdi-tag"
              v-model="form.chuDe"
              placeholder="Chủ đề"
              clearable
              single-line
              hide-details
            ></v-text-field>
          </div>
          <div class="mb-0 pr-2 pl-2">
            <!-- <v-textarea
              filled
              v-model="form.noiDung"
              placeholder="Nội dung thư"
            ></v-textarea> -->
            <ckeditor v-model="form.noiDung" :config="editorConfig"></ckeditor>
          </div>
          <div class="pr-2 mb-2">
            <v-file-input
              v-model="files"
              color="deep-purple accent-4"
              counter
              multiple
              placeholder="Tệp đính kèm"
              prepend-icon="mdi-paperclip"
              :show-size="1000"
              @change="handleUploadFile()"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip
                  v-if="index < 2"
                  color="deep-purple accent-4"
                  dark
                  label
                  small
                >
                  {{ text }}
                </v-chip>

                <span
                  v-else-if="index === 2"
                  class="overline grey--text text--darken-3 mx-2"
                >
                  +{{ files.length - 2 }} File(s)
                </span>
              </template>
            </v-file-input>
          </div>
          <div class="pl-3 pr-2" v-if="tienTrinhUpload > 0 && files.length > 0">
            <v-progress-linear :value="tienTrinhUpload" height="10">
              <strong style="font-size: 12px"
                >{{ Math.ceil(tienTrinhUpload) }}%</strong
              >
            </v-progress-linear>
          </div>
        </v-layout>
      </v-container>
    </v-card>
    <v-btn
      elevation="20"
      v-else
      rounded
      color="teal"
      dark
      large
      @click="closeForm"
    >
      Truyền thông<v-icon right> mdi-send </v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import { getNhom, getAllPeople } from "@/api/nhom";
import { uploadFile, sendMail } from "@/api/guithu";
import { fullTextFilter } from "../../utils/stringHelper";
export default {
  data: () => ({
    imageEndpoint: process.env.VUE_APP_BASE,
    files: [],
    fullTextFilter,
    showMiniForm: false,
    hideForm: true,
    isUpdating: false,
    tienTrinhUpload: 0,
    people: [],
    dataPeople: [],
    editorConfig: {},
    form: {
      users: [],
      chuDe: "",
      noiDung: "",
      tap_tin: [],
    },
    nhoms: [],
    nhom_id: null,
    filterLength: 0,
  }),
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },
  },
  mounted() {
   // this.getNguoiDung();
   // this.getDSNhom();
  },
  updated() {},
  methods: {
    miniForm() {
      this.showMiniForm = !this.showMiniForm;
    },
    async getDSNhom() {
      let data = await getNhom({
        perPage: 9999,
      });
      this.nhoms = data.data;
    },
    async getNguoiDung() {
      let data = await getAllPeople();
      this.people = data;
      this.dataPeople = [...this.people];
    },
    closeForm() {
      this.hideForm = !this.hideForm;
      this.resetForm();
    },
    selectAllUser() {
      const filterPeople = this.$refs.peoples.filteredItems;
      this.filterLength = filterPeople.length;
      this.$nextTick(() => {
        if (this.form.users.length == filterPeople.length) {
          this.form.users = [];
        } else {
          this.form.users = [];
          filterPeople.forEach((el) => {
            this.form.users.push(el.id);
          });
        }
      });
    },
    remove(item) {
      const index = this.form.users.indexOf(item.id);
      if (index >= 0) this.form.users.splice(index, 1);
    },

    filterGroup() {
      if (this.nhom_id) {
        this.people = this.dataPeople.filter((el) => {
          const exist = el.nhom_truyen_thong.findIndex(
            (it) => it.id == this.nhom_id
          );
          return exist != -1;
        });
      } else this.people = this.dataPeople;
    },
    async submit() {
      let isValidate = this.validate();
      if (isValidate) {
        this.form.nhom_id = this.nhom_id;
        await sendMail(this.form);
        this.$toast.info("Gửi thư thành công!", {
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
        this.closeForm();
      }
      return;
    },
    async handleUploadFile() {
      var isValidate = true;
      let data = new FormData();
      if (!this.files || this.files.length == 0) {
        return;
      }
      for (let el of this.files) {
        const isLt2M = el.size / 1024 / 1024 < 20;
        if (!isLt2M) {
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
          isValidate = false;
          this.files = [];
          break;
        }

        // var filePath = el.name.split(".").pop(); //lấy định dạng file
        // var dinhDangChoPhep = ["jpg", "jpeg", "png"]; //các tập tin cho phép
        // if (!dinhDangChoPhep.find((el) => el == filePath.toLowerCase())) {
        //   this.$toast.warning("Tập tin không hợp lệ!", {
        //     position: "top-center",
        //     timeout: 2000,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     draggablePercent: 0.6,
        //     showCloseButtonOnHover: false,
        //     hideProgressBar: true,
        //     closeButton: "button",
        //     icon: true,
        //   });
        //   isValidate = false;
        //   this.files = []
        //   break;
        // }
        data.append("file[]", el);
      }

      if (!isValidate) return;

      try {
        let File_id = await uploadFile(data, (e) => {
          this.tienTrinhUpload = e;
        });
        this.form.tap_tin = File_id;
      } catch (error) {
        console.log(error);
      }
    },
    resetForm() {
      this.form = {
        users: [],
        chuDe: "",
        noiDung: "",
        tap_tin: [],
      };
      this.nhom_id = null;
      this.files = [];
      this.people = this.dataPeople;
    },
    validate() {
      console.log(this.form);
      if (!this.form.users || this.form.users.length == 0) {
        this.$toast.warning("Người nhận không thể bỏ trống", {
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
      if (
        (!this.form.noiDung || this.form.noiDung.length == 0) &&
        (!this.form.tap_tin || this.form.tap_tin.length == 0)
      ) {
        this.$toast.warning("Vui lòng soạn nội dung hoặc đính kèm tập tin", {
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
      return true;
    },
  },
};
</script>

<style></style>
