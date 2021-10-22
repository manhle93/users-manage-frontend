<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mb-6">
        <v-list-item>
          <v-layout>
            <v-img
              max-height="100"
              max-width="100"
              :size="40"
              :src="DashboardPic"
              class="mr-4"
            ></v-img>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                SYSTEM DASHBOARD</v-list-item-title
              >
            </v-list-item-content>

            <div class="pt-3">
              <v-btn color="indigo" dark>
                <v-icon left>mdi-arrow-down-bold</v-icon>
                <span>Export Report</span>
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
      </v-row>
      <v-row>
        <v-col lg="6" sm="8" cols="12">
          <v-card color="#303F9F" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div class="mr-6">
                <v-card-title class="headline pt-6"
                  ><span style="font-size: 10px"
                    >こんにちは {{ USER.name }}!</span
                  ></v-card-title
                >
                <v-card-subtitle class="mt-1"
                  ></v-card-subtitle
                >

                <v-card-actions>
                  <v-btn class="ml-2 mt-5 mb-3" outlined rounded small>
                  計時
                  </v-btn>
                </v-card-actions>
              </div>
              <v-img :src="pic[picRandom]" aspect-ratio="2.5"></v-img>
            </div>
          </v-card>
        </v-col>
        <v-col lg="3" sm="6" md="7" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>天気情報</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mock.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters>
                <v-col cols="6" md="5" lg="6" xl="4" class="my-auto">
                  <span>60% / 37°С / 3.3 Ghz</span>
                </v-col>
                <v-col cols="6" md="7" lg="6" xl="8">
                  <ApexChart
                    v-if="apexLoading"
                    height="35"
                    type="area"
                    :options="mock.apexArea1.options"
                    :series="mock.apexArea1.series"
                  ></ApexChart>
                </v-col>
              </v-row>
              <v-row no-gutters class="my-3 my-lg-0">
                <v-col cols="6" md="5" lg="6" xl="4" class="my-auto">
                  <span>54% / 31°С / 3.3 Ghz</span>
                </v-col>
                <v-col cols="6" md="7" lg="6" xl="8">
                  <ApexChart
                    v-if="apexLoading"
                    height="35"
                    type="area"
                    :options="mock.apexArea2.options"
                    :series="mock.apexArea2.series"
                  ></ApexChart>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="6" md="5" lg="6" xl="4" class="my-auto">
                  <span>57% / 21°С / 3.3 Ghz</span>
                </v-col>
                <v-col cols="6" md="7" lg="6" xl="8">
                  <ApexChart
                    v-if="apexLoading"
                    height="35"
                    type="area"
                    :options="mock.apexArea3.options"
                    :series="mock.apexArea3.series"
                  ></ApexChart>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col lg="3" sm="6" md="5" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="flex-nowrap pa-6 pb-3">
              <p class="text-truncate">人員配置</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mock.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-6 pt-0 mb-1">
              <v-row no-gutters>
                <v-col cols="12">
                  <ApexChart
                    height="124"
                    type="donut"
                    class="mt-1"
                    :options="mock.apexPie.options"
                    :series="generatePieSeries()"
                  ></ApexChart>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col lg="3" sm="6" md="5" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>アクセス数</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mock.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters class="pb-5">
                <v-col cols="5" class="my-auto">
                  <span
                    class="font-weight-medium card-dark-grey"
                    style="font-size: 24px"
                    >12, 678</span
                  >
                </v-col>
                <v-col cols="6">
                  <Trend
                    :data="getRandomDataForTrends()"
                    :gradient="mock.trend.gradient"
                    :height="40"
                    stroke-width="4"
                    smooth
                  />
                </v-col>
              </v-row>
              <v-row no-gutters class="justify-space-between pb-3">
                <v-col cols="5">
                  <div class="card-light-grey">Registrations</div>
                  <div class="text-h6 card-dark-grey font-weight-regular">
                    860
                  </div>
                </v-col>
                <v-col cols="3">
                  <div class="card-light-grey">Sign Out</div>
                  <div class="text-h6 card-dark-grey font-weight-regular">
                    32
                  </div>
                </v-col>
                <v-col cols="4" xl="2">
                  <div class="text-right card-light-grey">Rate</div>
                  <div
                    class="
                      text-right text-h6
                      card-dark-grey
                      font-weight-regular
                    "
                  >
                    3.25%
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col lg="3" sm="6" md="7" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>その他の情報</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mock.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters class="pb-5">
                <div class="mr-4">
                  <v-icon color="primary" class="ml-n2">
                    mdi-circle-medium
                  </v-icon>
                  <span class="card-light-grey">Phòng Nhân Sự</span>
                </div>
                <div>
                  <v-icon color="warning"> mdi-circle-medium </v-icon>
                  <span class="card-light-grey">Phòng Sản Xuất</span>
                </div>
              </v-row>
              <v-row no-gutters class="pb-3">
                <v-col>
                  <div class="text-h6 card-light-grey font-weight-regular">
                    デパートメント
                  </div>
                  <v-progress-linear
                    :value="value"
                    background-color="#ececec"
                    color="primary"
                  ></v-progress-linear>
                </v-col>
              </v-row>
              <v-row no-gutters class="pb-1">
                <v-col>
                  <div class="text-h6 card-light-grey font-weight-regular">
                    デパートメント
                  </div>
                  <v-progress-linear
                    :value="value2"
                    background-color="#ececec"
                    color="warning"
                  ></v-progress-linear>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col lg="3" sm="6" md="7" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>天気情報</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mock.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters>
                <v-col cols="6" md="5" lg="6" xl="4" class="my-auto">
                  <span>60% / 37°С / 3.3 Ghz</span>
                </v-col>
                <v-col cols="6" md="7" lg="6" xl="8">
                  <ApexChart
                    v-if="apexLoading"
                    height="35"
                    type="area"
                    :options="mock.apexArea1.options"
                    :series="mock.apexArea1.series"
                  ></ApexChart>
                </v-col>
              </v-row>
              <v-row no-gutters class="my-3 my-lg-0">
                <v-col cols="6" md="5" lg="6" xl="4" class="my-auto">
                  <span>54% / 31°С / 3.3 Ghz</span>
                </v-col>
                <v-col cols="6" md="7" lg="6" xl="8">
                  <ApexChart
                    v-if="apexLoading"
                    height="35"
                    type="area"
                    :options="mock.apexArea2.options"
                    :series="mock.apexArea2.series"
                  ></ApexChart>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="6" md="5" lg="6" xl="4" class="my-auto">
                  <span>57% / 21°С / 3.3 Ghz</span>
                </v-col>
                <v-col cols="6" md="7" lg="6" xl="8">
                  <ApexChart
                    v-if="apexLoading"
                    height="35"
                    type="area"
                    :options="mock.apexArea3.options"
                    :series="mock.apexArea3.series"
                  ></ApexChart>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col lg="3" sm="6" md="5" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="flex-nowrap pa-6 pb-3">
              <p class="text-truncate">その他の情報</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mock.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-6 pt-0 mb-1">
              <v-row no-gutters>
                <v-col cols="12">
                  <ApexChart
                    height="124"
                    type="donut"
                    class="mt-1"
                    :options="mock.apexPie.options"
                    :series="generatePieSeries()"
                  ></ApexChart>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-0">
              <v-row no-gutters>
                <v-col
                  cols="7"
                  sm="4"
                  md="4"
                  lg="5"
                  class="d-flex align-center"
                >
                  <p>その他の情報</p>
                </v-col>
                <v-col
                  sm="6"
                  md="6"
                  lg="5"
                  class="d-none d-sm-flex align-center"
                >
                  <v-icon size="18" color="warning">mdi-circle-medium</v-icon
                  ><span
                    class="card-dark-grey font-weight-regular mr-3"
                    style="font-size: 18px"
                    >Tablet</span
                  >
                  <v-icon size="18" color="primary">mdi-circle-medium</v-icon
                  ><span
                    class="card-dark-grey font-weight-regular mr-3"
                    style="font-size: 18px"
                    >Mobile</span
                  >
                  <v-icon size="18" color="#B1BCFF">mdi-circle-medium</v-icon
                  ><span
                    class="card-dark-grey font-weight-regular"
                    style="font-size: 18px"
                    >Desktop</span
                  >
                </v-col>
                <v-col cols="5" sm="2" md="2" lg="1" offset-lg="1">
                  <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                      <v-select
                        class="main-chart-select"
                        v-model="mainApexAreaSelect"
                        v-bind="attrs"
                        v-on="on"
                        dense
                        flat
                        single-line
                        hide-details
                        :items="mock.select"
                        outlined
                      ></v-select>
                    </template>
                  </v-menu>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text class="pa-6">
              <v-row>
                <v-col>
                  <ApexChart
                    v-if="apexLoading"
                    height="350"
                    type="area"
                    :options="mock.mainApexArea.options"
                    :series="
                      mainApexAreaSelect === 'Daily'
                        ? mock.mainApexArea.series
                        : mainApexAreaSelect === 'Weekly'
                        ? mock.mainApexArea.series2
                        : mock.mainApexArea.series3
                    "
                  ></ApexChart>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col lg="4" sm="6" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>デパートメント</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mock.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters>
                <v-col cols="6" class="my-auto">
                  <span class="" style="font-size: 42px"
                    >199 <span class="caption error--text">-3.7%</span>
                  </span>
                </v-col>
                <v-col cols="6">
                  <ApexChart
                    height="100"
                    type="bar"
                    v-if="apexLoading"
                    :options="mock.apexBar1.options"
                    :series="mock.apexBar1.series"
                  ></ApexChart>
                </v-col>
              </v-row>
              <v-row no-gutters class="justify-space-between">
                <div>
                  <div class="subtext">
                    33 <v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Registrations</div>
                </div>
                <div>
                  <div class="subtext">
                    3.25%<v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Bounce Rate</div>
                </div>
                <div>
                  <div class="subtext">
                    330<v-icon color="error"> mdi-arrow-bottom-right</v-icon>
                  </div>
                  <div class="subtext-index">Views</div>
                </div>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col lg="4" sm="6" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>デパートメント</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mock.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters>
                <v-col cols="7" class="my-auto">
                  <span class="" style="font-size: 42px"
                    >121 <span class="error--text caption">-3.2%</span>
                  </span>
                </v-col>
                <v-col cols="5">
                  <ApexChart
                    height="100"
                    type="bar"
                    v-if="apexLoading"
                    :options="mock.apexBar2.options"
                    :series="mock.apexBar2.series"
                  ></ApexChart>
                </v-col>
              </v-row>
              <v-row no-gutters class="justify-space-between">
                <div>
                  <div class="subtext">
                    15<v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Registrations</div>
                </div>
                <div>
                  <div class="subtext">
                    3.01%<v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Bounce Rate</div>
                </div>
                <div>
                  <div class="subtext">
                    302<v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Views</div>
                </div>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col lg="4" sm="6" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>デパートメント</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mock.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters>
                <v-col cols="7" class="my-auto">
                  <span class="" style="font-size: 42px"
                    >175 <span class="error--text caption">-3.1%</span>
                  </span>
                </v-col>
                <v-col cols="5">
                  <ApexChart
                    height="100"
                    type="bar"
                    v-if="apexLoading"
                    :options="mock.apexBar3.options"
                    :series="mock.apexBar3.series"
                  ></ApexChart>
                </v-col>
              </v-row>
              <v-row no-gutters class="justify-space-between">
                <div>
                  <div class="subtext">
                    31 <v-icon color="error"> mdi-arrow-bottom-right</v-icon>
                  </div>
                  <div class="subtext-index">Registrations</div>
                </div>
                <div>
                  <div class="subtext">
                    3.23%<v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Bounce Rate</div>
                </div>
                <div>
                  <div class="subtext">
                    301<v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Views</div>
                </div>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card class="support-requests mx-1 mb-1">
            <v-card-title class="pa-6 pb-0">
              <p>その他の情報</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mock.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-simple-table>
                <template v-slot:default>
                  <thead class="pl-2">
                    <tr>
                      <th class="text-left pa-6">Tên</th>
                      <th class="text-left">Email Khách Hàng</th>
                      <th class="text-left">Sản Phẩm</th>
                      <th class="text-left">Giá Thành</th>
                      <th class="text-left">Ngày khởi tạo</th>
                      <th class="text-left">Khu Vực</th>
                      <th class="text-left">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in mock.table" :key="item.name">
                      <td class="pa-6">{{ item.name }}</td>
                      <td>{{ item.email }}</td>
                      <td>{{ item.product }}</td>
                      <td>{{ item.price }}</td>
                      <td>{{ item.date }}</td>
                      <td>{{ item.city }}</td>
                      <td v-if="item.status === 'Sent'">
                        <v-chip link color="success" class="ma-2 ml-0">
                          Sent
                        </v-chip>
                      </td>
                      <td v-else-if="item.status === 'Pending'">
                        <v-chip link color="warning" class="ma-2 ml-0">
                          Pending
                        </v-chip>
                      </td>
                      <td v-else-if="item.status === 'Declined'">
                        <v-chip link color="secondary" class="ma-2 ml-0">
                          Declined
                        </v-chip>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import DashboardPic from "@/assets/images/dashboard.svg";
