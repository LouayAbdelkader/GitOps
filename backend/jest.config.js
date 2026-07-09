module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js' // on exclut le point d'entrée si tu veux
  ],
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
  setupFiles: ['<rootDir>/tests/env.setup.js']
};