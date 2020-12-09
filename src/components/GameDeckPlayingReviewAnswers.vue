<template>
  <div class="game-deck">
    <p v-if="playerIsDealer">You are the dealer, click on a card to select the winner</p>
    <p v-else>Waiting for <strong>{{ dealerData.dealerName }}</strong> to pick a winner</p>
    <div class="game-deck-answers">
      <div class="shim shim__left"></div>
      <div class="inner">

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
      <div class="shim shim__right"></div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Card from "@/components/partials/Card";
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
