<template>
  <v-container>
    <v-tabs vertical>
      <v-tab>
        <v-layout align-center style="width: 100%">
          <v-icon left> mdi-border-color </v-icon>
          Mức đóng BHXH
        </v-layout>
      </v-tab>
      <v-tab>
        <v-layout align-center style="width: 100%">
          <v-icon left> mdi-calendar </v-icon>
          Tham gia BHXH
        </v-layout>
      </v-tab>
      <v-tab>
        <v-layout align-center style="width: 100%"
          ><v-icon left> mdi-book-open-variant </v-icon> Sổ BHXH</v-layout
        >
      </v-tab>

      <v-tab-item class="pl-6">
        <muc-dong></muc-dong>
      </v-tab-item>
      <v-tab-item class="pl-6 pt-4">
       <qua-trinh></qua-trinh>
      </v-tab-item>
      <v-tab-item>
        <So />
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import QuaTrinh from '../baohiem/quatrinh'
import MucDong from '../baohiem/mucdong'
import So from '../baohiem/sobhxh.vue'
export default {
  components: {QuaTrinh, MucDong, So},
  data: () => ({
  
  }),
  mounted() {
  
  },
  methods: {
 
  },
};
</script>

<style>
</style>