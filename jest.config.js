module.exports = {
    preset: 'ts-jest', // Use ts-jest for TypeScript files
    testEnvironment: 'jsdom', // Simulates a browser environment
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files
      '^.+\\.jsx?$': 'babel-jest', // Transform JavaScript files with Babel
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
    },
    transformIgnorePatterns: [
      '/node_modules/(?!(axios)/)', // Ensure axios is transformed
    ],
  };
  