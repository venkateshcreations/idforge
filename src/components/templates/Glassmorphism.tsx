import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Phone, Mail, Globe } from 'lucide-react';
import type { UserData } from '../../types';

interface CardProps {
  userData: UserData;
}

export function Glassmorphism({ userData }: CardProps) {
  const { basicDetails, contactDetails, photoSettings, qrSettings, backgroundSettings, previewMode } = userData;
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  const getPreviewSize = () => {
    switch (previewMode) {
      case 'print':
        return 'print';
      default:
        return '';
    }
  };

  useEffect(() => {
    const generateQR = async () => {
      const url = qrSettings.customUrl || contactDetails.website || contactDetails.email;
      if (url) {
        const qrSize = previewMode === 'print' ? 56 : qrSettings.size;
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

  const getBackgroundStyle = () => {
    if (backgroundSettings.type === 'gradient' && backgroundSettings.gradientColors) {
      return {
        background: `linear-gradient(135deg, ${backgroundSettings.gradientColors[0]}, ${backgroundSettings.gradientColors[1]})`,
      };
    }
    if (backgroundSettings.type === 'solid' || backgroundSettings.type === 'pattern') {
      const style: React.CSSProperties = backgroundSettings.gradientColors 
        ? { background: `linear-gradient(135deg, ${backgroundSettings.gradientColors[0]}, ${backgroundSettings.gradientColors[1]})` }
        : { background: 'linear-gradient(135deg, #667eea, #764ba2)' };
      return style;
    }
    return {
      background: backgroundSettings.gradientColors 
        ? `linear-gradient(135deg, ${backgroundSettings.gradientColors[0]}, ${backgroundSettings.gradientColors[1]})`
        : 'linear-gradient(135deg, #667eea, #764ba2)',
    };
  };

  return (
    <div
      className={`id-card-container relative overflow-hidden rounded-2xl ${getPreviewSize()}`}
      style={getBackgroundStyle()}
    >
      <div className="absolute inset-0 backdrop-blur-xl bg-white/10" />
      
      <div className="absolute inset-0 border-2 border-white/20 rounded-2xl" />
      
      <div className="relative z-10 p-6 h-full flex flex-col">
        <div className="flex items-start gap-4 flex-1">
          <div className="relative">
            {photoSettings.imageData ? (
              <div className="w-24 h-24 rounded-2xl overflow-hidden ring-2 ring-white/30 backdrop-blur-sm">
                <img src={photoSettings.imageData} alt="Profile" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center bg-white/20 backdrop-blur-sm ring-2 ring-white/30">
                <span className="text-3xl font-bold text-white">
                  {basicDetails.fullName?.charAt(0) || '?'}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold truncate text-white">
              {basicDetails.fullName || 'Your Name'}
            </h2>
            <p className="text-sm text-white/80">
              {basicDetails.designation || 'Designation'}
            </p>
            <p className="text-sm text-white/60 truncate mt-1">
              {basicDetails.companyName || 'Company Name'}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="grid grid-cols-2 gap-2 text-xs text-white/80">
            {contactDetails.mobileNumber && (
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3" />
                <span>{contactDetails.mobileNumber}</span>
              </div>
            )}
            {contactDetails.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3" />
                <span className="truncate">{contactDetails.email}</span>
              </div>
            )}
            {contactDetails.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-3 h-3" />
                <span className="truncate">{contactDetails.website.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            {basicDetails.tagline && (
              <p className="text-xs text-white/60 italic">
                {basicDetails.tagline}
              </p>
            )}
          </div>
          {qrCodeUrl && (
            <div className="p-1.5 rounded-lg bg-white/90 backdrop-blur-sm">
              <img src={qrCodeUrl} alt="QR" className="w-14 h-14" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}