import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Link as LinkIcon, Sparkles, Loader2, CheckCircle, AlertCircle, X, RotateCcw, Pencil, Image as ImageIcon } from 'lucide-react';

/**
 * PropertyScraper Component
 * 
 * A modular component for extracting property data from a URL and restyling it.
 * Designed to be self-contained for easy redesign or redesign.
 * 
 * @param {Function} onManifest - Callback when a property is ready to be saved to DB
 */
const PropertyScraper = ({ onManifest }) => {
    const [url, setUrl] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isScraping, setIsScraping] = useState(false);
    const [scrapedData, setScrapedData] = useState(null);
    const [isAligning, setIsAligning] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleScrape = async () => {
        if (!url) {
            setStatus({ type: 'error', message: 'The oracle needs a URL to begin.' });
            return;
        }

        const apiKey = import.meta.env.VITE_FIRECRAWL_API_KEY;
        if (!apiKey) {
            setStatus({ type: 'error', message: 'Configuration Error: VITE_FIRECRAWL_API_KEY is missing. Please check .env.local' });
            return;
        }

        setIsScraping(true);
        setStatus({ type: 'process', message: 'Consulting the Firecrawl digital archives...' });

        try {
            const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    url: url,
                    formats: ['extract'],
                    extract: {
                        prompt: "Extract the property title, price, location (city/area), description, key features (as a list), main image URL, and a list of additional image URLs (gallery). IMPORTANT: For images, look for 'og:image' or 'twitter:image' meta tags if a main image is not obvious. Also check for 'background-image' styles on hero sections or sliders. If you find a slider/carousel, extract all high-quality image URLs from it. Also extract the source URL and try to identify latitude/longitude.",
                        schema: {
                            type: "object",
                            properties: {
                                title: { type: "string" },
                                price: { type: "string" },
                                location: { type: "string" },
                                description: { type: "string" },
                                features: { type: "array", items: { type: "string" } },
                                image_url: { type: "string" },
                                images: { type: "array", items: { type: "string" } },
                                meta_image: { type: "string" },
                                source_url: { type: "string" },
                                latitude: { type: "number" },
                                longitude: { type: "number" }
                            },
                            required: ["title", "description"]
                        }
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Firecrawl API Error: ${response.status}`);
            }

            const data = await response.json();

            if (!data.data || !data.data.extract) {
                throw new Error("No extracted data returned from Firecrawl.");
            }

            const extracted = data.data.extract;

            // Map extracted fields to our internal format
            // Prioritize main extracted image, then meta image, then fallback
            const mainImage = extracted.image_url || extracted.meta_image || "https://placedog.net/800/600?random";

            // Ensure main image is in the gallery if not already present
            let galleryImages = extracted.images || [];
            // Remove nulls and ensure validity
            galleryImages = galleryImages.filter(img => img && img.startsWith('http'));

            if (mainImage && !mainImage.includes('placedog') && !galleryImages.includes(mainImage)) {
                galleryImages = [mainImage, ...galleryImages];
            }

            const mappedData = {
                original_title: extracted.title || "Untitled Property",
                original_description: extracted.description || "No description available.",
                price: extracted.price || "Price on Request",
                location: extracted.location || "Unknown Location",
                image_url: mainImage,
                images: galleryImages,
                features: extracted.features || [],
                source_url: extracted.source_url || url, // Use extracted or fallback to input URL
                latitude: extracted.latitude || null,
                longitude: extracted.longitude || null
            };

            setScrapedData(mappedData);
            setStatus({ type: 'success', message: 'Raw data captured via Firecrawl. Edit or Align to refine.' });
        } catch (error) {
            setStatus({ type: 'error', message: `The extraction ritual failed: ${error.message}` });
        } finally {
            setIsScraping(false);
        }
    };

    const handleAlign = async () => {
        if (!scrapedData) return;

        setIsAligning(true);
        setStatus({ type: 'process', message: 'Infusing with regenerative wisdom...' });

        try {
            // Simulate AI Expansion into a "Sanctuary" tone
            await new Promise(resolve => setTimeout(resolve, 2500));

            const alignedData = {
                ...scrapedData,
                title: `The ${scrapedData.original_title.split(' ')[1] || 'Sanctuary'} at Emerald Ridge`,
                description: `A manifestation of luxury and nature in perfect equilibrium. This ${scrapedData.original_description.toLowerCase().slice(0, 100)}... acts as a bridge between high-living and the ancient wisdom of the rainforest canopy. Every breath taken here is filtered through the vibrant lungs of the jungle, offering a recalibration of the spirit.`,
                features: [
                    "Regenerative Architecture",
                    "Infinity Manifestation Pool",
                    "Solar-Spirit Integration",
                    "Ancient Canopy Proximity",
                    ...scrapedData.features.slice(0, 2)
                ]
            };

            setScrapedData(alignedData);
            setStatus({ type: 'success', message: 'The listing now resonates with the Sanctuary vibration.' });
        } catch (error) {
            setStatus({ type: 'error', message: `The alignment ritual failed: ${error.message}` });
        } finally {
            setIsAligning(false);
        }
    };

    const handleSave = () => {
        if (onManifest && scrapedData) {
            onManifest(scrapedData);
            // reset state
            setUrl('');
            setScrapedData(null);
            setIsEditing(false);
        }
    };

    return (
        <div className="bg-heaven-dark/40 border-2 border-heaven-emerald/10 p-8 rounded-3xl backdrop-blur-2xl shadow-xl">
            <h2 className="text-xl font-medium mb-8 flex items-center gap-3 text-heaven-emerald">
                <Globe size={24} />
                Property Scraper Tool
            </h2>

            <div className="space-y-6">
                {/* URL Input */}
                <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-heaven-emerald/40" size={18} />
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Paste existing property advert URL..."
                        className="w-full bg-heaven-dark/60 border border-heaven-emerald/10 rounded-xl py-4 pl-12 pr-4 focus:border-heaven-emerald/50 focus:bg-heaven-dark/80 focus:outline-none transition-all text-sm placeholder:text-heaven-starlight/10"
                    />
                    <button
                        onClick={handleScrape}
                        disabled={isScraping || !url}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-heaven-emerald text-heaven-dark px-6 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all disabled:opacity-50"
                    >
                        {isScraping ? <Loader2 size={14} className="animate-spin" /> : 'Scrape'}
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {scrapedData && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6 pt-6 border-t border-heaven-emerald/5"
                        >
                            {/* Toggle Edit Mode */}
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className={`flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] uppercase tracking-widest transition-colors ${isEditing ? 'bg-heaven-emerald text-heaven-dark' : 'text-heaven-starlight/40 hover:text-heaven-emerald'
                                        }`}
                                >
                                    <Pencil size={12} />
                                    {isEditing ? 'Done Editing' : 'Edit Data'}
                                </button>
                            </div>

                            {/* Main Image Preview */}
                            <div className="aspect-video relative rounded-2xl overflow-hidden border border-white/5">
                                <img src={scrapedData.image_url} alt="Listing" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-heaven-dark to-transparent opacity-60" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h4 className="text-heaven-starlight font-serif text-lg">{scrapedData.title || scrapedData.original_title}</h4>
                                    <p className="text-heaven-emerald text-xs font-bold uppercase tracking-widest">{scrapedData.location}</p>
                                </div>
                            </div>

                            {/* Edit Fields */}
                            {isEditing && (
                                <div className="space-y-4 p-4 bg-black/20 rounded-xl">
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-heaven-emerald/60">Main Image URL</label>
                                        <input
                                            type="text"
                                            value={scrapedData.image_url}
                                            onChange={(e) => setScrapedData({ ...scrapedData, image_url: e.target.value })}
                                            className="w-full bg-heaven-dark/60 border border-white/5 rounded-lg p-2 text-xs text-heaven-starlight mt-1 focus:border-heaven-emerald/50 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-heaven-emerald/60">Gallery Images (One URL per line)</label>
                                        <textarea
                                            rows={4}
                                            value={scrapedData.images ? scrapedData.images.join('\n') : ''}
                                            onChange={(e) => setScrapedData({ ...scrapedData, images: e.target.value.split('\n').filter(s => s.trim()) })}
                                            className="w-full bg-heaven-dark/60 border border-white/5 rounded-lg p-2 text-xs text-heaven-starlight mt-1 focus:border-heaven-emerald/50 outline-none font-mono"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Gallery Preview */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-heaven-emerald/60">
                                    <ImageIcon size={12} />
                                    <span>Gallery Preview ({scrapedData.images?.length || 0})</span>
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    {scrapedData.images && scrapedData.images.map((img, idx) => (
                                        <div key={idx} className="aspect-square rounded-lg overflow-hidden border border-white/5 relative group">
                                            <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                                            {isEditing && (
                                                <button
                                                    onClick={() => setScrapedData({
                                                        ...scrapedData,
                                                        images: scrapedData.images.filter((_, i) => i !== idx)
                                                    })}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X size={8} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] uppercase tracking-[0.3em] text-heaven-emerald/60">Description</label>
                                        <p className="text-sm text-heaven-starlight/60 italic leading-relaxed mt-2">
                                            {scrapedData.description || scrapedData.original_description}
                                        </p>
                                    </div>
                                    <div className="flex gap-4">
                                        <div>
                                            <label className="text-[10px] uppercase tracking-[0.3em] text-heaven-emerald/60">Price</label>
                                            <p className="text-sm font-bold text-heaven-starlight">{scrapedData.price}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-[0.3em] text-heaven-emerald/60">Features</label>
                                    <ul className="grid grid-cols-2 gap-2">
                                        {(scrapedData.features || []).map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-[10px] text-heaven-starlight/40 uppercase tracking-widest">
                                                <div className="w-1 h-1 bg-heaven-emerald rounded-full" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="pt-6">
                                        {!scrapedData.title ? (
                                            <button
                                                onClick={handleAlign}
                                                disabled={isAligning}
                                                className="w-full py-4 bg-heaven-emerald/10 border border-heaven-emerald/30 text-heaven-emerald rounded-xl hover:bg-heaven-emerald/20 transition-all flex items-center justify-center gap-3 font-bold tracking-[0.2em] uppercase text-[10px]"
                                            >
                                                {isAligning ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                                                Align with Sanctuary
                                            </button>
                                        ) : (
                                            <div className="space-y-3">
                                                <button
                                                    onClick={handleSave}
                                                    className="w-full py-4 bg-heaven-emerald text-heaven-dark rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 font-black tracking-[0.2em] uppercase text-[10px] shadow-lg shadow-heaven-emerald/20"
                                                >
                                                    <CheckCircle size={16} />
                                                    Manifest into Listings
                                                </button>
                                                <button
                                                    onClick={() => setScrapedData({ ...scrapedData, title: null, description: null })}
                                                    className="w-full py-2 text-heaven-starlight/20 hover:text-heaven-starlight/40 transition-colors text-[9px] uppercase tracking-widest flex items-center justify-center gap-2"
                                                >
                                                    <RotateCcw size={12} />
                                                    Reset Alignment
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {status.message && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className={`p-4 rounded-xl border flex items-center gap-3 ${status.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-200' : 'bg-heaven-emerald/5 border-heaven-emerald/10 text-heaven-emerald/80'
                            }`}
                    >
                        {status.type === 'error' ? <AlertCircle size={18} /> : <Loader2 size={18} className={status.type === 'process' ? 'animate-spin' : ''} />}
                        <span className="text-[11px] uppercase tracking-widest font-medium">{status.message}</span>
                        <button onClick={() => setStatus({ type: '', message: '' })} className="ml-auto opacity-40 hover:opacity-100">
                            <X size={14} />
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default PropertyScraper;
