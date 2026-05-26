import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';
import type { UserData } from '../../types';

interface CardProps {
  userData: UserData;
}

export function FestivalVibe({ userData }: CardProps) {
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
    return { background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4)' };
  };

  const primaryColor = brandingColors.primary || '#FF6B6B';
  const accentColor = brandingColors.accent || '#FFE66D';

  const getPhotoStyle = () => {
    const base = previewMode === 'print' ? 'w-20 h-20' : 'w-24 h-24';
    return `${base} object-cover`;
  };

  return (
    <div
      className="id-card-container relative overflow-hidden rounded-2xl shadow-2xl"
      style={getBackgroundStyle()}
    >
      <div className="absolute inset-0 bg-white/10" />
      
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full blur-xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative p-5 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div 
              className="absolute inset-0 rounded-full blur-md"
              style={{ background: accentColor, opacity: 0.6 }}
            />
            {photoSettings.imageData ? (
              <img 
                src={photoSettings.imageData} 
                alt="Profile" 
                className={getPhotoStyle()}
                style={{ borderRadius: '50%', border: `3px solid white`, position: 'relative' }}
              />
            ) : (
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.3)', border: '3px solid white' }}
              >
                <span className="text-3xl font-bold text-white">
                  {basicDetails.fullName?.charAt(0) || '?'}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-white tracking-wide drop-shadow-lg">
              {basicDetails.fullName || 'Your Name'}
            </h2>
            <p className="text-sm text-white/90 font-medium" style={{ color: accentColor }}>
              {basicDetails.designation || 'Designation'}
            </p>
            <p className="text-xs text-white/80 mt-1">
              {basicDetails.companyName || 'Company Name'}
            </p>
            {basicDetails.employeeId && (
              <p 
                className="text-xs mt-2 px-2 py-0.5 rounded-full inline-block font-bold"
                style={{ backgroundColor: 'white', color: primaryColor }}
              >
                #{basicDetails.employeeId}
              </p>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {contactDetails.mobileNumber && (
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-2 py-1">
                <Phone className="w-3 h-3 text-white" />
                <span className="text-white font-medium">{contactDetails.mobileNumber}</span>
              </div>
            )}
            {contactDetails.email && (
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-2 py-1">
                <Mail className="w-3 h-3 text-white" />
                <span className="text-white font-medium truncate">{contactDetails.email}</span>
              </div>
            )}
            {(contactDetails.city || contactDetails.country) && (
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-2 py-1">
                <MapPin className="w-3 h-3 text-white" />
                <span className="text-white font-medium truncate">
                  {contactDetails.city}{contactDetails.city && contactDetails.country && ', '}{contactDetails.country}
                </span>
              </div>
            )}
            {contactDetails.website && (
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-2 py-1">
                <Globe className="w-3 h-3 text-white" />
                <span className="text-white font-medium truncate">{contactDetails.website.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-end justify-between mt-3">
          <div>
            {basicDetails.tagline && (
              <p className="text-xs italic text-white/80 font-medium">
                "{basicDetails.tagline}"
              </p>
            )}
          </div>
          {qrCodeUrl && (
            <div className="bg-white rounded-xl p-1.5 shadow-lg">
              <img src={qrCodeUrl} alt="QR Code" className="w-14 h-14" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}