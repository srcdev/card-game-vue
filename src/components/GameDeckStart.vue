<template>
  <div class="wrapper">
    <game-deck-start-create v-if="!gameCreated" />
    <game-deck-start-join v-else-if="gameCreated && playerState === 0" />
    <game-deck-start-waiting v-else-if="gameCreated && playerState === 1" />
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import GameDeckStartCreate from "./GameDeckStartCreate";
  import GameDeckStartJoin from "./GameDeckStartJoin";
  import GameDeckStartWaiting from "./GameDeckStartWaiting";
  export default {
    name: "GameDeckStart",
    components: {
      'game-deck-start-create': GameDeckStartCreate,
      'game-deck-start-join': GameDeckStartJoin,
      'game-deck-start-waiting': GameDeckStartWaiting,
    },
    computed: {
      ...mapState('game', [
          'gameId',
          'gameCreated',
          'playerState'
      ])
    },
    created() {
      if (this.gameId === null) {
        this.doesGameIdExist();
      }
    },
    methods: {
      ...mapMutations('game', [
          'SET_GAME_STATE',
      ]),
      doesGameIdExist() {
        if (this.$route.query.gameId !== undefined) {
          this.SET_GAME_STATE(this.$route.query.gameId);
        }
      }
    }
  }
</script>
