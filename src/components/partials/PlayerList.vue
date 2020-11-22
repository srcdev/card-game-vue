<template>
  <ul class="player-list">
    <li
      v-for="(player, index) in players"
      :key="index"
      class="player-list-item"
      >
      <span
        class="player-list-item-name"
        :class="{
          'played' : roundPlayed(player.playerId)
        }"
        >
        {{ player.playerName }}
        <svg
          v-if="roundPlayed(player.playerId)"
          class="icon-tick"
          >
          <g transform="scale(0.008 0.008)">
            <path d="M1230.641 17.028c46.697-50.735 121.022 23.253 74.325 73.988-259.075 291.726-520.273 579.223-781.471 868.835-12.741 14.798-25.483 27.481-38.245 42.279-19.091 21.14-55.191 19.026-74.325 0-131.64-124.723-263.3-251.56-394.961-376.284-48.842-46.507 25.483-122.609 74.325-73.988 118.898 112.040 235.694 224.079 354.635 338.233 263.3-291.726 524.499-581.337 785.718-873.063z"></path>
          </g>
        </svg>
      </span>
      <button
        v-if="playerIsAdmin"
        @click.prevent="ejectPlayer(player.playerId)"
        class="player-list-item-btn btn cancel"
        >
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
    data() {
      return {
        players: []
      }
    },
    computed: {
      ...mapState('game', [
        'dealerData',
        'playersObj',
        'playerIsAdmin',
        'roundInPlay',
      ])
    },
    created() {
      this.playersWithoutDealer();
    },
    methods: {
      ejectPlayer(playerId) {
        console.log(`ejectPlayer(${playerId})`);
      },
      roundPlayed(playerId) {
        return this.roundInPlay !== null && typeof this.roundInPlay[playerId] === 'object';
      },
      playersWithoutDealer() {
        const tempPlayers = this.playersObj;
        delete tempPlayers[this.dealerData.playerId];
        this.players = tempPlayers;

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

          .icon-tick {
            fill: $color-green-7;
            height: 12px;
            opacity: 0;
            width: 12px;
          }

          &.played {
            color: $color-green-7;

            .icon-tick {
              opacity: 1;
              transition: opacity linear 200ms;
            }
          }
        }

        &-btn {

        }
      }
    }
  }

  @media (prefers-color-scheme: dark) {

  }

</style>
