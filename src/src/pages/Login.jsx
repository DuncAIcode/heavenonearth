
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            if (isSignUp) {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                setMessage({ type: 'success', text: 'Account created! Please check your email to verify.' });
            } else {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                setMessage({ type: 'success', text: 'Welcome back!' });
                setTimeout(() => navigate('/'), 1500);
            }
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-heaven-dark via-heaven-forest/10 to-heaven-dark" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md bg-heaven-dark/80 backdrop-blur-xl border border-heaven-emerald/20 p-8 rounded-2xl shadow-2xl shadow-heaven-emerald/10"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif text-heaven-starlight mb-2">
                        {isSignUp ? 'Join the Void' : 'Welcome Back'}
                    </h2>
                    <p className="text-heaven-starlight/60 text-sm">
                        {isSignUp ? 'Begin your journey into the unknown.' : 'Enter your credentials to access.'}
                    </p>
                </div>

                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mb-6 p-4 rounded-lg text-sm border ${message.type === 'error'
                                ? 'bg-red-900/20 border-red-500/50 text-red-200'
                                : 'bg-heaven-emerald/20 border-heaven-emerald/50 text-heaven-emerald'
                            }`}
                    >
                        {message.text}
                    </motion.div>
                )}

                <form onSubmit={handleAuth} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-heaven-emerald mb-2">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-heaven-dark/50 border border-heaven-starlight/10 rounded-lg px-4 py-3 text-heaven-starlight focus:outline-none focus:border-heaven-emerald transition-colors"
                            placeholder="you@domain.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-heaven-emerald mb-2">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-heaven-dark/50 border border-heaven-starlight/10 rounded-lg px-4 py-3 text-heaven-starlight focus:outline-none focus:border-heaven-emerald transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-heaven-emerald text-heaven-dark font-medium py-3 rounded-lg tracking-widest hover:bg-heaven-accent transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'PROCESSING...' : (isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN')}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setMessage(null);
                        }}
                        className="text-sm text-heaven-starlight/40 hover:text-heaven-emerald transition-colors underline decoration-dotted underline-offset-4"
                    >
                        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
