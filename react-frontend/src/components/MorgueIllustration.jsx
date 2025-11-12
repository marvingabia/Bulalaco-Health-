export default function MorgueIllustration() {
  return (
    <svg
      viewBox="0 0 600 400"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background - Blurred hospital room */}
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#e5e7eb', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#d1d5db', stopOpacity: 1 }} />
        </linearGradient>
        <filter id="blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>
      </defs>
      
      <rect width="600" height="400" fill="url(#bgGradient)" />
      
      {/* Blurred background elements - medical staff */}
      <g filter="url(#blur)" opacity="0.4">
        <circle cx="120" cy="100" r="25" fill="#3b82f6" />
        <rect x="100" y="125" width="40" height="80" fill="#3b82f6" rx="5" />
        <rect x="95" y="140" width="50" height="50" fill="#1e40af" rx="3" />
      </g>
      
      {/* Hospital Bed/Gurney */}
      <rect x="150" y="280" width="400" height="15" fill="#9ca3af" rx="3" />
      <rect x="160" y="295" width="10" height="80" fill="#6b7280" />
      <rect x="530" y="295" width="10" height="80" fill="#6b7280" />
      
      {/* Mattress */}
      <rect x="160" y="265" width="380" height="20" fill="#e5e7eb" rx="2" />
      
      {/* White Sheet - Main body covered */}
      <ellipse cx="350" cy="220" rx="140" ry="50" fill="#ffffff" />
      <rect x="210" y="180" width="280" height="80" fill="#ffffff" />
      
      {/* Sheet folds and shadows */}
      <path d="M 220 180 Q 280 185 340 180 Q 400 185 460 180" 
            stroke="#e5e7eb" strokeWidth="3" fill="none" opacity="0.6" />
      <path d="M 230 200 Q 290 205 350 200 Q 410 205 470 200" 
            stroke="#f3f4f6" strokeWidth="2" fill="none" opacity="0.4" />
      
      {/* Feet visible at bottom - realistic skin tone */}
      <g>
        {/* Left Foot */}
        <ellipse cx="310" cy="250" rx="20" ry="35" fill="#d4a574" />
        <ellipse cx="310" cy="245" rx="18" ry="8" fill="#c99a6e" />
        {/* Toes */}
        <ellipse cx="305" cy="238" rx="3" ry="4" fill="#c99a6e" />
        <ellipse cx="310" cy="237" rx="3" ry="5" fill="#c99a6e" />
        <ellipse cx="315" cy="238" rx="3" ry="4" fill="#c99a6e" />
        
        {/* Right Foot */}
        <ellipse cx="390" cy="250" rx="20" ry="35" fill="#d4a574" />
        <ellipse cx="390" cy="245" rx="18" ry="8" fill="#c99a6e" />
        {/* Toes */}
        <ellipse cx="385" cy="238" rx="3" ry="4" fill="#c99a6e" />
        <ellipse cx="390" cy="237" rx="3" ry="5" fill="#c99a6e" />
        <ellipse cx="395" cy="238" rx="3" ry="4" fill="#c99a6e" />
      </g>
      
      {/* Toe Tag on right foot */}
      <g>
        <rect x="385" y="270" width="30" height="12" fill="#fef3c7" 
              stroke="#f59e0b" strokeWidth="1.5" rx="1" />
        <line x1="400" y1="282" x2="400" y2="290" 
              stroke="#d97706" strokeWidth="1.5" />
        <text x="400" y="279" textAnchor="middle" fill="#92400e" 
              fontSize="8" fontFamily="monospace" fontWeight="bold">
          ID
        </text>
      </g>
      
      {/* Sheet edge detail */}
      <path d="M 210 260 Q 350 265 490 260" 
            stroke="#f9fafb" strokeWidth="4" fill="none" />
    </svg>
  );
}
