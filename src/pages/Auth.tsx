import { useState, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft, Check, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Mode = "login" | "signup" | "forgot";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getPasswordChecks = (password: string) => [
  { label: "At least 8 characters", met: password.length >= 8 },
  { label: "Uppercase letter", met: /[A-Z]/.test(password) },
  { label: "Lowercase letter", met: /[a-z]/.test(password) },
  { label: "Number", met: /\d/.test(password) },
  { label: "Special character", met: /[^A-Za-z0-9]/.test(password) },
];

const Auth = () => {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { signIn, signUp, resetPassword } = useAuth();
  const navigate = useNavigate();

  const emailValid = emailRegex.test(email.trim());
  const passwordChecks = useMemo(() => getPasswordChecks(password), [password]);
  const passwordScore = passwordChecks.filter((c) => c.met).length;
  const passwordStrengthPercent = (passwordScore / passwordChecks.length) * 100;
  const passwordLabel =
    passwordScore <= 1 ? "Weak" : passwordScore <= 3 ? "Fair" : passwordScore === 4 ? "Good" : "Strong";
  const passwordColor =
    passwordScore <= 1
      ? "bg-destructive"
      : passwordScore <= 3
      ? "bg-[hsl(var(--accent))]"
      : "bg-[hsl(var(--jimmy-green))]";

  const signupValid = name.trim().length > 0 && emailValid && passwordScore >= 4;
  const loginValid = emailValid && password.length >= 1;
  const forgotValid = emailValid;

  const isFormValid = mode === "signup" ? signupValid : mode === "login" ? loginValid : forgotValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setSubmitting(true);

    if (mode === "forgot") {
      const { error } = await resetPassword(email.trim());
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Check your email", description: "We've sent you a password reset link." });
        setMode("login");
      }
      setSubmitting(false);
      return;
    }

    if (mode === "login") {
      const { error } = await signIn(email.trim(), password);
      if (error) {
        toast({ title: "Login failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Welcome back!" });
        navigate("/");
      }
    } else {
      const { error } = await signUp(email.trim(), password, name.trim());
      if (error) {
        toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Welcome!", description: "Your account has been created successfully." });
        navigate("/");
      }
    }
    setSubmitting(false);
  };

  return (
    <MainLayout>
      <section className="flex min-h-[60vh] items-center justify-center bg-secondary py-12">
        <div className="w-full max-w-md rounded-md bg-background p-8 shadow-strong">
          <div className="mb-6 text-center">
            {mode === "forgot" && (
              <button
                onClick={() => setMode("login")}
                className="mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" /> Back to login
              </button>
            )}
            <h1 className="text-2xl font-bold text-foreground">
              {mode === "login" ? "Welcome Back" : mode === "signup" ? "Create Account" : "Reset Password"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "login"
                ? "Sign in to your Jimmy Africa account"
                : mode === "signup"
                ? "Join Jimmy Africa for the best deals"
                : "Enter your email and we'll send you a reset link"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                    className="pl-10"
                    maxLength={100}
                  />
                </div>
                {touched.name && name.trim().length === 0 && (
                  <p className="text-xs text-destructive">Name is required</p>
                )}
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  className="pl-10"
                  required
                  maxLength={255}
                />
              </div>
              {touched.email && email.trim().length > 0 && !emailValid && (
                <p className="text-xs text-destructive">Please enter a valid email address</p>
              )}
            </div>

            {mode !== "forgot" && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={() => setMode("forgot")}
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {mode === "signup" && password.length > 0 && (
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full transition-all duration-300 ${passwordColor}`}
                          style={{ width: `${passwordStrengthPercent}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">{passwordLabel}</span>
                    </div>
                    <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                      {passwordChecks.map((check) => (
                        <li key={check.label} className="flex items-center gap-1 text-xs">
                          {check.met ? (
                            <Check className="h-3 w-3 text-[hsl(var(--jimmy-green))]" />
                          ) : (
                            <X className="h-3 w-3 text-muted-foreground" />
                          )}
                          <span className={check.met ? "text-foreground" : "text-muted-foreground"}>
                            {check.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <Button
              type="submit"
              className="w-full rounded-sm bg-primary font-bold text-primary-foreground hover:bg-primary/90"
              disabled={submitting || !isFormValid}
            >
              {submitting
                ? "Please wait…"
                : mode === "login"
                ? "Sign In"
                : mode === "signup"
                ? "Create Account"
                : "Send Reset Link"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button onClick={() => setMode("signup")} className="font-semibold text-primary hover:underline">
                  Sign Up
                </button>
              </>
            ) : mode === "signup" ? (
              <>
                Already have an account?{" "}
                <button onClick={() => setMode("login")} className="font-semibold text-primary hover:underline">
                  Sign In
                </button>
              </>
            ) : null}
          </p>
        </div>
      </section>
    </MainLayout>
  );
};

export default Auth;
