import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Phone, Mail, MapPin, Globe, Cpu } from 'lucide-react';
import type { UserData } from '../../types';

interface CardProps {
  userData: UserData;
}

export function NeonCyber({ userData }: CardProps) {
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
        background: `linear-gradient(135deg, ${backgroundSettings.gradientColors[0]}, ${backgroundSettings.gradientColors[1]})`,
      };
    }
    return { 
      backgroundColor: '#0A0A0F',
      backgroundImage: `
        linear-gradient(rgba(255, 0, 212, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)
      `,
      backgroundSize: '20px 20px'
    };
  };

  const pinkAccent = '#FF00D4';
  const cyanAccent = '#00D4FF';

  const getPhotoStyle = () => {
    const base = previewMode === 'print' ? 'w-20 h-20' : 'w-24 h-24';
    return `${base} object-cover`;
  };

  return (
    <div
      className="id-card-container relative overflow-hidden rounded-2xl shadow-2xl"
      style={getBackgroundStyle()}
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-pink-500 via-transparent to-cyan-500 opacity-30" />
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-cyan-500 via-transparent to-pink-500 opacity-30" />
      
      <div className="absolute top-4 right-4">
        <Cpu className="w-5 h-5" style={{ color: pinkAccent }} />
      </div>
      
      <div className="absolute top-1/2 left-4 -translate-y-1/2">
        <div className="flex flex-col gap-1">
          <div className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: pinkAccent }} />
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: cyanAccent, opacity: 0.5 }} />
          <div className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: pinkAccent, opacity: 0.3 }} />
        </div>
      </div>
      
      <div className="relative p-5 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div 
              className="absolute inset-0 rounded-lg transform rotate-45"
              style={{ 
                background: `linear-gradient(135deg, ${pinkAccent}, ${cyanAccent})`,
                opacity: 0.4,
                filter: 'blur(15px)'
              }}
            />
            <div 
              className="absolute inset-0 rounded-lg"
              style={{ 
                border: `2px solid ${pinkAccent}`,
                boxShadow: `0 0 20px ${pinkAccent}40, inset 0 0 20px ${cyanAccent}20`
              }}
            />
            {photoSettings.imageData ? (
              <img 
                src={photoSettings.imageData} 
                alt="Profile" 
                className={getPhotoStyle()}
                style={{ borderRadius: '12px', position: 'relative' }}
              />
            ) : (
              <div 
                className="w-24 h-24 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(255, 0, 212, 0.1)' }}
              >
                <span className="text-3xl font-bold" style={{ color: pinkAccent }}>
                  {basicDetails.fullName?.charAt(0) || '?'}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-white tracking-widest uppercase" style={{ textShadow: `0 0 10px ${pinkAccent}` }}>
              {basicDetails.fullName || 'Your Name'}
            </h2>
            <p className="text-sm font-medium" style={{ color: cyanAccent }}>
              {basicDetails.designation || 'Designation'}
            </p>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
              {basicDetails.companyName || 'Company Name'}
            </p>
            {basicDetails.employeeId && (
              <p 
                className="text-xs mt-2 px-2 py-0.5 rounded font-mono inline-block"
                style={{ 
                  backgroundColor: 'transparent', 
                  color: cyanAccent,
                  border: `1px solid ${cyanAccent}`,
                  boxShadow: `0 0 10px ${cyanAccent}30`
                }}
              >
                ID: {basicDetails.employeeId}
              </p>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {contactDetails.mobileNumber && (
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3" style={{ color: pinkAccent }} />
                <span className="text-gray-400">{contactDetails.mobileNumber}</span>
              </div>
            )}
            {contactDetails.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3" style={{ color: pinkAccent }} />
                <span className="text-gray-400 truncate">{contactDetails.email}</span>
              </div>
            )}
            {(contactDetails.city || contactDetails.country) && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" style={{ color: cyanAccent }} />
                <span className="text-gray-400 truncate">
                  {contactDetails.city}{contactDetails.city && contactDetails.country && ', '}{contactDetails.country}
                </span>
              </div>
            )}
            {contactDetails.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-3 h-3" style={{ color: cyanAccent }} />
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
            <div 
              className="p-1 rounded"
              style={{ 
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                border: `1px solid ${cyanAccent}50`,
                boxShadow: `0 0 15px ${cyanAccent}30`
              }}
            >
              <img src={qrCodeUrl} alt="QR Code" className="w-14 h-14" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}