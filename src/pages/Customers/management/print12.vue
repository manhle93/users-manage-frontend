<template>
  <div style="height: 90%; width: 100%;">
    <table
      style="
        width: 100%;
        max-height: 100%;
        border-collapse: collapse;
      "
    >
      <tr
        :style="{ height: '15.73vh' }"
        v-for="(items, key) in tableData"
        :key="key"
      >
        <td
          style="
            border: 1px solid black;
            border-collapse: collapse;
            width: 50%;
            vertical-align: top !important;
            position: relative;
            padding: 20px;
          "
          v-for="item in items"
          :key="item.id"
        >
          <div style="position: absolute; bottom: 20px; right: 20px">
            {{ item.user_id }} {{ item.user ? item.user.company_name : "" }}
          </div>
          <div style="width: 100%" v-if="item.user_id">
            <div>
              <div style="font-family:MS P明朝,MS 明朝, serif">〒 {{ item.postal_code }}</div>
              <div style="font-family:MS P明朝,MS 明朝, serif">{{ item.address }}</div>
              <div style="font-weight: bold; font-size:14px !important;font-family:HG行書体, HGP行書体,cursive">{{ item.company_name }} {{ item.representative_name ? "" : "御中"}}</div>
              <div style="font-weight: bold; font-size:14px !important;font-family:HG行書体, HGP行書体,cursive">{{ item.representative_name ? item.representative_name + ' 様' : ""}} </div>
            </div>
          </div>
          <div v-else></div>
        </td>
      </tr>
    </table>
    <table
      style="
        width: 100%;
        max-height: 100%;
        border-collapse: collapse;
      "
    >
      <tr
        :style="{ height: '16.59vh' }"
        v-for="(items, key) in tableData1"
        :key="key"
      >
        <td
          style="
            border: 1px solid black;
            border-collapse: collapse;
            width: 50%;
            vertical-align: top !important;
            position: relative;
            padding: 20px;
          "
          v-for="item in items"
          :key="item.id"
        >
          <div style="position: absolute; bottom: 20px; right: 20px">
            担当者 {{ item.user_id }} {{ item.user ? item.user.company_name : "" }}
          </div>
          <div style="width: 100%" v-if="item.user_id">
            <div>
              <div style="font-family:MS P明朝,MS 明朝, serif">〒 {{ item.postal_code }}</div>
              <div style="font-family:MS P明朝,MS 明朝, serif">{{ item.address }}</div>
              <div style="font-weight: bold; font-size:14px !important;font-family:HG行書体, HGP行書体,cursive">{{ item.company_name }} {{ item.representative_name ? "" : "御中"}}</div>
              <div style="font-weight: bold; font-size:14px !important;font-family:HG行書体, HGP行書体,cursive">{{ item.representative_name ? item.representative_name + ' 様' : ""}} </div>
            </div>
          </div>
          <div v-else></div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  // props: ["data", "row"],
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    row: {
      type: Number,
      default: 4,
    },
  },
  data: () => ({
    tableData: [],
    tableData1: [],
    tableData2: [],
  }),
  watch: {
    data(val) {
      this.tableData = []
      this.tableData1 = []
      this.tableData2 = []

      const data = [...val];
      if (data.length % 2 == 1) {
        data.push({});
      }
      if(data.length < 12){
        for (let i = 0; i < data.length -1; i = i + 2) {
          this.tableData.push([data[i], data[i + 1]]);
        }
      }
      
      if(data.length >=12){
        for (let i = 0; i < 12; i = i + 2) {
          this.tableData.push([data[i], data[i + 1]]);
        }
        for (let i = 12; i < data.length; i = i + 2) {
          this.tableData1.push([data[i], data[i + 1]]);
        }
      }
    },
  },
  mounted() {

  },
};
</script>

<style>
@page { size: auto;  margin: 0mm; }
.d-flex {
  display: flex;
  flex-direction: row;
}
.c-flex {
  display: flex;
  flex-direction: column;
}
.block {
  height: 20%;
  width: 45%;
  border: 1px solid red;
  float: left;
  margin: 5px;
}

</style>