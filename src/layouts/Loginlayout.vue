<template>
  <v-app id="inspire">
   
    <v-content>
      <v-container class="fill-height" fluid>
        <router-view />
      </v-container>
    </v-content>

    <Footer></Footer>
  </v-app>
</template>

<script>

import Footer from "./footer/Footer";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Loginlayout",

  components: {
   
    Footer
  },

  props: {
    source: String
  },
  data: () => ({
    expandOnHover: false
  }),
  computed: {
    ...mapState(["Customizer_drawer"])
  },

  methods: {
    ...mapMutations({
      setCustomizerDrawer: "SET_CUSTOMIZER_DRAWER"
    })
  }
};
</script>
