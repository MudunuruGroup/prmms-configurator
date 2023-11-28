<template>
  <v-container fluid class="down-top-padding">
    <v-row>
      <v-col cols="12" sm="12">
        <!--BaseCard heading="Table Simple - Fixed height">
            <TableSimpleFixHeight></TableSimpleFixHeight>
        </BaseCard-->

        <v-card >
            <SecretList></SecretList>
        </v-card>

        <!--BaseCard heading="Table Simple - Dense table">
            <TableSimpleDense></TableSimpleDense>
        </BaseCard-->

        <!--BaseCard heading="Table Simple - Dark theme">
            <TableSimpleDarktheme></TableSimpleDarktheme>
        </BaseCard-->

      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: "prmms-aes-config",

  data: () => ({
  }),
  components: {
     // TableSimpleFixHeight: () => import('@/components/vuetifyComponents/tables-simple/TableSimpleFixHeight'),
     SecretList: () => import('@/components/dashboardComponent/encryption/SecretList'),
     // TableSimpleDense: () => import('@/components/vuetifyComponents/tables-simple/TableSimpleDense'),
     // TableSimpleDarktheme: () => import('@/components/vuetifyComponents/tables-simple/TableSimpleDarktheme')
  }
};
</script>
