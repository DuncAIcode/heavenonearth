import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, ArrowLeft, Sun, Recycle } from 'lucide-react';

const Sustainability = () => {
    return (
        <div className="min-h-screen bg-heaven-dark text-heaven-starlight selection:bg-heaven-emerald/30 selection:text-white">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-heaven-emerald/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-heaven-forest/5 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">
                {/* Back Button */}
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

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-6 text-heaven-emerald">
                        <Leaf size={32} strokeWidth={1.5} />
                        <span className="uppercase tracking-[0.4em] text-sm">Regeneration</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif text-heaven-starlight leading-tight mb-8">
                        Sustainability & <br /> Stewardship
                    </h1>
                    <p className="text-xl text-heaven-starlight/60 font-light leading-relaxed italic">
                        "Sustainability is not just a practice; it is a sacred contract between humanity and the Earth."
                    </p>
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-3 text-heaven-emerald/80">
                            <Recycle size={20} />
                            <h2 className="uppercase tracking-widest text-sm font-medium">Regenerative Systems</h2>
                        </div>
                        <p className="text-heaven-starlight/70 leading-relaxed font-light">
                            At Heaven on Earth, we move beyond simple conservation. Our mission is to actively regenerate the wild ecosystems of Costa Rica. This means restoring soil health, reintroducing native flora, and creating corridors for wildlife to thrive.
                        </p>
                        <p className="text-heaven-starlight/70 leading-relaxed font-light">
                            Every decision we make—from the materials we use to the energy we consume—is measured against its impact on the seventh generation.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-3 text-heaven-emerald/80">
                            <Sun size={20} />
                            <h2 className="uppercase tracking-widest text-sm font-medium">Renewable Energy</h2>
                        </div>
                        <p className="text-heaven-starlight/70 leading-relaxed font-light">
                            Our sanctuary is powered by the elements. Through integrated solar arrays, micro-hydro systems, and passive cooling architectures, we demonstrate that a high-design lifestyle can exist in perfect harmony with nature's rhythms.
                        </p>
                        <p className="text-heaven-starlight/70 leading-relaxed font-light">
                            We believe that technology, when guided by environmental empathy, is the key to a flourishing future.
                        </p>
                    </motion.div>
                </div>

                {/* Quote Block */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                    className="p-12 bg-heaven-emerald/5 border-l-2 border-heaven-emerald relative"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Leaf size={120} />
                    </div>
                    <p className="text-2xl font-serif italic text-heaven-emerald/90 leading-relaxed">
                        "The goal is not to live on the Earth, but to live as a part of it."
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Sustainability;
