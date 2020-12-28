const { defaults } = require('jest-config');

module.exports = {
  testEnvironment: 'jsdom',
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  clearMocks: true,

  coverageReporters: ['html', 'text'],

  coverageReporters: ['json', 'text', 'lcov', 'clover'],

  moduleFileExtensions: ['js', 'json', 'node'],

  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    'js',
    'jsx',
    'json',
    'node',
  ],

  coverageDirectory: 'coverage',

  coverageThreshold: {
    global: {
      branches: 90,
      class: 90,
      lines: 90,
      statements: 90,
    },
  },

  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
};
