<template>
  <!-- :permanent="$vuetify.breakpoint.mdAndUp"  bỏ thuộc tính này trong <v-navigation-drawer sẽ ẩn toàn bộ  sidebar-->

  <v-navigation-drawer
    app
    :mini-variant="!DRAWER_STATE"
    :width="drawerWidth"
    class="drawer-menu"
    style="
      top: 45px !important;
      height: calc(100vh - 45px) !important;
      background-color: #f0f0f0;
    "
  >
    <v-list v-for="item in menus" :key="item.id" style="font-size: 14px">
      <v-list-item :title="item.name"
        v-if="(!item.children || item.children.length == 0) && !item.hidden"
        :to="item.path"
      >
        <v-icon size="21" color="black">{{ item.icon }}</v-icon>
        <div class="pl-2 title-menu" :title="item.name">{{ item.name }}</div>
      </v-list-item>

      <v-list-group no-action v-else :title="item.name">
        <template v-slot:activator>
          <v-icon size="21" color="black">{{ item.icon }}</v-icon>
          <div class="pl-2 title-menu" style="flex: 1" :title="item.name">
            {{ item.name }}
          </div>
        </template>

        <v-list
          v-for="child in item.children.filter((el) => !el.hidden)"
          :key="child.id"
        >
          <v-list-item :to="child.path">
            <v-icon size="20" class="ml-6">{{ child.icon }}</v-icon>
            <div class="pl-3" :title="child.name">{{ child.name }}</div>
          </v-list-item>
        </v-list>

      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapState } from "vuex";
import "perfect-scrollbar/css/perfect-scrollbar.css";
export default {
  props: {
    source: String,
  },
  data() {
    return {
      drawerWidth: 0,
      scrollSettings: {
        maxScrollbarLength: 160,
      },
      sponsor: {
        href: "https://www.theopticalfiber.com/",
        src: "https://www.theopticalfiber.com/logo/logo.png",
        srcMini: "https://www.theopticalfiber.com/logo/logo_mini.png",
      },
      mini: false,
      ps: null,
      clipped: true,
      temporary: false,
      sidebarWidth: 225,
      sidebarMinWidth: 55,
    };
  },

  created() {
    this.drawerWidth = this.sidebarWidth;
  },
  watch: {
    DRAWER_STATE(val){
      console.log(val)
    }
  },
  computed: {
    ...mapState(["drawer"]),
    menus() {
      return this.$store.state.routerRole.routes;
    },
    DRAWER_STATE: {
      get() {
        return this.drawer;
      },
      set(newValue) {
        if (newValue === this.drawer) return;
        this.TOGGLE_DRAWER();
      },
    },
  },
  methods: {
    ...mapActions(["TOGGLE_DRAWER"]),
    handleDrawerCollapse() {
      this.drawerWidth =
        this.drawerWidth === this.sidebarWidth
          ? this.sidebarMinWidth
          : this.sidebarWidth;
    },
  },
};
</script>
<style lang="css">
.drawer-menu .v-list-item {
  min-height: 40px;
}
.drawer-menu .v-list {
  padding: 0px;
}
.drawer-menu
  .v-application--is-ltr
  .v-list-item__action:last-of-type:not(:only-child),
.v-application--is-ltr .v-list-item__avatar:last-of-type:not(:only-child),
.v-application--is-ltr .v-list-item__icon:last-of-type:not(:only-child) {
  margin-left: 5px;
}
.drawer-menu
  .v-list-group
  .v-list-group__header
  .v-list-item__icon.v-list-group__header__append-icon {
  min-width: 5px;
}
.drawer-menu .title-menu {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
