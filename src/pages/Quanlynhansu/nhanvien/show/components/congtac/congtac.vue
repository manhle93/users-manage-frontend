<template>
  <v-container>
      <h4 style="color: black">Quá trình công tác làm việc</h4>
    <v-timeline :dense="$vuetify.breakpoint.smAndDown">
      <v-timeline-item color="purple lighten-2" fill-dot right>
        <v-card>
          <v-card-title class="purple lighten-2">
            <v-icon dark size="42" class="mr-4"> mdi-account-check </v-icon>
            <h5 class="white--text font-weight">Gia nhập công ty</h5>
            <v-spacer></v-spacer>
            <div class="white--text">Ngày: 01/03/2018</div>
          </v-card-title>
          <v-container>
            <v-row>
              <v-col cols="8" md="7">
                <div class="body-text pb-1">Chức vụ: <b>Công nhân</b></div>
                <div class="body-text pb-1">
                  Phòng ban: <b>Phòng sản xuất</b>
                </div>
                <div class="body-text pb-1">Tổ: <b>Tổ công nhân Từ Sơn</b></div>
                <div class="body-text pb-2">
                  Hợp đồng: <b>Hợp đồng thử việc</b>
                </div>
              </v-col>
              <v-col class="hidden-sm-and-down text-right" md="5">
                <v-img
                  max-height="200"
                  max-width="200"
                  :src="giaNhappic"
                  class="mr-4"
                ></v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-timeline-item>

      <v-timeline-item color="amber lighten-1" fill-dot left small>
        <v-card>
          <v-card-title class="orange lighten-2">
            <v-icon dark size="42" class="mr-4"> mdi-book-open-page-variant </v-icon>
            <h5 class="white--text font-weight">Thay đổi hợp đồng</h5>
            <v-spacer></v-spacer>
            <div class="white--text">Ngày: 02/09/2018</div>
          </v-card-title>
          <v-container>
            <v-row>
              <v-col cols="8" md="7">
                <div class="body-text pb-1">Chức vụ: Công nhân</div>
                <div class="body-text pb-1">Phòng ban: Phòng sản xuất</div>
                <div class="body-text pb-1">Tổ: Tổ công nhân Từ Sơn</div>
                <div class="body-text pb-2">
                  Hợp đồng: <b>Hợp đồng chính thức</b>
                </div>
              </v-col>
              <v-col class="hidden-sm-and-down text-right" md="5">
                <v-img
                  max-height="150"
                  max-width="150"
                  :src="hopDongPic"
                  class="mr-4"
                ></v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-timeline-item>

      <v-timeline-item color="cyan lighten-1" fill-dot right>
        <v-card>
          <v-card-title class="cyan lighten-1">
            <v-icon dark size="42" class="mr-4"> mdi-account-convert </v-icon>
            <h5 class="white--text font-weight">Thay đổi chức vụ</h5>
            <v-spacer></v-spacer>
            <div class="white--text">Ngày: 11/10/2018</div>
          </v-card-title>
          <v-container>
            <v-row>
              <v-col cols="8" md="7">
                <div class="body-text pb-1">Chức vụ: <b>Tổ trưởng</b></div>
                <div class="body-text pb-1">Phòng ban: Phòng sản xuất</div>
                <div class="body-text pb-1">Tổ: Tổ công nhân Từ Sơn</div>
                <div class="body-text pb-2">Hợp đồng: Hợp đồng chính thức</div>
              </v-col>
              <v-col class="hidden-sm-and-down text-right" md="5">
                <v-img
                  max-height="150"
                  max-width="150"
                  :src="chucVuPic"
                  class="mr-4"
                ></v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-timeline-item>

      <v-timeline-item color="red lighten-1" fill-dot left small>
        <v-card>
          <v-card-title class="red lighten-1 justify-end">
            <v-icon dark size="42" class="mr-4"> mdi-map </v-icon>
            <h5 class="white--text font-weight">
              Thay đổi tổ - Khu vực làm việc
            </h5>
            <v-spacer></v-spacer>
            <div class="white--text">Ngày: 05/11/2018</div>
          </v-card-title>
          <v-container>
            <v-row>
              <v-col cols="10" md="7">
                <div class="body-text pb-1">Chức vụ: Tổ trưởng</div>
                <div class="body-text pb-1">Phòng ban: Phòng sản xuất</div>
                <div class="body-text pb-1">
                  Tổ: <b>Tổ Thành phố Bắc Ninh</b>
                </div>
                <div class="body-text pb-2">Hợp đồng: Hợp đồng chính thức</div>
              </v-col>
              <v-col class="hidden-sm-and-down text-right" md="5">
                <v-img
                  max-height="150"
                  max-width="150"
                  :src="khuVucPic"
                  class="mr-4"
                ></v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script>
import giaNhappic from "../../../../../../assets/images/congtac/gianhap.svg";
import hopDongPic from "../../../../../../assets/images/congtac/hopdong.svg";
import chucVuPic from "../../../../../../assets/images/congtac/chucvu.svg";
import khuVucPic from "../../../../../../assets/images/congtac/khuvuc.svg";

export default {
  data: () => ({
    giaNhappic,
    hopDongPic,
    chucVuPic,
    khuVucPic,
  }),
  methods: {},
};
</script>

<style scoped>
.body-text {
  font-size: 16px;
  color: black;
}
</style>