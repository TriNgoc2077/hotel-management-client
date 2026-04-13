const STORAGE_KEY = "customer_profile";
const PASSWORD_KEY = "customer_password";

const defaultProfile = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
};

const readProfile = () => {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProfile));
    return defaultProfile;
  }

  return JSON.parse(raw);
};

const writeProfile = (profile) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
};

const userService = {
  async getProfile() {
    return readProfile();
  },

  async updateProfile(payload) {
    const current = readProfile();
    const next = { ...current, ...payload };

    writeProfile(next);
    return next;
  },
  async changePassword(payload) {
    const currentPassword = localStorage.getItem(PASSWORD_KEY) || "123456";

    if (payload.currentPassword !== currentPassword) {
      return {
        success: false,
        message: "Current password is incorrect",
      };
    }

    if (payload.newPassword !== payload.confirmPassword) {
      return {
        success: false,
        message: "New password and confirm password do not match",
      };
    }

    localStorage.setItem(PASSWORD_KEY, payload.newPassword);

    return {
      success: true,
      message: "Password updated successfully",
    };
  },
};

export default userService;
