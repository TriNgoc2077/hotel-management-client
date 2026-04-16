import usersMock from "../mocks/users.json";
import rolesMock from "../mocks/roles.json";

let usersData = [...usersMock];

const getRoleName = (roleId) => {
  const matchedRole = rolesMock.find((role) => role.id === roleId);
  return matchedRole?.name || "Customer";
};

const normalizeUser = (user) => ({
  id: user.id,
  fullName: user.full_name,
  email: user.email,
  phone: user.phone,
  address: user.address,
  status: user.status,
  roleId: user.role_id,
  role: getRoleName(user.role_id),
  createdAt: user.created_at,
  updatedAt: user.updated_at,
});

const buildListResponse = (items) => ({
  statusCode: 200,
  message: "Get users successfully",
  data: {
    meta: {
      current: 1,
      limit: items.length,
      total: items.length,
    },
    result: items,
  },
});

const adminUserService = {
  async getUsers() {
    const normalizedUsers = usersData.map(normalizeUser);
    return buildListResponse(normalizedUsers);
  },

  async getUserById(id) {
    const matchedUser = usersData.find((user) => user.id === id);

    if (!matchedUser) {
      throw new Error("User not found");
    }

    return {
      statusCode: 200,
      message: "Get user successfully",
      data: normalizeUser(matchedUser),
    };
  },

  async createUser(payload) {
    const nextUser = {
      id: `user-${usersData.length + 1}`,
      role_id: payload.roleId,
      full_name: payload.fullName,
      email: payload.email,
      password_hash: "$2b$10$hashed_password_example",
      refresh_token: "refresh_token_string",
      phone: payload.phone,
      address: payload.address,
      status: payload.status,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    usersData = [nextUser, ...usersData];

    return {
      statusCode: 201,
      message: "Create user successfully",
      data: {
        id: nextUser.id,
      },
    };
  },

  async updateUser(id, payload) {
    const matchedUser = usersData.find((user) => user.id === id);

    if (!matchedUser) {
      throw new Error("User not found");
    }

    usersData = usersData.map((user) =>
      user.id === id
        ? {
            ...user,
            role_id: payload.roleId,
            full_name: payload.fullName,
            email: payload.email,
            phone: payload.phone,
            address: payload.address,
            status: payload.status,
            updated_at: new Date().toISOString(),
          }
        : user
    );

    return {
      statusCode: 200,
      message: "Update user successfully",
      data: {
        id,
      },
    };
  },

  async deleteUser(id) {
    const matchedUser = usersData.find((user) => user.id === id);

    if (!matchedUser) {
      throw new Error("User not found");
    }

    usersData = usersData.filter((user) => user.id !== id);

    return {
      statusCode: 200,
      message: "Delete user successfully",
      data: {
        id,
      },
    };
  },

  async toggleUserStatus(id) {
    const matchedUser = usersData.find((user) => user.id === id);

    if (!matchedUser) {
      throw new Error("User not found");
    }

    usersData = usersData.map((user) =>
      user.id === id
        ? {
            ...user,
            status: user.status === "Active" ? "Locked" : "Active",
            updated_at: new Date().toISOString(),
          }
        : user
    );

    return {
      statusCode: 200,
      message: "Toggle user status successfully",
      data: {
        id,
      },
    };
  },

  async getRoles() {
    return {
      statusCode: 200,
      message: "Get roles successfully",
      data: rolesMock,
    };
  },
};

export default adminUserService;
