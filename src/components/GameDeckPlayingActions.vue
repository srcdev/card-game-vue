<template>
  <div class="game-actions">
    <game-deck-playing-actions-dealer  v-if="playerIsDealer" />
    <game-deck-playing-actions-player  v-else />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import GameDeckPlayingActionsDealer from '@/components/GameDeckPlayingActionsDealer';
  import GameDeckPlayingActionsPlayer from '@/components/GameDeckPlayingActionsPlayer';
  export default {
    name: "GameDeckPlayingActions",
    components: {
      'game-deck-playing-actions-dealer': GameDeckPlayingActionsDealer,
      'game-deck-playing-actions-player': GameDeckPlayingActionsPlayer,
    },
    computed: {
      ...mapState('game', [
        'playerIsDealer',
      ]),
    }
  }
</script>

<style lang="scss">

  .game-actions {
    &__list {
      list-style: none;
    }
    &__item {
      margin-top: 12px;
      &:first-child {
        margin-top: 0;
      }
    }
  }

</style>
