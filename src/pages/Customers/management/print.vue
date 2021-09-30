<template>
  <!-- <div
    style="display: flex; flex-direction: row; height: 100%; flex-wrap: wrap; justify-content:  space-between"
  >
    <div
      style="width: 49%; height: 21%; border: 1px solid red"
      v-for="i in 8"
      :key="i"
    ></div>
  </div> -->
  <div style="height: 100%; width: 100%">
    <table
      style="
        width: 100%;
        max-height: 100%;
        border: 1px solid black;
        border-collapse: collapse;
      "
    >
      <tr
        style="border: 1px solid black; border-collapse: collapse"
        :style="{ height: `calc(95vh /${row}) ` }"
        v-for="(items, key) in tableData"
        :key="key"
      >
        <td
          style="
            border: 1px solid black;
            border-collapse: collapse;
            width: 50%;
            text-align: center;
          "
          v-for="item in items"
          :key="item.id"
        >
          <div>
            郵便番号: <span>{{ item.postal_code }}</span>
          </div>
          <div>
            住所: <span>{{ item.address }}</span>
          </div>
          <div>
            サロン名: <span>{{ item.company_name }}</span>
          </div>
          <div>
            代表者名: <span>{{ item.representative_name }}</span>
          </div>
          <div>
            ユーザID: <span>{{ item.user_id }}</span>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["data", "row"],
  data: () => ({
    tableData: [],
  }),
  mounted() {
    const data = [...this.data];
    if (data.length % 2 == 1) {
      data.push(null);
    }
    for (let i = 0; i < data.length; i = i + 2) {
      this.tableData.push([data[i], data[i + 1]]);
    }
  },
};
</script>

<style>
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