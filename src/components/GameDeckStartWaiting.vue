<template>
    <div class="game-deck-start">
        <h2 class="header2">Waiting to join game</h2>
        <p>Join Game "{{ gameName }}", id: {{ gameId }}</p>
        <ul>
            <li v-for="(player, index) in gameData.players" :key="`user-${index}`">{{ player.playerName }}</li>
        </ul>
    </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: "GameDeckStartWaiting",
    computed: {
      ...mapState('game', [
          'gameData',
          'gameId',
          'gameName',
          'playerIsDealer',
      ])
    },
  }
</script>
