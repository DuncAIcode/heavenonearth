import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    ArrowLeft,
    Eye,
    EyeOff,
    Calendar,
    Hash,
    Image as ImageIcon,
    Loader2,
    Search,
    Filter
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';

const ManagePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionId, setActionId] = useState(null); // Tracking which post is being toggled
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPosts(data || []);
        } catch (err) {
            console.error('Error fetching posts:', err);
        } finally {
            setLoading(false);
        }
    };

    const toggleVisibility = async (id, currentState) => {
        setActionId(id);
        try {
            const { error } = await supabase
                .from('posts')
                .update({ is_visible: !currentState })
                .eq('id', id);

            if (error) throw error;

            // Optimistic update
            setPosts(prev => prev.map(post =>
                post.id === id ? { ...post, is_visible: !currentState } : post
            ));
        } catch (err) {
            console.error('Error toggling visibility:', err);
        } finally {
            setActionId(null);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-heaven-dark text-heaven-starlight p-6 pt-24">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/admin"
                            className="p-3 bg-heaven-dark/50 border border-white/10 rounded-xl hover:border-heaven-emerald/50 transition-colors text-heaven-starlight/60 hover:text-heaven-emerald"
                        >
                            <ArrowLeft size={24} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-serif">Chronicle Management</h1>
                            <p className="text-heaven-starlight/40 text-xs uppercase tracking-[0.3em] mt-1">Curate the Manifestations</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-heaven-starlight/20" />
                            <input
                                type="text"
                                placeholder="Search archives..."
                                className="bg-heaven-dark/40 border border-white/5 rounded-full py-2.5 pl-11 pr-6 text-xs focus:border-heaven-emerald/40 focus:outline-none transition-all w-64 placeholder:text-heaven-starlight/10"
                            />
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-heaven-dark/20 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl mb-8">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-heaven-dark/40">
                                    <th className="px-8 py-5 text-[10px] uppercase tracking-[0.4em] font-bold text-heaven-emerald/60">Story Visual</th>
                                    <th className="px-8 py-5 text-[10px] uppercase tracking-[0.4em] font-bold text-heaven-emerald/60">Identity & Title</th>
                                    <th className="px-8 py-5 text-[10px] uppercase tracking-[0.4em] font-bold text-heaven-emerald/60">Manifested On</th>
                                    <th className="px-8 py-5 text-[10px] uppercase tracking-[0.4em] font-bold text-heaven-emerald/60">Sanctuary Status</th>
                                    <th className="px-8 py-5 text-[10px] uppercase tracking-[0.4em] font-bold text-heaven-emerald/60 text-right">Rituals</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <Loader2 className="animate-spin text-heaven-emerald" size={32} />
                                                <span className="text-xs uppercase tracking-widest text-heaven-starlight/20">Consulting the Records...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : posts.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-20 text-center">
                                            <span className="text-heaven-starlight/20 font-serif italic text-lg">No stories have been manifested yet.</span>
                                        </td>
                                    </tr>
                                ) : (
                                    posts.map((post) => (
                                        <motion.tr
                                            key={post.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="hover:bg-heaven-emerald/5 transition-colors group"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="relative w-20 aspect-video rounded-lg overflow-hidden border border-white/10 shadow-lg">
                                                    <img
                                                        src={post.image_url}
                                                        alt={post.title}
                                                        className={`w-full h-full object-cover transition-all duration-500 ${!post.is_visible ? 'grayscale opacity-50' : 'group-hover:scale-110'}`}
                                                        onError={(e) => {
                                                            if (e.target.dataset.triedFallback) return;
                                                            e.target.dataset.triedFallback = 'true';
                                                            e.target.src = 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1350&q=80';
                                                        }}
                                                    />
                                                    {!post.is_visible && (
                                                        <div className="absolute inset-0 bg-heaven-dark/60 flex items-center justify-center">
                                                            <EyeOff size={14} className="text-heaven-starlight/40" />
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-serif text-heaven-starlight mb-1 group-hover:text-heaven-emerald transition-colors">{post.title}</span>
                                                    <div className="flex items-center gap-2 text-[10px] font-mono text-heaven-starlight/30 uppercase tracking-tighter">
                                                        <Hash size={10} />
                                                        {post.id.split('-')[0]}...
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-xs text-heaven-starlight/60">
                                                    <Calendar size={14} className="text-heaven-emerald/40" />
                                                    {formatDate(post.created_at)}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${post.is_visible ? 'bg-heaven-emerald animate-pulse' : 'bg-red-500/40'}`} />
                                                    <span className={`text-[10px] uppercase font-bold tracking-widest ${post.is_visible ? 'text-heaven-emerald' : 'text-heaven-starlight/30'}`}>
                                                        {post.is_visible ? 'Visible' : 'Hidden'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button
                                                    onClick={() => toggleVisibility(post.id, post.is_visible)}
                                                    disabled={actionId === post.id}
                                                    className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${post.is_visible
                                                        ? 'bg-red-500/10 text-red-200 border border-red-500/20 hover:bg-red-500/30'
                                                        : 'bg-heaven-emerald/10 text-heaven-emerald border border-heaven-emerald/20 hover:bg-heaven-emerald/30'
                                                        }`}
                                                >
                                                    {actionId === post.id ? (
                                                        <Loader2 className="animate-spin" size={14} />
                                                    ) : post.is_visible ? (
                                                        <>
                                                            <EyeOff size={14} />
                                                            Hide Story
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Eye size={14} />
                                                            Manifest
                                                        </>
                                                    )}
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer Insight */}
                <div className="flex items-center justify-between text-[10px] text-heaven-starlight/20 uppercase tracking-[0.4em] font-medium px-4">
                    <span>{posts.length} Chronicles Total</span>
                    <span>Sanctuary Sync: Active</span>
                </div>
            </div>
        </div>
    );
};

export default ManagePosts;
