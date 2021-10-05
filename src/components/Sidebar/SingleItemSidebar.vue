<template>
  <v-menu
    right
    offset-x
    open-on-hover
    :rounded="false"
    nudge-width="200px"
    close-on-content-click
    close-delay="50"
    nudge-right="5"
    :disabled="!mini"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-list-item :to="item.path" v-on="on" class="sidebar-item">
        <v-icon v-bind="attrs" v-text="item.icon"/>
        <div
          class="text-truncate pl-3"
          :class="classTitle ? classTitle : 'text-body-2 '"
          v-text="item.name"
        />
      </v-list-item>
    </template>
    <v-card tile>
      <v-list-item dense :to="item.path" class="sidebar-item">
        <div class="text-truncate text-body-2 pr-4" v-text="item.name" />
      </v-list-item>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props: {
    classTitle: String,
    mini: Boolean,
    item: { required: true, type: Object },
  },
};
</script>

<style lang="scss"></style>
