<template>
  <div>
    <h3 v-if="playerIsAdmin">Choose a player to start game as the dealer</h3>
    <h3 v-else>Waiting for {{ gameCreatedByName }} to pick a dealer</h3>
    <ul>
      <li v-for="(player, index) in gameData.players" :key="`user-${index}`">{{ player.playerName }}</li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: "GameDeckStartChooseDealer",
    computed: {
      ...mapState('game', [
        'gameData',
        'playerIsAdmin',
        'gameCreatedByName'
      ])
    },
    methods: {
    }
  }
</script>


<style lang="scss">
  @import "../styles/imports";

  @media (prefers-color-scheme: dark) {

  }

</style>
