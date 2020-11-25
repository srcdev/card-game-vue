<template>
  <div class="wrapper">
    <h3 class="header-3">Scores</h3>

    <ul class="player-list">
      <li
        v-for="(player, index) in scoresObj"
        :key="index"
        class="player-list-item"
        >
        <span
          class="player-list-item-name"
          >
          {{ player.playerName }} ({{ player.winCount }})
        </span>
      </li>
    </ul>

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: "GameDeckScores",
    computed: {
      ...mapState('game', [
        'scoresObj',
      ])
    },
  };
</script>

<style lang="scss">
  @import "@/styles/imports";

  @media (prefers-color-scheme: dark) {

  }

</style>
