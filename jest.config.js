module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native" +
      "|@react-native" +
      "|@react-native-community" +
      "|@react-navigation" +
      "|react-navigation" +
      "|react-native-reanimated" +
      "|react-native-gesture-handler" +
      "|react-native-screens" +
      "|react-native-safe-area-context" +
      "|react-native-vector-icons" +
      ")/"
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg|webp)$': '<rootDir>/__mocks__/fileMock.js',
    '@react-native-vector-icons/(.*)$': '<rootDir>/__mocks__/iconMock.js',
  },
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    '/__tests__/mocks/',
  ],
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["text", "lcov"]
};