<template>
  <div style="height: 100%; width: 100%">
    <table
      style="
        width: 100%;
        max-height: 100%;
        border: 1px solid black;
        border-collapse: collapse;
        table-layout: fixed;
      "
    >
      <tr
        style="border: 5px solid black; border-collapse: collapse"
        :style="{ height: `calc(95vh /${row}) ` }"
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
            word-wrap: break-word;
          "
          v-for="item in items"
          :key="item.id"
        >
          <div style="position: absolute; bottom: 20px; right: 20px">
            担当者 {{ item.user_id }}
            {{ item.user ? item.user.company_name : "" }}
          </div>
          <div style="width: 100%" v-if="item.user_id">
            <div>
              <div style="font-family: MS P明朝, MS 明朝, serif">
                〒 {{ item.postal_code }}
              </div>
              <div style="font-family: MS P明朝, MS 明朝, serif">
                {{ item.address }}
              </div>
              <div
                style="
                  font-weight: bold;
                  font-size: 22px !important;
                  font-family: HG行書体, HGP行書体, cursive;
                "
              >
                {{ item.company_name }}
                {{ item.representative_name ? "" : "御中" }}
              </div>
              <div
                style="
                  font-weight: bold;
                  font-size: 22px !important;
                  font-family: HG行書体, HGP行書体, cursive;
                "
              >
                {{
                  item.representative_name
                    ? item.representative_name + " 様"
                    : ""
                }}
              </div>
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
  }),
  watch: {
    data(val) {
      this.tableData = [];
      const data = [...val];
      if (data.length % 2 == 1) {
        data.push({});
      }
      for (let i = 0; i < data.length; i = i + 2) {
        this.tableData.push([data[i], data[i + 1]]);
      }
    },
  },
  mounted() {},
};
</script>

<style>
@page {
  size: auto;
  margin: 0mm;
}
.d-flex {
  display: flex;
  flex-direction: row;
}
table {
  table-layout: fixed;
}
td {
  word-wrap: break-word;
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