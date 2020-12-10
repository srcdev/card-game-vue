function returnAnswerCount(text) {
  let answerCount = 1;
  if (text.indexOf('{1}') > -1) {
    answerCount = 2;
  }
  if (text.indexOf('{2}') > -1) {
    answerCount = 3;
  }
  if (text.indexOf('{3}') > -1) {
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
    state.answersInGame = payload.answersInGame;
    state.questionsInGame = payload.questionsInGame;
    state.gameRunning = true;
    state.gameState = payload.gameState;
    state.gameName = payload.gameName;
    state.gameCreatedById = payload.gameCreatedById;
    state.gameCreatedByName = payload.gameCreatedByName;
    state.playerCount = payload.playerCount;
    state.playersObj = payload.playersObj;
    state.skipQuestionDisabled = payload.skipQuestionDisabled;
    state.scoresObj = payload.scoresObj;
    state.rounds = payload.rounds;
    state.showWinner = false;
    if (typeof payload.roundInPlay !== 'undefined' && payload.roundInPlay !== null) {
      state.roundInPlay = payload.roundInPlay;
      state.roundPlayed = typeof payload.roundInPlay[state.playerId] === 'object';
      //state.skipQuestionDisabled = true;
    } else {
      state.roundInPlay = {};
      state.roundPlayed = false;
      //state.skipQuestionDisabled = false;
    }

    state.reviewingAnswers = payload.reviewingAnswers;

    if (state.playerId !== null) {
      state.gameCreated = true;
      state.dealerData = payload.dealerData;
      state.playerData = payload.playerData;
      state.canSwapAnswer = payload.playerData.canSwapAnswer
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
  },
  LOCK_QUESTION(state) {
    state.skipQuestionDisabled = true;
  },
  UPDATE_ROUND_IN_PLAY(state, payload) {
    state.playersObj = payload.playersObj;
    state.reviewingAnswers = payload.reviewingAnswers;
    state.roundInPlay = payload.roundInPlay;
    state.skipQuestionDisabled = payload.skipQuestionDisabled;
    state.playerData.canSwapAnswer = true;
    if (typeof payload.roundInPlay !== 'undefined') {
      state.roundInPlay = payload.roundInPlay;
      state.roundPlayed = typeof payload.roundInPlay[state.playerId] === 'object';
      state.skipQuestionDisabled = true;
    } else {
      state.roundInPlay = {};
      state.roundPlayed = false;
      state.skipQuestionDisabled = false;
    }
  },
  DISPLAY_WINNER(state, payload) {
    state.winnerData = payload;
    state.reviewingAnswers = false;
    state.showWinner = true;
    setTimeout(() => {
      state.showWinner = false;
    }, state.showWinnerTimeout);
  }
};
export default mutations;
