<template>
  <v-navigation-drawer 
    v-model="Sidebar_drawer"
    :dark="SidebarColor !== 'white'"
    :color="SidebarColor"
    mobile-break-point="960"
    clipped
    :right="$vuetify.rtl"
    mini-variant-width="70"
    :expand-on-hover="expandOnHover"
    app
    id="main-sidebar"
  >
   <span class="logo-icon">
        <img src="../../assets/omp-logo.png" style="width: 132px; margin-left: 64px; margin-top: 17px;" />
        <!-- <img src="../../assets/prmms.png" style="width: 132px; margin-left: 64px; margin-top: 17px;" /> -->
      </span>
    <v-list dense nav>
      <!---USer Area -->
      <v-list-item two-line class="px-0">
        <v-list-item-avatar>
          <img src="../../assets/prmms.png" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{userData.name}}</v-list-item-title>
          <v-list-item-subtitle class="caption">{{userData.email}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!---USer Area -->
      <!---Sidebar Items 
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        :active-class="`success white--text`"
        link
      >
        <v-list-item-icon @click="toggleSubmenu(item)">
          <v-icon >{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content @click="toggleSubmenu(item)">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>

        
      </v-list-item>-->

        <!-- Submenu Items -->
        <v-list-group
        v-for="(item, index) in items"
        :key="index"
       
       
        no-action
      >
        <template v-slot:activator>
          <v-list-item-icon @click="toggleSubmenu(item)">
          <v-icon >{{ item.icon }}</v-icon>
        </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </template>
        
        <v-list-item v-for="subitem in item.subitems" :key="subitem.title" :to="subitem.to" >
          <v-list-item-icon>
            <v-icon>{{ subitem.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ subitem.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <!-- Submenu Items -->
      <!---Sidebar Items -->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Sidebar",
  props: {
    expandOnHover: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    userData: JSON.parse(localStorage.getItem('userData')),
    items: [
      {
        title: "DataBase",
        icon: "mdi-view-dashboard",
        // to: "/dashboard",
        expanded: false,
        subitems: [
          {
            title: "prmms-db-config",
            icon: "mdi-subitem-icon-1",
            to: "/secret/create",
          },
         
         
          // Add more submenu items as needed
        ],
      },

      {
        title: "Encryption",
        icon: "mdi-account-circle",
       
        expanded: false,
        subitems: [
          {
            title: "prmms-aes-config",
            icon: "mdi-subitem-icon-1",
            to: "/encryption/create",
          },
       
          // Add more submenu items as needed
        ],
      },

      {
        title: "Storage",
        icon: "mdi-alert",
        expanded: false,
        subitems: [
          {
            title: "prmms-sa-config",
            icon: "mdi-subitem-icon-1",
            to: "/storage/create",
          },
         
          // Add more submenu items as needed
        ],
      },
      // {
      //   title: "Storage Queue",
      //   icon: "mdi-account-circle",
       
      //   expanded: false,
      //   subitems: [
      //     {
      //       title: "prmms-people-sq",
      //       icon: "mdi-subitem-icon-1",
      //       to: "/storage-queue/prmms-people-sq",
      //     },
      //     {
      //       title: "prmms-rs-sq",
      //       icon: "mdi-subitem-icon-2",
      //       to: "/storage-queue/prmms-rs-sq",
      //     },
      //     {
      //       title: "prmms-alerts-sq",
      //       icon: "mdi-subitem-icon-1",
      //       to: "/storage-queue/prmms-alerts-sq",
      //     },
      //     {
      //       title: "prmms-heartbeat-sq",
      //       icon: "mdi-subitem-icon-1",
      //       to: "/storage-queue/prmms-heartbeat-sq",
      //     },
      //     // Add more submenu items as needed
      //   ],
      // },

      // {
      //   title: "Icons",
      //   icon: "mdi-emoticon",
      //   to: "/pages/icons"
      // },

      // {
      //   title: "Basic Table",
      //   icon: "mdi-table-column-width",
      //   to: "/pages/tables-simple"
      // }
    ]
  }),
  computed: {
    ...mapState(["SidebarColor", "SidebarBg"]),
    Sidebar_drawer: {
      get() {
        return this.$store.state.Sidebar_drawer;
      },
      set(val) {
        this.$store.commit("SET_SIDEBAR_DRAWER", val);
      }
    }
  },
  watch: {
    "$vuetify.breakpoint.smAndDown"(val) {
      this.$emit("update:expandOnHover", !val);
    }
  },

  methods: {
    toggleSubmenu(item) {
      item.expanded = !item.expanded;
    },
  }
};
</script>
<style lang="scss">
.v-application--is-ltr .v-list--dense.v-list--nav .v-list-group--no-action>.v-list-group__items>.v-list-item {
    padding-left: 4px !important;
}
#main-sidebar{
  box-shadow:1px 0 20px rgba(0,0,0,.08);
  -webkit-box-shadow:1px 0 20px rgba(0,0,0,.08);
  .v-navigation-drawer__border{
    display: none;
  }
  .v-list{
    padding: 8px 15px;
  }
  .v-list-item{
      &__icon--text,
      &__icon:first-child{
        justify-content: center;
        text-align: center;
        width: 20px;
        
      }
      
  }    
}

.v-navigation-drawer{
  height: 100vh;
    top: 0px !important; 
   max-height: -1px !important;
    transform: translateX(0%);
    width: 256px;
}
</style>