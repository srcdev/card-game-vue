<template>
  <div class="wrapper">
    <div class="game-deck-question aside">
      <p>Question card displayed here</p>
    </div>
    <div class="game-deck-answers">
      <p>Answers cards here</p>
    </div>
    <div class="game-deck-status aside">
      <p>Game status here</p>
      <game-deck-playing-dealer v-if="playerIsDealer" />
      <game-deck-playing-player v-else />
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import GameDeckPlayingDealer from "./GameDeckPlayingDealer";
  import GameDeckPlayingPlayer from "./GameDeckPlayingPlayer";

  export default {
    name: "GameDeckPlaying",
    components: {
      'game-deck-playing-dealer': GameDeckPlayingDealer,
      'game-deck-playing-player': GameDeckPlayingPlayer,
    },
    computed: {
      ...mapState('game', [
          'playerIsDealer',
      ])
    },
  }
</script>

<style lang="scss">
  @import "../styles/imports";

</style>
