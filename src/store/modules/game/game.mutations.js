export const mutations = {
  setAppReady: (state) => {
    setTimeout(() => {
      state.appReady = true;
    }, 500);
  },
  INIT_PLAYER: (state, payload) => {
    state.playerId = payload;
    if (state.gameCreated && state.playerData === null) {
      state.playerState = 0;
    }
  },
  SET_GAME_STATE: (state, gameId) => {
    state.gameId = gameId;
    state.gameState = 1;
    state.gameCreated = true;
  },
  SET_DEALER: (state) => {
    state.gameRunning = true;
  },
  SET_PLAYER_DATA: (state, payload) => {
    state.gameName = payload.gameName;
    state.gameState = payload.gameState;
    state.gameCreatedById = payload.gameCreatedById;
    state.gameCreatedByName = payload.gameCreatedByName;
    state.playerData = payload.playerData;
    state.playerHand = payload.playerData.hand;
    state.playersObj = payload.playersObj;
    state.playerIsAdmin = (payload.gameCreatedById === state.playerId);
    state.playerCount = payload.playerCount;
    if (state.gameCreated && state.playerData !== null) {
      state.playerState = 1;
    }
  },
  UPDATE_GAME_DATA: (state, payload) => {
    state.gameState = payload.gameState;
    state.gameName = payload.gameName;
    state.gameCreatedById = payload.gameCreatedById;
    state.gameCreatedByName = payload.gameCreatedByName;
    state.playerCount = payload.playerCount;

    // if (payload.currentQuestion !== null) {
    //   const currentQuestion = {
    //     answerCount: answerCount,
    //     id: payload.currentQuestion.id,
    //     text: payload.currentQuestion.text
    //   }
    //   state.currentQuestion = currentQuestion;
    //     state.currentCard.gameId = state.gameId;
    //     state.currentCard.playerId = state.playerId;
    //     state.currentCard.playerName = state.playerName;
    //     state.currentCard.question.id = state.currentQuestion.id;
    //     state.currentCard.question.text = state.currentQuestion.text;
    //     let answerCount = 1;
    //     if (payload.currentQuestion.text.indexOf('{1}') > -1) {
    //       answerCount = 2;
    //     } else if (payload.currentQuestion.text.indexOf('{2}') > -1) {
    //       answerCount = 3;
    //     }
    //     state.currentCard.answerCount = answerCount;
    // }

    if (state.playerId !== null) {
      state.gameCreated = true;
      state.dealerData = payload.dealerData;
      state.playersObj = payload.playersObj;
      state.playerData = payload.playerData;
      state.playerHand = payload.playerData.hand;
      if (payload.dealerData !== null) {
        state.playerIsDealer = (payload.dealerData.playerId === state.playerId);
      }

      if (state.gameCreated) {
        state.playerState = state.dealerData === null ? 1 : 2;
      }
    }
  },
  SET_ANSWER(state, payload) {

    const currentCard = state.currentCard;
    currentCard[payload.answer] = payload.data;
    state.currentCard = {};
    state.currentCard = currentCard;
  },
  RESET_PLAYED_ANSWERS(state) {
    state.currentCard = {
      'gameId': state.gameId,
      'playerId': state.playerId,
      'playerName': state.playerData.playerName,
      'question': {
        'id': state.currentQuestion.id,
        'text': state.currentQuestion.text
      },
      'answer1': {
        'id': null,
        'text': ''
      },
      'answer2': {
        'id': null,
        'text': ''
      },
      'answer3': {
        'id': null,
        'text': ''
      }
    }
  },
  UPDATE_CURRENT_QUESTION(state, payload) {

    if (payload !== null) {
      const currentQuestion = {
        answerCount: 1,
        id: payload.id,
        text: payload.text
      }
      state.currentQuestion = currentQuestion;
        state.currentCard.gameId = state.gameId;
        state.currentCard.playerId = state.playerId;
        state.currentCard.playerName = state.playerData.playerName;
        state.currentCard.question.id = state.currentQuestion.id;
        state.currentCard.question.text = state.currentQuestion.text;
        let answerCount = 1;
        if (payload.text.indexOf('{1}') > -1) {
          answerCount = 2;
        } else if (payload.text.indexOf('{2}') > -1) {
          answerCount = 3;
        }
        state.currentCard.answerCount = answerCount;
    }

    state.allowSkipQuestion = true;
  },
};
export default mutations;
