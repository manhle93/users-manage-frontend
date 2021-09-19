<template>
  <v-container>
    <div v-if="!loadingAll">
      <v-card max-width="100%" class="mx-auto" v-if="nhomId">
        <v-toolbar color="teal darken-3" dark>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title
            >{{ groupName ? groupName : "Thành viên nhóm" }}
          </v-toolbar-title>
        </v-toolbar>
        <v-layout>
          <div style="width: 55%" class="mr-2 pr-3">
            <v-card>
              <v-layout align-center>
                <div class="title-group pt-3 pb-2 pl-4">
                  Thành viên trong nhóm
                </div>
                <v-spacer></v-spacer>
                <div class="pr-4">
                  <v-btn
                    tile
                    color="orange"
                    small
                    dark
                    :disabled="
                      userRemove && userRemove.length && !btnLoading > 0
                        ? false
                        : true
                    "
                    @click="xoaThanhVien"
                  >
                    <v-icon left> mdi-close </v-icon>
                    Đuổi khỏi nhóm
                  </v-btn>
                </div>
              </v-layout>
              <div v-if="trongNhom && trongNhom.length > 0">
                <div
                  class="pl-4 pb-2"
                  v-if="userRemove && userRemove.length > 0"
                >
                  Đã chọn {{ userRemove.length }} thành viên
                </div>
                <v-virtual-scroll
                  height="500"
                  item-height="100"
                  :items="trongNhom"
                >
                  <template v-slot:default="{ item }">
                    <v-list flat subheader three-line>
                      <v-list-item-group
                        v-model="userRemove"
                        multiple
                        active-class=""
                      >
                        <v-list-item :key="item.id" :value="item.user_id">
                          <template v-slot:default="{ active }">
                            <v-list-item-avatar color="indigo">
                              <img
                                v-if="item.url_image"
                                :src="imageEndpoint + item.url_image"
                                alt="ManhLe"
                              />
                              <span
                                style="color: white"
                                v-else-if="!item.url_image && item.name"
                                >{{ item.name.charAt(0).toUpperCase() }}</span
                              >
                              <v-icon v-else dark>mdi-account</v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                              <v-list-item-title>{{
                                item.name
                              }}</v-list-item-title>
                              <v-list-item-subtitle
                                >SĐT: {{ item.so_dien_thoai }} - Chức vụ:
                                {{ item.chuc_vu }}</v-list-item-subtitle
                              >
                              <v-list-item-subtitle
                                >Phòng ban: {{ item.phong_ban }}
                                {{
                                  item.to ? " - Tổ: " + item.to : ""
                                }}</v-list-item-subtitle
                              >
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-checkbox :input-value="active"></v-checkbox>
                            </v-list-item-action>
                          </template>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                    <v-divider></v-divider>
                  </template>
                </v-virtual-scroll>
              </div>
              <v-layout
                style="height: 500px"
                align-center
                justify-center
                v-else
                column
              >
                <v-btn icon color="gray">
                  <v-icon style="font-size: 80px">mdi-account-multiple</v-icon>
                </v-btn>
                <div class="pt-4">Không có thành viên nào trong nhóm</div>
              </v-layout>
            </v-card>
          </div>
          <div style="width: 45%" class="pl-2">
            <v-layout align-center>
              <div class="title-group pt-3 pb-2">Thêm thành viên</div>
              <v-spacer></v-spacer>
              <div class="pr-4">
                <v-btn
                  tile
                  color="teal"
                  small
                  dark
                  :disabled="
                    userAdd && userAdd.length && !btnLoading > 0 ? false : true
                  "
                  @click="themThanhVien"
                >
                  <v-icon left> mdi-plus </v-icon>
                  Thêm
                </v-btn>
              </div>
            </v-layout>
            <div v-if="userAdd && userAdd.length > 0">
              Đã chọn {{ userAdd.length }} thành viên
            </div>
            <v-virtual-scroll height="500" item-height="100" :items="ngoaiNhom">
              <template v-slot:default="{ item }">
                <v-list flat subheader three-line>
                  <v-list-item-group v-model="userAdd" multiple active-class="">
                    <v-list-item :key="item.id" :value="item.user_id">
                      <template v-slot:default="{ active }">
                        <v-list-item-avatar color="indigo">
                          <img
                            v-if="item.url_image"
                            :src="imageEndpoint + item.url_image"
                            alt="ManhLe"
                          />
                          <span
                            style="color: white"
                            v-else-if="!item.url_image && item.name"
                            >{{ item.name.charAt(0).toUpperCase() }}</span
                          >
                          <v-icon v-else dark>mdi-account</v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title>{{ item.name }}</v-list-item-title>
                          <v-list-item-subtitle
                            >SĐT: {{ item.so_dien_thoai }} - Chức vụ:
                            {{ item.chuc_vu }}</v-list-item-subtitle
                          >
                          <v-list-item-subtitle
                            >Phòng ban: {{ item.phong_ban }}
                            {{
                              item.to ? " - Tổ: " + item.to : ""
                            }}</v-list-item-subtitle
                          >
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-checkbox :input-value="active"></v-checkbox>
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
                <v-divider></v-divider>
              </template>
            </v-virtual-scroll>
          </div>
        </v-layout>
      </v-card>
      <v-card v-else class="mx-auto">
        <v-toolbar color="teal darken-3" dark>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title>Thành viên trong nhóm</v-toolbar-title>
        </v-toolbar>
        <v-layout column align-center justify-center style="height: 450px">
          <v-btn icon color="pink">
            <v-icon style="font-size: 80px">mdi-account-multiple</v-icon>
          </v-btn>
          <div class="pt-6" style="font-size: 24px">
            Hãy chọn một nhóm để xem
          </div>
        </v-layout>
      </v-card>
    </div>

    <v-card v-else class="mx-auto">
      <v-toolbar color="teal darken-3" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>Thành viên nhóm</v-toolbar-title>
      </v-toolbar>
      <v-layout column align-center justify-center style="height: 450px">
        <v-progress-circular indeterminate color="pink"></v-progress-circular>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import { getThanhVien, addThanhVien, xoaThanhVien } from "@/api/nhom";

