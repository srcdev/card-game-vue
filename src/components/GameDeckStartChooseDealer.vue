<template>
  <div>
    <h3 v-if="playerIsAdmin">Choose a player to start game as the dealer</h3>
    <h3 v-else>Waiting for {{ gameCreatedByName }} to pick a dealer</h3>
    <ul class="player-list">
      <li class="player-list-item" v-for="(player, index) in playersObj" :key="index">
        <span class="player-list-item-name">{{ player.playerName }}</span>
        <button v-if="playerIsAdmin" @click.prevent="startGame(player.playerId)" class="player-list-item-btn btn secondary">Select as dealer</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  export default {
    name: "GameDeckStartChooseDealer",
    computed: {
      ...mapState('game', [
        'playersObj',
        'playerIsAdmin',
        'gameCreatedByName'
      ])
    },
    methods: {
      ...mapActions('game', [
        'SET_DEALER',
      ]),
      startGame(playerId) {
        this.SET_DEALER(playerId);
      }
    }
  }
</script>


<style lang="scss">
  @import "@/styles/imports";

  .player {
    &-list {
      margin-top: 12px;
      &-item {
        display: flex;
        margin-bottom: 12px;
        &-name {
          flex-grow: 1;
        }

        &-btn {

        }
      }
    }
  }

  @media (prefers-color-scheme: dark) {

  }

</style>
