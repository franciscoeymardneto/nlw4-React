module.exports = {
  roots: ['<rootDir>/src'],
  colectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}'
  ],
  coverageDirectory: 'coverage',
  testEnvioronment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
