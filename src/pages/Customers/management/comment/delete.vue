<template>
  <v-dialog width="650" persistent v-model="deleteDialog">
    <v-card>
      <v-card-title style="height: 45px; background-color: #3f51b5">
        <v-layout align-center class="fill-height">
          <span style="font-size: 14px; font-weight: bold; color: white">
            コメント削除
          </span>
          <v-spacer />
          <v-btn icon small @click="deleteDialog = false"
            ><v-icon color="white">mdi-close</v-icon></v-btn
          >
        </v-layout>
      </v-card-title>
      <v-divider />
      <v-card-text class="pa-4">
        <v-layout column>
          <span style="font-size: 14px; font-weight: 500; color: #000000"
            >コメントを削除します。よろしいですか？</span
          >
        </v-layout>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn width="100" color="error" @click="submitDelete">削除</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { deleteComment } from "@/api/customer";

export default {
  name: "delete",
  data() {
    return {
      currentComment: {},
      deleteDialog: false,
    };
  },
  methods: {
    openDialog(comment) {
      this.currentComment = JSON.parse(JSON.stringify(comment));
      this.deleteDialog = true;
    },
    async submitDelete() {
      await deleteComment({ comment_id: this.currentComment.id });
      this.$emit('get-comment')
      this.deleteDialog = false;
      this.$toast.info("削除は完了しました。", {
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
    },
  },
};
</script>

<style scoped>
</style>