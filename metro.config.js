const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Add resolver configurations
config.resolver = {
    ...config.resolver,
    sourceExts: [...config.resolver.sourceExts, 'cjs'],
    extraNodeModules: {
        ...config.resolver.extraNodeModules,
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('@craftzdog/react-native-buffer'),
    }
};

// Export the config with NativeWind
module.exports = withNativeWind(
    config,
    { input: "constants/global.css" }
);
