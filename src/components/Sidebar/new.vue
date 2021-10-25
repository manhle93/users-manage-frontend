<template>
  <v-navigation-drawer
    app
    v-model="DRAWER_STATE"
    :mini-variant="!DRAWER_STATE"
    :width="drawerWidth"
    v-bind="bindDrawer"
    floating
    color="rgb(244, 245, 247)"
    :class="{ 'drawer-mini': !DRAWER_STATE }"
    class="scroll-sidebar"
  >
    <v-list class="pa-0 pt-3" :class="{'px-3': isMini }" dense nav>
      <template v-for="(item, key) in menus.filter((el) => !el.hidden)">
        <MultiItemSidebar
          v-if="item.children && item.children.length > 0"
          :item="item"
          :mini="isMini"
          :key="key"
          :children="item.children.filter((el) => !el.hidden)"
        />
        <SingleItemSidebar v-else :item="item" :mini="isMini" :key="key" />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import SingleItemSidebar from "./SingleItemSidebar.vue";
import MultiItemSidebar from "./MultiItemSidebar.vue";
import { mapActions, mapState } from "vuex";
import "perfect-scrollbar/css/perfect-scrollbar.css";
export default {
  components: { SingleItemSidebar, MultiItemSidebar },
  props: {
    source: String,
  },
  data() {
    return {
      drawerWidth: 0,
      mini: false,
      sidebarWidth: 250,
    };
  },

  created() {
    this.drawerWidth = this.sidebarWidth;
  },
  computed: {
    isMini() {
      return !this.$vuetify.breakpoint.mobile && !this.DRAWER_STATE;
    },
    ...mapState(["drawer", "project"]),
    menus() {
      return this.$store.state.routerRole.routes;
    },
    bindDrawer() {
      if (this.$vuetify.breakpoint.mobile) {
        return {
          temporary: true,
          bottom: true,
        };
      }
      return {
        permanent: true,
        clipped: true,
      };
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
  },
};
</script>
<style scoped>
    .scroll-sidebar {
        overflow-y: hidden
    }
    .scroll-sidebar:hover {
        overflow-y: auto
    }
</style>
<style src="./Sidebar.scss" lang="scss" />
