<template>
  <p>Dealer: <strong>{{ dealerData.dealerName }}</strong></p>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: "GameDeckPlayingPlayer",
    computed: {
      ...mapState('game', [
          'dealerData',
      ])
    },
  }
</script>

<style lang="scss">
  @import "@/styles/imports";

</style>
