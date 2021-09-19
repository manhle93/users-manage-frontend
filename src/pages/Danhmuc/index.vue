<template>
  <v-container fluid>
    <v-card>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1"
            ><v-icon size="40">mdi-apps</v-icon> DANH MỤC DỮ
            LIỆU</v-list-item-title
          >
          <v-list-item-subtitle
            >Danh sách các danh mục dữ liệu trên hệ thống</v-list-item-subtitle
          >
        </v-list-item-content>
        <v-switch v-model="singleExpand" label="Mở 1 danh mục"></v-switch>
      </v-list-item>
    </v-card>
    <br />
    <v-layout class="d-flex justify-center pt-8 pb-8" v-if="loading">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-layout>
    <v-data-iterator
      :items="danhMucs"
      item-key="name"
      :single-expand="singleExpand"
      hide-default-footer
      v-else
    >
      <template v-slot:default="{ items, isExpanded, expand }">
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.id"
            cols="12"
            sm="6"
            md="4"
            lg="4"
          >
            <v-card>
              <v-card-title>
                <h5>{{ item.name }}</h5>
              </v-card-title>
              <v-layout align-center class="pb-2">
                <v-switch
                  hide-details
                  :input-value="isExpanded(item)"
                  :label="isExpanded(item) ? 'Đã mở' : 'Đã đóng'"
                  class="pl-4 mt-0"
                  @change="(v) => expand(item, v)"
                ></v-switch>
                <v-spacer></v-spacer>
                <v-btn class="mx-2" icon dark color="indigo" small @click="addDanhMucCon(item)">
                  <v-icon dark> mdi-plus </v-icon>
                </v-btn>
              </v-layout>

              <v-divider></v-divider>
              <v-list v-if="isExpanded(item)" dense>
                <v-text-field
                  style="width: 90%; padding-left: 80px; margin-bottom: 20px"
                  append-icon="mdi-magnify"
                  v-model="search"
                  label="Tìm kiếm"
                  clearable
                  single-line
                  hide-details
                ></v-text-field>

                <!-- <v-list-item v-for="danhMucCon in item" :key="danhMucCon.id">
                  <v-list-item-content>Calories:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ danhMucCon.name }}
                  </v-list-item-content>
                  <v-list-item-content class="align-end">
                    <div>
                      <v-btn icon color="primary">
                        <v-icon>mdi-border-color</v-icon>
                      </v-btn>
                    </div>
                  </v-list-item-content>
                </v-list-item> -->
                <v-list subheader two-line>
                  <v-list-item
                    v-for="danhMucCon in item.children"
                    :key="danhMucCon.id"
                  >
                    <v-list-item-avatar>
                      <v-icon class="grey lighten-1" dark>
                        mdi-book-open-variant
                      </v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title
                        v-text="danhMucCon.name"
                      ></v-list-item-title>

                      <v-list-item-subtitle
                        >{{ danhMucCon.mo_ta ? "Mô tả: " + danhMucCon.mo_ta : '' }}</v-list-item-subtitle
                      >
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-chip color="success" dark small v-if="danhMucCon.active">
                        Đang hoạt động
                      </v-chip>
                      <v-chip color="pink" dark small v-else>
                        Không hoạt động
                      </v-chip>
                    </v-list-item-action>
                    <v-list-item-action>
                      <v-btn icon @click="editDanhMucCon(danhMucCon)">
                        <v-icon color="grey lighten-1">mdi-pencil</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
    <create-edit ref="danhmuc" @on-done="getData"></create-edit>
  </v-container>
</template>

<script>
import { getDanhMuc } from "@/api/danhmuc";
import CreateEdit from "./create-edit";

export default {
  components: { CreateEdit },
  data: () => ({
    singleExpand: false,
    search: null,
    loading: false,
    danhMucs: [],
    headers: [
      { text: "Mã", value: "code", width: 80 },
      { text: "Tên", value: "name" },
      { text: "Trạng thái", value: "active", width: 150 },
    ],
    desserts: [
      {
        name: "Hợp đồng",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: "14%",
        iron: "1%",
      },
      {
        name: "Chức vụ",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        sodium: 129,
        calcium: "8%",
        iron: "1%",
      },
      {
        name: "Mức đóng BHXH",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        sodium: 337,
        calcium: "6%",
        iron: "7%",
      },
      {
        name: "Trình độ chuyên môn",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        sodium: 413,
        calcium: "3%",
        iron: "8%",
      },
      {
        name: "Loại nghỉ đặc biệt",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        sodium: 413,
        calcium: "3%",
        iron: "8%",
      },
      {
        name: "Trình độ ngoại ngữ",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        sodium: 413,
        calcium: "3%",
        iron: "8%",
      },
      {
        name: "Trình độ văn hóa",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        sodium: 413,
        calcium: "3%",
        iron: "8%",
      },
      {
        name: "Tài liệu hợp đồng",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        sodium: 413,
        calcium: "3%",
        iron: "8%",
      },
    ],
  }),
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      let data = await getDanhMuc();
      this.danhMucs = data;
      this.loading = false;
    },
    addDanhMucCon(data){
       this.$refs.danhmuc.showFormAdd(data);
    },
    editDanhMucCon(data){
      this.$refs.danhmuc.showFormEdit(data);
    },
  },
};
</script>

<style>
</style>