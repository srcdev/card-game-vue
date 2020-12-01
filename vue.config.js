// vue.config.js
module.exports = {
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = 'Fill in the blanks card game'
      return args
    })
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/imports.scss";`
      }
    }
  }
}
