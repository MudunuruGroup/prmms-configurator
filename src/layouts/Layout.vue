<template>
  <v-app id="inspire">
    <template v-if="!isLoginPage">
      <Header v-model="expandOnHover"></Header>
      <Sidebar :expand-on-hover.sync="expandOnHover"></Sidebar>
    </template>
    
    <v-content>
      <v-container class="fill-height" fluid>
        <router-view />
      </v-container>
    </v-content>
    
    <template v-if="!isLoginPage">
      <Footer></Footer>
    </template>
  </v-app>
</template>

<script>
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./footer/Footer";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Layout",

  components: {
    Header,
    Sidebar,
    Footer
  },

  props: {
    source: String
  },
  
  data: () => ({
    expandOnHover: false,
    isLoginPage: true
  }),
  
  computed: {
    ...mapState(["Customizer_drawer","isAuthenticated"])
  },
  watch: {
   
     
      // console.log(localStorage.getItem('isAuthenticated'))
      // if(localStorage.getItem('isAuthenticated')){
      //   this.isLoginPage = true;
      // }

      isAuthenticated(newVal) {
        this.isLoginPage = !newVal; // Update isLoginPage when user logs in/out
      }
      //this.isLoginPage = !newVal; // Update isLoginPage when user logs in/out
   
  },
  created() {
    // Check if the current route is the login page
    if (this.$route.name === "login") {
      this.isLoginPage = true;
    } else {
      this.isLoginPage = false;
    }

    if (this.isAuthenticated) {
        this.isLoginPage = true;
      }
   // console.log(this.isLoginPage)
  },
  
  methods: {
    ...mapMutations({
      setCustomizerDrawer: "SET_CUSTOMIZER_DRAWER"
    })
  }
};
</script>
