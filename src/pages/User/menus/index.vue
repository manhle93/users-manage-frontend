<template>
  <v-container>
    <v-list-item>
      <v-layout>
        <v-img
          max-height="100"
          max-width="100"
          :size="40"
          :src="MenuPic"
          class="mr-4"
        ></v-img>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">
            DANH SÁCH MENU</v-list-item-title
          >
          <v-list-item-subtitle
            >Tạo và cập nhật menu hệ thống. Chức năng dành cho nhà phát
            triển</v-list-item-subtitle
          >
        </v-list-item-content>

        <div class="pt-3">
          <v-btn color="indigo" dark @click="createMenu()">
            <v-icon left>mdi-plus</v-icon>
            <span>Tạo Menu</span>
          </v-btn>
        </div>
      </v-layout>
    </v-list-item>
    <v-progress-linear
      height="2"
      color="indigo"
      rounded
      value="100"
      class="mt-1"
    ></v-progress-linear>

    <br />
      <v-card-title class="pa-6 pb-4">
        <p>Menu</p>
        <v-spacer></v-spacer>
        <div style="width: 300px">
          <v-text-field
            append-icon="mdi-magnify"
            v-model="search"
            label="Tìm kiếm"
            clearable
            single-line
            hide-details
          ></v-text-field>
        </div>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="tableData"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        :loading="loading"
        class="elevation-1"
        loading-text="Đang tải dữ liệu ..."
      >
        <template v-slot:[`item.icon`]="{ item }">
          <v-icon>{{ item.icon }}</v-icon>
        </template>
        <template v-slot:[`item.order`]="{ item }">
          <span>{{
            item.parent ? item.parent.order + "-" + item.order : item.order
          }}</span>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="textColor">mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="editMenu(item)">
                <v-list-item-title>
                  <v-icon class="mr-2"> mdi-pencil </v-icon>
                  Cập nhật</v-list-item-title
                >
              </v-list-item>
              <v-list-item @click="xoaMenu(item)">
                <v-list-item-title>
                  <v-icon class="mr-2"> mdi-delete </v-icon>
                  Xóa Menu</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    <div class="pt-2">
      <v-pagination v-model="page" :length="pageCount" @input="changePage"
        >></v-pagination
      >
    </div>
    <create-edit ref="menuForm" @on-done="getMenu"></create-edit>
  </v-container>
</template>
<script>
import { getMenuTable, deleteMenu } from "@/api/menu";
import CreateEdit from "./create-edit";
import { debounce } from "lodash";
import MenuPic from "@/assets/images/menu.svg";

export default {
  components: { CreateEdit },
  data() {
    return {
      MenuPic,
      page: 1,
      pageCount: 1,
      itemsPerPage: 10,
      tableData: [],
      btnLoading: false,
      menu: {},
      loading: false,
      search: "",
      headers: [
        // { text: "STT", width: "100", sortable: false },
        { text: "Icon", value: "icon", sortable: false },
        {
          text: "Tên Menu",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Menu cha", value: "parent.name" },
        { text: "Vị trí", value: "order" },
        {
          text: "Hành động",
          value: "action",
          sortable: false,
          align: "center",
          width: "150",
        },
      ],
    };
  },
  computed: {},
  created() {
    this.getMenu();
  },
  watch: {
    search: debounce(async function (val) {
      this.loading = true;
      let data = await getMenuTable({
        page: this.page,
        perPage: this.itemsPerPage,
        search: val,
      });
      this.loading = false;
      this.tableData = data.data;
      this.pageCount = data.last_page;
    }, 300),
  },
  methods: {
    async getMenu() {
      this.loading = true;
      let data = await getMenuTable({
        page: this.page,
        perPage: this.itemsPerPage,
      });
      this.loading = false;
      this.tableData = data.data;
      this.pageCount = data.last_page;
    },
    changePage(val) {
      this.page = val;
      this.getMenu();
    },
    editMenu(menu) {
      this.$refs.menuForm.showFormEdit(menu);
    },
    async xoaMenu(menu) {
      this.$confirmBox.show({
        title: "Xóa Menu - Router hệ thống",
        width: 500,
        body:
          "Bạn có chắc chắn muốn xóa menu - router " +
          "<strong>" +
          menu.name +
          " ?" +
          "</strong><br>" +
          "<strong>" +
          menu.name +
          "</strong>" +
          " sẽ không thể truy cập",
        action: () => deleteMenu({ id: menu.id }),
        onDone: this.getMenu,
      });
    },
    createMenu() {
      this.$refs.menuForm.showFormAdd();
    },
  },
};
</script>
