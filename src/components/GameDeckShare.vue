<template>
  <div v-if="hrefBuilt" class="body__section__inner">
    <h3 class="header-3">Scan QR or share link</h3>
    <p><a :href="gameHref" class="sharelink">{{ gameHref }}</a></p>
    <div
      class="sharepanel"
      >
      <qrcode-vue :value="gameHref" size="260" level="H" class="shareQr"></qrcode-vue>
    </div>
  </div>
</template>

<script>
  // import { mapState } from 'vuex';
  import QrcodeVue from 'qrcode.vue';
  export default {
    name: "GameDeckShare",
    components: {
      QrcodeVue
    },
    data () {
      return {
        hrefBuilt: false,
      }
    },
    created() {
      this.setGameHref();
    },
    methods: {
      setGameHref() {
        this.gameHref = `${document.location.href}`;
        this.hrefBuilt = true;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../styles/imports";

  .body__section__inner {
    .sharelink {
      color: $white;
      font-size: 10px;
      font-weight: normal;
    }

    .sharepanel {
      display: flex;
      margin: 12px 0px;
      .shareQr {
        background-color: $white;
        display: inline-block;
        margin: 0 auto;
        padding: 8px;
      }
    }
  }

  @media (prefers-color-scheme: dark) {

  }

</style>
