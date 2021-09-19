<template>
  <v-container>
    <v-layout>
      <div style="font-size: 20px; color: black">
        Quá trình tham gia bảo hiểm xã hội
      </div>
      <v-spacer></v-spacer>
      <div>
        <v-select
          :items="years"
          dense
          item-text="name"
          item-value="value"
          v-model="selectYear"
        ></v-select>
      </div>
    </v-layout>
    <v-row>
      <v-col cols="4">
        <v-timeline :reverse="true" dense>
          <v-timeline-item
            v-for="n in 4"
            :key="n"
            :color="
              n <= currentMonth && n <= currentYear ? 'success' : '#B0BEC5'
            "
            :icon="n <= currentMonth && n <= currentYear ? 'mdi-check' : ''"
          >
            <v-card class="elevation-2 mb-3">
              <v-card-title>
                Tháng {{ n }}/{{ selectYear }}
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-grease-pencil</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-layout column>
                  <div>Mức đóng: <strong>5.000.000 đ</strong></div>
                  <div><strong>Ghi chú:</strong></div>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline></v-col
      >
      <v-col cols="4">
        <v-timeline :reverse="true" dense>
          <v-timeline-item v-for="n in 4" :key="n">
            <v-card class="elevation-2">
              <v-card-title> Tháng {{ n + 4 }}/{{ selectYear }} </v-card-title>
              <v-card-text>
              <v-layout column>
                  <div>Mức đóng: <strong>5.500.000 đ</strong></div>
                  <div><strong>Ghi chú:</strong></div>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
      <v-col cols="4">
        <v-timeline :reverse="false" dense>
          <v-timeline-item v-for="n in 4" :key="n">
            <v-card class="elevation-2">
              <v-card-title> Tháng {{ n + 8 }}/{{ selectYear }} </v-card-title>
              <v-card-text>
              <v-layout column>
                  <div>Mức đóng: <strong>7.000.000 đ</strong></div>
                  <div><strong>Ghi chú:</strong></div>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    years: [
      { name: 2020, value: 2020 },
      { name: 2021, value: 2021 },
    ],
    selectYear: null,
    currentYear: null,
    currentMonth: null,
  }),
  mounted() {
    this.getYears();
  },
  methods: {
    getYears() {
      let now = new Date();
      this.currentYear = now.getFullYear();
      this.currentMonth = +now.getMonth() + 1;
      this.selectYear = this.currentYear;
      console.log(this.currentMonth, this.currentYear);
      this.years = [];
      for (let i = 2021; i <= this.currentYear; i++) {
        let year = { name: "Năm " + i, value: i };
        this.years.push(year);
      }
    },
  },
};
</script>

<style>
</style>