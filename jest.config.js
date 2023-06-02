module.exports = {
  preset: 'ts-jest/presets/js-with-babel-esm',
  transform: {
    '^.+\\.(css)?$': 'babel-jest',
  },
  moduleNameMapper: {
    "@components/(.*)$": "<rootDir>/src/components/$1",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: [
    "<rootDir>/src/setupEncoder.js",
    "<rootDir>/src/setupTests.js"
  ],
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  globals: {
    TextEncoder: require("util").TextEncoder,
    TextDecoder: require("util").TextDecoder
  }
}
