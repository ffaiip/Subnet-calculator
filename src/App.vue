<template>
  <v-app>
    <v-toolbar dark class="info">
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Subnet calculator</router-link>
      </v-toolbar-title>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
  @import './style/font.scss';
</style>

