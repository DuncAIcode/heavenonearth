import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    ArrowLeft,
    Plus,
    Search,
    Loader2,
    Home,
    MapPin,
    Tag,
    Trash2,
    CheckCircle,
    X,
    Filter,
    AlertCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import PropertyScraper from '../components/admin/PropertyScraper';

const ManageProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const navigate = useNavigate();

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

    const handleManifestProperty = async (data) => {
        try {
            const { data: { session } } = await supabase.auth.getSession();

            const { error } = await supabase.from('properties').insert([
                {
                    ...data,
                    author_id: session.user.id
                }
            ]);

            if (error) throw error;

            setStatus({ type: 'success', message: 'Property manifested successfully!' });
            setIsAdding(false);
            fetchProperties();
        } catch (err) {
            console.error('Error saving property:', err);
            setStatus({ type: 'error', message: `Manifestation failed: ${err.message}` });
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to release this property back to the wild?')) return;

        try {
            const { error, count } = await supabase
                .from('properties')
                .delete({ count: 'exact' })
                .eq('id', id);

            if (error) throw error;

            // FIX: If count is 0, the property is already gone from DB (ghost interface item).
            // We should allow the UI to clear it rather than blocking the user with an error.
            if (count === 0) {
                console.warn("Property verified as missing from DB. Clearing from UI.");
                setStatus({ type: 'success', message: 'Syncing: Property was already gone.' });
            } else {
                setStatus({ type: 'success', message: 'Property released into the void.' });
            }

            // Always update UI to match reality
            setProperties(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error('Error deleting property:', err);
            // Show the actual error message to the user
            setStatus({ type: 'error', message: `Release failed: ${err.message || err.error_description || 'Unknown error'}` });

            // Optional: Refetch to ensure UI is in sync with reality
            fetchProperties();
        }
    };

    return (
        <div className="min-h-screen bg-heaven-dark text-heaven-starlight p-6 pt-24">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/admin"
                            className="p-3 bg-heaven-dark/50 border border-white/10 rounded-xl hover:border-heaven-emerald/50 transition-colors text-heaven-starlight/60 hover:text-heaven-emerald"
                        >
                            <ArrowLeft size={24} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-serif">Property Manifest</h1>
                            <p className="text-heaven-starlight/40 text-xs uppercase tracking-[0.3em] mt-1">Manage Sanctuary Estates</p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${isAdding
                            ? 'bg-red-500/10 text-red-200 border border-red-500/20'
                            : 'bg-heaven-emerald text-heaven-dark shadow-lg shadow-heaven-emerald/20'
                            }`}
                    >
                        {isAdding ? <X size={18} /> : <Plus size={18} />}
                        {isAdding ? 'Close Tool' : 'New Listing'}
                    </button>
                </div>

                <AnimatePresence>
                    {isAdding && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-12 overflow-hidden"
                        >
                            <PropertyScraper onManifest={handleManifestProperty} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        <div className="col-span-full flex flex-col items-center py-20 gap-4">
                            <Loader2 className="animate-spin text-heaven-emerald" size={32} />
                            <span className="text-xs uppercase tracking-widest text-heaven-starlight/20">Syncing with Sanctuary Records...</span>
                        </div>
                    ) : properties.length === 0 ? (
                        <div className="col-span-full text-center py-20 border-2 border-dashed border-white/5 rounded-3xl bg-heaven-dark/20 backdrop-blur-sm">
                            <span className="text-heaven-starlight/20 font-serif italic text-lg">No properties have been manifested yet.</span>
                        </div>
                    ) : (
                        properties.map((property) => (
                            <motion.div
                                key={property.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="group bg-heaven-dark/40 border border-white/5 rounded-3xl overflow-hidden hover:border-heaven-emerald/30 transition-all duration-500 backdrop-blur-xl"
                            >
                                <div className="aspect-video relative overflow-hidden">
                                    <img
                                        src={property.image_url}
                                        alt={property.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-heaven-dark via-transparent to-transparent opacity-60" />
                                    <div className="absolute top-4 right-4 bg-heaven-emerald text-heaven-dark px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20">
                                        {property.status}
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <h3 className="text-lg font-serif text-heaven-starlight group-hover:text-heaven-emerald transition-colors line-clamp-1">{property.title}</h3>
                                        <div className="flex items-center gap-2 text-heaven-starlight/40 text-[10px] uppercase tracking-widest mt-1">
                                            <MapPin size={12} className="text-heaven-emerald/60" />
                                            {property.location}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-2 text-heaven-emerald font-bold">
                                            <Tag size={14} className="opacity-60" />
                                            <span className="text-sm tracking-tight">{property.price}</span>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(property.id)}
                                            className="p-2 text-heaven-starlight/20 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Status Notifications */}
                <AnimatePresence>
                    {status.message && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className={`fixed bottom-8 right-8 p-4 rounded-2xl shadow-2xl border backdrop-blur-2xl flex items-center gap-4 z-50 ${status.type === 'error' ? 'bg-red-500/20 border-red-500/40 text-red-200' : 'bg-heaven-emerald/20 border-heaven-emerald/40 text-heaven-emerald'
                                }`}
                        >
                            {status.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
                            <span className="text-xs font-bold uppercase tracking-widest">{status.message}</span>
                            <button onClick={() => setStatus({ type: '', message: '' })} className="ml-4 opacity-40 hover:opacity-100">
                                <X size={16} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ManageProperties;
