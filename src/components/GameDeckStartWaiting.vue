<template>
  <div class="game-deck-start">
    <h2 class="header2">Waiting to join game</h2>
    <p>Join Game "{{ gameName }}", id: {{ gameId }}</p>
    <ul>
      <li v-for="(player, index) in gameData.players" :key="`user-${index}`">{{ player.playerName }}</li>
    </ul>
    <game-deck-share />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import GameDeckShare from './GameDeckShare'
  export default {
    name: "GameDeckStartWaiting",
    components: {
      'game-deck-share': GameDeckShare,
    },
    computed: {
      ...mapState('game', [
        'gameData',
        'gameId',
        'gameName',
        'playerIsDealer',
      ])
    },
    created() {
      if (this.$route.query.gameId === undefined) {
        this.setRoute();
      }
    },
    methods: {
      setRoute() {
        const gameQuery = {gameId: this.gameId};
        this.$router.replace({ query: gameQuery })
      }
    }
  }
</script>
