import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroBg from '../assets/rainforest_bokeh.png';

const Home = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Hero Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60 mix-blend-overlay"
                style={{ backgroundImage: `url(${heroBg})` }}
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-heaven-dark/80 via-transparent to-heaven-dark/90" />

            <div className="relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <h1 className="text-[5rem] md:text-[8rem] font-serif leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-heaven-starlight via-heaven-emerald to-heaven-forest opacity-90">
                        Heaven
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
                >
                    <h1 className="text-[5rem] md:text-[8rem] font-serif leading-none tracking-tighter text-heaven-starlight/50 italic">
                        on Earth
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="mt-12"
                >
                    <p className="text-heaven-starlight/60 max-w-md mx-auto text-lg font-light tracking-wide">
                        Experience the weightlessness of perfect design.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.0, duration: 0.8 }}
                    className="mt-12"
                >
                    <button className="px-10 py-3 bg-heaven-emerald text-heaven-dark font-medium tracking-[0.2em] hover:scale-105 transition-transform duration-300">
                        ENTER
                    </button>
                </motion.div>
            </div>

            {/* Floating Particle Elements */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-2 h-2 bg-heaven-emerald rounded-full blur-[1px]"
            />
            <motion.div
                animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, delay: 1, ease: "easeInOut" }}
                className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-heaven-accent/50 rounded-full blur-[2px]"
            />
            {/* Mission Statements Section */}
            <motion.div
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.2,
                            delayChildren: 0.5
                        }
                    }
                }}
                initial="hidden"
                animate="show"
                className="relative z-10 mt-24 mb-12 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto px-6"
            >
                <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}>
                    <Link to="/sustainability" className="text-center p-8 bg-heaven-dark/30 backdrop-blur-sm border border-heaven-emerald/10 hover:border-heaven-emerald/30 transition-all duration-500 rounded-lg group hover:bg-heaven-emerald/5 block h-full">
                        <h3 className="text-heaven-emerald text-xs uppercase tracking-[0.3em] font-medium mb-4 group-hover:scale-110 transition-transform duration-500">Sustainability</h3>
                        <p className="text-heaven-starlight/70 text-sm leading-relaxed font-light italic">
                            "Eco-friendly stewardship and regenerative practices to protect our wild ecosystems."
                        </p>
                    </Link>
                </motion.div>

                <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}>
                    <Link to="/eco-consciousness" className="text-center p-8 bg-heaven-dark/30 backdrop-blur-sm border border-heaven-emerald/10 hover:border-heaven-emerald/30 transition-all duration-500 rounded-lg group hover:bg-heaven-emerald/5 block h-full">
                        <h3 className="text-heaven-emerald text-xs uppercase tracking-[0.3em] font-medium mb-4 group-hover:scale-110 transition-transform duration-500">Eco-Consciousness</h3>
                        <p className="text-heaven-starlight/70 text-sm leading-relaxed font-light italic">
                            "Fostering deep environmental empathy and mindfulness in the natural world."
                        </p>
                    </Link>
                </motion.div>

                <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}>
                    <Link to="/community" className="text-center p-8 bg-heaven-dark/30 backdrop-blur-sm border border-heaven-emerald/10 hover:border-heaven-emerald/30 transition-all duration-500 rounded-lg group hover:bg-heaven-emerald/5 block h-full">
                        <h3 className="text-heaven-emerald text-xs uppercase tracking-[0.3em] font-medium mb-4 group-hover:scale-110 transition-transform duration-500">Community</h3>
                        <p className="text-heaven-starlight/70 text-sm leading-relaxed font-light italic">
                            "Building stronger bonds through earth-architecture, mud houses, and shared living."
                        </p>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Home;
