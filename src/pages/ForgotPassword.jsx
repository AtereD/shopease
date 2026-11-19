import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleForgotPassword = async (e) => {
  e.preventDefault()

  setLoading(true)
  setError("")
  setSuccess(false)

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  });

  setLoading(false)

  if (error) {
    setError(error.message);
    toast.error(error.message);
    return
  }

  setSuccess(true)
  toast.success("Password reset instructions sent!")
}

  return (
    <section className="flex flex-col items-center justify-center px-5 py-16 min-h-screen">
      {/* LOGO */}
      <div className="text-center self-baseline mb-8">
        <Link to="/">
          <p className="text-lg font-bold text-charcoal">
            <span className="text-electric-blue">Shop</span>Ease
          </p>
        </Link>
      </div>

      <div className="w-full max-w-md border border-border rounded-2xl p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-charcoal">
            Forgot Password?
          </h1>
          <p className="text-muted-grey text-sm mt-2">
            Enter your email address and we'll send you a password reset link.
          </p>
        </div>

        <form onSubmit={handleForgotPassword} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              required
              className="w-full border border-border rounded-lg px-4 py-3 outline-none focus:border-electric-blue"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {success && (
            <p className="text-sm text-green-600">
              Password reset instructions have been sent to your email.
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn primary-btn w-full disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-sm text-center text-muted-grey mt-6">
          Remember your password?{" "}
          <Link to="/signin" className="text-electric-blue font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;