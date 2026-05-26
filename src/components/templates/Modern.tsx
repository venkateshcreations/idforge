import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Phone, Mail } from 'lucide-react';
import type { UserData } from '../../types';

interface CardProps {
  userData: UserData;
}

export function Modern({ userData }: CardProps) {
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

  const getPhotoStyle = () => {
    const base = previewMode === 'print' ? 'w-16 h-16' : 'w-20 h-20';
    switch (photoSettings.style) {
      case 'circle':
        return `${base} object-cover rounded-full`;
      case 'rounded':
        return `${base} object-cover rounded-2xl`;
      case 'square':
        return `${base} object-cover rounded-sm`;
      case 'borderGlow':
        return `${base} object-cover rounded-2xl ring-4`;
      case 'glassEffect':
        return `${base} object-cover rounded-2xl`;
      default:
        return `${base} object-cover rounded-2xl`;
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
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"
        style={{ backgroundColor: brandingColors.primary }}
      />
      <div
        className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-20 translate-y-1/2 -translate-x-1/2"
        style={{ backgroundColor: brandingColors.accent }}
      />

      <div className="p-5 h-full flex flex-col relative z-10">
        <div className="flex items-center gap-4">
          {photoSettings.imageData ? (
            <div className="relative">
              <img src={photoSettings.imageData} alt="Profile" className={getPhotoStyle()} />
              <div
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: brandingColors.accent }}
              >
                ✓
              </div>
            </div>
          ) : (
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: brandingColors.primary + '20' }}
            >
              <span className="text-2xl font-bold" style={{ color: brandingColors.primary }}>
                {basicDetails.fullName?.charAt(0) || '?'}
              </span>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h2
              className="text-lg font-bold truncate"
              style={{ color: brandingColors.text }}
            >
              {basicDetails.fullName || 'Your Name'}
            </h2>
            <p
              className="text-sm font-medium truncate"
              style={{ color: brandingColors.accent }}
            >
              {basicDetails.designation || 'Designation'}
            </p>
            <p
              className="text-xs truncate mt-0.5"
              style={{ color: brandingColors.secondary }}
            >
              {basicDetails.companyName || 'Company Name'}
            </p>
          </div>
        </div>

        {basicDetails.department && (
          <div
            className="mt-3 text-xs px-3 py-1 rounded-full inline-block w-fit"
            style={{ backgroundColor: brandingColors.primary + '15', color: brandingColors.primary }}
          >
            {basicDetails.department}
          </div>
        )}

        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1 text-xs">
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
            </div>
            {qrCodeUrl && (
              <div
                className="p-1.5 rounded-lg"
                style={{ backgroundColor: qrSettings.backgroundColor }}
              >
                <img src={qrCodeUrl} alt="QR" className="w-14 h-14" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}