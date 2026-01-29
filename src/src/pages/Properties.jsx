import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home,
    MapPin,
    Tag,
    Sparkles,
    Info,
    ArrowRight,
    Loader2,
    Calendar,
    Users,
    Trees as Tree
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProperty, setSelectedProperty] = useState(null);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('properties')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProperties(data || []);
        } catch (err) {
            console.error('Error fetching properties:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-heaven-dark text-heaven-starlight overflow-hidden pt-24 pb-20">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-heaven-emerald/5 blur-[120px] rounded-full" />
                <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-heaven-emerald/5 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-heaven-emerald/10 border border-heaven-emerald/20 text-heaven-emerald text-[10px] font-bold uppercase tracking-[0.3em] mb-6"
                    >
                        <Sparkles size={12} />
                        Sanctuary Manifest
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-serif mb-6 leading-tight"
                    >
                        Dwellings of the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-heaven-emerald to-heaven-emerald/40 italic">New Earth</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-heaven-starlight/40 max-w-2xl mx-auto text-lg font-light leading-relaxed font-serif"
                    >
                        Hand-selected estates restyled for the regenerative soul. Each listing is an invitation to harmonize with the wild.
                    </motion.p>
                </div>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {loading ? (
                        <div className="col-span-full py-40 flex flex-col items-center gap-6">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                                className="p-4 rounded-full bg-heaven-emerald/5 border border-heaven-emerald/20"
                            >
                                <Loader2 className="text-heaven-emerald" size={40} />
                            </motion.div>
                            <span className="text-xs uppercase tracking-[0.4em] text-heaven-emerald animate-pulse">Scanning the Ether...</span>
                        </div>
                    ) : properties.length === 0 ? (
                        <div className="col-span-full py-40 text-center border border-white/5 bg-white/5 backdrop-blur-md rounded-[3rem]">
                            <h2 className="text-2xl font-serif text-heaven-starlight/20 italic">The manifest is currently still. Check back as new sanctuaries emerge.</h2>
                        </div>
                    ) : (
                        properties.map((property, index) => (
                            <motion.div
                                key={property.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group cursor-pointer"
                                onClick={() => setSelectedProperty(property)}
                            >
                                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 border border-white/10 group-hover:border-heaven-emerald/40 transition-all duration-700 shadow-2xl">
                                    <img
                                        src={property.image_url}
                                        alt={property.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-heaven-dark via-transparent to-transparent opacity-80" />

                                    <div className="absolute top-6 right-6">
                                        <div className="px-4 py-2 bg-heaven-dark/60 backdrop-blur-md border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-heaven-emerald">
                                            {property.status}
                                        </div>
                                    </div>

                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="flex items-center gap-2 text-heaven-emerald/80 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">
                                            <MapPin size={12} />
                                            {property.location}
                                        </div>
                                        <h3 className="text-2xl font-serif text-heaven-starlight leading-tight group-hover:text-heaven-emerald transition-colors">{property.title}</h3>
                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="text-heaven-starlight/60 font-serif italic text-lg">{property.price}</span>
                                            <div className="flex items-center gap-2 text-heaven-emerald text-xs uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                                Explore
                                                <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            {/* Detailed Property Modal */}
            <AnimatePresence>
                {selectedProperty && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 overflow-y-auto"
                    >
                        <div
                            className="absolute inset-0 bg-heaven-dark/95 backdrop-blur-2xl"
                            onClick={() => setSelectedProperty(null)}
                        />

                        <motion.div
                            initial={{ scale: 0.9, y: 40, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 40, opacity: 0 }}
                            className="relative z-10 w-full max-w-6xl bg-heaven-dark border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.1)] flex flex-col md:flex-row"
                        >
                            {/* Image Section */}
                            <div className="w-full md:w-1/2 aspect-square md:aspect-auto relative">
                                <img
                                    src={selectedProperty.image_url}
                                    alt={selectedProperty.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-heaven-dark to-transparent" />
                                <button
                                    onClick={() => setSelectedProperty(null)}
                                    className="absolute top-8 left-8 p-3 bg-heaven-dark/60 backdrop-blur-md border border-white/10 rounded-full hover:bg-heaven-emerald transition-colors"
                                >
                                    <ArrowRight className="rotate-180" size={24} />
                                </button>
                            </div>

                            {/* Content Section */}
                            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                                <div className="mb-8">
                                    <div className="flex items-center gap-3 text-heaven-emerald text-xs font-bold uppercase tracking-widest mb-4">
                                        <Tree size={16} />
                                        Living Sanctuary
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">{selectedProperty.title}</h2>
                                    <div className="flex items-center gap-4 py-4 border-y border-white/5 mb-6">
                                        <div className="flex items-center gap-2 text-heaven-starlight/40 text-sm italic font-serif">
                                            <MapPin size={16} className="text-heaven-emerald" />
                                            {selectedProperty.location}
                                        </div>
                                        <div className="w-px h-4 bg-white/10" />
                                        <div className="text-heaven-emerald font-bold text-lg">{selectedProperty.price}</div>
                                    </div>
                                    <p className="text-heaven-starlight/60 text-lg leading-relaxed font-serif italic mb-8">
                                        "{selectedProperty.description}"
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-6 mb-12">
                                    {selectedProperty.features?.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3 text-heaven-starlight/40">
                                            <div className="w-1.5 h-1.5 rounded-full bg-heaven-emerald" />
                                            <span className="text-[10px] uppercase tracking-widest font-bold">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full py-5 bg-heaven-emerald text-heaven-dark font-bold uppercase tracking-[0.3em] text-xs rounded-2xl shadow-xl shadow-heaven-emerald/20 hover:scale-[1.02] transition-transform active:scale-95">
                                    Inquire for Passage
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Properties;
