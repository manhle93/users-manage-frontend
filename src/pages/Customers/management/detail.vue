<template>
  <v-container fluid>
    <v-form ref="form">
      <v-row>
        <v-col lg="8" sm="12" md="8" xs="12">
          <v-card>
            <v-card-title class="pt-4 pl-6">
              <v-btn
                class="mr-2"
                @click="gotoLink('/customer/manage')"
                fab
                color="primary"
                x-small
                ><v-icon>mdi-chevron-left</v-icon></v-btn
              >
              Customer Infomation
              <v-spacer />
              <v-btn
                width="120"
                class="mr-2"
                @click="gotoLink('/customer/edit/' + $route.params.id)"
                color="primary"
                ><v-icon size="18" class="mr-2">mdi-pencil</v-icon> Edit</v-btn
              >
            </v-card-title>
            <v-layout column class="pl-6 pr-6">
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr>
                      <td width="240px">Company name:</td>
                      <td style="font-weight: bold">{{ form.company_name }}</td>
                      <td width="240px">Industry:</td>
                      <td style="font-weight: bold">
                        {{
                          Industries.some((val) => val.id === form.industry_id)
                            ? Industries.find(
                                (val) => val.id === form.industry_id
                              ).name
                            : ""
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td width="240px">Postal Code:</td>
                      <td style="font-weight: bold">{{ form.postal_code }}</td>
                      <td width="240px">Representative name:</td>
                      <td style="font-weight: bold">
                        {{ form.representative_name }}
                      </td>
                    </tr>
                    <tr>
                      <td width="240px">Address:</td>
                      <td style="font-weight: bold">{{ form.address }}</td>
                      <td width="240px">Phone number:</td>
                      <td style="font-weight: bold">{{ form.phone_number }}</td>
                    </tr>
                    <tr>
                      <td width="240px">Home page Url:</td>
                      <td style="font-weight: bold">{{ form.homepage_url }}</td>
                      <td width="240px">Status:</td>
                      <td style="font-weight: bold">
                        {{
                          status.some((val) => val.value === form.signed)
                            ? status.find((val) => val.value === form.signed)
                                .name
                            : ""
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td width="240px">Manager name:</td>
                      <td style="font-weight: bold">{{ form.manager_name }}</td>
                      <td width="240px">Manager email:</td>
                      <td style="font-weight: bold">
                        {{ form.manager_email }}
                      </td>
                    </tr>
                    <tr>
                      <td width="240px">担当者2Eメールアドレス:</td>
                      <td style="font-weight: bold">
                        {{ form.person_in_charge_email_2 }}
                      </td>
                      <td width="240px"></td>
                      <td style="font-weight: bold"></td>
                    </tr>
                    <tr>
                      <td width="240px">Person in charge nam:e</td>
                      <td style="font-weight: bold">
                        {{ form.person_in_charge_name }}
                      </td>
                      <td width="240px">Person in charge email:</td>
                      <td style="font-weight: bold">
                        {{ form.person_in_charge_email }}
                      </td>
                    </tr>
                    <tr>
                      <td width="240px">担当者名2:</td>
                      <td style="font-weight: bold">
                        {{ form.person_in_charge_name_2 }}
                      </td>
                      <td width="240px"></td>
                      <td style="font-weight: bold"></td>
                    </tr>
                    <tr>
                      <td width="240px">Print count:</td>
                      <td style="font-weight: bold">{{ form.print_count }}</td>
                      <td width="240px">Last print date:</td>
                      <td style="font-weight: bold">
                        {{
                          form.last_printed_date
                            ? form.last_printed_date.substr(0, 10)
                            : ""
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td width="240px">Note:</td>
                      <td style="font-weight: bold" colspan="3">
                        {{ form.note }}
                      </td>
                    </tr>
                    <tr>
                      <td width="240px">Created at:</td>
                      <td style="font-weight: bold">
                        {{
                          form.created_at ? form.created_at.substr(0, 10) : ""
                        }}
                      </td>
                      <td width="240px">Updated at:</td>
                      <td style="font-weight: bold">
                        {{
                          form.updated_at ? form.updated_at.substr(0, 10) : ""
                        }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
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
                  counter
                  class="mx-2"
                  v-model="form.comment"
                  filled
                  :rules="rules"
                  rows="2"
                  prepend-icon="mdi-comment"
                ></v-textarea>
              </v-card-text>
              <v-layout
                column
                class="pl-8 pr-6 pb-5"
                v-if="editing && comments && comments.length > 0"
              >
                <v-layout class="py-2" v-for="item in comments" :key="item.key">
                  <v-avatar color="indigo" size="40">
                    <img
                        v-if="item.user_comment && item.user_comment.url_image"
                        :src="imageEndpoint + item.user_comment.url_image"
                        alt="John"
                    />
                    <span style="color: white" v-else-if="item && item.user_comment.name">{{
                        item.user_comment.name.charAt(0).toUpperCase()
                      }}</span>
                    <v-icon v-else dark>mdi-account</v-icon>
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
                        >
                          {{ item.company_name }}
                        </span>
                        <span
                          class="pl-2"
                          style="font-size: 11px; color: #b5b5b5"
                          >{{ item.thoi_gian }}
                        </span>
                        <v-spacer />
                        <v-btn
                          v-if="currentUser.id === item.from_user_id"
                          icon
                          x-small
                          @click="openEditCommentForm(item)"
                          ><v-icon>mdi-pencil</v-icon></v-btn
                        >
                        <v-btn
                          v-if="currentUser.id === item.from_user_id"
                          icon
                          x-small
                          @click="openDeleteCommentForm(item)"
                          ><v-icon>mdi-delete</v-icon></v-btn
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
                  <v-avatar size="200" style="border: 4px solid white">
                    <img
                      :src="
                        form.url_image
                          ? imageEndpoint + form.url_image
                          : avatarNone
                      "
                      alt="ManhLe"
                    />
                  </v-avatar>
                </v-layout>
              </v-card-text>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
    <UpdateComment ref="editCommentForm" @get-comment="fetchComments" />
    <DeleteComment ref="deleteCommentForm" @get-comment="fetchComments" />
  </v-container>
</template>
<script>
import avatarNone from "../../../../docs/img/avatar_none.png";
import masterialPic from "../../../../docs/img/masterial.png";
import {
  getCategories,
  getCustomerInfo,
  addComment,
  getComments,
} from "@/api/customer";
import UpdateComment from "@/pages/Customers/management/comment/update";
import DeleteComment from "@/pages/Customers/management/comment/delete";

export default {
  components: { DeleteComment, UpdateComment },
  data: () => ({
    editing: false,
    Industries: [],
    status: [
      { value: false, name: "未契約" },
      { value: true, name: "契約済" },
    ],
    rules: [(v) => v && v.length <= 255 || "Max 255 characters"],
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
      person_in_charge_email_2: null,
      person_in_charge_name: null,
      person_in_charge_email: null,
      person_in_charge_name_2: null,
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
    },
  },
  methods: {
    gotoLink(link) {
      this.$router.push(link);
    },
    async getIndustries() {
      let data = await getCategories({ group: "industry" });
      this.Industries = data;
    },
    async fetchComments() {
      let data = await getComments({ user_id: this.form.user_id });
      this.comments = data;
      console.log(this.comments)
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
        console.log(this.form);
        this.fetchComments();
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
    openEditCommentForm(comment) {
      this.$refs.editCommentForm.openDialog(comment);
    },
    openDeleteCommentForm(comment) {
      this.$refs.deleteCommentForm.openDialog(comment);
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
