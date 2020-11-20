<template>
  <div class="wrapper">
    <p v-if="playerIsDealer">You are the dealer, click on a card to select the winner</p>
    <p v-else>Waiting for <span>{{ dealerData.dealerName }}</span> to pick a winner</p>
    <div class="game-deck-answers">
      <ul class="game-deck-cards-list">
        <li
          v-for="(qa, index) in roundInPlay"
          :key="index"
          class="game-deck-cards-item"
        >
          <game-deck-card
            :qa-data="{
              id: index,
              data: qa
            }"
            card-size="L"
            card-type="QA"
          />
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Card from "./partials/Card";
  export default {
    name: "GameDeckPlayingReviewingAnswers",
    components: {
      'game-deck-card': Card,
    },
    computed: {
      ...mapState('game', [
        'roundInPlay',
        'dealerData',
        'playerIsDealer'
      ]),
    },
  }
</script>

<style lang="scss">
  @import "@/styles/imports";

</style>
