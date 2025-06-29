import { STORAGE_KEYS } from "../utils/constants";

class AuthService {
  getCurrentUser() {
    try {
      const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }

  getUsers() {
    try {
      const users = localStorage.getItem(STORAGE_KEYS.USERS);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error("Error getting users:", error);
      return [];
    }
  }

  saveUsers(users) {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch (error) {
      console.error("Error saving users:", error);
      throw new Error("Failed to save user data");
    }
  }

  async signup(userData) {
    const { username, email, password, confirmPassword } = userData;

    if (!username || !email || !password || !confirmPassword) {
      throw new Error("All fields are required");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Please enter a valid email address");
    }

    const users = this.getUsers();

    const existingUser = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() ||
        user.username.toLowerCase() === username.toLowerCase()
    );

    if (existingUser) {
      if (existingUser.email.toLowerCase() === email.toLowerCase()) {
        throw new Error("Email already exists");
      }
      if (existingUser.username.toLowerCase() === username.toLowerCase()) {
        throw new Error("Username already exists");
      }
    }

    const newUser = {
      id: Date.now(),
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password: password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    this.saveUsers(users);

    const userToStore = { ...newUser };
    delete userToStore.password;
    localStorage.setItem(
      STORAGE_KEYS.CURRENT_USER,
      JSON.stringify(userToStore)
    );

    return userToStore;
  }

  async login(credentials) {
    const { username, password } = credentials;

    if (!username || !password) {
      throw new Error("Username and password are required");
    }

    const users = this.getUsers();
    const user = users.find(
      (u) =>
        (u.username.toLowerCase() === username.toLowerCase() ||
          u.email.toLowerCase() === username.toLowerCase()) &&
        u.password === password
    );

    if (!user) {
      throw new Error("Invalid username or password");
    }

    const userToStore = { ...user };
    delete userToStore.password;
    localStorage.setItem(
      STORAGE_KEYS.CURRENT_USER,
      JSON.stringify(userToStore)
    );

    return userToStore;
  }

  logout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }

  isAuthenticated() {
    return !!this.getCurrentUser();
  }
}

export const authService = new AuthService();
