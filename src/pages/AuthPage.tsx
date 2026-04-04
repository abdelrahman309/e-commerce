import { useState } from "react";
import { login, signup, User } from "@/lib/store";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User as UserIcon, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface AuthPageProps {
  onAuth: (user: User) => void;
}

const AuthPage = ({ onAuth }: AuthPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const user = isLogin ? login(email, password) : signup(email, password, name);
      onAuth(user);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8 transition">
          <ArrowLeft className="h-4 w-4" /> Back to store
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{isLogin ? "Welcome back" : "Create account"}</h1>
          <p className="text-muted-foreground mt-1">
            {isLogin ? "Sign in to your TechNova account" : "Join TechNova for the best tech deals"}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex rounded-xl bg-secondary p-1 mb-6">
            <button
              onClick={() => { setIsLogin(true); setError(""); }}
              className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${isLogin ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(""); }}
              className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${!isLogin ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative animate-fade-in">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-secondary pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition" required />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-secondary pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition" required />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border bg-secondary pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition" required />
            </div>

            {error && <p className="text-destructive text-sm animate-fade-in">{error}</p>}

            <button type="submit" className="btn-primary w-full">
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
