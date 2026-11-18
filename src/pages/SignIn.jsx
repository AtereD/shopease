import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { toast } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  setLoading(false);

  if (error) {
    setError(error.message);
    return;
  }

  if (data.user) {
    toast.success("Welcome back!");
    navigate("/");
  }
};

  return (
    <section className="flex flex-col items-center justify-center px-5 md:py-16 h-screen ">
      {/* LOGO */}
      <div className="text-center  mb-8 shrink-0">
        <Link to="/">
          <p className="text-lg font-bold text-charcoal">
            <span className="text-electric-blue">Shop</span>Ease
          </p>
        </Link>
      </div>

      {/* SIGN IN FORM */}
      <div className="w-full max-w-md border border-border rounded-2xl p-6 md:p-8">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-charcoal">
            Welcome Back!
          </h1>
          <p className="text-muted-grey text-sm mt-2">
            Sign in to continue shopping.
          </p>
        </div>

        <form onSubmit={handleSignIn} className="flex flex-col gap-5">

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full border border-border rounded-lg px-4 py-3 outline-none focus:border-electric-blue"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
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
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        <p className="text-sm text-center text-muted-grey mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-electric-blue font-semibold">
            Create Account
          </Link>
        </p>

      </div>
    </section>
  );
};

export default SignIn;