<template>
  <ul class="player-list">
    <li
      v-for="(player, index) in playersObj"
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
        <span
          v-if="roundPlayed"
          class="icon icon__tick"
          >
          <icons icon-name="tick" />
          <span class="sr-only">{{ player.playerName }} has played their round</span>
        </span>
      </span>
      <button
        v-if="playerIsAdmin"
        @click.prevent="ejectPlayer(player.playerId)"
        class="player-list-item-btn btn cancel"
        >
        <span
          class="icon icon__cancel"
          >
          <icons icon-name="cancel" />
          <span class="sr-only">Remove {{ player.playerName }} from game</span>
        </span>
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
        'roundInPlay',
      ])
    },
    methods: {
      ejectPlayer(playerId) {
        console.log(`ejectPlayer(${playerId})`);
      },
      roundPlayed(playerId) {
        let played = false;
        if (this.roundInPlay !== 'undefined') {
          played = this.roundInPlay !== null && typeof this.roundInPlay[playerId] === 'object';
        }
        return played;
      },
    }
  }
</script>

<style lang="scss">

  .player {
    &-list {
      border-top: 1px solid $border-light;
      margin-top: 4px;
      padding-top: 4px;
      &-item {
        display: flex;
        margin-bottom: 2px;
        &-name {
          flex-grow: 1;

          .icon__tick {
            display: inline-block;
            height: 16px;
            opacity: 0;
            width: 16px;

            svg path {
              fill: $color-green-6;
            }
          }

          &.played {
            color: $color-green-6;

            .icon__tick {
              opacity: 1;
              transition: opacity linear 200ms;
            }
          }
        }

        .icon__cancel {
          display: inline-block;
          height: 22px;
          margin-top: 2px;
          width: 22px;

          svg path {
            fill: $input-label-error-light;
          }
        }
      }
    }
  }

  @media (prefers-color-scheme: dark) {
    .player {
      &-list {
        border-top: 1px solid $border-dark;
        &-item {
          &-name {
            .icon__tick {
              svg path {
                fill: $color-green-7;
              }
            }

            &.played {
              color: $color-green-7;
            }
          }

          .icon__cancel {
            svg path {
              fill: $input-label-error-dark;
            }
          }
        }
      }
    }
  }

</style>
