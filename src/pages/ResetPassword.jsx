import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      toast.error(error.message);
      return;
    }

    toast.success("Your password has been updated!");
    navigate("/");
  };

  return (
    <section className="flex flex-col items-center justify-center px-5 py-16 min-h-screen">
      {/* LOGO */}
      <Link to="/" className="mb-8">
        <p className="text-xl font-bold text-charcoal">
          <span className="text-electric-blue">Shop</span>Ease
        </p>
      </Link>

      <div className="w-full max-w-md border border-border rounded-2xl p-6 md:p-8">
        <h1 className="text-2xl font-bold text-charcoal mb-2">
          Reset Password
        </h1>

        <p className="text-sm text-muted-grey mb-6">
          Enter and confirm your new password below.
        </p>

        <form
          onSubmit={handleResetPassword}
          className="flex flex-col gap-5"
        >
          <div>
            <label className="block text-sm font-medium mb-2">
              New Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
              className="w-full border border-border rounded-lg px-4 py-3 outline-none focus:border-electric-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm New Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              className="w-full border border-border rounded-lg px-4 py-3 outline-none focus:border-electric-blue"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn primary-btn w-full disabled:opacity-60"
          >
            {loading ? "Updating Password..." : "Update Password"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;