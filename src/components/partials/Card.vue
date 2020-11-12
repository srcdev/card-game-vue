<template>
  <div class="card">
    <div
      class="card-inner"
      :class="[
        {'small' : cardSize === 'S'},
        {'medium' : cardSize === 'M'},
        {'large' : cardSize === 'L'},
        {'xlarge' : cardSize === 'XL'},
        {'answer' : cardType === 'A'},
        {'question' : cardType === 'Q'},
      ]"
    >
      <p
        class="card-text"
        v-html="textToDisplay"
      />
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';
  export default {
    inheritAttrs: false,
    name: "GameDeckPlayingPlayer",
    computed: {
      ...mapState('game', [
        'gameData',
        'playerIsDealer',
      ])
    },
    data() {
      return {
        textToDisplay: '',
        cardId: null,
      }
    },
    props: {
      cardSize: {
        type: String,
        required: true,
      },
      cardType: {
        type: String,
        required: true,
      },
      answerData: {
        type: Object,
      },
      questionData: {
        type: Object,
      },
      winnerData: {
        type: Object,
      },
    },
    methods: {
      ...mapMutations('game', [
          'SET_GAME_STATE',
      ]),
      renderQuestionText() {
        const text = this.questionData.questionText;
          let replacedCopy = text.replace("{0}", "<span class='question'></span>");
          replacedCopy = replacedCopy.replace("{1}", "<span class='question'></span>");
          replacedCopy = replacedCopy.replace("{2}", "<span class='question'></span>");
          this.textToDisplay = replacedCopy;
      },
      renderQuestionAnswersText() {
          const text = this.winnerData.questionText;
          let replacedCopy = text.replace("{0}", `<span class='question answered'>${this.winnerData.answer1text}</span>`);
          replacedCopy = replacedCopy.replace("{1}", `<span class='question answered'>${this.winnerData.answer2text}</span>`);
          replacedCopy = replacedCopy.replace("{2}", `<span class='question answered'>${this.winnerData.answer3text}</span>`);
          this.textToDisplay = replacedCopy;
      }
    },
    mounted() {
      if (this.cardType === 'Q') {
        this.cardId = this.questionData.questionId;
        this.renderQuestionText();
      } else if (this.cardType === 'QA') {
        this.cardId = this.questionData.questionId;
        this.renderQuestionText();
      } else if (this.cardType === 'A') {
        // const answerKey = Object.keys(this.answerData)[0];
        // this.textToDisplay = this.answerData[answerKey];
        this.cardId = this.answerData.answerId;
        this.textToDisplay = this.answerData.answerText;
      }
    }
  }
</script>

<style lang="scss">
  @import "../../styles/imports";

  .card {
    $card: &;
    &-inner {
      border-radius: 4px;
      height: calc(100% * 1.15);
      margin: 8px;
      padding: 8px;

      &.answer {
        background-color: $card-answer-bg-light;
        box-shadow: 0 0 1px 1px $card-answer-border-light;

        #{ $card }-text {
            color: $card-answer-text-light;
        }

        #{ $card } & {
            &-text {
                color: $card-answer-text-light;
            }
        }
      }

      &.question {
        background-color: $card-question-bg-light;
        box-shadow: 0 0 1px 1px $card-question-border-light;

        #{ $card } & {
            &.text {
                color: $card-question-text-light;
            }
        }
      }

      &.small {

      }
      &.medium {
        height: 170px;
        width: 120px;

        @include breakpoint(1025) {
          height: 200px;
          width: 150px;
        }
      }
      &.large {
        height: 280px;
        width: 150px;

        @include breakpoint(1025) {
          height: 300px;
          width: 180px;
        }
      }
      &.xlarge {
        height: 400px;
        width: 230px;

        @include breakpoint(1025) {

        }
      }

    }

    &-text {
      font-size: 14px;
      .question {
        display: inline-block;
        border-bottom: 2px solid $card-question-text-light;
        height: 20px;
        margin: 0 8px 0 0;
        width: 150px;
      }

      @include breakpoint(1025) {
        font-size: 16px;
      }
    }
  }

</style>
