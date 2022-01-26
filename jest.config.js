module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['<rootDir>'],
  rootDir: '.',
  modulePaths: ['<rootDir>'],
  clearMocks: true,
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: './__tests__/coverage',
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  moduleNameMapper: {
    '^infra/?(.*)$': '<rootDir>/src/infra/$1',
    '^domain/?(.*)$': '<rootDir>/src/domain/$1',
    '^modules/?(.*)$': '<rootDir>/src/modules/$1',
    '^utils/?(.*)$': '<rootDir>/src/utils/$1'
  },
  collectCoverageFrom: ['<rootDir>/src/modules/**/*.ts'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/domain/*',
    '<rootDir>/src/domain/**/*index.ts',
    '<rootDir>/src/infra/*',
    '<rootDir>/src/AppModule.ts'
  ]
}
