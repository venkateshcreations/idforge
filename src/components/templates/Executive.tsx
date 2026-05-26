import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';
import type { UserData } from '../../types';

interface CardProps {
  userData: UserData;
}

export function Executive({ userData }: CardProps) {
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

  const bgColor = '#1a1a2e';
  const goldAccent = '#d4af37';
  const textPrimary = '#f5f5f5';
  const textSecondary = '#a0a0a0';

  const getBackgroundStyle = () => {
    if (backgroundSettings.type === 'gradient' && backgroundSettings.gradientColors) {
      return {
        background: `linear-gradient(135deg, ${backgroundSettings.gradientColors[0]}, ${backgroundSettings.gradientColors[1]})`,
      };
    }
    if (backgroundSettings.type === 'glass') {
      return {
        background: backgroundSettings.gradientColors 
          ? `linear-gradient(135deg, ${backgroundSettings.gradientColors[0]}cc, ${backgroundSettings.gradientColors[1]}cc)`
          : 'linear-gradient(135deg, #1a1a2e, #2a2a4a)',
      };
    }
    if (backgroundSettings.type === 'pattern') {
      return { backgroundColor: bgColor };
    }
    return { backgroundColor: bgColor };
  };

  return (
    <div
      className={`id-card-container relative overflow-hidden rounded-2xl shadow-xl ${getPreviewSize()}`}
      style={getBackgroundStyle()}
    >
      <div
        className="absolute top-0 left-0 w-full h-1"
        style={{ backgroundColor: goldAccent }}
      />
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{ backgroundColor: goldAccent, filter: 'blur(60px)' }} />
      </div>

      <div className="p-6 h-full flex flex-col relative z-10">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative">
            {photoSettings.imageData ? (
              <div className="w-24 h-24 rounded-xl overflow-hidden ring-2" style={{ borderColor: goldAccent }}>
                <img src={photoSettings.imageData} alt="Profile" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#2a2a4a' }}>
                <span className="text-3xl font-bold" style={{ color: goldAccent }}>
                  {basicDetails.fullName?.charAt(0) || '?'}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold truncate" style={{ color: textPrimary }}>
              {basicDetails.fullName || 'Your Name'}
            </h2>
            <p className="text-sm" style={{ color: goldAccent }}>
              {basicDetails.designation || 'Designation'}
            </p>
            <p className="text-sm truncate mt-1" style={{ color: textSecondary }}>
              {basicDetails.companyName || 'Company Name'}
            </p>
          </div>
        </div>

        {basicDetails.employeeId && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#2a2a4a', color: textSecondary }}>
              ID: {basicDetails.employeeId}
            </span>
            {basicDetails.department && (
              <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#2a2a4a', color: textSecondary }}>
                {basicDetails.department}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto pt-4">
          <div className="grid grid-cols-2 gap-2 text-xs" style={{ color: textSecondary }}>
            {contactDetails.mobileNumber && (
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3" style={{ color: goldAccent }} />
                <span>{contactDetails.mobileNumber}</span>
              </div>
            )}
            {contactDetails.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3" style={{ color: goldAccent }} />
                <span className="truncate">{contactDetails.email}</span>
              </div>
            )}
            {contactDetails.city && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" style={{ color: goldAccent }} />
                <span>{contactDetails.city}</span>
              </div>
            )}
            {contactDetails.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-3 h-3" style={{ color: goldAccent }} />
                <span className="truncate">{contactDetails.website.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-end justify-end">
          {qrCodeUrl && (
            <div className="p-1 rounded-lg" style={{ backgroundColor: '#ffffff' }}>
              <img src={qrCodeUrl} alt="QR" className="w-14 h-14" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}