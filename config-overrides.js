const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  let babelConfig = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);  // change importing css to less
  return rewireLess(babelConfig, env, {
    modifyVars: { "@primary-color": "#ed145b" },
  });
};
