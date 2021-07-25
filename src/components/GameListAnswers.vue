<template>
  <section class="game-deck game-deck__support">
    <h2 class="header3">View Answers</h2>
    <p>Viewing answers for rating <strong>{{ this.selectedGameRating }}</strong>.</p>


    <ul class="list inline">
      <li
        v-for="(item, index) in gameRatings"
        :key="index"       
        class="list-item"
       >
        <button 
          @click.prevent="getData(item.value)"
          class="btn btn-primary"
          :class="{'proceed': selectedGameRating == item.value}"
        >{{ item.text }}</button>

      </li>
    </ul>


    <ul class="alldata">
      <li
        v-for="(card, index) in this.cards"
        :key="index"
      >
        <strong class="rating">Rating {{ card.rating }}: </strong>{{ card.answertext }}
      </li>
    </ul>

  </section>
</template>

<script>

  import GameDataService from "@/services/GameDataService";
  import { mapState } from 'vuex';

  export default {
    data() {
      return {
        selectedGameRating: 1,
        cards: {}
      }
    },
    created() {
      this.getData();
    },
    computed: {
      ...mapState('game', [
        'gameRatings',
      ]),
    },
    methods: {

      getData(rating) {
        if (typeof rating !== 'undefined') {
          this.selectedGameRating = rating;
        }
        const postData = {};
        postData.gameRating = this.selectedGameRating;
        GameDataService.getAllAnswers(postData)
          .then((response) => {
            this.cards = response.data;
          })
          .catch((err) => {
            console.log(`Error fetching answers --> ${err}`);
          });
      }
    }
  }
</script>

<style lang="scss" scoped>

  .game-deck__support {
    .header3 {
      margin-bottom: 12px;
    }

    ul {
      &.list {
        margin: 12px 0;
      }
      &.alldata {
        background-color: #fff;
        color: #313131 !important;
        
        margin-top: 12px;
        li {
          background-color: #efefef;
          color: #313131 !important;
          font-size: 12px;
          list-style-type: none;
          padding: 4px 0 0 4px;

          &:nth-of-type(2n) {
            background-color: transparent; 
          }

          .rating {
            font-weight: bold !important;
            margin-right: 8px;
          }
        }
      }
    }
  }

</style>
