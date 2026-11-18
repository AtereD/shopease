import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { toast } from "react-toastify";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getEmailLink = (email) => {
    const domain = email.split("@")[1]?.toLowerCase();

    const emailProviders = {
      "gmail.com": "https://mail.google.com",
      "outlook.com": "https://outlook.live.com",
      "hotmail.com": "https://outlook.live.com",
      "yahoo.com": "https://mail.yahoo.com",
    };

    return emailProviders[domain] || "mailto:";
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session) {
      const message = "Your account has been created successfully!";
      setSuccess(message);
      toast.success(message);
    } else {
      const message =
        "Account created! Please check your email to verify your account.";

      setSuccess(message);

      toast.success(
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-charcoal">Check your email!</p>

            <p className="text-sm text-muted-grey mt-1">
              We've sent a verification link to {email}. Please verify your
              account to get started.
            </p>
          </div>

          <a
            href={getEmailLink(email)}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-electric-blue text-white py-2 rounded-lg text-sm font-medium"
          >
            Open Email
          </a>
        </div>,
        {
          autoClose: false,
          closeOnClick: false,
        },
      );
    }
  };

  return (
    <section className="flex flex-col items-center justify-center px-5 md:py-16 h-screen">
      <div className="text-center shrink-0 mb-8">
        <Link to="/">
          <p className="text-lg font-bold text-charcoal">
            <span className="text-electric-blue">Shop</span>Ease
          </p>
        </Link>
      </div>
      <div className="w-full max-w-md border border-border rounded-2xl p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-charcoal">
            Create an Account
          </h1>
          <p className="text-muted-grey text-sm mt-2">
            Join ShopEase and start shopping.
          </p>
        </div>

        <form onSubmit={handleSignUp} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="w-full border border-border rounded-lg px-4 py-3 outline-none focus:border-electric-blue"
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              minLength={6}
              className="w-full border border-border rounded-lg px-4 py-3 outline-none focus:border-electric-blue"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          {success && <p className="text-sm text-green-600">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn primary-btn w-full disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-center text-muted-grey mt-6">
          Already have an account?{" "}
          <Link to="/signin" className="text-electric-blue font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
