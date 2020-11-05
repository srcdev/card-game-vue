<template>
    <div class="game-deck-start">
        <h2 class="header2">Waiting to join game</h2>
        <p>Join Game "{{ gameName }}", id: {{ gameId }}</p>
    </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: "GameDeckStartWaiting",
    computed: {
      ...mapState('game', [
          'gameId',
          'gameName',
          'playerIsDealer',
      ])
    },
  }
</script>
