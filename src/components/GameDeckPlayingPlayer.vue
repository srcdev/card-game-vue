<template>
  <div>
    <p>Dealer is: <span>{{ dealerData.dealerName }}</span></p>
  </div>
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
