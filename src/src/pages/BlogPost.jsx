
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .eq('is_visible', true)
                .single();

            if (error) {
                console.error('Error fetching post:', error);
            } else if (data) {
                setPost({
                    id: data.id,
                    title: data.title,
                    content: data.content,
                    image: data.image_url,
                    date: new Date(data.created_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })
                });
            }
            setLoading(false);
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-heaven-dark flex items-center justify-center">
                <Loader2 className="animate-spin text-heaven-emerald" size={48} />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-heaven-dark text-heaven-starlight flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-3xl font-serif mb-4">Post not found</h2>
                <Link to="/blog" className="text-heaven-emerald hover:underline tracking-widest uppercase text-xs">Back to Chronicles</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-heaven-dark text-heaven-starlight relative">
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-heaven-dark via-heaven-forest/10 to-heaven-dark pointer-events-none" />

            <article className="relative z-10">
                <div className="h-[50vh] w-full relative overflow-hidden">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover opacity-60"
                        onError={(e) => {
                            if (e.target.dataset.triedFallback) return;
                            e.target.dataset.triedFallback = 'true';
                            e.target.src = 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1350&q=80';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-heaven-dark via-heaven-dark/50 to-transparent" />

                    <div className="absolute top-24 left-6 md:left-12">
                        <Link
                            to="/blog"
                            className="group flex items-center gap-3 text-heaven-starlight hover:text-heaven-emerald transition-colors duration-300"
                        >
                            <div className="p-3 bg-heaven-dark/50 backdrop-blur-md border border-white/10 rounded-full group-hover:border-heaven-emerald/50 transition-colors">
                                <ArrowLeft size={32} />
                            </div>
                            <span className="text-lg font-medium tracking-widest uppercase opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                Back to Blog
                            </span>
                        </Link>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-serif text-heaven-starlight mb-4 max-w-4xl mx-auto"
                        >
                            {post.title}
                        </motion.h1>
                        <p className="text-heaven-emerald font-mono text-sm tracking-widest">{post.date}</p>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto px-6 py-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="prose prose-invert prose-lg prose-emerald mx-auto text-heaven-starlight/80 leading-relaxed font-light"
                    >
                        {post.content && /<[a-z][\s\S]*>/i.test(post.content) ? (
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        ) : (
                            <div className="whitespace-pre-wrap">{post.content}</div>
                        )}
                    </motion.div>
                </div>
            </article>
        </div>
    );
};

export default BlogPost;
