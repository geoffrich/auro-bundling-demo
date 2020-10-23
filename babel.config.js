const sharedPlugins = [
  '@babel/plugin-syntax-dynamic-import',
  [
      '@babel/plugin-transform-runtime',
      {
          useESModules: true
      }
  ]
];

module.exports = {
    exclude: ['node_modules/@babel/**', 'node_modules/core-js/**'],    
    env: {
        // TODO: do we need to transpile for modern build? Check size difference
        modern: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: { esmodules: true },
                        useBuiltIns: 'usage',
                        corejs: 3
                    }
                ]
            ],
            plugins: sharedPlugins
        },
        legacy: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: '> 0.25%, not dead',
                        useBuiltIns: 'usage',
                        corejs: 3
                    }
                ]
            ],
            plugins: sharedPlugins
        }
    }
};