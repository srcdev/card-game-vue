<template>
  <div class="wrapper winner">
    <h2 class="header1">Last round won by: {{ this.winnerData.playerName }}</h2>
    <game-deck-card
      :qa-data="{
        data: winnerData
      }"
      card-size="XL"
      card-type="QA"
    />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Card from "@/components/partials/Card";
  export default {
    name: "GameDeckPlayingReviewingWinner",
    components: {
      'game-deck-card': Card,
    },
    computed: {
      ...mapState('game', [
        'winnerData'
      ]),
    },
  }
</script>

<style lang="scss">
  .winner {
    text-align: center;
  }
</style>
