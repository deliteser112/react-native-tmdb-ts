// jest.setup.js
import 'react-native-gesture-handler/jestSetup';

// Set up jest-native matchers immediately after the test framework is installed
import '@testing-library/jest-native/extend-expect';

// Set up any global mocks here
jest.mock('react-native-vector-icons', () => ({
    // Mock implementation or return value for vector icons if needed
    createIconSet: () => 'Icon',
}));

// Use fake timers to control timing-based functions
jest.useFakeTimers();