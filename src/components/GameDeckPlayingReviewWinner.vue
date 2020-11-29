<template>
  <div class="wrapper winner">
    <h2 class="header1">Last round won by: {{ this.dealerData.dealerName }}</h2>
    <game-deck-card
      :qa-data="winningRound"
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
        'dealerData',
        'rounds'
      ]),
    },
    data() {
      return {
        winningRound: {}
      }
    },
    created() {
      this.setWinningRound();
    },
    methods: {
      setWinningRound() {
        const lastRoundKey = Object.keys(this.rounds).pop();
        const lastRound = this.rounds[lastRoundKey];
        const data = lastRound[this.dealerData.playerId];
        this.winningRound.data = data;
      }
    }
  }
</script>

<style lang="scss">
  .winner {
    text-align: center;
  }
</style>
