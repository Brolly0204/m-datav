const CracoLessPlugin = require("craco-less");
const { resolve } = require("path");

/** @type {import('@craco/craco').CracoConfig} */
module.exports = {
  webpack: {
    alias: {
      '@': resolve('./src'),
      '@components': resolve('./src/components')
    },
  },
  devServer:{
    proxy:{
      '/v1/':{
        target: 'http://localhost:3001',
      
        changeOrigin: true,
        pathRewrite: { '^': '' },
      }
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: {
            //   "@primary-color": "#1DA57A",
            //   "@link-color": "#1DA57A",
            // },
            javascriptEnabled: true,
          },
        },
      },
    }
  ]
};