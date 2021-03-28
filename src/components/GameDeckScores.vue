<template>
  <div class="game-deck game-deck__stats">
    <h3 class="header-3">Game stats</h3>
    <p class="header-4">Cards left in deck</p>

    <dl class="dl-list">
      <dt class="dt">Questions: </dt>
      <dd class="dd">{{ this.questionsInGame }}</dd>
      <dt class="dt">Answers: </dt>
      <dd class="dd">{{ this.answersInGame }}</dd>
    </dl>

    <p class="header-4">Scores</p>

    <table class="scores-table">
      <thead class="scores-table__th">
        <td class="scores-table__td">Player name</td>
        <td class="scores-table__td">Score</td>
        <td class="scores-table__td">Eject</td>
      </thead>
      <tr
        v-for="(player, index) in scoresObj"
        class="scores-table__tr"
        :key="index"
      >
        <td class="scores-table__td">{{ player.playerName }}: </td>
        <td class="scores-table__td">{{ player.winCount }}</td>
        <td class="scores-table__td">
          <button
            @click.stop="ejectPlayer(player)"
            class="player-list-item-btn btn eject"
            >
            <span
              class="icon icon__eject"
              >
              <icons icon-name="eject" />
              <span class="sr-only">Remove {{ player.playerName }} from game</span>
            </span>
          </button>
        </td>
      </tr>
    </table>

  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  export default {
    name: "GameDeckScores",
    data() {
      return {
        ejectPlayerId: null
      }
    },
    computed: {
      ...mapState('game', [
        'answersInGame',
        'questionsInGame',
        'scoresObj',
      ])
    },
    created () {
      this.$bus.$on('eject-player-confirmed', () => {
        if (this.ejectPlayerId !== null) {
          this.ejectPlayerAction();
        }
      });
    },
    methods: {
      ...mapActions('game', [
        'EJECT_PLAYER',
      ]),
      ejectPlayer(player) {
        this.ejectPlayerId = player.playerId;
        const payload = {
          message: `CAUTION... You are about to eject ${player.playerName} from the game?`,
          callback: 'eject-player-confirmed',
          cancelText: 'I\'ve changed my mind',
          confirmText: 'Yes, eject player'
        }
        this.$bus.$emit('confirm-eject-player', payload);
      },
      ejectPlayerAction() {
        this.EJECT_PLAYER(this.ejectPlayerId);
      },
    }
  };
</script>

<style lang="scss">

  .game-deck {
    &__stats {

      .header-3 {
        margin-bottom: 12px;
      }

      .header-4 {
        font-weight: bold;
        border-bottom: 1px solid $border-light;
        padding-bottom: 12px;
        @media (prefers-color-scheme: dark) {
          border-bottom: 1px solid $border-dark;
        }
      }
      .dl-list {
        margin-top: 12px;
      }

      .scores-table {
        margin-top: 8px;
        padding-top: 8px;
        width: 100%;

        &__th,
        &__tr {
          display: flex;
          flex-flow: row wrap;
          margin-bottom: 12px;
        }
        &__th td {
          font-weight: bold;
        }
        &__td {
          flex-basis: 50px;
          padding: 4px 0;

          &:first-child {
            flex-grow: 1;
            padding: 4px 0;
          }

          .icon__eject {
            display: inline-block;
            height: 22px;
            margin-top: 2px;
            width: 22px;
            &:hover {
              cursor: pointer;
            }
            svg path {
              fill: $input-label-error-light;

              @media (prefers-color-scheme: dark) {
                fill: $input-label-error-dark;
              }
            }
          }
        }
      }
    }
  }

</style>
