<template>
  <section class="game-deck game-deck__support">
    <h2 class="header3">View Questions</h2>
    <p>All card including and below your e=selected rating are displayed here.</p>
    <p>Currently they are shuffled but I'll correct this shortly</p>
    <ul class="list inline">
      <li class="list-item">
        <button 
          @click.prevent="getQuestions(1)"
          class="btn btn-primary"
          :class="{'proceed': this.gameRating === 1}"
        >Child friendly</button>
      </li>
      <li class="list-item">
        <button 
          @click.prevent="getQuestions(2)"
          class="btn btn-primary"
          :class="{'proceed': this.gameRating === 2}"
        >Office friendly</button>
      </li>
      <li class="list-item">
        <button 
          @click.prevent="getQuestions(3)"
          class="btn btn-primary"
          :class="{'proceed': this.gameRating === 3}"
        >Brutal</button>
      </li>
    </ul>

    <ul class="alldata">
      <li
        v-for="(card, index) in this.questions"
        :key="index"
      >
        <h3><strong class="rating">Rating {{ card.rating }}: </strong>{{ card.question }}</h3>
      </li>
    </ul>

  </section>
</template>

<script>

  import GameDataService from "@/services/GameDataService";

  export default {
    name: "GameQuestions",
    data() {
      return {
        gameRating: 1,
        questions: {}
      }
    },
    created() {
      this.getQuestions();
    },
    methods: {

      getQuestions(rating) {
        if (typeof rating !== 'undefined') {
          this.gameRating = rating;
        }
        const postData = {};
        postData.gameRating = this.gameRating;
        GameDataService.getAllQuestions(postData)
          .then((response) => {
            this.questions = response.data;
          })
          .catch((err) => {
            console.log(`Error fetching questions --> ${err}`);
          });
      }
    }
  }
</script>

<style lang="scss">

  .game-deck__support {
    .header3 {
      margin-bottom: 12px;
    }

    .rating {
      font-weight: bold;
    }

    .alldata {
      margin-top: 12px;
      li {
        background-color: #efefef;
        font-size: 12px;
        padding: 4px 0 0 20px;

        &:nth-of-type(2n) {
          background-color: transparent; 
        }

      }
    }
  }

</style>
