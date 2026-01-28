import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const { data, error: fetchError } = await supabase
                    .from('posts')
                    .select('id, title, excerpt, content, image_url, created_at, is_visible')
                    .eq('is_visible', true)
                    .order('created_at', { ascending: false });

                if (fetchError) {
                    throw fetchError;
                }

                if (data) {
                    // Secondary safeguard filter (Dual-Lock Visibility)
                    const visibleData = data.filter(p => p.is_visible);
                    console.log('Manifestations detected:', visibleData.length);

                    const mapped = visibleData.map(post => ({
                        id: post.id,
                        title: post.title,
                        excerpt: post.excerpt || (post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...' : ''),
                        image: post.image_url,
                        date: new Date(post.created_at).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        }),
                        is_visible: post.is_visible
                    }));
                    setPosts(mapped);
                }
            } catch (err) {
                console.error('Manifestation fetch error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const allPosts = posts;

    return (
        <div className="flex-1 min-h-screen pt-24 px-6 pb-20 bg-heaven-dark relative">
            <div className="fixed inset-0 z-0 bg-gradient-to-br from-heaven-dark via-heaven-forest/5 to-heaven-dark pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="mb-16 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-serif text-heaven-starlight mb-4"
                    >
                        Forest Chronicles
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-heaven-emerald font-light tracking-widest uppercase text-sm"
                    >
                        Stories from Costa Rica & Beyond
                    </motion.p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-red-500/10 border border-red-500/20 text-red-200 p-6 rounded-2xl mb-12 text-center max-w-2xl mx-auto"
                    >
                        <p className="text-sm tracking-widest uppercase opacity-60 mb-2">Manifestation Connection Lost</p>
                        <p className="text-lg font-serif italic mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-red-500/20 px-6 py-2 rounded-full text-xs uppercase tracking-widest hover:bg-red-500/40 transition-all"
                        >
                            Reconnect with the Forest
                        </button>
                    </motion.div>
                )}

                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="aspect-[4/3] bg-heaven-emerald/5 rounded-xl animate-pulse border border-heaven-emerald/10" />
                        ))}
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allPosts.map((post, index) => (
                            <Link to={`/blog/${post.id}`} key={post.id} className="block h-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative bg-heaven-dark/50 border border-heaven-emerald/10 hover:border-heaven-emerald/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-heaven-emerald/10 h-full flex flex-col"
                                >
                                    <div className="aspect-[4/3] overflow-hidden bg-heaven-emerald/5">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                            onError={(e) => {
                                                if (e.target.dataset.triedFallback) return;
                                                e.target.dataset.triedFallback = 'true';
                                                e.target.src = 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1350&q=80';
                                            }}
                                        />
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="text-xs text-heaven-emerald mb-2 font-mono opacity-80 uppercase tracking-tighter">{post.date}</div>
                                        <h3 className="text-xl font-serif text-heaven-starlight mb-3 group-hover:text-heaven-emerald transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-heaven-starlight/60 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        <div className="mt-auto">
                                            <span className="text-xs uppercase tracking-[0.3em] text-heaven-starlight/40 group-hover:text-heaven-emerald transition-colors border-b border-white/5 group-hover:border-heaven-emerald pb-1">
                                                Read Story
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
