import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Phone, Mail, MapPin, Globe, Sparkles } from 'lucide-react';
import type { UserData } from '../../types';

interface CardProps {
  userData: UserData;
}

export function CreativePulse({ userData }: CardProps) {
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
    return { background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 50%, #F97316 100%)' };
  };

  const primaryColor = brandingColors.primary || '#F97316';
  const accentColor = brandingColors.accent || '#FBBF24';

  const getPhotoStyle = () => {
    const base = previewMode === 'print' ? 'w-20 h-20' : 'w-24 h-24';
    return `${base} object-cover`;
  };

  return (
    <div
      className="id-card-container relative overflow-hidden rounded-2xl shadow-2xl"
      style={getBackgroundStyle()}
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2" />
      </div>
      
      <div className="absolute -rotate-12 top-0 right-8 text-white/10 text-6xl font-black tracking-widest">
        CREATIVE
      </div>
      
      <div className="relative p-5 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div 
              className="absolute inset-0 rounded-full transform rotate-45"
              style={{ 
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                opacity: 0.5,
                filter: 'blur(8px)'
              }}
            />
            {photoSettings.imageData ? (
              <img 
                src={photoSettings.imageData} 
                alt="Profile" 
                className={getPhotoStyle()}
                style={{ borderRadius: '50%', position: 'relative', border: '4px solid white', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
              />
            ) : (
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.3)', border: '4px solid white', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
              >
                <span className="text-3xl font-bold text-white">
                  {basicDetails.fullName?.charAt(0) || '?'}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <h2 className="text-xl font-bold text-white tracking-wide">
                {basicDetails.fullName || 'Your Name'}
              </h2>
            </div>
            <p className="text-sm font-semibold text-white/90">
              {basicDetails.designation || 'Designation'}
            </p>
            <p className="text-xs text-white/70 mt-1 font-medium">
              {basicDetails.companyName || 'Company Name'}
            </p>
            {basicDetails.employeeId && (
              <p 
                className="text-xs mt-2 px-3 py-1 rounded-full inline-block font-bold bg-yellow-400 text-purple-900"
              >
                ★ {basicDetails.employeeId}
              </p>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {contactDetails.mobileNumber && (
              <div className="flex items-center gap-2 bg-white/25 backdrop-blur-sm rounded-xl px-3 py-2">
                <Phone className="w-3 h-3 text-white" />
                <span className="text-white font-medium">{contactDetails.mobileNumber}</span>
              </div>
            )}
            {contactDetails.email && (
              <div className="flex items-center gap-2 bg-white/25 backdrop-blur-sm rounded-xl px-3 py-2">
                <Mail className="w-3 h-3 text-white" />
                <span className="text-white font-medium truncate">{contactDetails.email}</span>
              </div>
            )}
            {(contactDetails.city || contactDetails.country) && (
              <div className="flex items-center gap-2 bg-white/25 backdrop-blur-sm rounded-xl px-3 py-2">
                <MapPin className="w-3 h-3 text-white" />
                <span className="text-white font-medium truncate">
                  {contactDetails.city}{contactDetails.city && contactDetails.country && ', '}{contactDetails.country}
                </span>
              </div>
            )}
            {contactDetails.website && (
              <div className="flex items-center gap-2 bg-white/25 backdrop-blur-sm rounded-xl px-3 py-2">
                <Globe className="w-3 h-3 text-white" />
                <span className="text-white font-medium truncate">{contactDetails.website.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-end justify-between mt-3">
          <div>
            {basicDetails.tagline && (
              <p className="text-xs italic text-white/70 font-medium">
                "{basicDetails.tagline}"
              </p>
            )}
          </div>
          {qrCodeUrl && (
            <div className="bg-white rounded-xl p-1.5 shadow-xl transform rotate-3">
              <img src={qrCodeUrl} alt="QR Code" className="w-14 h-14" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}