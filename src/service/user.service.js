import usersMock from "../mocks/users.json";

const PROFILE_KEY = "le_ninh_customer_profile";
const PASSWORD_KEY = "le_ninh_customer_password";
export const REGISTERED_USER_KEY = "le_ninh_registered_user";

const defaultProfile = {
  id: "user-3",
  full_name: "",
  email: "",
  phone: "",
  address: "",
  avatar:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
};

const readProfile = () => {
  const raw = localStorage.getItem(PROFILE_KEY);
  const authUserRaw = localStorage.getItem("auth_user");
  const authUser = authUserRaw ? JSON.parse(authUserRaw) : null;

  if (!raw) {
    const mock = usersMock.find((item) => item.id === "user-3");
    const initialProfile = mock ? { ...defaultProfile, ...mock, avatar: defaultProfile.avatar } : defaultProfile;
    const mergedProfile = authUser ? { ...initialProfile, ...authUser } : initialProfile;
    localStorage.setItem(PROFILE_KEY, JSON.stringify(mergedProfile));
    if (!localStorage.getItem(PASSWORD_KEY)) {
      localStorage.setItem(PASSWORD_KEY, "12345678");
    }
    return mergedProfile;
  }

  return { ...JSON.parse(raw), ...(authUser || {}) };
};

const userService = {
  async getProfile() {
    return readProfile();
  },

  async updateProfile(payload) {
    const nextProfile = { ...readProfile(), ...payload };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(nextProfile));
    localStorage.setItem("auth_user", JSON.stringify(nextProfile));
    return nextProfile;
  },

  async changePassword(payload) {
    const currentPassword = localStorage.getItem(PASSWORD_KEY) || "12345678";

    if (payload.currentPassword !== currentPassword) {
      throw new Error("Current password is incorrect");
    }

    localStorage.setItem(PASSWORD_KEY, payload.newPassword);
    return true;
  },
};

export default userService;
