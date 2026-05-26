import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import type { UserData } from '../../types';

interface CardProps {
  userData: UserData;
}

export function Minimal({ userData }: CardProps) {
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
        const qrSize = previewMode === 'print' ? 48 : qrSettings.size;
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
    const style: React.CSSProperties = { borderColor: brandingColors.border };
    if (backgroundSettings.type === 'gradient' && backgroundSettings.gradientColors) {
      style.background = `linear-gradient(135deg, ${backgroundSettings.gradientColors[0]}, ${backgroundSettings.gradientColors[1]})`;
    } else if (backgroundSettings.type === 'glass') {
      style.background = backgroundSettings.gradientColors 
        ? `linear-gradient(135deg, ${backgroundSettings.gradientColors[0]}40, ${backgroundSettings.gradientColors[1]}40)`
        : 'linear-gradient(135deg, #667eea40, #764ba240)';
    } else if (backgroundSettings.type === 'pattern') {
      style.backgroundColor = brandingColors.background;
      if (backgroundSettings.pattern === 'dots') {
        style.backgroundImage = 'radial-gradient(circle, #00000010 1px, transparent 1px)';
        style.backgroundSize = '16px 16px';
      } else if (backgroundSettings.pattern === 'grid') {
        style.backgroundImage = 'linear-gradient(#00000008 1px, transparent 1px), linear-gradient(90deg, #00000008 1px, transparent 1px)';
        style.backgroundSize = '16px 16px';
      } else if (backgroundSettings.pattern === 'lines') {
        style.backgroundImage = 'repeating-linear-gradient(0deg, transparent, transparent 15px, #00000008 15px, #00000008 16px)';
      }
    } else {
      style.backgroundColor = brandingColors.background;
    }
    return style;
  };

  return (
    <div
      className={`id-card-container relative overflow-hidden rounded-xl border ${getPreviewSize()}`}
      style={getBackgroundStyle()}
    >
      <div className="p-5 h-full flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {photoSettings.imageData ? (
              <img 
                src={photoSettings.imageData} 
                alt="Profile" 
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: brandingColors.border }}>
                <span className="text-xl font-medium" style={{ color: brandingColors.secondary }}>
                  {basicDetails.fullName?.charAt(0) || '?'}
                </span>
              </div>
            )}

            <div>
              <h2 className="text-base font-semibold" style={{ color: brandingColors.text }}>
                {basicDetails.fullName || 'Your Name'}
              </h2>
              <p className="text-xs" style={{ color: brandingColors.secondary }}>
                {basicDetails.designation || 'Designation'}
              </p>
              <p className="text-xs" style={{ color: brandingColors.secondary }}>
                {basicDetails.companyName || 'Company Name'}
              </p>
            </div>
          </div>

          {qrCodeUrl && (
            <div className="p-1" style={{ backgroundColor: qrSettings.backgroundColor }}>
              <img src={qrCodeUrl} alt="QR" className="w-12 h-12" />
            </div>
          )}
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between text-xs" style={{ color: brandingColors.secondary }}>
          <div className="flex gap-4">
            {contactDetails.mobileNumber && (
              <span>{contactDetails.mobileNumber}</span>
            )}
            {contactDetails.email && (
              <span className="truncate max-w-[150px]">{contactDetails.email}</span>
            )}
          </div>
          {contactDetails.website && (
            <span className="truncate max-w-[120px]">{contactDetails.website.replace(/^https?:\/\//, '')}</span>
          )}
        </div>
      </div>
    </div>
  );
}