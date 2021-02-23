module.exports = {
  roots: ['<rootDir>/pages'],
  collectCoverageFrom: [
    '<rootDir>/pages/**/*.{ts,tsx}'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
