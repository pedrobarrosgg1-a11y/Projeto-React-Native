/**
 * Configuração do Babel para projetos Expo.
 *
 * O preset `babel-preset-expo` já inclui transforms para JSX, TypeScript
 * (se configurado) e otimizações usadas pelo Metro bundler.
 */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
  };
};
