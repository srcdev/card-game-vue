<template>
  <div class="wrapper">
    <game-deck-start-create v-if="!gameCreated" />
    <game-deck-start-join v-else-if="gameCreated && playerState === 0" />
    <game-deck-start-waiting v-else-if="gameCreated && playerState === 1" />
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import GameDeckStartCreate from "./GameDeckStartCreate.vue";
  import GameDeckStartJoin from "./GameDeckStartJoin.vue";
  import GameDeckStartWaiting from "./GameDeckStartWaiting.vue";
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

        if (typeof this.$route !== 'undefined') {
          const currentGameId = this.$route.query.gameId;
          this.SET_GAME_STATE(currentGameId);
        }

      }
    }
  }
</script>
