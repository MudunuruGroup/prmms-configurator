<template>
  <v-container fluid class="down-top-padding">
    <v-row>
     
      <v-col cols="12">
        <NewSecret></NewSecret>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "EncryptionCreate",

  
  components: {
    // SecretSideMenu: () => import('@/components/dashboardComponent/SecretSideMenu'),
    NewSecret: () => import('@/components/dashboardComponent/storage/NewSecret'),
     }
};
</script>
