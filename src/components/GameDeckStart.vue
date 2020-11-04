<template>
  <div class="wrapper">
    <game-deck-start-create v-if="gameState === 0" />
    <game-deck-start-join v-else />
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import GameDeckStartCreate from "./GameDeckStartCreate.vue";
  import GameDeckStartJoin from "./GameDeckStartJoin.vue";
  export default {
    name: "GameDeckStart",
    components: {
      'game-deck-start-create': GameDeckStartCreate,
      'game-deck-start-join': GameDeckStartJoin,
    },
    computed: {
      ...mapState('game', [
          'gameId',
          'gameState',
      ])
    },
    created() {
      if (this.gameId !== null) {
        this.doesGameIdExist();
      }
    },
    methods: {
      ...mapMutations('game', [
          'SET_GAME_ID',
      ]),
      doesGameIdExist() {
        if (this.$route.query.gameId !== undefined) {
          this.SET_GAME_ID(this.$route.query.gameId);
        }
      }
    }
  }
</script>
