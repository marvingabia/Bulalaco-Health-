import { MapPin, ExternalLink } from 'lucide-react';

export default function AmbulanceMap({ ambulance }) {
  const { lat, lng } = ambulance.coordinates;
  
  // OpenStreetMap embed URL
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.01},${lat-0.01},${lng+0.01},${lat+0.01}&layer=mapnik&marker=${lat},${lng}`;
  
  // Google Maps link for opening in new tab
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden relative">
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src={mapUrl}
        style={{ border: 0 }}
        title="Ambulance Location Map"
      />
      
      {/* Overlay with ambulance info */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs z-10">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg text-gray-900">{ambulance.unitNumber}</h3>
            <p className="text-sm text-gray-600 mb-1"><strong>Driver:</strong> {ambulance.driver}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>Status:</strong> {ambulance.status}</p>
            <p className="text-sm text-gray-600"><strong>Location:</strong> {ambulance.location}</p>
          </div>
        </div>
        
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-semibold"
        >
          <ExternalLink className="w-4 h-4" />
          Open in Google Maps
        </a>
      </div>
      
      {/* Coordinates display */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg px-3 py-2 text-xs text-gray-600">
        📍 {lat.toFixed(4)}, {lng.toFixed(4)}
      </div>
    </div>
  );
}
