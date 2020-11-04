<template>
  <div class="game-deck-start">
    <p>Join a game</p>
    <p>gameId = {{ gameId }}</p>
    <p>You are the dealer --> {{ playerIsDealer }}</p>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: "GameDeckStartJoin",
    computed: {
      ...mapState('game', [
          'gameId',
          'playerIsDealer',
      ])
    },
  }
</script>
