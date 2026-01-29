import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ArrowRight } from 'lucide-react';

// Fix Leaflet Default Icon - Use CDN for reliability in all build environments

const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

/**
 * PropertyMap Component
 * 
 * Current Implementation: Leaflet (OpenStreetMap)
 * Future Capability: Can be swapped for Google Map implementation.
 * 
 * To switch to Google Maps:
 * 1. Install @vis.gl/react-google-maps
 * 2. Replace the render of this component with the API provided GoogleMap component
 * 3. Ensure the props interface (properties, onSelect) remains consistent
 */
const PropertyMap = ({ properties, onSelectProperty, onViewList }) => {
    // Default Center (Costa Rica)
    const defaultCenter = [9.7489, -83.7534];

    console.log("PropertyMap received properties:", properties);

    const validProperties = properties.filter(p => {
        const hasCoords = p.latitude && p.longitude;
        if (!hasCoords) {
            // verbose check to help debugging
            // console.log(`Property ${p.title} missing coords:`, p.latitude, p.longitude);
        }
        return hasCoords;
    });

    console.log("Properties with coordinates:", validProperties.length);

    return (
        <div className="h-[700px] rounded-[3rem] overflow-hidden border border-heaven-emerald/20 shadow-2xl relative z-0">
            <MapContainer
                center={defaultCenter}
                zoom={8}
                style={{ height: '100%', width: '100%', borderRadius: '3rem' }}
                scrollWheelZoom={false}
                className="z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {validProperties.map(property => {
                    const lat = parseFloat(property.latitude);
                    const lng = parseFloat(property.longitude);

                    // Double check valid numbers
                    if (isNaN(lat) || isNaN(lng)) return null;

                    return (
                        <Marker
                            key={property.id}
                            position={[lat, lng]}
                            icon={customIcon}
                            eventHandlers={{
                                click: () => {
                                    // Optional: auto-select on click if desired, 
                                    // currently handled by popup interaction
                                },
                            }}
                        >
                            <Popup className="heaven-popup">
                                <div className="text-heaven-dark min-w-[200px]">
                                    <h3 className="font-serif font-bold text-lg mb-1">{property.title}</h3>
                                    <p className="text-xs uppercase tracking-widest text-heaven-emerald mb-2 font-bold">{property.price}</p>
                                    <img src={property.image_url} alt={property.title} className="w-full h-24 object-cover rounded-lg mb-3" />

                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => onSelectProperty(property)}
                                            className="w-full py-2 bg-heaven-emerald text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-heaven-emerald/80"
                                        >
                                            View Details
                                        </button>
                                        {property.source_url && (
                                            <a
                                                href={property.source_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block w-full py-2 text-center bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-gray-200"
                                            >
                                                Original Listing
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>

            {/* Map Overlay Controls */}
            <div className="absolute top-6 left-6 z-[1000] pointer-events-none">
                <div className="bg-heaven-dark/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-heaven-emerald/20 pointer-events-auto">
                    <h3 className="text-heaven-emerald font-serif text-xl">Sanctuary Map</h3>
                    <p className="text-heaven-starlight/60 text-xs mt-1">Explore located havnes</p>
                </div>
            </div>

            <div className="absolute bottom-6 left-6 z-[1000] pointer-events-none">
                <button
                    onClick={onViewList}
                    className="pointer-events-auto px-6 py-3 bg-heaven-dark text-heaven-starlight border border-heaven-starlight/20 rounded-xl flex items-center gap-2 hover:bg-heaven-starlight hover:text-heaven-dark transition-all text-xs font-bold uppercase tracking-widest shadow-xl"
                >
                    <ArrowRight className="rotate-180" size={14} />
                    Back to List
                </button>
            </div>
        </div>
    );
};

export default PropertyMap;
