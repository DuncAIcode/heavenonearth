import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, History, Heart } from 'lucide-react';

const MyStory = () => {
    return (
        <div className="min-h-screen bg-heaven-dark text-heaven-starlight selection:bg-heaven-emerald/30 selection:text-white">
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-heaven-emerald/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-heaven-forest/5 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <Link
                        to="/"
                        className="group flex items-center gap-3 text-heaven-emerald/60 hover:text-heaven-emerald transition-colors duration-300 uppercase text-xs tracking-[0.3em] font-medium"
                    >
                        <div className="p-2 border border-heaven-emerald/20 group-hover:border-heaven-emerald/50 rounded-full transition-all duration-300">
                            <ArrowLeft size={16} />
                        </div>
                        Back to Sanctuary
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-6 text-heaven-emerald">
                        <BookOpen size={32} strokeWidth={1.5} />
                        <span className="uppercase tracking-[0.4em] text-sm">Chronicles</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif text-heaven-starlight leading-tight mb-8">
                        My Story
                    </h1>
                    <p className="text-xl text-heaven-starlight/60 font-light leading-relaxed italic">
                        "The journey from the noise of the world to the silence of the sanctuary."
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-3 text-heaven-emerald/80">
                            <History size={20} />
                            <h2 className="uppercase tracking-widest text-sm font-medium">The Awakening</h2>
                        </div>
                        <p className="text-heaven-starlight/70 leading-relaxed font-light">
                            It began with a single breath in the heart of the cloud forest. After years of chasing horizons that never stayed still, I found a peace that didn't require movement. This is the story of how a vision for a different way of living became a reality.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-3 text-heaven-emerald/80">
                            <Heart size={20} />
                            <h2 className="uppercase tracking-widest text-sm font-medium">Heart-led Design</h2>
                        </div>
                        <p className="text-heaven-starlight/70 leading-relaxed font-light">
                            Heaven on Earth wasn't built from a blueprint, but from a feeling. A feeling that architecture should be an extension of the land, and that true luxury is found in the simplicity of nature.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                    className="p-12 bg-heaven-emerald/5 border-l-2 border-heaven-emerald relative"
                >
                    <p className="text-2xl font-serif italic text-heaven-emerald/90 leading-relaxed">
                        "I didn't build a house; I restored a connection."
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default MyStory;
