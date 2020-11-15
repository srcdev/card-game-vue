<template>
  <div
    @click.prevent="selectAnswerCard()"
    class="card"
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
        'currentCard',
        'playerIsDealer',
      ])
    },
    data() {
      return {
        textToDisplay: '',
        currentSlot: 1,
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
      winnerData: {
        type: Object,
      },
    },
    created() {
      if (this.cardType === 'A') {
        this.textToDisplay = this.answerData.answerText;
      } else {
        this.renderQuestionAnswersText();
      }
    },
    watch: {
      currentCard() {
        if (this.cardType === 'Q') {
          this.renderQuestionAnswersText()
        }
      }
    },
    methods: {
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
        //const dummyText = `<span class='question answered'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
        this.textToDisplay = this.currentCard.question.text;
        this.textToDisplay = this.textToDisplay.replace("{0}", this.questionAnswerContent(this.currentCard.answer1.text));
        this.textToDisplay = this.textToDisplay.replace("{1}", this.questionAnswerContent(this.currentCard.answer2.text));
        this.textToDisplay = this.textToDisplay.replace("{2}", this.questionAnswerContent(this.currentCard.answer3.text));
      },
      selectAnswerCard() {
        const currentSlot = `answer${this.currentSlot}`;
        const answer = {
          'id': this.answerData.answerId,
          'text': this.answerData.answerText,
        }
        const payload = {
          'answer': currentSlot,
          'data': answer
        }
        if (this.currentSlot < this.currentCard.answerCount) {
          console.log(`Increase slot count`);
          this.currentSlot + 1;
        }
        this.SET_ANSWER(payload);
      }
    },
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
      }

      &.question {
        background-color: $card-question-bg-light;
        box-shadow: 0 0 1px 1px $card-question-border-light;

        #{ $card }-text {
          color: $card-question-text-light;
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
        border-bottom: 1px solid $card-question-text-light;
        line-height: 20px;
        margin: 0 8px 0 0;
        min-width: 50px;
        //text-decoration: underline;

        &.answered {
          border-bottom: 1px solid transparent;
          text-decoration: underline;
        }
      }

      @include breakpoint(1025) {
        font-size: 16px;
      }
    }
  }

</style>
