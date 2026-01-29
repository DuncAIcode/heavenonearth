import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Sun, ArrowLeft, Wind, Waves, Trees as Tree, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wellness = () => {
    const offerings = [
        {
            icon: <Sun className="text-heaven-emerald" size={24} />,
            title: "Circadian Realignment",
            description: "Synchronize your biological clock with the equatorial sun and the depth of the jungle night."
        },
        {
            icon: <Wind className="text-heaven-emerald" size={24} />,
            title: "Breath of the Forest",
            description: "Guided pranayama amidst ancient trees, harnessing the purest oxygen on the planet."
        },
        {
            icon: <Waves className="text-heaven-emerald" size={24} />,
            title: "Hydro-Healing",
            description: "Mineral-rich spring immersions designed to cleanse the cellular body and calm the spirit."
        },
        {
            icon: <Moon className="text-heaven-emerald" size={24} />,
            title: "Nocturnal Meditation",
            description: "Experience the profound silence and vibrant life of the jungle under the celestial vault."
        }
    ];

    return (
        <div className="min-h-screen bg-heaven-dark text-heaven-starlight overflow-hidden">
            {/* Immersive Hero Header */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.4 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                        alt="Wellness Sanctuary"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-heaven-dark/20 via-heaven-dark/60 to-heaven-dark" />
                </motion.div>

                <div className="relative z-10 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-heaven-emerald/10 border border-heaven-emerald/20 text-heaven-emerald text-[10px] font-bold uppercase tracking-[0.4em] mb-8"
                    >
                        <Heart size={12} className="animate-pulse" />
                        The Heart of Presence
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-6xl md:text-8xl font-serif mb-6 italic"
                    >
                        Wellness <span className="text-heaven-emerald not-italic">Sanctuary</span>
                    </motion.h1>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100px" }}
                        transition={{ delay: 1, duration: 1 }}
                        className="h-px bg-heaven-emerald/40 mx-auto"
                    />
                </div>

                {/* Ambient Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-heaven-emerald/30 rounded-full"
                            initial={{
                                x: Math.random() * 100 + "%",
                                y: Math.random() * 100 + "%",
                                opacity: 0
                            }}
                            animate={{
                                y: [null, "-20%"],
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                duration: 5 + Math.random() * 5,
                                repeat: Infinity,
                                delay: Math.random() * 5
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 pb-32">
                {/* Back Link */}
                <Link to="/" className="inline-flex items-center gap-3 text-heaven-starlight/30 hover:text-heaven-emerald transition-all mb-20 group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" />
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Return to Origin</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    <div className="lg:col-span-5 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-serif mb-8 leading-tight">
                                A space to <span className="italic">rediscover</span> your rhythm, aligned with the pulse of the jungle.
                            </h2>
                            <p className="text-heaven-starlight/60 leading-loose font-serif font-light text-lg">
                                Within the Sanctuary, wellness is not a destination, but a state of resonance. We have woven ancient wisdom with modern bio-harmonic research to create an environment where the body naturally returns to its pristine state.
                            </p>
                        </motion.div>

                        <div className="p-8 bg-heaven-emerald/5 border border-heaven-emerald/10 rounded-[2rem] relative overflow-hidden group">
                            <div className="relative z-10">
                                <Sparkles className="text-heaven-emerald mb-6 group-hover:rotate-12 transition-transform" size={32} />
                                <h4 className="text-heaven-starlight font-serif text-xl mb-4 italic">Holistic Integration</h4>
                                <p className="text-heaven-starlight/40 text-sm leading-relaxed">
                                    Our practices are designed to dissolve the boundaries between self and spirit, utilizing the forest's natural geometry to catalyze deep healing.
                                </p>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-heaven-emerald/5 blur-3xl rounded-full" />
                        </div>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {offerings.map((offering, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 bg-heaven-dark/40 border border-white/5 rounded-[2rem] hover:border-heaven-emerald/30 transition-all duration-500 backdrop-blur-xl flex flex-col items-start gap-6 group"
                            >
                                <div className="p-4 bg-heaven-emerald/5 rounded-2xl group-hover:bg-heaven-emerald/10 transition-colors">
                                    {offering.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-serif mb-2 group-hover:text-heaven-emerald transition-colors">{offering.title}</h3>
                                    <p className="text-heaven-starlight/40 text-xs leading-relaxed uppercase tracking-wider">{offering.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-32 p-12 bg-gradient-to-br from-heaven-emerald/10 via-heaven-dark/40 to-heaven-emerald/5 border border-heaven-emerald/20 rounded-[3rem] text-center relative overflow-hidden"
                >
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-4xl font-serif mb-6 italic">Seek Your <span className="not-italic text-heaven-emerald">Recalibration</span></h2>
                        <p className="text-heaven-starlight/60 mb-10 text-lg font-serif font-light">
                            Passages to the sanctuary are limited to ensure the sanctity of the space. Inquire to begin your journey back to yourself.
                        </p>
                        <button className="px-12 py-5 bg-heaven-emerald text-heaven-dark font-bold text-xs uppercase tracking-[0.4em] rounded-2xl hover:scale-105 transition-all shadow-xl shadow-heaven-emerald/20 active:scale-95">
                            Request Passage
                        </button>
                    </div>
                    {/* Ambient Glow */}
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-heaven-emerald/10 blur-[100px] rounded-full" />
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-heaven-emerald/10 blur-[100px] rounded-full" />
                </motion.div>
            </div>
        </div>
    );
};

export default Wellness;
