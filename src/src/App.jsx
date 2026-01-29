
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Sustainability from './pages/Sustainability';
import EcoConsciousness from './pages/EcoConsciousness';
import Community from './pages/Community';
import Admin from './pages/Admin';
import ManagePosts from './pages/ManagePosts';
import MyStory from './pages/MyStory';
import Why from './pages/Why';
import Future from './pages/Future';
import Regenerative from './pages/Regenerative';
import Wellness from './pages/Wellness';
import DigitalOasis from './pages/DigitalOasis';
import Properties from './pages/Properties';
import { supabase } from './lib/supabase';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!supabase) {
      setError('Supabase connection failed. Please check if VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set correctly in Vercel settings.');
      setLoading(false);
      return;
    }

    try {
      // Check active sessions and subscribe to changes
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setLoading(false);
      }).catch(err => {
        console.error('Auth error:', err);
        setError(err.message || 'Failed to initialize authentication');
        setLoading(false);
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => subscription.unsubscribe();
    } catch (err) {
      console.error('Supabase initialization error:', err);
      setError(err.message || 'Failed to connect to backend services');
      setLoading(false);
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-heaven-dark flex items-center justify-center p-8">
        <div className="max-w-md text-center space-y-4">
          <div className="text-red-500 text-2xl mb-4">⚠️ Configuration Error</div>
          <div className="text-heaven-light/70 text-sm">{error}</div>
          <div className="text-heaven-light/50 text-xs mt-6">
            Please check your environment variables and try again.
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-heaven-dark flex items-center justify-center">
        <div className="text-heaven-emerald animate-pulse tracking-[0.3em] uppercase text-sm">Initializing Void...</div>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <Layout session={session}>
        <Routes>
          <Route path="/login" element={!session ? <Login /> : <Navigate to="/" />} />
          <Route path="/" element={session ? <Home /> : <Navigate to="/login" />} />
          <Route path="/blog" element={session ? <Blog /> : <Navigate to="/login" />} />
          <Route path="/blog/:id" element={session ? <BlogPost /> : <Navigate to="/login" />} />
          <Route path="/sustainability" element={session ? <Sustainability /> : <Navigate to="/login" />} />
          <Route path="/eco-consciousness" element={session ? <EcoConsciousness /> : <Navigate to="/login" />} />
          <Route path="/community" element={session ? <Community /> : <Navigate to="/login" />} />
          <Route path="/admin" element={session ? <Admin /> : <Navigate to="/login" />} />
          <Route path="/admin/manage" element={session ? <ManagePosts /> : <Navigate to="/login" />} />
          <Route path="/my-story" element={session ? <MyStory /> : <Navigate to="/login" />} />
          <Route path="/why" element={session ? <Why /> : <Navigate to="/login" />} />
          <Route path="/future" element={session ? <Future /> : <Navigate to="/login" />} />
          <Route path="/regenerative" element={session ? <Regenerative /> : <Navigate to="/login" />} />
          <Route path="/wellness" element={session ? <Wellness /> : <Navigate to="/login" />} />
          <Route path="/digital-oasis" element={session ? <DigitalOasis /> : <Navigate to="/login" />} />
          <Route path="/properties" element={session ? <Properties /> : <Navigate to="/login" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
