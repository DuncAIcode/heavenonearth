import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Send, Sparkles, Image as ImageIcon, CheckCircle, AlertCircle, Loader2, Upload, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [title, setTitle] = useState('');
    const [idea, setIdea] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isReadingImage, setIsReadingImage] = useState(false);
    const [isExpanding, setIsExpanding] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [expandedContent, setExpandedContent] = useState(null);
    const [status, setStatus] = useState({ type: '', message: '' });
    const navigate = useNavigate();

    // Check for admin session
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/login');
            }
        };
        checkAuth();
    }, [navigate]);

    // Cleanup Blob URLs to prevent memory leaks
    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setStatus({ type: 'error', message: 'Image must be less than 5MB.' });
                return;
            }

            setIsReadingImage(true);
            setStatus({ type: '', message: 'Capturing visual essence...' });

            // Create object URL for instant preview
            try {
                const preview = URL.createObjectURL(file);
                setImageFile(file);
                setImagePreview(preview);
                setImageUrl(''); // Clear URL if file is selected

                // Sync with expanded content if it exists
                if (expandedContent) {
                    setExpandedContent(prev => ({ ...prev, image_url: preview }));
                }

                // Success feedback with a slight delay to ensure user sees the "Reading" state
                setTimeout(() => {
                    setIsReadingImage(false);
                    setStatus({ type: 'success', message: 'Visual Manifestation Ready!' });
                }, 600);
            } catch (err) {
                console.error('Preview error:', err);
                setIsReadingImage(false);
                setStatus({ type: 'error', message: 'Failed to manifest image preview.' });
            }
        }
    };

    const handleAIExpand = async () => {
        if (!idea) {
            setStatus({ type: 'error', message: 'Please provide a blog idea first.' });
            return;
        }

        setIsExpanding(true);
        setStatus({ type: '', message: 'Harnessing rainforest wisdom...' });

        // Simulate AI Expansion Logic
        setTimeout(() => {
            const expanded = {
                title: title || `The Spirit of ${idea.split(' ').slice(0, 2).join(' ')}`,
                excerpt: `Discover the deep connection between ${idea.toLowerCase()} and the regenerative spirit of the Costa Rican rainforest.`,
                content: `In the heart of the sanctuary, we often find that the most profound lessons come from the simplest observations. ${idea} is not just a concept, but a living vibration that resonates through every leaf and vine.\n\nWhen we immerse ourselves in the rhythms of nature, we begin to understand that our existence is inextricably linked to the health of the biosphere. At Heaven on Earth, we prioritize this integration through architectural innovation and mindful presence.\n\nThis exploration into ${idea.toLowerCase()} reveals how we can harmoniously coexist with the wild, building a future that is as sustainable as it is beautiful.`.trim(),
                image_url: imagePreview || imageUrl || 'https://images.unsplash.com/photo-1518173946687-a4c8a98039f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            };
            setExpandedContent(expanded);
            setIsExpanding(false);
            setStatus({ type: 'success', message: 'The seed has blossomed into a full manifestation!' });
        }, 2000);
    };

    const handlePublish = async () => {
        if (!expandedContent) return;

        setIsSaving(true);
        setStatus({ type: 'process', message: 'Initiating Manifestation Ritual...' });

        try {
            const { data: { session } } = await supabase.auth.getSession();
            let finalImageUrl = imagePreview || imageUrl;

            // Stage 1: Upload image if file exists
            if (imageFile) {
                setStatus({ type: 'process', message: 'Stage 1: Transmitting visual essence to the cloud...' });
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
                const filePath = `${session.user.id}/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('posts_images')
                    .upload(filePath, imageFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('posts_images')
                    .getPublicUrl(filePath);

                finalImageUrl = publicUrl;
                setStatus({ type: 'process', message: 'Visual Seed successfully planted!' });
            }

            // Stage 2: Database Insertion
            setStatus({ type: 'process', message: 'Stage 2: Securing manifestation in the digital forest...' });
            const { error } = await supabase.from('posts').insert([
                {
                    title: expandedContent.title,
                    excerpt: expandedContent.excerpt,
                    content: expandedContent.content,
                    image_url: finalImageUrl || 'https://images.unsplash.com/photo-1518173946687-a4c8a98039f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                    author_id: session.user.id
                }
            ]);

            if (error) throw error;

            // Stage 3: Completion
            setStatus({ type: 'success', message: 'The seed has become a tree! Redirecting...' });
            setTimeout(() => navigate('/blog'), 2000);
        } catch (error) {
            console.error('Publishing error:', error);
            setStatus({ type: 'error', message: `Manifestation failed: ${error.message}` });
        } finally {
            // Keep isSaving true until redirect to maintain overlay
        }
    };

    // Auto-expanding textarea component
    const AutoTextarea = ({ value, onChange, className, label }) => {
        const textareaRef = React.useRef(null);

        const adjustHeight = () => {
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
                textareaRef.current.style.height = (textareaRef.current.scrollHeight) + 'px';
            }
        };

        useEffect(() => {
            adjustHeight();
            window.addEventListener('resize', adjustHeight);
            return () => window.removeEventListener('resize', adjustHeight);
        }, [value]);

        return (
            <div className="w-full">
                {label && <label className="block text-[10px] uppercase tracking-widest text-heaven-emerald/40 mb-1">{label}</label>}
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={onChange}
                    rows="1"
                    className={`${className} w-full bg-transparent border-none p-0 focus:ring-0 resize-none overflow-hidden block`}
                    style={{ minHeight: '1.5em' }}
                />
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-heaven-dark text-heaven-starlight p-6 pt-24">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between mb-12"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-heaven-emerald/10 border border-heaven-emerald/20 rounded-xl">
                            <LayoutDashboard className="text-heaven-emerald" size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-serif">Admin Sanctuary</h1>
                            <p className="text-heaven-starlight/60 text-sm tracking-widest uppercase mt-1">Manifest New Content</p>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/admin/manage')}
                        className="group flex items-center gap-3 px-6 py-3 bg-heaven-dark/40 border border-heaven-emerald/20 rounded-xl hover:border-heaven-emerald transition-all duration-300 backdrop-blur-md hover:bg-heaven-emerald/5"
                    >
                        <ImageIcon className="text-heaven-emerald/60 group-hover:text-heaven-emerald" size={20} />
                        <span className="text-xs uppercase tracking-widest font-bold text-heaven-starlight group-hover:text-heaven-emerald">Manage Posts</span>
                    </button>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Input Section */}
                    <div className="space-y-6 sticky top-24">
                        <div className="bg-heaven-dark/40 border border-heaven-emerald/10 p-8 rounded-2xl backdrop-blur-xl">
                            <h2 className="text-xl font-medium mb-6 flex items-center gap-3">
                                <Sparkles size={20} className="text-heaven-emerald" />
                                The Seed
                            </h2>

                            <div className="space-y-4">
                                {/* Image Manifestation Area */}
                                <div className="space-y-3">
                                    {(imagePreview || imageUrl || isReadingImage) ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="relative aspect-video rounded-xl overflow-hidden border-2 border-heaven-emerald/20 shadow-2xl group bg-heaven-dark/60"
                                        >
                                            {isReadingImage ? (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-heaven-dark/80 backdrop-blur-sm z-30">
                                                    <Loader2 className="animate-spin text-heaven-emerald mb-3" size={32} />
                                                    <span className="text-[10px] uppercase tracking-[0.2em] text-heaven-emerald animate-pulse">Gleaning Visual...</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <img
                                                        src={imagePreview || imageUrl}
                                                        alt="Manifesting Preview"
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                        onError={(e) => {
                                                            console.warn('Image load failed, reverting to fallback');
                                                            e.target.src = 'https://images.unsplash.com/photo-1518173946687-a4c8a98039f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-heaven-dark/80 via-transparent to-transparent pointer-events-none" />

                                                    <button
                                                        onClick={() => {
                                                            setImageFile(null);
                                                            setImagePreview('');
                                                            setImageUrl('');
                                                            if (expandedContent) setExpandedContent(prev => ({ ...prev, image_url: 'https://images.unsplash.com/photo-1518173946687-a4c8a98039f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }));
                                                            setStatus({ type: '', message: 'Visual essence released.' });
                                                        }}
                                                        className="absolute top-4 right-4 p-2.5 bg-red-500 text-white hover:bg-red-600 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 z-40 transform hover:scale-110 active:scale-90"
                                                    >
                                                        <X size={18} />
                                                    </button>

                                                    <motion.div
                                                        initial={{ y: 20, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-30"
                                                    >
                                                        <div className="bg-heaven-emerald text-heaven-dark px-4 py-1.5 rounded-full flex items-center gap-2 shadow-xl border border-white/20">
                                                            <CheckCircle size={14} className="animate-bounce" />
                                                            <span className="text-[10px] font-bold uppercase tracking-widest">Visual Captured</span>
                                                        </div>
                                                        {imageFile && (
                                                            <div className="text-[8px] text-heaven-starlight/60 uppercase tracking-widest bg-heaven-dark/40 backdrop-blur-md px-2 py-1 rounded border border-white/5">
                                                                Local Seed
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                </>
                                            )}
                                        </motion.div>
                                    ) : (
                                        <div className="relative group">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                            />
                                            <div className="w-full bg-heaven-dark/60 border-2 border-dashed border-heaven-emerald/10 rounded-2xl py-12 flex flex-col items-center justify-center group-hover:border-heaven-emerald/40 group-hover:bg-heaven-emerald/5 transition-all duration-500">
                                                <div className="p-4 bg-heaven-emerald/5 rounded-full mb-4 group-hover:bg-heaven-emerald/20 group-hover:scale-110 transition-all duration-500 shadow-inner">
                                                    <Upload className="text-heaven-emerald/40 group-hover:text-heaven-emerald" size={32} />
                                                </div>
                                                <h3 className="text-heaven-starlight/60 text-xs font-medium uppercase tracking-widest mb-1 group-hover:text-heaven-starlight transition-colors">Plant a Visual Seed</h3>
                                                <p className="text-heaven-starlight/30 text-[9px] uppercase tracking-wider group-hover:text-heaven-emerald/40 transition-colors">Click to manifest local image</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="relative pt-2">
                                        <div className="absolute left-0 right-0 flex items-center px-4 -top-1 z-10">
                                            <div className="h-[1px] flex-grow bg-heaven-emerald/5"></div>
                                            <span className="px-3 text-[9px] uppercase tracking-[0.4em] text-heaven-starlight/20 font-bold bg-heaven-dark">OR</span>
                                            <div className="h-[1px] flex-grow bg-heaven-emerald/5"></div>
                                        </div>
                                        <div className="relative mt-4">
                                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-heaven-emerald/40" size={18} />
                                            <input
                                                type="text"
                                                value={imageUrl}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setImageUrl(val);
                                                    setImageFile(null);
                                                    setImagePreview('');
                                                    if (expandedContent) setExpandedContent(prev => ({ ...prev, image_url: val || 'https://images.unsplash.com/photo-1518173946687-a4c8a98039f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }));
                                                    if (val.startsWith('http')) {
                                                        setStatus({ type: 'success', message: 'Visual link detected! Mirroring transformation...' });
                                                    }
                                                }}
                                                placeholder="Paste direct high-res image link..."
                                                className="w-full bg-heaven-dark/60 border border-heaven-emerald/10 rounded-xl py-4 pl-12 pr-4 focus:border-heaven-emerald/50 focus:bg-heaven-dark/80 focus:outline-none transition-all text-sm placeholder:text-heaven-starlight/10"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-heaven-emerald/60 mb-2">Post Title (Optional)</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter a title..."
                                        className="w-full bg-heaven-dark/60 border border-heaven-emerald/10 rounded-lg py-3 px-4 focus:border-heaven-emerald/40 focus:outline-none transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-heaven-emerald/60 mb-2">The Idea</label>
                                    <textarea
                                        rows="5"
                                        value={idea}
                                        onChange={(e) => setIdea(e.target.value)}
                                        placeholder="Describe the essence of the blog post..."
                                        className="w-full bg-heaven-dark/60 border border-heaven-emerald/10 rounded-lg py-3 px-4 focus:border-heaven-emerald/40 focus:outline-none transition-colors resize-none"
                                    />
                                </div>

                                <button
                                    onClick={handleAIExpand}
                                    disabled={isExpanding}
                                    className="w-full py-4 bg-heaven-emerald/10 border border-heaven-emerald/30 text-heaven-emerald rounded-lg hover:bg-heaven-emerald/20 transition-all flex items-center justify-center gap-3 font-medium tracking-widest uppercase text-xs"
                                >
                                    {isExpanding ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                                    Expand with AI
                                </button>
                            </div>
                        </div>

                        {status.message && (
                            <motion.div
                                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border backdrop-blur-2xl ${status.type === 'error'
                                    ? 'bg-red-500/20 text-red-100 border-red-500/50'
                                    : 'bg-heaven-emerald/20 text-heaven-starlight border-heaven-emerald/50'
                                    }`}
                            >
                                <div className={`p-2 rounded-full ${status.type === 'error' ? 'bg-red-500/20' : 'bg-heaven-emerald/20'}`}>
                                    {status.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle size={20} className="text-heaven-emerald" />}
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest font-bold opacity-40 leading-none mb-1">Sanctuary Sync</p>
                                    <span className="text-sm font-medium">{status.message}</span>
                                </div>
                                <button onClick={() => setStatus({ type: '', message: '' })} className="ml-4 hover:opacity-60 transition-opacity">
                                    <X size={16} />
                                </button>
                            </motion.div>
                        )}
                    </div>

                    {/* Preview Section */}
                    <div className="relative min-h-[600px]">
                        <AnimatePresence mode="wait">
                            {expandedContent ? (
                                <motion.div
                                    key="preview"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="bg-heaven-dark/40 border-2 border-heaven-emerald/10 p-10 rounded-3xl backdrop-blur-2xl shadow-inner relative overflow-hidden"
                                >
                                    {/* Subtle leaf watermark */}
                                    <div className="absolute -bottom-20 -right-20 opacity-[0.03] pointer-events-none">
                                        <Sparkles size={300} className="text-heaven-emerald" />
                                    </div>

                                    <h2 className="text-xl font-medium mb-8 flex items-center gap-3 border-b border-heaven-emerald/10 pb-6 text-heaven-emerald">
                                        <Send size={20} />
                                        The Manifestation
                                    </h2>

                                    <div className="space-y-10">
                                        <motion.div
                                            initial={{ scale: 0.95, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl group relative"
                                        >
                                            <img
                                                src={expandedContent.image_url}
                                                alt="Preview"
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1518173946687-a4c8a98039f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-heaven-dark via-transparent to-transparent opacity-60" />
                                        </motion.div>

                                        <div className="space-y-8">
                                            <AutoTextarea
                                                label="Sacred Title"
                                                value={expandedContent.title}
                                                onChange={(e) => setExpandedContent(prev => ({ ...prev, title: e.target.value }))}
                                                className="text-3xl md:text-4xl font-serif text-heaven-starlight leading-tight selection:bg-heaven-emerald/30"
                                            />

                                            <div className="h-[1px] w-12 bg-heaven-emerald/30" />

                                            <AutoTextarea
                                                label="Whispered Excerpt"
                                                value={expandedContent.excerpt}
                                                onChange={(e) => setExpandedContent(prev => ({ ...prev, excerpt: e.target.value }))}
                                                className="text-base text-heaven-starlight/70 italic leading-relaxed"
                                            />

                                            <AutoTextarea
                                                label="Core Essence"
                                                value={expandedContent.content}
                                                onChange={(e) => setExpandedContent(prev => ({ ...prev, content: e.target.value }))}
                                                className="text-sm text-heaven-starlight/60 leading-loose font-light whitespace-pre-wrap selection:bg-heaven-emerald/20"
                                            />
                                        </div>

                                        <button
                                            onClick={handlePublish}
                                            disabled={isSaving}
                                            className="w-full py-5 bg-heaven-emerald text-heaven-dark rounded-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-4 font-black tracking-[0.2em] uppercase text-xs transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:hover:scale-100"
                                        >
                                            {isSaving ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle size={20} />}
                                            {isSaving ? 'Manifesting...' : 'Share Knowledge'}
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-full border-2 border-dashed border-heaven-emerald/10 rounded-3xl flex flex-col items-center justify-center p-12 text-center min-h-[500px] bg-heaven-dark/20 backdrop-blur-sm"
                                >
                                    <div className="p-8 bg-heaven-emerald/5 rounded-full mb-8 relative">
                                        <Sparkles size={64} className="text-heaven-emerald/10" />
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                opacity: [0.3, 0.6, 0.3]
                                            }}
                                            transition={{ repeat: Infinity, duration: 4 }}
                                            className="absolute inset-0 bg-heaven-emerald/5 rounded-full blur-2xl"
                                        />
                                    </div>
                                    <h3 className="text-heaven-emerald/40 font-serif italic text-2xl mb-2">Expansion Awaits</h3>
                                    <p className="text-heaven-starlight/20 text-xs uppercase tracking-widest max-w-[200px]">Provide a seed idea to blossom into a story</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Manifestation Ritual Overlay */}
            <AnimatePresence>
                {isSaving && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-heaven-dark/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center"
                    >
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.1, 0.2, 0.1]
                                }}
                                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                                className="absolute -top-1/4 -left-1/4 w-full h-full bg-heaven-emerald/20 blur-[120px] rounded-full"
                            />
                            <motion.div
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.05, 0.15, 0.05]
                                }}
                                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-heaven-emerald/10 blur-[120px] rounded-full"
                            />
                        </div>

                        <div className="relative z-10 max-w-md w-full">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                                className="inline-block p-6 rounded-full bg-heaven-emerald/5 border border-heaven-emerald/20 mb-8"
                            >
                                <Sparkles className="text-heaven-emerald" size={64} />
                            </motion.div>

                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl font-serif text-heaven-starlight mb-4"
                            >
                                Manifestation in Progress
                            </motion.h2>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="space-y-4"
                            >
                                <p className="text-heaven-emerald font-mono text-sm tracking-[0.3em] uppercase animate-pulse">
                                    {status.message}
                                </p>

                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-8">
                                    <motion.div
                                        className="h-full bg-heaven-emerald"
                                        initial={{ width: "0%" }}
                                        animate={{ width: status.type === 'success' ? "100%" : "70%" }}
                                        transition={{ duration: 2 }}
                                    />
                                </div>

                                {status.type === 'error' && (
                                    <motion.button
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        onClick={() => setIsSaving(false)}
                                        className="mt-8 px-8 py-3 bg-red-500/20 text-red-200 border border-red-500/50 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-500/40 transition-all"
                                    >
                                        Abort Ritual
                                    </motion.button>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Admin;
