<template>
    <div class="game-deck-start">
        <h2 class="header2">Create a new game</h2>
        <form @submit.prevent="formSubmit" class="form">
          <div class="form-row">
            <form-input-text
                v-model="formValues.playerName"
                autocomplete="off"
                input-name="playerName"
                input-label="Player name"
                input-pattern="username"
                input-pattern-error-message="Bad characters"
                input-placeholder="eg. Simon"
                :input-min-length=2
                :input-max-length=50
                :input-required=true
                :input-has-counter=false
            />
          </div>
          <div class="form-row">
            <form-input-text
                v-model="formValues.gameName"
                autocomplete="off"
                input-name="gameName"
                input-label="Game name"
                input-pattern="gameName"
                input-pattern-error-message="Bad characters"
                input-placeholder="eg. Simon's Game"
                :input-min-length=2
                :input-max-length=50
                :input-required=true
                :input-has-counter=false
            />
          </div>
          <div class="form-row">
            <div class="form-row-inner form-row-inner_radio">
              <input class="form-input_radio" type="radio" id="gameRating0" value="1" v-model="formValues.gameRating" />
              <label class="form_label" for="gameRating0"><span class="form-input_radio-icon"></span>Child friendly</label>
            </div>
            <div class="form-row-inner form-row-inner_radio">
              <input class="form-input_radio" type="radio" id="gameRating1" value="2" v-model="formValues.gameRating" />
              <label class="form_label" for="gameRating1"><span class="form-input_radio-icon"></span>Office friendly</label>
            </div>
            <div class="form-row-inner form-row-inner_radio">
              <input class="form-input_radio" type="radio" id="gameRating2" value="3" v-model="formValues.gameRating" />
              <label class="form_label" for="gameRating2"><span class="form-input_radio-icon"></span>Full on!</label>
            </div>
          </div>
          <div class="form-row">
            <div class="form-row-inner form-row-inner_actions">
              <input type="submit" class="btn" value="Submit" />
            </div>
          </div>
        </form>
    </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import FormInputText from './forms/FormInputText';
  export default {
    name: "GameDeckStartCreate",
        components: {
            'form-input-text': FormInputText,
        },
    data() {
      return {
        formValues: {},
      }
    },
    methods: {
      ...mapActions('game', [
        'START_GAME',
      ]),
      formSubmit() {
        this.START_GAME(this.formValues)
          .then((response) => {
            const currentGameId = this.$route.query.gameId;
            if (currentGameId === undefined) {
              const gameQuery = {gameId: response};
              this.$router.replace({ query: gameQuery })
            }
          });
      }
    }
  }
</script>
