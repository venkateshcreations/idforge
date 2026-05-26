import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Phone, Mail, MapPin, Globe, Zap } from 'lucide-react';
import type { UserData } from '../../types';

interface CardProps {
  userData: UserData;
}

export function TechSpark({ userData }: CardProps) {
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
    return { 
      backgroundColor: '#0D1117',
      backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 51, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)'
    };
  };

  const accentColor = brandingColors.accent || '#84CC16';
  const primaryColor = brandingColors.primary || '#22D3EE';

  const getPhotoStyle = () => {
    const base = previewMode === 'print' ? 'w-20 h-20' : 'w-24 h-24';
    return `${base} object-cover`;
  };

  return (
    <div
      className="id-card-container relative overflow-hidden rounded-2xl shadow-2xl"
      style={getBackgroundStyle()}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime-400 via-cyan-400 to-violet-500" />
      
      <div className="absolute top-4 right-4">
        <Zap className="w-5 h-5 text-lime-400 animate-pulse" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-lime-500/10 to-transparent" />
      
      <div className="relative p-5 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div 
              className="absolute inset-0 rounded-2xl animate-pulse"
              style={{ 
                background: `linear-gradient(135deg, ${accentColor}, ${primaryColor})`,
                opacity: 0.3,
                filter: 'blur(10px)'
              }}
            />
            {photoSettings.imageData ? (
              <img 
                src={photoSettings.imageData} 
                alt="Profile" 
                className={getPhotoStyle()}
                style={{ borderRadius: '16px', position: 'relative', border: `2px solid ${accentColor}` }}
              />
            ) : (
              <div 
                className="w-24 h-24 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(132, 204, 22, 0.15)', border: `2px solid ${accentColor}` }}
              >
                <span className="text-3xl font-bold" style={{ color: accentColor }}>
                  {basicDetails.fullName?.charAt(0) || '?'}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-white tracking-wide">
              {basicDetails.fullName || 'Your Name'}
            </h2>
            <p className="text-sm font-medium" style={{ color: primaryColor }}>
              {basicDetails.designation || 'Designation'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {basicDetails.companyName || 'Company Name'}
            </p>
            {basicDetails.employeeId && (
              <p 
                className="text-xs mt-2 px-2 py-0.5 rounded font-mono inline-block"
                style={{ backgroundColor: accentColor + '20', color: accentColor }}
              >
                ⟨ {basicDetails.employeeId} ⟩
              </p>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {contactDetails.mobileNumber && (
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3" style={{ color: primaryColor }} />
                <span className="text-gray-400">{contactDetails.mobileNumber}</span>
              </div>
            )}
            {contactDetails.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3" style={{ color: primaryColor }} />
                <span className="text-gray-400 truncate">{contactDetails.email}</span>
              </div>
            )}
            {(contactDetails.city || contactDetails.country) && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" style={{ color: primaryColor }} />
                <span className="text-gray-400 truncate">
                  {contactDetails.city}{contactDetails.city && contactDetails.country && ', '}{contactDetails.country}
                </span>
              </div>
            )}
            {contactDetails.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-3 h-3" style={{ color: primaryColor }} />
                <span className="text-gray-400 truncate">{contactDetails.website.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-end justify-between mt-3">
          <div>
            {basicDetails.tagline && (
              <p className="text-xs italic text-gray-600">
                {basicDetails.tagline}
              </p>
            )}
          </div>
          {qrCodeUrl && (
            <div className="relative">
              <div 
                className="absolute inset-0 rounded-lg animate-pulse"
                style={{ 
                  background: accentColor,
                  opacity: 0.3,
                  filter: 'blur(8px)'
                }}
              />
              <div className="relative bg-black/50 backdrop-blur-sm rounded-lg p-1.5 border border-lime-500/30">
                <img src={qrCodeUrl} alt="QR Code" className="w-14 h-14" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}