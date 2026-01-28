import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Lightbulb, HelpCircle } from 'lucide-react';

const Why = () => {
    return (
        <div className="min-h-screen bg-heaven-dark text-heaven-starlight selection:bg-heaven-emerald/30 selection:text-white">
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-heaven-emerald/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-heaven-forest/5 blur-[100px] rounded-full" />
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
                        <HelpCircle size={32} strokeWidth={1.5} />
                        <span className="uppercase tracking-[0.4em] text-sm">Purpose</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif text-heaven-starlight leading-tight mb-8">
                        Why We Exist
                    </h1>
                    <p className="text-xl text-heaven-starlight/60 font-light leading-relaxed italic">
                        "The 'Why' is the anchor that keeps the vision grounded while the dreams reach for the stars."
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
                            <Compass size={20} />
                            <h2 className="uppercase tracking-widest text-sm font-medium">The Ethical Compass</h2>
                        </div>
                        <p className="text-heaven-starlight/70 leading-relaxed font-light">
                            We exist to challenge the notion that human advancement must come at the cost of the natural world. Our project serves as a laboratory for ethical living and environmental consciousness.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-3 text-heaven-emerald/80">
                            <Lightbulb size={20} />
                            <h2 className="uppercase tracking-widest text-sm font-medium">Inspiration for All</h2>
                        </div>
                        <p className="text-heaven-starlight/70 leading-relaxed font-light">
                            Our goal is to inspire others to look at their own surroundings with fresh eyes. Whether it's a window box in a city or a vast rainforest, we believe everyone holds the power to protect and blossom.
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
                        "Nature doesn't need us, but we desperately need nature."
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Why;
