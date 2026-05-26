interface ColorfulIconProps {
  className?: string;
}

export function UserIcon({ className }: ColorfulIconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill="url(#userGradient)" />
      <path d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20" stroke="url(#userGradient)" strokeWidth="2.5" strokeLinecap="round" />
      <defs>
        <linearGradient id="userGradient" x1="4" y1="8" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function PhoneIcon({ className }: ColorfulIconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="2" width="14" height="20" rx="3" fill="url(#phoneGradient)" />
      <path d="M9 22H15" stroke="url(#phoneGradient)" strokeWidth="2" strokeLinecap="round" />
      <defs>
        <linearGradient id="phoneGradient" x1="5" y1="2" x2="19" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function GlobeIcon({ className }: ColorfulIconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" fill="url(#globeGradient)" />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M3 12H21" stroke="white" strokeWidth="1.5" />
      <path d="M12 3C13.5 5 14 7 14 9C14 11 13.5 13 12 15" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M12 3C10.5 5 10 7 10 9C10 11 10.5 13 12 15" stroke="white" strokeWidth="1.5" fill="none" />
      <defs>
        <linearGradient id="globeGradient" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ImageIcon({ className }: ColorfulIconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="url(#imageGradient)" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="white" />
      <path d="M21 15L16 10L8 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <defs>
        <linearGradient id="imageGradient" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function QRIcon({ className }: ColorfulIconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1" fill="url(#qrGradient1)" />
      <rect x="3" y="14" width="7" height="7" rx="1" fill="url(#qrGradient1)" />
      <rect x="14" y="3" width="7" height="7" rx="1" fill="url(#qrGradient1)" />
      <rect x="14" y="14" width="3" height="3" fill="#1D4ED8" />
      <rect x="18" y="14" width="3" height="3" fill="#3B82F6" />
      <rect x="14" y="18" width="3" height="3" fill="#60A5FA" />
      <rect x="18" y="18" width="3" height="3" fill="#93C5FD" />
      <defs>
        <linearGradient id="qrGradient1" x1="3" y1="3" x2="10" y2="10" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EC4899" />
          <stop offset="1" stopColor="#DB2777" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function TemplateIcon({ className }: ColorfulIconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8" height="8" rx="1.5" fill="url(#templateGradient1)" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" fill="url(#templateGradient2)" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" fill="url(#templateGradient2)" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" fill="url(#templateGradient1)" />
      <defs>
        <linearGradient id="templateGradient1" x1="3" y1="3" x2="11" y2="11" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="templateGradient2" x1="13" y1="13" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A855F7" />
          <stop offset="1" stopColor="#9333EA" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function PaletteIcon({ className }: ColorfulIconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" fill="url(#paletteGradient)" />
      <circle cx="12" cy="8" r="1.5" fill="#FBBF24" />
      <circle cx="8" cy="13" r="1.5" fill="#F472B6" />
      <circle cx="16" cy="13" r="1.5" fill="#34D399" />
      <circle cx="12" cy="16" r="1.5" fill="#60A5FA" />
      <defs>
        <linearGradient id="paletteGradient" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EF4444" />
          <stop offset="0.5" stopColor="#F97316" />
          <stop offset="1" stopColor="#FBBF24" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LayersIcon({ className }: ColorfulIconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7V12C3 16.55 6.84 20.74 12 22C17.16 20.74 21 16.55 21 12V7L12 2Z" fill="url(#layersGradient1)" />
      <path d="M12 2L3 7V12C3 16.55 6.84 20.74 12 22" stroke="url(#layersGradient2)" strokeWidth="1.5" fill="none" />
      <path d="M12 6L6 9V12C6 14.5 8.24 16.84 12 18" stroke="url(#layersGradient2)" strokeWidth="1.5" fill="none" />
      <defs>
        <linearGradient id="layersGradient1" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06B6D4" />
          <stop offset="1" stopColor="#0891B2" />
        </linearGradient>
        <linearGradient id="layersGradient2" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#67E8F9" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function EnterpriseIcon({ className }: ColorfulIconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 21h18M3 7v14M21 7v14M6 7V4a1 1 0 011-1h10a1 1 0 011 1v3M9 21v-4a1 1 0 011-1h4a1 1 0 011 1v4" stroke="url(#enterpriseGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="enterpriseGradient" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
    </svg>
  );
}