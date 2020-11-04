<template>
    <div class="game-deck-start">
        <h2 class="header2">Create a new game</h2>
        <form @submit.prevent="formSubmit" class="form">
          <div class="form-row">
            <div class="form-row-inner form-row-inner_text">
              <label class="form_label" for="username">Player Name</label>
              <input class="form-input_text" placeholder="eg: Joe Bloggs" type="text" id="username" v-model="formFieldValues.username" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-row-inner form-row-inner_text">
              <label class="form_label" for="gamename">Game Name</label>
              <input class="form-input_text" placeholder="eg: Joe's game" type="text" id="gamename" v-model="formFieldValues.gamename" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-row-inner form-row-inner_radio">
              <input class="form-input_radio" type="radio" id="gamerating0" value="0" v-model="formFieldValues.gamerating" />
              <label class="form_label" for="gamerating0"><span class="form-input_radio-icon"></span>Child friendly</label>
            </div>
            <div class="form-row-inner form-row-inner_radio">
              <input class="form-input_radio" type="radio" id="gamerating1" value="1" v-model="formFieldValues.gamerating" />
              <label class="form_label" for="gamerating1"><span class="form-input_radio-icon"></span>Office friendly</label>
            </div>
            <div class="form-row-inner form-row-inner_radio">
              <input class="form-input_radio" type="radio" id="gamerating2" value="2" v-model="formFieldValues.gamerating" />
              <label class="form_label" for="gamerating2"><span class="form-input_radio-icon"></span>Full on!</label>
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
  export default {
    name: "GameDeckStartCreate",
    data() {
      return {
        formFieldValues: {
          username: null,
          gamename: null,
          gamerating: null,
        },
      }
    },
    methods: {
      ...mapActions('game', [
        'START_GAME',
      ]),
      formSubmit() {
        this.START_GAME(this.formFieldValues);
      }
    }
  }  
</script>
