<template>
    <div class="game-deck-start">
        <h2 class="header2">Create a new game</h2>
        <form @submit.prevent="formSubmit" class="form" :id="formId" novalidate>
          <div class="form-row">
            <form-input-text
                v-model="formValues.playerName"
                autocomplete="off"
                input-name="playerName"
                input-label="Player name"
                input-pattern="username"
                input-pattern-error-message="Player name has bad characters"
                input-placeholder="eg. Simon"
                :input-min-length=2
                :input-max-length=50
                :input-required=true
                :input-in-error="formErrors.playerName"
            />
          </div>
          <div class="form-row">
            <form-input-text
                v-model="formValues.gameName"
                autocomplete="off"
                input-name="gameName"
                input-label="Game name"
                input-pattern="gameName"
                input-pattern-error-message="Game name has bad characters"
                input-placeholder="eg. Simon's Game"
                :input-min-length=2
                :input-max-length=50
                :input-required=true
                :input-in-error="formErrors.gameName"
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
  import FormValidate from './forms/FormValidate';
  export default {
    name: "GameDeckStartCreate",
    components: {
      'form-input-text': FormInputText,
    },
    mixins: [
      FormValidate
    ],
    data() {
      return {
        formId: 'gameCreate',
        formErrors: {},
        formValues: {},
      }
    },
    watch: {
      formErrors() {
        console.log(`formErrors changed`);
        console.log(this.formErrors);
      }
    },
    methods: {
      ...mapActions('game', [
        'START_GAME',
      ]),
      formSubmit() {

        if (!this.$_isFormValid(this.formId)) {
          return
        }

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
