// src/services/auth.js

const fakeDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const authService = {
  async login({ email, password }) {
    await fakeDelay(500); // simulate server delay

    if (email === 'user@example.com' && password === 'password') {
      return { token: 'mock-jwt-token' };
    }

    throw {
      response: {
        data: { message: 'Invalid credentials' }
      }
    };
  },

  async register({ name, email, password }) {
    await fakeDelay(500);

    if (name && email && password) {
      return { token: 'mock-jwt-token' };
    }

    throw {
      response: {
        data: { message: 'Missing fields' }
      }
    };
  }
};

export default authService;
