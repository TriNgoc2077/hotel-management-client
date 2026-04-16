import usersMock from "../mocks/users.json";
import rolesMock from "../mocks/roles.json";

const DEFAULT_PASSWORD = "123456";

const normalizeUser = (user) => {
  const role = rolesMock.find((item) => item.id === user.role_id);

  return {
    id: user.id,
    fullName: user.full_name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    status: user.status,
    role: role?.name || "Customer",
  };
};

const authService = {
  async login(payload) {
    const matchedUser = usersMock.find(
      (user) => user.email.toLowerCase() === payload.email.toLowerCase()
    );

    if (!matchedUser || payload.password !== DEFAULT_PASSWORD) {
      throw new Error("Invalid email or password");
    }

    return {
      statusCode: 200,
      message: "Login success",
      data: {
        user: normalizeUser(matchedUser),
        token: `mock_token_${matchedUser.id}`,
      },
    };
  },

  async register(payload) {
    return {
      statusCode: 200,
      message: "Register mock success",
      data: payload,
    };
  },

  async refreshToken() {
    return {
      statusCode: 200,
      message: "Refresh token success",
      data: {
        token: "mock_refresh_token",
      },
    };
  },

  async forgotPassword() {
    return {
      statusCode: 200,
      message: "Forgot password mock success",
      data: null,
    };
  },

  async logout() {
    return {
      statusCode: 200,
      message: "Logout success",
      data: null,
    };
  },
};

export default authService;
