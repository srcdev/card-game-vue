<template>
  <div
    v-if="hrefBuilt"
    class="share wrapper"
    :class="[
      {'game-deck' : isMainDeck},
    ]"
    >
    <h3 class="header-3">Scan QR or share link</h3>
    <p class="share-text">
      <a :href="whatsAppHref" class="icon-whatsapp" data-action="share/whatsapp/share">Share via Whatsapp</a>
    </p>
    <p class="share-text">
      <input type="text" :value="gameHref" class="game-link" />
      <a @click.prevent="copyLink()" :href="gameHref"><span class="icon icon__copy"><icons icon-name="copy" /></span>Copy to clipboard</a>
    </p>
    <div
      class="sharepanel"
      >
      <qrcode-vue :value="gameHref" size="260" level="H" class="shareQr"></qrcode-vue>
    </div>
  </div>
</template>

<script>
  import QrcodeVue from 'qrcode.vue';
  export default {
    name: "GameDeckShare",
    components: {
      QrcodeVue
    },
    data () {
      return {
        hrefBuilt: false,
        whatsAppHref: null,
      }
    },
    props: {
      isSubComponent: [Boolean, String]
    },
    computed: {
      isMainDeck() {
        return !this.isSubComponent;
      }
    },
    created() {
      this.setGameHref();
    },
    methods: {
      setGameHref() {
        this.gameHref = `${document.location.href}`;
        this.whatsAppHref = `whatsapp://send?text=Share this game link ${this.gameHref}`
        this.hrefBuilt = true;
      },
      copyLink() {
        var copyText = document.querySelector(".game-link");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");

        const payload = {
          message: 'Game link copied to clipboard',
          callback: null,
          cancelText: null,
          confirmText: 'OK'
        }
        this.$bus.$emit('confirm-copy', payload);
      }
    }
  };
</script>

<style lang="scss">

  .share {
    &-text {
      color: $black;
      line-height: 18px;
      margin-bottom: 8px;
      padding: 0 10px;
      @media (prefers-color-scheme: dark) {
          color: $white;
      }
      &__link {
        display: none;
        font-size: 10px;
        font-weight: normal;
        line-height: 12px;
      }
      .game-link {
        position: absolute;
        left: -9999px;
        z-index: -1;
      }
      .icon__copy {
        margin: 0 8px;
        position: relative;
        top: 6px;
      }
    }

    .icon-whatsapp {
      @include icon-whatsapp;
      background-size: 32px;
      display: inline-block;
      line-height: 32px;
      padding-left: 36px;
    }
    .sharepanel {
      display: flex;
      margin: 8px;
      .shareQr {
        background-color: $white;
        display: inline-block;
        margin: 0 auto;
        padding: 8px;
      }
    }
  }

</style>
