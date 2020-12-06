<template>
  <div>
    <h1 class="header2">Styles</h1>
    <h2 class="header2">Icons</h2>

    <dl>
      <dt>Cancel</dt>
      <dd><span class="icon icon__cancel"><icons icon-name="cancel" /></span></dd>
      <dt>Tick</dt>
      <dd><span class="icon icon__tick"><icons icon-name="tick" /></span></dd>
      <dt>Close</dt>
      <dd><span class="icon icon__close"><icons icon-name="close" /></span></dd>
      <dt>Cross</dt>
      <dd><span class="icon icon__cross"><icons icon-name="cross" /></span></dd>
      <dt>Locked</dt>
      <dd><span class="icon icon__locked"><icons icon-name="locked" /></span></dd>
      <dt>Locked 2</dt>
      <dd><span class="icon icon__locked"><icons icon-name="locked2" /></span></dd>
      <dt>Hamburger</dt>
      <dd><span class="icon icon__hamburger"><icons icon-name="hamburger" /></span></dd>
      <dt>Refresh</dt>
      <dd><span class="icon icon__refresh"><icons icon-name="refresh" /></span></dd>
      <dt>Cog</dt>
      <dd><span class="icon icon__cog"><icons icon-name="cog" /></span></dd>
      <dt>Question</dt>
      <dd><span class="icon icon__question"><icons icon-name="question" /></span></dd>
      <dt>Info</dt>
      <dd><span class="icon icon__info"><icons icon-name="info" /></span></dd>
      <dt>Share</dt>
      <dd><span class="icon icon__share"><icons icon-name="share" /></span></dd>
      <dt>Home</dt>
      <dd><span class="icon icon__home"><icons icon-name="home" /></span></dd>
      <dt>Profile</dt>
      <dd><span class="icon icon__profile"><icons icon-name="profile" /></span></dd>
      <dt>Cards</dt>
      <dd><span class="icon icon__cards"><icons icon-name="cards" /></span></dd>
      <dt>Warning</dt>
      <dd><span class="icon icon__warning"><icons icon-name="warning" /></span></dd>
      <dt>Scores</dt>
      <dd><span class="icon icon__scores"><icons icon-name="scores" /></span></dd>
      <dt>Eject</dt>
      <dd><span class="icon icon__eject"><icons icon-name="eject" /></span></dd>
    </dl>
  </div>
</template>

<script>
  export default {
    name: "Styles",
  }
</script>

<style lang="scss">

  dl {
    dt {
      clear: both;
      float: left;
      margin-bottom: 12px;
      width: 100px;
    }
    dd {
      margin-bottom: 12px;
      width: calc(100% - 100px);
    }
  }

</style>
