<template>
  <v-app-bar app clipped-left clipped-right color="primary" dark style="margin-left:256px !important">
    <v-toolbar-title class="align-center d-flex text-light"   >
      <!-- <span class="logo-icon">
        <img src="../../assets/omp-logo.png" style="width: 100px;" />
      </span> -->
      <span class="logo-text ml-10">
       
      </span>
    </v-toolbar-title>
    <v-toolbar-title class="align-center d-flex "    >
      <span class="logo-text ml-10"></span> 
      <span class="logo-text ml-10"></span> 
      <span class="logo-text ml-10" >
       PRMMS - CONFIGURATOR
      </span>
    </v-toolbar-title>
    <v-app-bar-nav-icon
     
      class="d-block d-md-none"
      @click="$vuetify.breakpoint.smAndDown ? setSidebarDrawer(!Sidebar_drawer) : $emit('input', !value)"
    />
    <v-spacer />
    <!---right part 
    <v-btn dark color="success" href="https://www.wrappixel.com/templates/materialpro-vuetify-admin/">Upgrade to Pro</v-btn>-->
    <v-menu bottom left transition="scale-transition">
      <template v-slot:activator="{ on }">
        <v-btn dark icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(item, i) in userprofile" :key="i" @click="href(item)">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script>
// Utilities
import { mapState, mapMutations } from "vuex";
export default {
  name: "Header",

  components: {},

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    userprofile: [
      // { title: "My Profile" },
      // { title: "My Balance" },
      // { title: "Inbox" },
      // { title: "Account Setting" },
      { title: "Logout" }
    ],
    href(item) {
      if (item.title === "Logout") {
        // Call your logout method here
        localStorage.removeItem('userData')
        localStorage.setItem('isAuthenticated',false)
      } else {
        // Handle other menu items if needed
        // For now, just navigate to a placeholder page
        this.navigateTo(item.title);
      }
    window.location.href='/'
    }
  }),

  computed: {
    ...mapState(["Sidebar_drawer"])
  },

  methods: {
    ...mapMutations({
      setSidebarDrawer: "SET_SIDEBAR_DRAWER"
    })
  }
};
</script>
<style lang="scss"> 
  .v-application .ml-10 {
    margin-left: 115px !important;
}


  </style>
