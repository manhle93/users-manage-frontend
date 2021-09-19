<template>
  <v-container>
    <div class="title-group pt-3 pb-2">Danh sách người nhận</div>
    <div v-if="nhom.name" style="font-size: 18px">Gửi đến: <b>{{nhom.name}}</b></div>
    <v-list flat subheader three-line max-width="400" max-height="500">
      <template v-for="(item, index) in people">
        <v-list-item :key="item.id" :value="item.user_id">
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
              >SĐT: {{ item.nhan_vien ? item.nhan_vien.so_dien_thoai : "" }} -
              Chức vụ:
              {{
                item.nhan_vien && item.nhan_vien.chuc_vu
                  ? item.nhan_vien.chuc_vu.name
                  : ""
              }}</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >Phòng ban:
              {{
                item.nhan_vien && item.nhan_vien.phong_ban
                  ? item.nhan_vien.phong_ban.name
                  : ""
              }}
              {{
                item.nhan_vien && item.nhan_vien.nhom_to
                  ? " - Tổ: " + item.nhan_vien.nhom_to.name
                  : ""
              }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="index"></v-divider>
      </template>
    </v-list>
  </v-container>
</template>

<script>
export default {
  props: {
    people: {
      type: Array,
    },
    nhom: {
      type: Object,
    },
  },

  data: () => ({
    imageEndpoint: process.env.VUE_APP_BASE,
  }),

  mounted() {},
};
</script>

<style scoped>
.title-group {
  font-size: 20px;
  color: black;
}
</style>