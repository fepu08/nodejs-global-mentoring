import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  projects: ['<rootDir>'],
  verbose: true,
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  coverageDirectory: 'test-reports/',
};

export default config;
