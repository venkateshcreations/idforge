import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';
import type { UserData } from '../../types';

interface CardProps {
  userData: UserData;
}

export function RetroWave({ userData }: CardProps) {
  const { basicDetails, contactDetails, photoSettings, qrSettings, backgroundSettings, previewMode } = userData;
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
        background: `linear-gradient(180deg, ${backgroundSettings.gradientColors[0]}, ${backgroundSettings.gradientColors[1]})`,
      };
    }
    return { 
      background: 'linear-gradient(180deg, #1a0a2e 0%, #16213e 50%, #0f3460 100%)',
      backgroundImage: `
        linear-gradient(180deg, #1a0a2e 0%, #16213e 50%, #0f3460 100%),
        repeating-linear-gradient(transparent 0px, transparent 2px, rgba(233, 69, 96, 0.1) 2px, rgba(233, 69, 96, 0.1) 4px)
      `
    };
  };

  const pink = '#FF4580';
  const cyan = '#00F5FF';
  const purple = '#9D4EDD';

  const getPhotoStyle = () => {
    const base = previewMode === 'print' ? 'w-20 h-20' : 'w-24 h-24';
    return `${base} object-cover`;
  };

  return (
    <div
      className="id-card-container relative overflow-hidden rounded-2xl shadow-2xl"
      style={getBackgroundStyle()}
    >
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-pink-500/20 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent opacity-50" style={{ transform: 'perspective(200px) rotateX(60deg)' }} />
      </div>
      
      <div className="relative p-5 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div 
              className="absolute inset-0 rounded-full"
              style={{ 
                background: `linear-gradient(135deg, ${pink}, ${cyan})`,
                opacity: 0.4,
                filter: 'blur(12px)'
              }}
            />
            {photoSettings.imageData ? (
              <img 
                src={photoSettings.imageData} 
                alt="Profile" 
                className={getPhotoStyle()}
                style={{ borderRadius: '50%', position: 'relative', border: `3px solid ${pink}`, boxShadow: `0 0 20px ${pink}50` }}
              />
            ) : (
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255, 69, 128, 0.2)', border: `3px solid ${pink}`, boxShadow: `0 0 20px ${pink}50` }}
              >
                <span className="text-3xl font-bold" style={{ color: pink }}>
                  {basicDetails.fullName?.charAt(0) || '?'}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-white tracking-wider uppercase" style={{ textShadow: `0 0 10px ${pink}` }}>
              {basicDetails.fullName || 'Your Name'}
            </h2>
            <p className="text-sm font-medium" style={{ color: cyan }}>
              {basicDetails.designation || 'Designation'}
            </p>
            <p className="text-xs text-pink-300/70 mt-1">
              {basicDetails.companyName || 'Company Name'}
            </p>
            {basicDetails.employeeId && (
              <p 
                className="text-xs mt-2 px-2 py-0.5 rounded font-mono inline-block"
                style={{ backgroundColor: purple + '40', color: cyan, border: `1px solid ${pink}` }}
              >
                ★ {basicDetails.employeeId}
              </p>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {contactDetails.mobileNumber && (
              <div className="flex items-center gap-2 bg-white/5 rounded-lg px-2 py-1.5">
                <Phone className="w-3 h-3" style={{ color: pink }} />
                <span className="text-gray-300">{contactDetails.mobileNumber}</span>
              </div>
            )}
            {contactDetails.email && (
              <div className="flex items-center gap-2 bg-white/5 rounded-lg px-2 py-1.5">
                <Mail className="w-3 h-3" style={{ color: pink }} />
                <span className="text-gray-300 truncate">{contactDetails.email}</span>
              </div>
            )}
            {(contactDetails.city || contactDetails.country) && (
              <div className="flex items-center gap-2 bg-white/5 rounded-lg px-2 py-1.5">
                <MapPin className="w-3 h-3" style={{ color: cyan }} />
                <span className="text-gray-300 truncate">
                  {contactDetails.city}{contactDetails.city && contactDetails.country && ', '}{contactDetails.country}
                </span>
              </div>
            )}
            {contactDetails.website && (
              <div className="flex items-center gap-2 bg-white/5 rounded-lg px-2 py-1.5">
                <Globe className="w-3 h-3" style={{ color: cyan }} />
                <span className="text-gray-300 truncate">{contactDetails.website.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-end justify-between mt-3">
          <div>
            {basicDetails.tagline && (
              <p className="text-xs italic text-pink-300/60">
                "{basicDetails.tagline}"
              </p>
            )}
          </div>
          {qrCodeUrl && (
            <div 
              className="p-1 rounded-lg"
              style={{ backgroundColor: 'rgba(157, 78, 221, 0.2)', border: `1px solid ${pink}` }}
            >
              <img src={qrCodeUrl} alt="QR Code" className="w-14 h-14" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}