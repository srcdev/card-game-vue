<template>
  <ul class="player-list">
    <li class="player-list-item" v-for="(player, index) in playersObj" :key="index">
      <span class="player-list-item-name">{{ player.playerName }}</span>
      <button v-if="playerIsAdmin" @click.prevent="startGame(player.playerId)" class="player-list-item-btn btn cancel">
        <svg class="clear-cards">
          <g transform="scale(0.024 0.024)">
            <path d="M874.040 149.96c-96.706-96.702-225.28-149.96-362.040-149.96s-265.334 53.258-362.040 149.96c-96.702 96.706-149.96 225.28-149.96 362.040s53.258 265.334 149.96 362.040c96.706 96.702 225.28 149.96 362.040 149.96s265.334-53.258 362.040-149.96c96.702-96.706 149.96-225.28 149.96-362.040s-53.258-265.334-149.96-362.040zM896 512c0 82.814-26.354 159.588-71.112 222.38l-535.266-535.268c62.792-44.758 139.564-71.112 222.378-71.112 211.738 0 384 172.262 384 384zM128 512c0-82.814 26.354-159.586 71.112-222.378l535.27 535.268c-62.794 44.756-139.568 71.11-222.382 71.11-211.738 0-384-172.262-384-384z"></path>
          </g>
        </svg>
      </button>
    </li>
  </ul>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: "PlayerList",
    computed: {
      ...mapState('game', [
        'playersObj',
        'playerIsAdmin',
      ])
    },
  }
</script>

<style lang="scss">
  @import "../../styles/imports";

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
