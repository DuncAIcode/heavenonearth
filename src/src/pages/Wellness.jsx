import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Sun, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wellness = () => {
    return (
        <div className="min-h-screen bg-heaven-dark text-heaven-starlight p-6 pt-24">
            <div className="max-w-4xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-heaven-emerald/60 hover:text-heaven-emerald transition-colors mb-12 group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] uppercase tracking-[0.3em]">Home Base</span>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-heaven-emerald/10 border border-heaven-emerald/20 rounded-2xl">
                            <Heart className="text-heaven-emerald" size={32} />
                        </div>
                        <div>
                            <h1 className="text-4xl font-serif">Wellness Sanctuary</h1>
                            <p className="text-heaven-starlight/40 text-xs uppercase tracking-[0.4em] mt-1">Holistic Harmony</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                        <div className="space-y-6">
                            <p className="text-lg text-heaven-starlight/70 leading-relaxed font-light italic">
                                "A space to rediscover your rhythm, aligned with the pulse of the jungle."
                            </p>
                            <div className="h-[1px] w-12 bg-heaven-emerald/30" />
                            <p className="text-sm text-heaven-starlight/60 leading-loose">
                                We offer immersive wellness experiences that transcend the ordinary. From jungle-infused mindfulness retreats to holistic healing practices, our sanctuary provides the peace and presence needed to recalibrate your soul in the heart of nature.
                            </p>
                        </div>

                        <div className="bg-heaven-dark/40 border border-white/5 p-8 rounded-3xl backdrop-blur-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Sparkles size={80} className="text-heaven-emerald" />
                            </div>
                            <h3 className="text-heaven-emerald text-[10px] uppercase tracking-[0.3em] font-bold mb-6">Offering Essence</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <Sun size={16} className="text-heaven-emerald/40 mt-1" />
                                    <span className="text-xs text-heaven-starlight/60 tracking-wide">Mindfulness & Meditation Retreats</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Sun size={16} className="text-heaven-emerald/40 mt-1" />
                                    <span className="text-xs text-heaven-starlight/60 tracking-wide">Jungle Yoga Residencies</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Sun size={16} className="text-heaven-emerald/40 mt-1" />
                                    <span className="text-xs text-heaven-starlight/60 tracking-wide">Eco-Empathy Workshops</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Wellness;
