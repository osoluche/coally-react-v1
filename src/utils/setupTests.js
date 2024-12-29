// setupTests.js
import { TextEncoder, TextDecoder } from 'util';

// setupTests.js
import '@testing-library/jest-dom';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;