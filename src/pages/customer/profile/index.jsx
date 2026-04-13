import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import userService from "../../../service/user.service";
import notificationService from "../../../service/notification.service";

export default function CustomerProfilePage() {
  const [profile, setProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [profileForm, setProfileForm] = useState({
    email: "",
    phone: "",
    address: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      const [profileData, notificationData] = await Promise.all([
        userService.getProfile(),
        notificationService.getNotifications(),
      ]);

      if (!active) return;
      setProfile(profileData);
      setNotifications(notificationData);
      setProfileForm({
        email: profileData.email || "",
        phone: profileData.phone || "",
        address: profileData.address || "",
      });
    };

    void loadData();

    return () => {
      active = false;
    };
  }, []);

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    const next = await userService.updateProfile(profileForm);
    setProfile(next);
    setProfileMessage("Profile updated successfully.");
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage("New password and confirmation do not match.");
      return;
    }

    try {
      await userService.changePassword(passwordForm);
      setPasswordMessage("Password changed successfully.");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch {
      setPasswordMessage("Current password is incorrect.");
    }
  };

  const handleReadNotification = async (notificationId) => {
    await notificationService.markAsRead(notificationId);
    setNotifications((current) =>
      current.map((item) =>
        String(item.id) === String(notificationId) ? { ...item, is_read: true } : item,
      ),
    );
  };

  if (!profile) {
    return <div className="min-h-screen bg-slate-50 p-10 text-center text-slate-500">Loading profile...</div>;
  }

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
            Customer Module
          </p>
          <h1 className="mt-3 text-4xl font-serif text-slate-900">Profile</h1>
        </div>

        <div className="grid gap-8 xl:grid-cols-[0.75fr_1.25fr]">
          <aside className="space-y-6 rounded-[32px] bg-slate-900 p-6 text-white shadow-sm">
            <img src={profile.avatar} alt={profile.email || "Customer"} className="h-24 w-24 rounded-3xl object-cover" />
            <div>
              <h2 className="text-3xl font-serif">{profile.full_name || "Customer"}</h2>
              <p className="mt-2 text-sm text-slate-300">{profile.email}</p>
            </div>
            <div className="space-y-2 text-sm text-slate-300">
              <p>Phone: {profile.phone}</p>
              <p>Address: {profile.address || ""}</p>
            </div>

            <div className="rounded-3xl bg-white/5 p-4">
              <div className="mb-4 flex items-center gap-2">
                <Bell size={18} />
                <h3 className="text-lg font-semibold">Notifications</h3>
              </div>
              <div className="space-y-3">
                {notifications.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => void handleReadNotification(item.id)}
                    className={`w-full rounded-2xl p-3 text-left ${
                      item.is_read ? "bg-white/5" : "bg-amber-500/20"
                    }`}
                  >
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-300">{item.message}</p>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-8">
            <form onSubmit={handleProfileSubmit} className="rounded-[32px] bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-serif text-slate-900">Update profile</h3>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="text-sm font-medium text-slate-600">
                  Email
                  <input
                    value={profileForm.email}
                    onChange={(event) =>
                      setProfileForm((current) => ({ ...current, email: event.target.value }))
                    }
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none"
                  />
                </label>
                <label className="text-sm font-medium text-slate-600">
                  Phone number
                  <input
                    value={profileForm.phone}
                    onChange={(event) =>
                      setProfileForm((current) => ({ ...current, phone: event.target.value }))
                    }
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none"
                  />
                </label>
                <label className="text-sm font-medium text-slate-600">
                  Address
                  <input
                    value={profileForm.address}
                    onChange={(event) =>
                      setProfileForm((current) => ({ ...current, address: event.target.value }))
                    }
                    placeholder="Enter your address"
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none"
                  />
                </label>
              </div>
              <button type="submit" className="mt-6 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
                Save changes
              </button>
              {profileMessage ? <p className="mt-3 text-sm text-emerald-600">{profileMessage}</p> : null}
            </form>

            <form onSubmit={handlePasswordSubmit} className="rounded-[32px] bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-serif text-slate-900">Change password</h3>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <label className="text-sm font-medium text-slate-600">
                  Current password
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(event) =>
                      setPasswordForm((current) => ({ ...current, currentPassword: event.target.value }))
                    }
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none"
                  />
                </label>
                <label className="text-sm font-medium text-slate-600">
                  New password
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(event) =>
                      setPasswordForm((current) => ({ ...current, newPassword: event.target.value }))
                    }
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none"
                  />
                </label>
                <label className="text-sm font-medium text-slate-600">
                  Confirm password
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(event) =>
                      setPasswordForm((current) => ({ ...current, confirmPassword: event.target.value }))
                    }
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none"
                  />
                </label>
              </div>
              <button type="submit" className="mt-6 rounded-full bg-amber-600 px-5 py-3 text-sm font-semibold text-white">
                Update password
              </button>
              {passwordMessage ? <p className="mt-3 text-sm text-slate-600">{passwordMessage}</p> : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
