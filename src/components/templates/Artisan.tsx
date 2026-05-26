import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Phone, Mail, MapPin, Globe, Palette } from 'lucide-react';
import type { UserData } from '../../types';

interface CardProps {
  userData: UserData;
}

export function Artisan({ userData }: CardProps) {
  const { basicDetails, contactDetails, photoSettings, qrSettings, brandingColors, backgroundSettings, previewMode } = userData;
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    const generateQR = async () => {
      const url = qrSettings.customUrl || contactDetails.website || contactDetails.email;
      if (url) {
        const qrSize = previewMode === 'print' ? 60 : qrSettings.size;
        const qr = await QRCode.toDataURL(url, {
          width: qrSize,
          margin: 1,
          color: {
            dark: qrSettings.foregroundColor,
            light: qrSettings.backgroundColor,
          },
          errorCorrectionLevel: qrSettings.errorCorrectionLevel,
        });
        setQrCodeUrl(qr);
      }
    };
    generateQR();
  }, [qrSettings, contactDetails, previewMode]);

  const getBackgroundStyle = (): React.CSSProperties => {
    if (backgroundSettings.type === 'gradient' && backgroundSettings.gradientColors?.length) {
      return {
        background: `linear-gradient(135deg, ${backgroundSettings.gradientColors[0]}, ${backgroundSettings.gradientColors[1]})`,
      };
    }
    return { background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #FCD34D 100%)' };
  };

  const primaryColor = brandingColors.primary || '#B45309';
  const accentColor = brandingColors.accent || '#92400E';

  const getPhotoStyle = () => {
    const base = previewMode === 'print' ? 'w-20 h-20' : 'w-24 h-24';
    return `${base} object-cover`;
  };

  return (
    <div
      className="id-card-container relative overflow-hidden rounded-2xl shadow-2xl"
      style={getBackgroundStyle()}
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJub25lIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMTYzLDEzMywxMDksMC4xKSIvPgo8L3N2Zz4=')] opacity-30" />
      
      <div className="absolute top-0 right-0">
        <svg className="w-24 h-24 text-amber-700/10" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="80" cy="20" r="30" />
          <circle cx="90" cy="50" r="20" />
          <circle cx="70" cy="40" r="15" />
        </svg>
      </div>
      
      <div className="absolute bottom-4 left-4">
        <Palette className="w-6 h-6 text-amber-800/20" />
      </div>
      
      <div className="absolute top-3 left-3">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-amber-900/30" />
          <div className="w-2 h-2 rounded-full bg-amber-800/20" />
          <div className="w-2 h-2 rounded-full bg-amber-700/10" />
        </div>
      </div>
      
      <div className="relative p-5 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div 
              className="absolute inset-0 rounded-2xl transform -rotate-6"
              style={{ 
                background: primaryColor,
                opacity: 0.2
              }}
            />
            {photoSettings.imageData ? (
              <img 
                src={photoSettings.imageData} 
                alt="Profile" 
                className={getPhotoStyle()}
                style={{ borderRadius: '16px', position: 'relative', border: `3px solid ${primaryColor}`, transform: 'rotate(-3deg)' }}
              />
            ) : (
              <div 
                className="w-24 h-24 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(180, 83, 9, 0.15)', border: `3px solid ${primaryColor}`, transform: 'rotate(-3deg)' }}
              >
                <span className="text-3xl font-bold" style={{ color: primaryColor }}>
                  {basicDetails.fullName?.charAt(0) || '?'}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold" style={{ color: primaryColor }}>
              {basicDetails.fullName || 'Your Name'}
            </h2>
            <p className="text-sm font-medium" style={{ color: accentColor }}>
              {basicDetails.designation || 'Designation'}
            </p>
            <p className="text-xs text-amber-900/70 mt-1">
              {basicDetails.companyName || 'Company Name'}
            </p>
            {basicDetails.employeeId && (
              <p 
                className="text-xs mt-2 px-3 py-1 rounded-lg inline-block font-bold"
                style={{ backgroundColor: primaryColor, color: '#FEF3C7' }}
              >
                ✦ {basicDetails.employeeId}
              </p>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {contactDetails.mobileNumber && (
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-xl px-3 py-2 border border-amber-900/10">
                <Phone className="w-3 h-3" style={{ color: primaryColor }} />
                <span style={{ color: primaryColor }}>{contactDetails.mobileNumber}</span>
              </div>
            )}
            {contactDetails.email && (
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-xl px-3 py-2 border border-amber-900/10">
                <Mail className="w-3 h-3" style={{ color: primaryColor }} />
                <span style={{ color: primaryColor }} className="truncate">{contactDetails.email}</span>
              </div>
            )}
            {(contactDetails.city || contactDetails.country) && (
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-xl px-3 py-2 border border-amber-900/10">
                <MapPin className="w-3 h-3" style={{ color: primaryColor }} />
                <span style={{ color: primaryColor }} className="truncate">
                  {contactDetails.city}{contactDetails.city && contactDetails.country && ', '}{contactDetails.country}
                </span>
              </div>
            )}
            {contactDetails.website && (
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-xl px-3 py-2 border border-amber-900/10">
                <Globe className="w-3 h-3" style={{ color: primaryColor }} />
                <span style={{ color: primaryColor }} className="truncate">{contactDetails.website.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-end justify-between mt-3">
          <div>
            {basicDetails.tagline && (
              <p className="text-xs italic text-amber-900/60">
                "{basicDetails.tagline}"
              </p>
            )}
          </div>
          {qrCodeUrl && (
            <div className="bg-white rounded-xl p-1.5 shadow-lg border-2 border-amber-900/20">
              <img src={qrCodeUrl} alt="QR Code" className="w-14 h-14" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}