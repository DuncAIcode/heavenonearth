import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Menu, X, Leaf, Eye, Users } from 'lucide-react';

const Navbar = ({ session }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const menuItems = [
        { name: 'Sustainability', path: '/sustainability', icon: <Leaf size={18} /> },
        { name: 'Eco-Consciousness', path: '/eco-consciousness', icon: <Eye size={18} /> },
        { name: 'Community', path: '/community', icon: <Users size={18} /> },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-heaven-dark/20 border-b border-white/5">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="relative group">
                        <Link to="/" className="flex items-center gap-2 py-2">
                            <motion.div
                                initial={{ opacity: 0, letterSpacing: "0.2em" }}
                                animate={{ opacity: 1, letterSpacing: "0.4em" }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                className="text-xl font-serif text-heaven-starlight tracking-[0.4em] uppercase group-hover:text-heaven-emerald transition-colors duration-500"
                            >
                                The Vision
                            </motion.div>
                        </Link>

                        {/* Hover Dropdown Menu */}
                        <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-500 ease-out z-50">
                            <div className="w-64 p-6 bg-heaven-dark/95 backdrop-blur-xl border border-white/5 rounded-sm shadow-2xl">
                                <div className="space-y-4">
                                    <Link to="/my-story" className="block text-[10px] uppercase tracking-[0.3em] text-heaven-starlight/60 hover:text-heaven-emerald transition-all duration-300 hover:translate-x-2">
                                        My Story
                                    </Link>
                                    <Link to="/why" className="block text-[10px] uppercase tracking-[0.3em] text-heaven-starlight/60 hover:text-heaven-emerald transition-all duration-300 hover:translate-x-2">
                                        Why
                                    </Link>
                                    <Link to="/future" className="block text-[10px] uppercase tracking-[0.3em] text-heaven-starlight/60 hover:text-heaven-emerald transition-all duration-300 hover:translate-x-2">
                                        The Future I see
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-8 items-center">
                        <Link to="/" className="hidden md:block text-xs uppercase tracking-[0.3em] text-heaven-starlight/70 hover:text-heaven-emerald transition-colors font-medium">Home</Link>

                        {/* What We Offer Dropdown */}
                        <div className="relative group/offer hidden md:block">
                            <button className="flex items-center gap-2 py-2 text-xs uppercase tracking-[0.3em] text-heaven-starlight/70 hover:text-heaven-emerald transition-colors font-medium">
                                What We Offer
                            </button>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover/offer:opacity-100 group-hover/offer:translate-y-0 group-hover/offer:pointer-events-auto transition-all duration-500 ease-out z-50">
                                <div className="w-64 p-6 bg-heaven-dark/95 backdrop-blur-xl border border-white/5 rounded-sm shadow-2xl">
                                    <div className="space-y-4">
                                        <Link to="/regenerative" className="block text-[10px] uppercase tracking-[0.3em] text-heaven-starlight/60 hover:text-heaven-emerald transition-all duration-300 hover:translate-x-2">
                                            Regenerative Living
                                        </Link>
                                        <Link to="/wellness" className="block text-[10px] uppercase tracking-[0.3em] text-heaven-starlight/60 hover:text-heaven-emerald transition-all duration-300 hover:translate-x-2">
                                            Wellness Sanctuary
                                        </Link>
                                        <Link to="/digital-oasis" className="block text-[10px] uppercase tracking-[0.3em] text-heaven-starlight/60 hover:text-heaven-emerald transition-all duration-300 hover:translate-x-2">
                                            Digital Oasis
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link to="/blog" className="hidden md:block text-xs uppercase tracking-[0.3em] text-heaven-starlight/70 hover:text-heaven-emerald transition-colors font-medium">Blog</Link>

                        <Link to="/properties" className="hidden md:block text-xs uppercase tracking-[0.3em] text-heaven-emerald/80 hover:text-heaven-emerald hover:scale-105 transition-all font-bold">Properties for Sale</Link>

                        <button
                            onClick={toggleMenu}
                            className="p-2 text-heaven-starlight/70 hover:text-heaven-emerald transition-colors"
                            aria-label="Toggle Mission Menu"
                        >
                            <Menu size={24} />
                        </button>

                        {session ? (
                            <button
                                onClick={handleLogout}
                                className="px-6 py-2 border border-heaven-emerald/50 text-heaven-emerald hover:bg-heaven-emerald hover:text-heaven-dark transition-all duration-300 rounded-sm uppercase text-[10px] tracking-[0.2em] font-medium"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link to="/login" className="px-6 py-2 border border-heaven-emerald/50 text-heaven-emerald hover:bg-heaven-emerald hover:text-heaven-dark transition-all duration-300 rounded-sm uppercase text-[10px] tracking-[0.2em] font-medium">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Collapsible Global Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleMenu}
                            className="fixed inset-0 bg-heaven-dark/80 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full md:w-80 bg-heaven-dark border-l border-white/5 z-[70] p-12 flex flex-col"
                        >
                            <button
                                onClick={toggleMenu}
                                className="absolute top-6 right-6 p-2 text-heaven-starlight/50 hover:text-heaven-starlight transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="mt-12 space-y-12">
                                <div>
                                    <h3 className="text-heaven-emerald text-[10px] uppercase tracking-[0.3em] font-medium mb-8">Sanctuary Missions</h3>
                                    <div className="flex flex-col gap-6">
                                        {menuItems.map((item) => (
                                            <Link
                                                key={item.path}
                                                to={item.path}
                                                onClick={toggleMenu}
                                                className="group flex items-center gap-4 text-heaven-starlight/70 hover:text-heaven-emerald transition-all duration-300"
                                            >
                                                <div className="p-2 border border-white/5 group-hover:border-heaven-emerald/30 group-hover:bg-heaven-emerald/5 rounded-full transition-all duration-300">
                                                    {item.icon}
                                                </div>
                                                <span className="text-sm tracking-widest uppercase font-light">{item.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-12 border-t border-white/5">
                                    <div className="flex flex-col gap-6">
                                        <Link to="/" onClick={toggleMenu} className="text-xs uppercase tracking-[0.3em] text-heaven-starlight/50 hover:text-heaven-starlight transition-colors">Home Base</Link>
                                        <Link to="/blog" onClick={toggleMenu} className="text-xs uppercase tracking-[0.3em] text-heaven-starlight/50 hover:text-heaven-starlight transition-colors">Archive</Link>
                                        {session && (
                                            <Link to="/admin" onClick={toggleMenu} className="text-xs uppercase tracking-[0.3em] text-heaven-emerald/50 hover:text-heaven-emerald transition-colors font-medium">Manifest Content</Link>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto">
                                <p className="text-[10px] uppercase tracking-[0.4em] text-heaven-starlight/20 italic">Heaven on Earth © 2026</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

const Layout = ({ children, session }) => {
    return (
        <div className="min-h-screen bg-heaven-dark text-heaven-starlight font-sans overflow-hidden relative selection:bg-heaven-emerald selection:text-black">
            {/* Ambient Background Glows */}
            <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-heaven-emerald/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-heaven-soft/10 rounded-full blur-[120px] pointer-events-none" />

            <Navbar session={session} />

            <main className="pt-20 relative z-10 min-h-screen flex flex-col">
                {children}
            </main>
        </div>
    );
};

export default Layout;