import pic1 from "./image/01.svg";
import pic2 from "./image/02.svg";
import pic3 from "./image/03.svg";
import pic4 from "./image/04.svg";
import pic5 from "./image/05.svg";
import pic6 from "./image/06.svg";
import mock from "./mock";
import Trend from "vuetrend";
import ApexChart from "vue-apexcharts";
export default {
  name: "Dashboard",
  components: {
    Trend,
    ApexChart,
  },
  data() {
    return {
      tt: "manh",
      DashboardPic,
      pic: [pic1, pic2, pic3, pic4, pic5, pic6],
      picRandom: Math.floor(Math.random() * 6),
      mock,
      apexLoading: false,
      value: this.getRandomInt(10, 90),
      value2: this.getRandomInt(10, 90),
      mainApexAreaSelect: "Daily",
      headers: [
        { text: "Name", value: "name" },
        { text: "Japan Name", value: "japanName" },
        { text: "Ngày sinh", value: "birthday" },
        { text: "V-1", value: "bust" },
        { text: "V-2", value: "waist" },
        { text: "V-3", value: "hip" },
        { text: "Chiều cao", value: "height" },
        { text: "Nhóm máu", value: "blood_type" },
        { text: "Sở thích", value: "hobby" },
        { text: "Quận, thành phố", value: "prefectures" },
      ],
      ages: [],
    };
  },
  computed: {
    USER() {
      console.log("computed");
      return this.$store.state.User.me;
    },
  },
  methods: {
    getRandomDataForTrends() {
      const arr = [];
      for (let i = 0; i < 12; i += 1) {
        arr.push(Math.random().toFixed(1) * 10);
      }
      return arr;
    },
    generatePieSeries() {
      let series = [];

      for (let i = 0; i < 4; i++) {
        let y = Math.floor(Math.random() * (500 - 100 + 100)) + 100;
        series.push(y);
      }
      return series;
    },
    getRandomInt(min, max) {
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    },
  },
  mounted() {
    console.log("mounted");
    setTimeout(() => {
      this.apexLoading = true;
    });
  },
  beforeCreate() {
    console.log("beforecreate");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  updated() {
    console.log("updated");
  },
  destroyed() {
    console.log("destroyed");
  },
};
</script>

<style src="./Dashboard.scss" lang="scss" />
