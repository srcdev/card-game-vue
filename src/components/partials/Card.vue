<template>
  <button
    v-if="renderCard"
    @click.prevent="selectCard()"
    :role="setRole"
    class="card"
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
        v-if="cardType === 'A'"
        class="card-text"
      >Answer:</p>
      <pre
        class="card-text"
        v-html="textToDisplay"
      />
    </div>
    <a
      v-if="displaySwapCard"
      @click.stop="swapAnswer()"
      aria-role="button"
      class="icon icon__refresh"
    >
      <span class="sr-only">Swap card</span>
      <icons icon-name="refresh" />
    </a>
  </button>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex';
  export default {
    inheritAttrs: false,
    name: "GameDeckPlayingPlayer",
    computed: {
      ...mapState('game', [
        'canSwapAnswer',
        'currentCard',
        'currentQuestion',
        'dealerData',
        'playerIsDealer',
        'reviewingAnswers',
      ]),
      setRole() {
        return this.cardType === 'A' ? 'button' : false;
      },
      displaySwapCard() {
        return this.cardType === 'A' && this.canSwapAnswer;
      },
    },
    data() {
      return {
        answerId: null,
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
    created () {

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

      this.$bus.$on('swap-answer-confirmed', () => {
        if (this.answerId !== null) {
          this.SWAP_ANSWER(this.answerId);
        }
      });

      this.$bus.$on('set-winner-confirmed', () => {

        try {
          if (this.cardType === 'QA' && typeof this.qaData === 'object' && this.qaData !== 'undefined' && this.playerIsDealer && this.qaData.data.playerId !== this.dealerData.playerId) {
            this.SET_WINNER(this.qaData.data.playerId)
          }
        }
        catch(error) {
          // console.log(`catch() set-winner-confirmed`);
          // console.log(error);
        }

      });
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
        'SWAP_ANSWER',
        'SET_WINNER'
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

          const payload = {
            message: 'Confirm set winner',
            callback: 'set-winner-confirmed',
            cancelText: 'Cancel',
            confirmText: 'Confirm'
          }
          this.$bus.$emit('confirm-set-winner', payload);

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
      swapAnswer() {
        this.answerId = this.answerData.answerId;
        const payload = {
          message: 'Confirm swap answer',
          callback: 'swap-answer-confirmed',
          cancelText: 'Cancel',
          confirmText: 'Confirm'
        }
        this.$bus.$emit('confirm-swap-answer', payload);
      },
      isCardPlayed() {
        const answerId = this.answerData.answerId;
        this.cardPlayed = this.currentCard.answer1.id === answerId || this.currentCard.answer2.id === answerId || this.currentCard.answer3.id === answerId;
      }
    },
    destroyed () {
      this.$bus.$off('swap-answer-confirmed');
    }
  }
</script>

<style lang="scss">

  .card {
    $card: &;
    background-color: transparent;
    border: 0;
    border-radius: 3px;
    margin: 0 auto;
    position: relative;
    text-align: left;
    transition: opacity linear 200ms;
    width: 100%;


    &:disabled {
      opacity: 0.8;

      box-shadow: 0 0 0 1px $input-border-valid-light;
      @media (prefers-color-scheme: dark) {
        box-shadow: 0 0 0 1px $input-border-valid-dark;
      }
    }

    .icon__refresh {
      display: block;
      position: absolute;
      right: 14px;
      top: 14px;
      z-index: 9;
    }

    &-inner {
      border-radius: 4px;
      height: 100%;
      padding: 8px;

      &.answer {
        background-color: $card-answer-bg-light;
        box-shadow: 0 0 1px 1px $card-answer-border-light;
        #{ $card }-text {
          color: $card-answer-text-light;
          font-size: 12px;
          &:first-child {
            font-weight: bold;
            font-size: 13px;
            line-height: 20px;
          }
        }
        height: 205px;
        &.small {

          @include breakpoint(1025) {

          }
        }
        &.medium {

          @include breakpoint(1025) {

          }
        }
        &.large {
          @include breakpoint(1025) {

          }
        }
        &.xlarge {

          @include breakpoint(768) {
            max-width: 300px;
          }
        }

      }

      &.question {
        background-color: $card-question-bg-light;
        box-shadow: 0 0 1px 1px $card-question-border-light;
        margin: 0 auto;
        #{ $card }-text {
          color: $card-question-text-light;
        }

        max-width: 200px;

        &.small {

          @include breakpoint(1025) {

          }
        }
        &.medium {
          height: 255px;
          @include breakpoint(1025) {

          }
        }
        &.large {
          height: 320px;
          @include breakpoint(1025) {

          }
        }
        &.xlarge {
          height: 255px;
          @include breakpoint(768) {
            max-width: 300px;
          }
        }

      }

    }

    &-text {
      font-size: 14px;
      white-space: pre-line;
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
