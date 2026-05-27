"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  User,
  ShoppingBag,
  Lock,
  LogOut,
  ChevronRight,
  Eye,
  EyeOff,
  Package,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
} from "lucide-react";
import { defaultGeneralInfo } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectAuthUser, setUser, clearUser } from "@/store/slices/authSlice";
import { authService } from "@/lib/api/authService";
import api from "@/lib/api/client";

const inputClass =
  "w-full rounded-lg border border-[#D8E4F2] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0B5FAE] focus:ring-2 focus:ring-[#0B5FAE]/10";

const ORDER_STATUS = {
  0: { label: "Pending", color: "text-amber-600 bg-amber-50", Icon: Clock },
  1: { label: "Processing", color: "text-blue-600 bg-blue-50", Icon: Package },
  2: { label: "Shipped", color: "text-purple-600 bg-purple-50", Icon: Truck },
  3: { label: "Delivered", color: "text-green-600 bg-green-50", Icon: CheckCircle },
  5: { label: "Cancelled", color: "text-red-600 bg-red-50", Icon: XCircle },
};

const PAYMENT_STATUS = {
  0: { label: "Unpaid", color: "text-red-600 bg-red-50" },
  1: { label: "Paid", color: "text-green-600 bg-green-50" },
};

// ─── Tab: Profile Info ────────────────────────────────────────────────────────
function ProfileInfo({ user }) {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      address: String(fd.get("address") || "").trim(),
    };

    try {
      const res = await api.put("/auth/profile", data);
      const updated = res.data?.user ?? user;
      dispatch(setUser(updated));
      setSuccess("Profile updated successfully.");
      setIsEditing(false);
    } catch (err) {
      setError(err?.data?.message || err?.message || "Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#071B3A]">My Profile</h2>
        <button
          onClick={() => { setIsEditing((e) => !e); setError(""); setSuccess(""); }}
          className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-slate-50"
          style={{ borderColor: defaultGeneralInfo.primary_color, color: defaultGeneralInfo.primary_color }}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Avatar Row */}
      <div className="mb-6 flex items-center gap-4">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white"
          style={{ backgroundColor: defaultGeneralInfo.primary_color }}
        >
          {(user?.name || "U")[0].toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-[#071B3A]">{user?.name || "—"}</p>
          <p className="text-sm text-[#64748B]">{user?.email || "—"}</p>
        </div>
      </div>

      {success && (
        <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">{success}</div>
      )}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
      )}

      {isEditing ? (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#071B3A]">Full Name</label>
            <input name="name" type="text" required defaultValue={user?.name || ""} className={inputClass} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#071B3A]">Phone</label>
            <input name="phone" type="tel" defaultValue={user?.phone || ""} className={inputClass} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#071B3A]">Address</label>
            <textarea name="address" rows={3} defaultValue={user?.address || ""} className={inputClass} />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            style={{ backgroundColor: defaultGeneralInfo.button_primary_color }}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      ) : (
        <div className="divide-y divide-[#F1F5F9] rounded-xl border border-[#E8EEF6]">
          {[
            { label: "Full Name", value: user?.name },
            { label: "Email", value: user?.email },
            { label: "Phone", value: user?.phone },
            { label: "Address", value: user?.address },
            { label: "Member Since", value: user?.created_at ? new Date(user.created_at).toLocaleDateString("en-BD") : undefined },
          ].map(({ label, value }) => (
            <div key={label} className="flex px-4 py-3">
              <span className="w-36 shrink-0 text-sm text-[#64748B]">{label}</span>
              <span className="text-sm font-medium text-[#071B3A]">{value || "—"}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Tab: Purchase History ────────────────────────────────────────────────────
function PurchaseHistory() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/orders?per_page=20")
      .then((res) => setOrders(res.data?.data ?? res.data ?? []))
      .catch((err) => setError(err?.data?.message || "Failed to load orders."))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0B5FAE] border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>;
  }

  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-[#071B3A]">Purchase History</h2>

      {orders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#D8E4F2] p-10 text-center">
          <ShoppingBag className="mx-auto mb-3 text-[#CBD5E1]" size={40} />
          <p className="text-sm text-[#64748B]">You have no orders yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#E8EEF6]">
          <table className="min-w-full text-sm">
            <thead className="bg-[#F8FAFC]">
              <tr>
                {["Order No", "Date", "Items", "Total", "Delivery", "Payment", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {orders.map((order) => {
                const status = ORDER_STATUS[order.order_status] ?? ORDER_STATUS[0];
                const payment = PAYMENT_STATUS[order.payment_status] ?? PAYMENT_STATUS[0];
                return (
                  <tr key={order.id} className="hover:bg-[#F8FAFC]">
                    <td className="px-4 py-3 font-medium text-[#071B3A]">{order.order_no || `#${order.id}`}</td>
                    <td className="px-4 py-3 text-[#64748B]">
                      {order.order_date ? new Date(order.order_date).toLocaleDateString("en-BD") : "—"}
                    </td>
                    <td className="px-4 py-3 text-[#64748B]">{order.order_details_count ?? order.orderDetails?.length ?? "—"}</td>
                    <td className="px-4 py-3 font-semibold text-[#071B3A]">
                      ৳{Number(order.total ?? 0).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${status.color}`}>
                        <status.Icon size={12} />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${payment.color}`}>
                        {payment.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <ChevronRight size={16} className="text-[#94A3B8]" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Tab: Change Password ─────────────────────────────────────────────────────
function ChangePassword() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const fd = new FormData(e.currentTarget);
    const current = String(fd.get("current_password") || "");
    const newPass = String(fd.get("password") || "");
    const confirm = String(fd.get("password_confirmation") || "");

    if (newPass !== confirm) {
      setError("New passwords do not match.");
      return;
    }
    if (newPass.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    try {
      await api.put("/auth/profile", {
        current_password: current,
        password: newPass,
        password_confirmation: confirm,
      });
      setSuccess("Password changed successfully.");
      e.target.reset();
    } catch (err) {
      setError(err?.data?.message || err?.message || "Failed to change password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-[#071B3A]">Change Password</h2>

      {success && (
        <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">{success}</div>
      )}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
      )}

      <form className="max-w-md space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#071B3A]">Current Password</label>
          <div className="relative">
            <input name="current_password" type={showCurrent ? "text" : "password"} required className={`${inputClass} pr-11`} placeholder="Your current password" />
            <button type="button" onClick={() => setShowCurrent((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">
              {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#071B3A]">New Password</label>
          <div className="relative">
            <input name="password" type={showNew ? "text" : "password"} required minLength={6} className={`${inputClass} pr-11`} placeholder="At least 6 characters" />
            <button type="button" onClick={() => setShowNew((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#071B3A]">Confirm New Password</label>
          <input name="password_confirmation" type="password" required className={inputClass} placeholder="Re-enter new password" />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          style={{ backgroundColor: defaultGeneralInfo.button_primary_color }}
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

// ─── Main Profile Page ────────────────────────────────────────────────────────
const TABS = [
  { id: "profile", label: "My Profile", Icon: User },
  { id: "orders", label: "Purchase History", Icon: ShoppingBag },
  { id: "password", label: "Change Password", Icon: Lock },
];

export function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "profile");
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await authService.logout();
    } finally {
      dispatch(clearUser());
      router.push("/login");
    }
  };

  return (
    <section className="container py-8">
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            {/* User summary */}
            <div className="mb-4 flex items-center gap-3 rounded-xl p-3" style={{ backgroundColor: `${defaultGeneralInfo.primary_color}10` }}>
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white"
                style={{ backgroundColor: defaultGeneralInfo.primary_color }}
              >
                {(user?.name || "U")[0].toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#071B3A]">{user?.name || "User"}</p>
                <p className="truncate text-xs text-[#64748B]">{user?.email || ""}</p>
              </div>
            </div>

            <nav className="space-y-1">
              {TABS.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={[
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                    activeTab === id
                      ? "text-white"
                      : "text-[#475569] hover:bg-[#F1F5F9]",
                  ].join(" ")}
                  style={
                    activeTab === id
                      ? { backgroundColor: defaultGeneralInfo.primary_color }
                      : {}
                  }
                >
                  <Icon size={17} />
                  {label}
                </button>
              ))}

              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-60"
              >
                <LogOut size={17} />
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-3">
          {activeTab === "profile" && <ProfileInfo user={user} />}
          {activeTab === "orders" && <PurchaseHistory />}
          {activeTab === "password" && <ChangePassword />}
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
