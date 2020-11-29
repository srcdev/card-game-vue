<template>
  <button
    v-if="renderCard"
    @click.prevent="selectCard()"
    :role="setRole"
    class="card"
    :class="[
      {'question' : cardType === 'Q'},
    ]"
    :disabled="cardPlayed"
    >
    <div
      class="card-inner"
      :class="[
        {'small' : cardSize === 'S'},
        {'medium' : cardSize === 'M'},
        {'large' : cardSize === 'L'},
        {'xlarge' : cardSize === 'XL'},
        {'answer' : cardType === 'A'},
        {'question' : cardType === 'Q'},
        {'question' : cardType === 'QA'},
      ]"
    >
      <p
        class="card-text"
        v-html="textToDisplay"
      />
    </div>
  </button>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex';
  export default {
    inheritAttrs: false,
    name: "GameDeckPlayingPlayer",
    computed: {
      ...mapState('game', [
        'currentCard',
        'currentQuestion',
        'playerIsDealer',
        'reviewingAnswers',
      ]),
      setRole() {
        return this.cardType === 'A' ? 'button' : false;
      },
    },
    data() {
      return {
        cardPlayed: false,
        renderCard: false,
        textToDisplay: '',
      }
    },
    props: {
      answerData: {
        type: Object,
      },
      cardSize: {
        type: String,
        required: true,
      },
      cardType: {
        type: String,
        required: true,
      },
      delay: {
        type: [Number, String],
      },
      qaData: {
        type: Object,
      },
      winnerData: {
        type: Object,
      },
    },
    mounted() {
      if (this.cardType === 'A') {
        this.textToDisplay = this.answerData.answerText;
        setTimeout(() => {
          this.renderCard = true;
        }, this.delay);
        this.isCardPlayed();
      } else {
        this.renderQuestionAnswersText();
        this.renderCard = true;
      }
    },
    watch: {
      currentCard() {
        if (this.cardType === 'Q') {
          this.renderQuestionAnswersText()
        } else if (this.cardType === 'A') {
          this.isCardPlayed();
        }
      },
    },
    methods: {
      ...mapActions('game', [
          'SET_WINNER',
      ]),
      ...mapMutations('game', [
          'SET_ANSWER',
      ]),
      questionAnswerContent(text) {
        let answer;
        if (text.length > 0) {
          answer = `<span class='question answered'>${text}</span>`;
        } else {
          answer = `<span class='question'></span>`;
        }
        return answer;
      },
      renderQuestionAnswersText() {
        if (this.cardType === 'QA') {
          this.textToDisplay = this.qaData.data.question.text;
          this.textToDisplay = this.textToDisplay.replace("{0}", this.questionAnswerContent(this.qaData.data.answer1.text));
          this.textToDisplay = this.textToDisplay.replace("{1}", this.questionAnswerContent(this.qaData.data.answer2.text));
          this.textToDisplay = this.textToDisplay.replace("{2}", this.questionAnswerContent(this.qaData.data.answer3.text));
        } else if (this.currentCard.question.text !== null) {
          this.textToDisplay = this.currentCard.question.text;
          this.textToDisplay = this.textToDisplay.replace("{0}", this.questionAnswerContent(this.currentCard.answer1.text));
          this.textToDisplay = this.textToDisplay.replace("{1}", this.questionAnswerContent(this.currentCard.answer2.text));
          this.textToDisplay = this.textToDisplay.replace("{2}", this.questionAnswerContent(this.currentCard.answer3.text));
        }
      },
      selectCard() {
        if (this.reviewingAnswers && this.playerIsDealer) {
          this.SET_WINNER(this.qaData.data.playerId)
        } else if (!this.reviewingAnswers && !this.playerIsDealer) {
          if (this.cardType === 'A') {
            this.selectAnswer()
          }
        }
      },
      selectAnswer() {
        const currentSlot = `answer${this.currentCard.activeSlot}`;
        const answer = {
          'id': this.answerData.answerId,
          'text': this.answerData.answerText,
        }
        const payload = {
          'answer': currentSlot,
          'data': answer
        }
        this.SET_ANSWER(payload);
      },
      isCardPlayed() {
        const answerId = this.answerData.answerId;
        this.cardPlayed = this.currentCard.answer1.id === answerId || this.currentCard.answer2.id === answerId || this.currentCard.answer3.id === answerId;
      }
    },
  }
</script>

<style lang="scss">
  @import "../../styles/imports";

  .card {
    $card: &;
    background-color: transparent;
    border: 0;
    border-radius: 3px;
    display: block;
    margin: 0 auto;
    text-align: left;
    transition: opacity linear 200ms;
    &:disabled {
      opacity: 0.8;

      box-shadow: 0 0 0 1px $input-border-valid-light;
      @media (prefers-color-scheme: dark) {
        box-shadow: 0 0 0 1px $input-border-valid-dark;
      }
    }
    &-inner {
      border-radius: 4px;
      height: calc(100% * 1.15);
      margin: 8px;
      padding: 8px;
      width: 95%;

      &.small {

      }
      &.medium {
        min-height: 170px;
        max-width: 120px;

        @include breakpoint(1025) {
          min-height: 200px;
          max-width: 150px;
        }
      }
      &.large {
        min-height: 280px;
        max-width: 150px;

        @include breakpoint(1025) {
          height: 300px;
          max-width: 180px;
        }
      }
      &.xlarge {
        min-height: 300px;
        max-width: 230px;

        @include breakpoint(1025) {
          height: 400px;
        }
      }

      &.answer {
        background-color: $card-answer-bg-light;
        box-shadow: 0 0 1px 1px $card-answer-border-light;
        width: 200px;
        #{ $card }-text {
            color: $card-answer-text-light;
            font-size: 12px;
        }
      }

      &.question {
        background-color: $card-question-bg-light;
        box-shadow: 0 0 1px 1px $card-question-border-light;
        margin: 0 auto;
        #{ $card }-text {
          color: $card-question-text-light;
        }
      }
    }

    &-text {
      font-size: 14px;
      .question {
        display: inline-block;
        border-bottom: 1px solid $card-question-text-light;
        margin: 0 2px 0 0;
        min-width: 50px;

        &.answered {
          border-bottom: 1px solid transparent;
          display: inline;
          margin-left: 0;
          text-decoration: underline;
        }
      }

      @include breakpoint(1025) {
        font-size: 16px;
      }
    }
  }

</style>
