<template>
  <v-dialog width="650" persistent v-model="editDialog">
    <v-card>
      <v-card-title style="height: 45px; background-color: #3f51b5">
        <v-layout align-center class="fill-height">
          <span style="font-size: 14px; font-weight: bold; color: white">
            コメント編集
          </span>
          <v-spacer />
          <v-btn icon small @click="editDialog = false"
            ><v-icon color="white">mdi-close</v-icon></v-btn
          >
        </v-layout>
      </v-card-title>
      <v-divider />
      <v-card-text
        class="px-2 py-4"
        style="max-height: 350px; overflow-y: auto"
      >
        <v-form ref="formData" onSubmit="return false;" v-model="valid">
          <v-textarea
            counter
            class="mx-2"
            v-model="form.comment"
            filled
            :rules="[rules.required, rulesLength]"
            rows="2"
            prepend-icon="mdi-comment"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn width="100" color="primary" @click="submitEdit">更新</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { editComment } from "@/api/customer";
export default {
  name: "update",
  data() {
    return {
      rulesLength: (v) => v&& v.length <= 255 || "最大255文字で入力してください",
      rules: {
        required: (value) =>
          (!!value && value.trim().length >= 2) || "２文字以上で入力してください",
      },
      valid: false,
      editDialog: false,
      form: {},
    };
  },
  methods: {
    openDialog(comment) {
      let commentTmp = JSON.parse(JSON.stringify(comment));
      this.form.comment = commentTmp.content;
      this.form.id = commentTmp.id;
      this.editDialog = true;
    },
    async submitEdit() {
      this.$refs.formData.validate();
      if (!this.valid) return;
      await editComment(this.form);
      this.$emit("get-comment");
      this.editDialog = false;
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
    },
  },
};
</script>

<style scoped>
</style>