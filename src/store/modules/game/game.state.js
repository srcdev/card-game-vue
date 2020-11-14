export const state = {
  appReady: false,
  dealerData: {},
  gameRatings: [
    {
      'id':'rating1',
      'text':'Child friendly',
      'value': '1',
      'checked': true
    },
    {
      'id':'rating2',
      'text':'Office friendly',
      'value': '2',
      'checked': false
    },
    {
      'id':'rating3',
      'text':'Not for the easily offended',
      'value': '3',
      'checked': false
    }
  ],
  gameState: 0, // 0 - App has just loaded || 1 - Game created || 2 - Game started
  playerState: 0, // 0 - Player to submit details || 1 - Player data set - Awaiting game entry (Set initial dealer) || 2 - In game and playing
  gameCreated: false,
  gameRunning: false,
  gameCreatedById: null,
  gameCreatedByName: null,
  userData: null,
  gameId: null,
  currentQuestion: {},
  gameName: null,
  playersObj: {},
  playerId: null,
  playerIsDealer: false,
  playerIsAdmin: false,
  playerData: null,
  playerInGame: false,
  playerHand: null,
  playerCount: 0
};
export default state;
