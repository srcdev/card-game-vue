<template>
  <div v-if="hrefBuilt" class="body__section__inner share wrapper">
    <h3 class="header-3">Scan QR or share link</h3>
    <p class="share-text"><a :href="whatsAppHref" class="icon-whatsapp" data-action="share/whatsapp/share">Share via Whatsapp</a></p>
    <p class="share-text share-text__link">{{ gameHref }}</p>
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
    created() {
      this.setGameHref();
    },
    methods: {
      setGameHref() {
        this.gameHref = `${document.location.href}`;
        this.whatsAppHref = `whatsapp://send?text=Share this game link ${this.gameHref}`
        this.hrefBuilt = true;
      }
    }
  };
</script>

<style lang="scss">

  .share {
    &-text {
      color: $black;
      line-height: 18px;
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
      margin: 0px;
      .shareQr {
        background-color: $white;
        display: inline-block;
        margin: 0 auto;
        padding: 8px;
      }
    }
  }

</style>
