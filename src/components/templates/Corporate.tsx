import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';
import type { UserData } from '../../types';

interface CardProps {
  userData: UserData;
}

export function Corporate({ userData }: CardProps) {
  const { basicDetails, contactDetails, photoSettings, qrSettings, brandingColors, backgroundSettings, previewMode } = userData;
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

  const getPhotoStyle = () => {
    const base = previewMode === 'print' ? 'w-20 h-20' : 'w-24 h-24';
    switch (photoSettings.style) {
      case 'circle':
        return `${base} object-cover rounded-full`;
      case 'rounded':
        return `${base} object-cover rounded-2xl`;
      case 'square':
        return `${base} object-cover rounded-sm`;
      case 'borderGlow':
        return `${base} object-cover rounded-xl ring-4`;
      case 'glassEffect':
        return `${base} object-cover rounded-xl`;
      default:
        return `${base} object-cover rounded-xl`;
    }
  };

  const getBackgroundStyle = () => {
    if (backgroundSettings.type === 'gradient' && backgroundSettings.gradientColors) {
      return {
        background: `linear-gradient(135deg, ${backgroundSettings.gradientColors[0]}, ${backgroundSettings.gradientColors[1]})`,
      };
    }
    if (backgroundSettings.type === 'glass') {
      return {
        background: backgroundSettings.gradientColors 
          ? `linear-gradient(135deg, ${backgroundSettings.gradientColors[0]}40, ${backgroundSettings.gradientColors[1]}40)`
          : 'linear-gradient(135deg, #667eea40, #764ba240)',
      };
    }
    if (backgroundSettings.type === 'pattern') {
      const patternStyle: React.CSSProperties = { backgroundColor: brandingColors.background };
      if (backgroundSettings.pattern === 'dots') {
        patternStyle.backgroundImage = 'radial-gradient(circle, #00000010 1px, transparent 1px)';
        patternStyle.backgroundSize = '16px 16px';
      } else if (backgroundSettings.pattern === 'grid') {
        patternStyle.backgroundImage = 'linear-gradient(#00000008 1px, transparent 1px), linear-gradient(90deg, #00000008 1px, transparent 1px)';
        patternStyle.backgroundSize = '16px 16px';
      } else if (backgroundSettings.pattern === 'lines') {
        patternStyle.backgroundImage = 'repeating-linear-gradient(0deg, transparent, transparent 15px, #00000008 15px, #00000008 16px)';
      }
      return patternStyle;
    }
    return { backgroundColor: brandingColors.background };
  };

  return (
    <div
      className={`id-card-container relative overflow-hidden rounded-2xl shadow-xl ${getPreviewSize()}`}
      style={getBackgroundStyle()}
    >
      <div
        className="absolute top-0 left-0 w-full h-2"
        style={{ backgroundColor: brandingColors.primary }}
      />
      
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-start gap-4 flex-1">
          {photoSettings.imageData ? (
            <div
              className={`${photoSettings.style === 'borderGlow' ? 'ring-4' : ''}`}
              style={{ 
                borderColor: photoSettings.style === 'borderGlow' ? brandingColors.accent : 'transparent',
                borderWidth: photoSettings.style === 'borderGlow' ? '4px' : '0px',
                borderRadius: '16px'
              }}
            >
              <img src={photoSettings.imageData} alt="Profile" className={getPhotoStyle()} />
            </div>
          ) : (
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: brandingColors.secondary + '20' }}
            >
              <span className="text-3xl font-bold" style={{ color: brandingColors.secondary }}>
                {basicDetails.fullName?.charAt(0) || '?'}
              </span>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h2
              className="text-xl font-bold truncate"
              style={{ color: brandingColors.text }}
            >
              {basicDetails.fullName || 'Your Name'}
            </h2>
            <p
              className="text-sm truncate"
              style={{ color: brandingColors.primary }}
            >
              {basicDetails.designation || 'Designation'}
            </p>
            <p
              className="text-sm truncate mt-1"
              style={{ color: brandingColors.secondary }}
            >
              {basicDetails.companyName || 'Company Name'}
            </p>
            {basicDetails.employeeId && (
              <p
                className="text-xs mt-2 px-2 py-0.5 rounded inline-block"
                style={{ backgroundColor: brandingColors.primary + '20', color: brandingColors.primary }}
              >
                ID: {basicDetails.employeeId}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t" style={{ borderColor: brandingColors.border }}>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {contactDetails.mobileNumber && (
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3" style={{ color: brandingColors.secondary }} />
                <span style={{ color: brandingColors.secondary }}>{contactDetails.mobileNumber}</span>
              </div>
            )}
            {contactDetails.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3" style={{ color: brandingColors.secondary }} />
                <span style={{ color: brandingColors.secondary }} className="truncate">{contactDetails.email}</span>
              </div>
            )}
            {(contactDetails.city || contactDetails.country) && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" style={{ color: brandingColors.secondary }} />
                <span style={{ color: brandingColors.secondary }} className="truncate">
                  {contactDetails.city}{contactDetails.city && contactDetails.country && ', '}{contactDetails.country}
                </span>
              </div>
            )}
            {contactDetails.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-3 h-3" style={{ color: brandingColors.secondary }} />
                <span style={{ color: brandingColors.secondary }} className="truncate">{contactDetails.website.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            {basicDetails.tagline && (
              <p
                className="text-xs italic"
                style={{ color: brandingColors.accent }}
              >
                {basicDetails.tagline}
              </p>
            )}
          </div>
          {qrCodeUrl && (
            <div
              className="p-1 rounded-lg"
              style={{ backgroundColor: qrSettings.backgroundColor }}
            >
              <img src={qrCodeUrl} alt="QR Code" className="w-16 h-16" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}