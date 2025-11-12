export default function AmbulanceIllustration() {
  return (
    <svg
      viewBox="0 0 800 500"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="800" height="500" fill="#f8f9fa" />
      
      {/* Shadow */}
      <ellipse cx="400" cy="460" rx="280" ry="30" fill="#00000015" />
      
      {/* Ambulance Body - White/Red */}
      <g>
        {/* Main cabin - White */}
        <rect x="150" y="200" width="280" height="180" fill="#ffffff" stroke="#d1d5db" strokeWidth="3" rx="8" />
        
        {/* Front cabin - Red */}
        <path d="M 430 250 L 530 250 L 560 280 L 560 380 L 430 380 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="3" />
        
        {/* Windshield */}
        <path d="M 440 260 L 520 260 L 540 280 L 540 320 L 440 320 Z" fill="#60a5fa" opacity="0.6" stroke="#1e40af" strokeWidth="2" />
        
        {/* Side windows */}
        <rect x="170" y="220" width="70" height="80" fill="#60a5fa" opacity="0.6" stroke="#1e40af" strokeWidth="2" rx="4" />
        <rect x="260" y="220" width="70" height="80" fill="#60a5fa" opacity="0.6" stroke="#1e40af" strokeWidth="2" rx="4" />
        <rect x="350" y="220" width="60" height="80" fill="#60a5fa" opacity="0.6" stroke="#1e40af" strokeWidth="2" rx="4" />
        
        {/* Red stripe */}
        <rect x="150" y="310" width="280" height="25" fill="#dc2626" />
        <rect x="150" y="340" width="280" height="8" fill="#1e40af" />
        
        {/* Star of Life symbol */}
        <g transform="translate(300, 260)">
          <circle cx="0" cy="0" r="35" fill="#1e40af" />
          <path d="M 0,-25 L 5,-8 L 22,-8 L 8,2 L 13,19 L 0,9 L -13,19 L -8,2 L -22,-8 L -5,-8 Z" fill="#ffffff" />
        </g>
        
        {/* Door lines */}
        <line x1="240" y1="200" x2="240" y2="380" stroke="#9ca3af" strokeWidth="2" />
        <line x1="330" y1="200" x2="330" y2="380" stroke="#9ca3af" strokeWidth="2" />
        
        {/* Door handles */}
        <rect x="235" y="280" width="10" height="30" fill="#6b7280" rx="2" />
        <rect x="325" y="280" width="10" height="30" fill="#6b7280" rx="2" />
        
        {/* Lights on top */}
        <rect x="200" y="180" width="40" height="20" fill="#ef4444" rx="4" />
        <rect x="250" y="180" width="40" height="20" fill="#fbbf24" rx="4" />
        <rect x="300" y="180" width="40" height="20" fill="#ef4444" rx="4" />
        
        {/* Front grille */}
        <rect x="540" y="300" width="20" height="60" fill="#374151" rx="2" />
        <line x1="545" y1="310" x2="545" y2="350" stroke="#6b7280" strokeWidth="2" />
        <line x1="555" y1="310" x2="555" y2="350" stroke="#6b7280" strokeWidth="2" />
        
        {/* Headlights */}
        <circle cx="550" cy="270" r="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <circle cx="550" cy="365" r="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        
        {/* Side mirror */}
        <rect x="430" y="265" width="15" height="25" fill="#6b7280" rx="3" />
        <rect x="420" y="270" width="10" height="15" fill="#60a5fa" opacity="0.6" rx="2" />
        
        {/* Wheels */}
        <g>
          {/* Front wheel */}
          <circle cx="480" cy="380" r="45" fill="#1f2937" />
          <circle cx="480" cy="380" r="35" fill="#374151" />
          <circle cx="480" cy="380" r="20" fill="#6b7280" />
          <circle cx="480" cy="380" r="10" fill="#9ca3af" />
          
          {/* Back wheel */}
          <circle cx="220" cy="380" r="45" fill="#1f2937" />
          <circle cx="220" cy="380" r="35" fill="#374151" />
          <circle cx="220" cy="380" r="20" fill="#6b7280" />
          <circle cx="220" cy="380" r="10" fill="#9ca3af" />
        </g>
        
        {/* Wheel arches */}
        <path d="M 175 380 Q 220 340 265 380" fill="none" stroke="#9ca3af" strokeWidth="3" />
        <path d="M 435 380 Q 480 340 525 380" fill="none" stroke="#9ca3af" strokeWidth="3" />
        
        {/* Antenna */}
        <line x1="380" y1="200" x2="380" y2="150" stroke="#374151" strokeWidth="3" />
        <circle cx="380" cy="145" r="5" fill="#ef4444" />
        
        {/* AMBULANCE text */}
        <text x="280" y="370" fontSize="24" fontWeight="bold" fill="#dc2626" fontFamily="Arial, sans-serif">
          AMBULANCE
        </text>
      </g>
    </svg>
  );
}
