<template>
  <section class="wrapper game-support">
    <h2 class="header3">Support the game</h2>
    <nav class="game-support__nav">
      <ul class="list inline">
        <li 
          v-for="(item, index) in crypto"
          :key="index"
          class="list-item"
        >
          <a :href="`#${index}`" @click.prevent="setPanel(item)" class="list-link">{{ item.ticker }}</a>
        </li>
      </ul>
    </nav>
    <div 
      v-if="showItem"
      class="donate-panel"
      >
      <p >{{ selectedItem.name }} (<strong>{{ selectedItem.ticker }}</strong>): {{ selectedItem.text }}</p>
      <div class="sharepanel">
        <qrcode-vue :value="selectedItem.address" size="260" level="H" class="shareQr"></qrcode-vue>
      </div>
    </div>
  </section>
</template>

<script>
  import QrcodeVue from 'qrcode.vue';
  export default {
    name: "GameSupport",
    components: {
      'qrcode-vue': QrcodeVue
    },
    data() {
      return {
        selectedItem: null,
        showItem: false,
        crypto: {
          btc: {
            address: '1ESdA4n32ainitfxH7GspsRiWUoALWStSp',
            name: 'Bitcoin',
            text: 'The grand daddy of all crypto, the one that started it all some would say',
            ticker: 'BTC'
          },
          nano: {
            address: 'nano_1efksoemifidc1wpyeygz84pkki9cq867eqry17pu156pdyd9mgu19c5roo5',
            name: 'Nano',
            text: 'Fast... almost instant and feeless... free to send ',
            ticker: 'NANO'
          },
          eth: {
            address: '0x648A646badFF09748237ED87260e0f7F2f155502',
            name: 'Ether',
            text: 'Usually known as Etherium, it the token of the world computer and DeFi',
            ticker: 'ETH'
          },
          ltc: {
            address: 'LLHfZF9CyfTX8iaiz1MFNzQAwKgBGeTTak',
            name: 'Litecoin',
            text: 'The first Bitcoin spin-off, it`s faster and cheaper than Bitcoin to send',
            ticker: 'LTC'
          },
        }
      }
    },
    methods: {
      setPanel(item) {
        this.selectedItem = item;
        this.showItem = true;
      }
    }
  }
</script>

<style lang="scss">

  .game-support {
    .header3 {
      margin-bottom: 0;
    }
    .list {
      &-item {
        margin: 0 12px 0 0;
      }
    }
    .sharepanel {
      display: flex;
      margin-top: 12px;
      justify-content: center;
    }
  }

  // @include breakpoint(768) {
  //   .footer {

  //   }
  // }

</style>
