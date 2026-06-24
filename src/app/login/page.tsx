"use client";
import React, { useState } from "react";
import "./App.css";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

import { auth, googleProvider } from "@/lib/firebase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);



function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);




  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const ADMIN_EMAIL =
    process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
    "azizurseu@gmail.com";

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  setIsLoading(true);

  try {
      if (isLogin) {
        const userCredential =
          await signInWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
          );

        const email = userCredential.user.email?.toLowerCase();

        if (email !== ADMIN_EMAIL.toLowerCase()) {
          await signOut(auth);

          toast.error(
            "You are not authorized to access the admin panel."
          );

          return;
        }

        toast.success("Welcome Admin!");

        router.push("/admin/dashboard");

    } else {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");

        return;
      }

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

      await updateProfile(userCredential.user, {
        displayName: formData.name,
      });

      toast.success("Account created successfully!");
    }
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Authentication failed");
    }
  } finally {
    setIsLoading(false);
  }
};
const handleGoogleLogin = async () => {
  try {
    setIsLoading(true);

    const result = await signInWithPopup(
      auth,
      googleProvider
    );

    if (result.user.email !== ADMIN_EMAIL) {
      await signOut(auth);

      toast.error(
        "You are not authorized to access the admin panel."
      );

      return;
    }

    toast.success(
      `Welcome ${result.user.displayName || "Admin"}`
    );

    router.push("/admin/dashboard");

  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Authentication failed");
    }
  } finally {
    setIsLoading(false);
  }
};

  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast.error("Please enter your email address first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, formData.email);

      toast.success(
        "Password reset email sent. Please check your inbox."
      );
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to send reset email.");
      }
    }
  };

  const handleTabSwitch = (loginState: boolean) => {
    setIsLogin(loginState);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  

  return (
    <div className="auth-shell flex min-h-screen">
      {/* Brand Panel */}
      <div className="brand-panel flex-[1.2] relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-secondary-light to-secondary">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(229,85,3,0.12)_0%,transparent_60%),radial-gradient(ellipse_at_80%_50%,rgba(255,139,40,0.06)_0%,transparent_50%)]" />
        <div className="absolute inset-0 z-1 opacity-15 bg-[linear-gradient(rgba(229,85,3,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(229,85,3,0.3)_1px,transparent_1px)] bg-[60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] animate-[gridShift_20s_linear_infinite]" />
        <div className="brand-content relative z-2 text-center p-[60px] animate-fadeUp">
          <div className="brand-badge inline-block px-4 py-1.5 border border-primary rounded-full text-[0.7rem] font-semibold tracking-[3px] uppercase text-primary mb-8 opacity-0 animate-[fadeUp_0.8s_ease-out_0.2s_forwards]">EST. 2025</div>
          <h1 className="brand-title font-dm-serif text-4xl sm:text-5xl md:text-[3rem] font-normal leading-tight text-[#f5f5f5] mb-4 tracking-[-1px] opacity-0 animate-[fadeUp_0.8s_ease-out_0.3s_forwards]">
            C<span className="text-primary italic">P</span>L
          </h1>
          <p className="brand-tagline text-[1.05rem] font-light text-[#a3a3a3] tracking-[0.3px] mb-12 opacity-0 animate-[fadeUp_0.8s_ease-out_0.4s_forwards]">
            Building Together. Advancing Without Limits
          </p>
          <div className="brand-metrics flex items-center justify-center gap-8 opacity-0 animate-[fadeUp_0.8s_ease-out_0.5s_forwards]">
            <div className="metric flex flex-col items-center gap-1">
              <span className="metric-value font-dm-serif text-lg text-primary">250+</span>
              <span className="metric-label text-[0.75rem] font-medium text-[#6b6b6b] uppercase tracking-[1.5px]">Projects</span>
            </div>
            <div className="metric-divider w-px h-9 bg-[#2a2a2a]" />
            <div className="metric flex flex-col items-center gap-1">
              <span className="metric-value font-dm-serif text-lg text-primary">98%</span>
              <span className="metric-label text-[0.75rem] font-medium text-[#6b6b6b] uppercase tracking-[1.5px]">On Time</span>
            </div>
            <div className="metric-divider w-px h-9 bg-[#2a2a2a]" />
            <div className="metric flex flex-col items-center gap-1">
              <span className="metric-value font-dm-serif text-lg text-primary">15+</span>
              <span className="metric-label text-[0.75rem] font-medium text-[#6b6b6b] uppercase tracking-[1.5px]">Years</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="form-panel flex-1 flex items-center justify-center bg-[#141414] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,rgba(229,85,3,0.15),transparent)]" />
        <div className="form-container w-full max-w-[400px] p-10 relative">
          {/* Tabs */}
          <div className="tabs flex relative mb-10 bg-[#1a1a1a] rounded-xl p-1 opacity-0 animate-[fadeUp_0.8s_ease-out_0.15s_forwards]" role="tablist">
            <button
              className={`tab flex-1 px-5 py-3 border-none bg-none font-outfit text-[0.9rem] font-medium cursor-pointer transition-colors duration-300 rounded z-2 ${isLogin ? "text-[#f5f5f5]" : "text-[#6b6b6b]"}`}
              onClick={() => handleTabSwitch(true)}
              type="button"
              role="tab"
              aria-selected={isLogin}
            >
              Sign In
            </button>
            <button
              className={`tab flex-1 px-5 py-3 border-none bg-none font-outfit text-[0.9rem] font-medium cursor-pointer transition-colors duration-300 rounded z-2 ${!isLogin ? "text-[#f5f5f5]" : "text-[#6b6b6b]"}`}
              onClick={() => handleTabSwitch(false)}
              type="button"
              role="tab"
              aria-selected={!isLogin}
            >
              Register
            </button>
            <div className={`tab-indicator absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#2a2a2a] rounded-lg transition-transform duration-[450ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] z-1 shadow-md ${isLogin ? "" : "translate-x-[calc(100%+4px)]"}`} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-header mb-7 opacity-0 animate-[fadeUp_0.8s_ease-out_0.2s_forwards]">
              <h2 className="font-dm-serif text-2xl font-normal text-[#f5f5f5] mb-2 tracking-[-0.5px]">{isLogin ? "Welcome back" : "Create account"}</h2>
              <p className="text-[0.9rem] font-light text-[#a3a3a3] leading-relaxed">
                {isLogin
                  ? "Enter your credentials to access your account."
                  : "Fill in the details below to get started."}
              </p>
            </div>

            {!isLogin && (
              <div
                className="input-group flex flex-col mb-5 relative opacity-0 animate-slideUp"
                style={{ animationDelay: "0s" }}
              >
                <label
                  htmlFor="name"
                  className={`absolute top-3.5 left-4 text-[0.9rem] font-normal text-[#6b6b6b] pointer-events-none transition-all duration-250 transform-origin-left font-outfit z-1 ${focusedField === "name" || formData.name ? "top-[-10px] left-3 text-xs font-medium text-primary bg-[#141414] px-1.5 z-2" : ""}`}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  required={!isLogin}
                  autoComplete="name"
                  className="w-full py-3.5 px-4 bg-transparent border border-[rgba(255,255,255,0.06)] rounded-lg font-outfit text-[0.95rem] font-normal text-[#f5f5f5] transition-all duration-250 outline-none hover:border-[rgba(255,255,255,0.12)]"
                />
              </div>
            )}

            <div
              className="input-group flex flex-col mb-5 relative opacity-0 animate-slideUp"
              style={{ animationDelay: "0.05s" }}
            >
              <label
                htmlFor="email"
                className={`absolute top-3.5 left-4 text-[0.9rem] font-normal text-[#6b6b6b] pointer-events-none transition-all duration-250 transform-origin-left font-outfit z-1 ${focusedField === "email" || formData.email ? "top-[-10px] left-3 text-xs font-medium text-primary bg-[#141414] px-1.5 z-2" : ""}`}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                required
                autoComplete="email"
                className="w-full py-3.5 px-4 bg-transparent border border-[rgba(255,255,255,0.06)] rounded-lg font-outfit text-[0.95rem] font-normal text-[#f5f5f5] transition-all duration-250 outline-none hover:border-[rgba(255,255,255,0.12)]"
              />
            </div>

            <div
              className="input-group flex flex-col mb-5 relative opacity-0 animate-slideUp"
              style={{ animationDelay: "0.1s" }}
            >
              <label
                htmlFor="password"
                className={`absolute top-3.5 left-4 text-[0.9rem] font-normal text-[#6b6b6b] pointer-events-none transition-all duration-250 transform-origin-left font-outfit z-1 ${focusedField === "password" || formData.password ? "top-[-10px] left-3 text-xs font-medium text-primary bg-[#141414] px-1.5 z-2" : ""}`}
              >
                Password
              </label>
              <div className="password-wrapper relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  required
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  className="w-full py-3.5 px-4 bg-transparent border border-[rgba(255,255,255,0.06)] rounded-lg font-outfit text-[0.95rem] font-normal text-[#f5f5f5] transition-all duration-250 outline-none hover:border-[rgba(255,255,255,0.12)] pr-11 focus:border-primary focus:shadow-[0_0_0_3px_rgba(229,85,3,0.15)]"
                />
                <button
                  type="button"
                  className="password-toggle absolute right-3 bg-none border-none text-[#6b6b6b] cursor-pointer p-1 flex items-center justify-center transition-colors duration-200 hover:text-primary"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div
                className="input-group flex flex-col mb-5 relative opacity-0 animate-slideUp"
                style={{ animationDelay: "0.15s" }}
              >
                <label
                  htmlFor="confirmPassword"
                  className={`absolute top-3.5 left-4 text-[0.9rem] font-normal text-[#6b6b6b] pointer-events-none transition-all duration-250 transform-origin-left font-outfit z-1 ${focusedField === "confirmPassword" || formData.confirmPassword ? "top-[-10px] left-3 text-xs font-medium text-primary bg-[#141414] px-1.5 z-2" : ""}`}
                >
                  Confirm Password
                </label>
                <div className="password-wrapper relative flex items-center">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => setFocusedField(null)}
                    required={!isLogin}
                    autoComplete="new-password"
                    className="w-full py-3.5 px-4 bg-transparent border border-[rgba(255,255,255,0.06)] rounded-lg font-outfit text-[0.95rem] font-normal text-[#f5f5f5] transition-all duration-250 outline-none hover:border-[rgba(255,255,255,0.12)] pr-11 focus:border-primary focus:shadow-[0_0_0_3px_rgba(229,85,3,0.15)]"
                  />
                  <button
                    type="button"
                    className="password-toggle absolute right-3 bg-none border-none text-[#6b6b6b] cursor-pointer p-1 flex items-center justify-center transition-colors duration-200 hover:text-primary"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label="Toggle confirm password visibility"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>
            )}

            {isLogin && (
              <div
                className="forgot-password text-right mt-[-0.625rem] mb-6 opacity-0 animate-slideUp"
                style={{ animationDelay: "0.2s" }}
              >
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="forgot-password-btn"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className={`submit-btn w-full py-3.5 bg-primary text-[#0c0c0c] border-none rounded-lg font-outfit text-[0.95rem] font-semibold cursor-pointer transition-all duration-250 flex justify-center items-center h-12 tracking-[0.3px] opacity-0 animate-slideUp hover:bg-primary-light hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(229,85,3,0.15)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed ${isLoading ? "bg-[#2a2a2a]" : ""}`}
              disabled={isLoading}
              style={{ animationDelay: "0.25s" }}
            >
              {isLoading ? (
                <span className="spinner w-[22px] h-[22px] border-2 border-[rgba(12,12,12,0.15)] rounded-full border-t-[#0c0c0c] animate-spin" />
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="divider flex items-center gap-4 my-6 opacity-0 animate-slideUp" style={{ animationDelay: "0.3s" }}>
            <span className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
            <span className="text-[0.8rem] text-[#6b6b6b] font-normal whitespace-nowrap">or continue with</span>
            <span className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="social-btn flex items-center justify-center gap-2.5 w-full py-3 bg-transparent border border-[rgba(255,255,255,0.06)] rounded-lg font-outfit text-[0.9rem] font-medium text-[#a3a3a3] cursor-pointer transition-all duration-250 opacity-0 animate-slideUp hover:border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.03)] hover:text-[#f5f5f5] active:scale-95"
            style={{ animationDelay: "0.35s" }}
          >
            <GoogleIcon />
            <span>
              {isLogin ? "Sign in with Google" : "Sign up with Google"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <AuthForm />;
}