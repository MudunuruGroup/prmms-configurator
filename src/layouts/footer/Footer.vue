<template>
    <v-footer app  color="white" class="footerpart" inset>
    <v-row>
  <v-col cols="6">
    <span>© {{ new Date().getFullYear() }} — Designed & Developed By Mudunuru Limited</span>
  </v-col>
  <v-col cols="6">
    <span style="font-size: 15px;color: #7c7a82;margin-left:80% !important">Version: 1.4</span>
  </v-col>
</v-row>
    </v-footer>
</template>
<script>
export default {
    name: "Footer",
}
</script>
<style lang="scss">
  .v-application .footerpart{
    border-top:1px solid rgba(0,0,0,0.1)!important;
  }
</style>