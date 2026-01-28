import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, ArrowLeft, Wind, Heart } from 'lucide-react';

const EcoConsciousness = () => {
    return (
        <div className="min-h-screen bg-heaven-dark text-heaven-starlight selection:bg-heaven-emerald/30 selection:text-white">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-heaven-forest/5 blur-[120px] rounded-full" />
                <div className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] bg-heaven-accent/5 blur-[100px] rounded-full" />
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
                        <Eye size={32} strokeWidth={1.5} />
                        <span className="uppercase tracking-[0.4em] text-sm">Awareness</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif text-heaven-starlight leading-tight mb-8">
                        Deep <br /> Eco-Consciousness
                    </h1>
                    <p className="text-xl text-heaven-starlight/60 font-light leading-relaxed italic">
                        "To look at nature is one thing; to see it with an open soul is another."
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
                            <Wind size={20} />
                            <h2 className="uppercase tracking-widest text-sm font-medium">Environmental Empathy</h2>
                        </div>
                        <p className="text-heaven-starlight/70 leading-relaxed font-light">
                            Eco-consciousness is more than a set of rules; it's a way of being. We foster a deep emotional connection to our surroundings, recognizing that every living thing—from the ancient trees to the smallest insects—has an intrinsic right to exist.
                        </p>
                        <p className="text-heaven-starlight/70 leading-relaxed font-light">
                            Our mindfulness programs are designed to help you quiet the noise of modern life and tune into the subtle frequencies of the forest.
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
                            <h2 className="uppercase tracking-widest text-sm font-medium">Mindful Integration</h2>
                        </div>
                        <p className="text-heaven-starlight/70 leading-relaxed font-light">
                            We believe that true healing comes from integrating ourselves back into the natural world. This means understanding our place within the web of life and living with a quiet, persistent awareness of our impact.
                        </p>
                        <p className="text-heaven-starlight/70 leading-relaxed font-light">
                            Heaven on Earth provides the space and the guidance to develop this awareness, turning every breath into a meditation on connection.
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
                        <Eye size={120} />
                    </div>
                    <p className="text-2xl font-serif italic text-heaven-emerald/90 leading-relaxed">
                        "The forest is not what you see, but how you feel when you are within it."
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default EcoConsciousness;
