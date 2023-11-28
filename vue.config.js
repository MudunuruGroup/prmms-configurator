module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    publicPath: '/',
    devServer: {
        proxy: {
          '^/api': {
            target: 'https://prmms-vaults.vault.azure.net',
            changeOrigin: true,
            pathRewrite: { '^/api': '' },
          },
        },
      },
}