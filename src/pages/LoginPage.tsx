import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const success = await login(email, motDePasse);
    if (success) navigate('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <h1 className="font-display text-2xl text-brass-light mb-1">Korumm</h1>
        <p className="font-mono text-xs text-slate uppercase tracking-wider mb-8">Espace organisateur</p>

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

        {error && <p className="text-brick text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-brass text-ink font-medium hover:bg-brass-light transition-colors disabled:opacity-50"
        >
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}