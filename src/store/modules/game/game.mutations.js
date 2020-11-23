function returnAnswerCount(text) {
  let answerCount = 1;
  if (text.indexOf('{1}') > -1) {
    answerCount = 2;
  } else if (text.indexOf('{2}') > -1) {
    answerCount = 3;
  } else if (text.indexOf('{3}') > -1) {
    answerCount = 4;
  }
  return answerCount;
}

function buildCurrentCard(state) {
  const tempCardData = {
    'gameId': state.gameId,
    'playerId': state.playerId,
    'playerName': state.playerData.playerName,
    'activeSlot': 1,
    'answerCount': returnAnswerCount(state.currentQuestion.text),
    'isWinner': false,
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
  return tempCardData;
}

export const mutations = {
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
    state.playerState = 2;
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
    state.playersObj = payload.playersObj;

    console.log(`payload.roundInPlay`);
    console.log(payload.roundInPlay);

    if (typeof payload.roundInPlay !== 'undefined' && payload.roundInPlay !== null) {
      console.log(`UPDATE_GAME_DATA --> IF`);
      state.roundInPlay = payload.roundInPlay;

      console.log(`payload.roundInPlay[state.playerId]`);
      console.log(typeof payload.roundInPlay[state.playerId]);

      state.roundPlayed = typeof payload.roundInPlay[state.playerId] === 'object';
      state.allowSkipQuestion = false;
    } else {
      console.log(`UPDATE_GAME_DATA --> ELSE`);
      state.roundInPlay = {};
      state.roundPlayed = false;
    }

    state.reviewingAnswers = payload.reviewingAnswers;

    if (state.playerId !== null) {
      state.gameCreated = true;
      state.dealerData = payload.dealerData;
      state.playerData = payload.playerData;
      state.playerHand = payload.playerData.hand;
      if (payload.dealerData !== null) {
        state.playerIsDealer = (payload.dealerData.playerId === state.playerId);
        state.playerState = 2;
      }

      if (state.gameCreated) {
        state.playerState = state.dealerData === null ? 1 : 2;
      }
    }
  },
  SET_ANSWER(state, payload) {

    let tempCardData = state.currentCard;
    let currentSlot = tempCardData.activeSlot;
    const answerCount = tempCardData.answerCount;
    if (currentSlot < answerCount) {
      currentSlot = currentSlot + 1;
    }
    tempCardData[payload.answer] = payload.data;
    tempCardData.activeSlot = currentSlot;

    state.currentCard = {};
    state.currentCard = tempCardData;
  },
  RESET_PLAYED_ANSWERS(state) {
    state.currentCard = buildCurrentCard(state);
  },
  UPDATE_CURRENT_QUESTION(state, payload) {
    if (payload.id !== null) {
      if (state.currentQuestion.id !== payload.id) {
        state.currentQuestion = payload;
        state.currentCard = buildCurrentCard(state);
      }
    }
    //state.allowSkipQuestion = false;
  },
  UPDATE_ROUND_IN_PLAY(state, payload) {
    state.playersObj = payload.playersObj;
    state.reviewingAnswers = payload.reviewingAnswers;
    state.roundInPlay = payload.roundInPlay;

    if (typeof payload.roundInPlay !== 'undefined') {
      console.log(`UPDATE_ROUND_IN_PLAY --> IF`);
      state.roundInPlay = payload.roundInPlay;

      console.log(`payload.roundInPlay[state.playerId]`);
      console.log(typeof payload.roundInPlay[state.playerId]);

      state.roundPlayed = typeof payload.roundInPlay[state.playerId] === 'object';
      state.allowSkipQuestion = false;
    } else {
      console.log(`UPDATE_ROUND_IN_PLAY --> ELSE`);
      state.roundInPlay = {};
      state.roundPlayed = false;
    }
  }
};
export default mutations;
