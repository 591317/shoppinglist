// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');

/* const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push("js", "json", "ts", "tsx", "cjs"); */

module.exports = defaultConfig;

