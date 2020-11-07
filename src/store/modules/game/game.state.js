export const state = {
  gameState: 0, // 0 - App has just loaded || 1 - Game created || 2 - Game started
  playerState: 0, // 0 - Player to submit details || 1 - Player data set - Awaiting game entry (Set initial dealer) || 2 - In game and playing
  gameCreated: false,
  gameRunning: false,
  gameCreatedById: null,
  gameCreatedByName: null,
  infoText: 'Welcome message text from store',
  appReady: false,
  userData: null,
  gameId: null,
  gameData: null,
  gameName: null,
  playerIsDealer: false,
  playerIsAdmin: false,
  playerData: null,
  playerInGame: false,
  playerHand: null,
};
export default state;
