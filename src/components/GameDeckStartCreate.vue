<template>
    <div class="game-deck-start">
        <h2 class="header2">Create a new game</h2>
        <form @submit.prevent="formSubmit" class="form" :id="formId" novalidate  aria-label="Create a new game">

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

          <form-input-radio
              v-model="formValues.gameRating"
              input-name="gameRating"
              input-placeholder="Select a game rating"
              :input-required=true
              :input-in-error="formErrors.gameRating"
              :input-options="gameRatings"
          />

          <div class="form-row">
            <div class="form-row-inner form-row-inner_actions">
              <input type="submit" class="btn secondary" value="Submit" id="formSubmit" @click.prevent="formSubmit" />
            </div>
          </div>
        </form>
    </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import FormInputRadio from '@/components/forms/FormInputRadio';
  import FormInputText from '@/components/forms/FormInputText';
  import FormValidate from '@/components/forms/FormValidate';
  export default {
    name: "GameDeckStartCreate",
    components: {
      'form-input-radio': FormInputRadio,
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
    computed: {
      ...mapState('game', [
        'gameRatings',
      ]),
    },
    methods: {
      ...mapActions('game', [
        'START_GAME',
      ]),
      formSubmit() {

        if (this.$_formHasErrors(this.formId)) {
          return
        }

        this.START_GAME(this.formValues)
          .then((response) => {
            const gameQuery = {gameId: response};
            this.$router.replace({ query: gameQuery })
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
</script>
