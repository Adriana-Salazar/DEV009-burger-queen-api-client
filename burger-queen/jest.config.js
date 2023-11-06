export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};