export default {
  props: {
    nhomId: {
      type: Number,
    },
    groupName: {
      type: String,
    },
  },
  data: () => ({
    comment: "",
    imageEndpoint: process.env.VUE_APP_BASE,
    page: 1,
    pageCount: 1,
    itemsPerPage: 5,
    loadingAll: false,
    userAdd: [],
    userRemove: [],
    trongNhom: [],
    ngoaiNhom: [],
    btnLoading: false,
  }),
  watch: {
    async nhomId(val) {
      this.userRemove = [];
      this.userAdd = [];
      this.trongNhom = [];
      this.ngoaiNhom = [];
      if (val) {
        await this.getData(val);
      }
    },
  },

  mounted() {
    this.getDataFromParam();
  },
  methods: {
    getDataFromParam() {
      if (Number.isInteger(Number(this.$route.params.id))) {
        this.getData(this.$route.params.id);
      } else return;
    },
    async getData(nhomId) {
      if (!Number.isInteger(nhomId)) {
        this.trongNhom = [];
        this.ngoaiNhom = [];
        return;
      }
      let data = await getThanhVien({
        nhom_id: nhomId,
      });
      this.trongNhom = data.trong_nhom;
      this.ngoaiNhom = data.ngoai_nhom;
    },

    async themThanhVien() {
      if (!this.userAdd && this.userAdd.length == 0) {
        return;
      }
      try {
        this.btnLoading = true;
        await addThanhVien({
          nhom_id: this.$route.params.id,
          thanh_viens: this.userAdd,
        });
        this.userAdd = [];
        this.getData(this.$route.params.id);
        this.btnLoading = false;
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
        this.userAdd = [];
      }
    },
    xoaThanhVien() {
      this.$confirmBox.show({
        title: "Xóa thành viên khỏi nhóm",
        width: 500,
        body:
          "Bạn có chắc chắn muốn xóa " +
          this.userRemove.length +
          " thành viên ra khỏi nhóm!" +
          "<br/>" +
          "Lưu ý: Các thành viên này vẫn xem được các tin trước đó",
        action: async () => {
          this.btnLoading = true;
          await xoaThanhVien({
            nhom_id: this.$route.params.id,
            thanh_viens: this.userRemove,
          });
          this.btnLoading = false;
          this.userRemove = [];
        },

        onDone: () => this.getData(this.$route.params.id),
      });
    },
  },
};
</script>

<style>
.title-group {
  font-size: 26px;
  color: black;
}
</style>