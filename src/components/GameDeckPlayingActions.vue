<template>
  <div class="game-actions">
    <p>Game actions</p>
    <div v-if="playerIsDealer"></div>
    <div v-else>
      <button class="btn secondary" @click.prevent="RESET_PLAYED_ANSWERS()">Reset answers</button>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';
  export default {
    name: "GameDeckPlayingActions",
    computed: {
      ...mapState('game', [
        'playerIsDealer',
      ])
    },
    methods: {
      ...mapMutations('game', [
          'RESET_PLAYED_ANSWERS',
      ]),
    }
  }
</script>

<style lang="scss">
  @import "../styles/imports";

  @media (prefers-color-scheme: dark) {

  }

</style>
