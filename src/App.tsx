import { BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useState } from "react";
import { useEvents } from "./hooks/useEvents";
import { useAuth } from "./hooks/useAuth";
import { EventCard } from "./components/EventCard";

function EventsListPage() {
  const { events, loading, error } = useEvents();

  if (loading) {
    return <div className="p-8 font-body text-slate">Chargement des événements…</div>;
  }

  if (error) {
    return <div className="p-8 font-body text-brick">{error}</div>;
  }

  if (events.length === 0) {
    return (
      <div className="p-8 font-body text-slate">
        Aucun événement publié pour l'instant.
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl text-brass-light mb-6">
        Événements à venir
      </h1>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

function LoginPage() {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const success = await login(email, motDePasse);
    if (success) {
      navigate("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <h1 className="font-display text-2xl text-brass-light mb-1">Korumm</h1>
        <p className="font-mono text-xs text-slate uppercase tracking-wider mb-8">
          Espace Organisateur
        </p>

        <label className="block text-sm text-dune mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-3 py-2 rounded bg-[#1D2238] border border-[#2C3350] text-dune focus:outline-none focus:border-brass"
        />

        <label className="block text-sm text-dune mb-1">Mot de passe</label>
        <input
          type="password"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          required
          className="w-full mb-6 px-3 py-2 rounded bg-[#1D2238] border border-[#2C3350] text-dune focus:outline-none focus:border-brass"
        />

        {error && <p className="text-sm text-brick mb-4">{error}</p>}
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-brass text-ink font-medium hover:bg-brass-light transition-colors disabled:opacity-50"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}

function DashboardPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-2xl text-brass-light">Dashboard Organisateur</h1>
        <button
          onClick={handleLogout}
          className="font-mono text-sm text-slate hover:text-brick transition-colors"
        >
          Se déconnecter
        </button>
      </div>
      <p className="text-slate">Contenu à venir</p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EventsListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;