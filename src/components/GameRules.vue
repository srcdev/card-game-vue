<template>
  <section class="game-deck game-deck-rules">
    <h2 class="header3">How to play</h2>
    <ul>
      <li>Get everyone together on a video call by your favourite method, Zoom, Houseparty etc. It's a bit boring playing with no one around</li>
      <li>Someone starts a game:
        <ol>
          <li>Enter a player name</li>
          <li>Enter a game name</li>
          <li>Select a game mode, kids friendly to adult version</li>
          <li>Share the link via messenger or get other players who are with you to scan the QR code</li>
        </ol>
      </li>
      <li>When all the players are in the game, the person who started the game shall choose the dealer, in the official game of Cards Against Humanity, this is the person who pooed last!</li>
    </ul>
    <h3 class="header3">Being the dealer</h3>
    <ul>
      <li>If the queston is rubbish, the dealer can swap the question, just once each round.</li>
      <li>When all players have played their answer/s to the question, the dealer clicks on the card they like the most to mark as the winner.</li>
      <li>The winner becomes the dealer.</li>
    </ul>
    <h3 class="header3">Being the player</h3>
    <ul>
      <li>Click on the answer card/s on the order you want to play them for the blanks in the question.</li>
      <li>You can reset your hand to choose other answers to play.</li>
      <li>When the required number of blanks have been selected, click on submit to send the answers to the dealer.</li>
    </ul>
    <p>It's all pretty simple really, the players in each round pick a card from their deck that best fits the blanks in the question card.</p>
    <p>The dealer then picks their favourite, funniest, rudest card!</p>
    <p>Whichever player answered the chosen cards is now the dealer.</p>
  </section>
</template>

<script>
  export default {
    name: "GameRules",
  }
</script>

<style lang="scss">

  .game-deck-rules {
    .header3 {
      margin-top: 12px;
      &:first-child {
        margin-top: 0;
      }
    }
    ul {
      list-style-type: disc;
      li {
        margin-left: 20px;
      }
    }
    ol li {
      margin-left: 20px;
    }
  }

</style>
