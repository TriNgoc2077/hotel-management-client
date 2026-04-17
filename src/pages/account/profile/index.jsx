import { useEffect, useState } from "react";
import userService from "../../../service/user.service";

export default function CustomerProfilePage() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
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
    const loadProfile = async () => {
      const data = await userService.getProfile();

      setProfile(data);
      setForm({
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
      });
    };

    loadProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProfile = await userService.updateProfile({
      email: form.email,
      phone: form.phone,
      address: form.address,
    });

    setProfile(updatedProfile);
    alert("Profile updated successfully");
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();

    const result = await userService.changePassword(passwordForm);
    alert(result.message);

    if (result.success) {
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-50 p-10">Loading profile...</div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 px-4 pt-32 pb-12">
      <div className="mx-auto grid max-w-6xl gap-8 xl:grid-cols-[0.75fr_1.25fr]">
        <aside className="rounded-[32px] bg-slate-900 p-6 text-white">
          <h2 className="text-3xl font-serif">
            {profile.fullName || "Customer"}
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            {profile.email || "No email yet"}
          </p>

          <div className="mt-6 space-y-2 text-sm text-slate-300">
            <p>Phone: {profile.phone || ""}</p>
            <p>Address: {profile.address || ""}</p>
          </div>
        </aside>

        <form
          onSubmit={handleSubmit}
          className="rounded-[32px] bg-white p-6 shadow-sm"
        >
          <h3 className="text-2xl font-serif text-slate-900">Update profile</h3>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="rounded-2xl border border-slate-200 px-4 py-3"
            />

            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone number"
              className="rounded-2xl border border-slate-200 px-4 py-3"
            />

            <input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Address"
              className="rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2"
            />
          </div>

          <button className="mt-6 rounded-full bg-slate-900 px-5 py-3 text-white">
            Save changes
          </button>
        </form>
        <form
          onSubmit={handleChangePassword}
          className="rounded-[32px] bg-white p-6 shadow-sm"
        >
          <h3 className="text-2xl font-serif text-slate-900">
            Change password
          </h3>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  currentPassword: e.target.value,
                })
              }
              placeholder="Current password"
              className="rounded-2xl border border-slate-200 px-4 py-3"
            />

            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  newPassword: e.target.value,
                })
              }
              placeholder="New password"
              className="rounded-2xl border border-slate-200 px-4 py-3"
            />

            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  confirmPassword: e.target.value,
                })
              }
              placeholder="Confirm password"
              className="rounded-2xl border border-slate-200 px-4 py-3"
            />
          </div>

          <button className="mt-6 rounded-full bg-amber-600 px-5 py-3 text-white">
            Update password
          </button>
        </form>
      </div>
    </section>
  );
}
