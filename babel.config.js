module.exports = api => {
  api.cache(true)
  return {
    plugins: ['@babel/plugin-proposal-class-properties'],
    env: {
      es: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
      },
      commonjs: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
      },
      rollup: {
        presets: [
          ['@babel/preset-env', { modules: false }],
          '@babel/preset-react',
        ],
      },
    },
  }
}
