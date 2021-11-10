
const API_URL = process.env.REACT_APP_API;

export default {
  async login(email, password) {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },
  async signup(email, password) {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },
  async hello() {
    const response = await fetch(`${API_URL}/hello`, {
      credentials: "include"
    });
    return response.json();
  }
}