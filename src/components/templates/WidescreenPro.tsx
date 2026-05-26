import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Phone, Mail, MapPin, Globe, Monitor } from 'lucide-react';
import type { UserData } from '../../types';

interface CardProps {
  userData: UserData;
}

export function WidescreenPro({ userData }: CardProps) {
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
    return { backgroundColor: brandingColors.background || '#F8FAFC' };
  };

  const primaryColor = brandingColors.primary || '#3B82F6';
  const textColor = brandingColors.text || '#1E293B';
  const secondaryColor = brandingColors.secondary || '#64748B';

  const getPhotoStyle = () => {
    const base = previewMode === 'print' ? 'w-20 h-20' : 'w-28 h-28';
    return `${base} object-cover`;
  };

  return (
    <div
      className="id-card-container relative overflow-hidden rounded-2xl shadow-xl"
      style={getBackgroundStyle()}
    >
      <div 
        className="absolute left-0 top-0 bottom-0 w-2"
        style={{ backgroundColor: primaryColor }}
      />
      
      <div className="absolute top-0 right-0">
        <Monitor className="w-8 h-8 text-gray-200/50" />
      </div>
      
      <div className="relative p-5 h-full flex items-center gap-5">
        {photoSettings.imageData ? (
          <img 
            src={photoSettings.imageData} 
            alt="Profile" 
            className={getPhotoStyle()}
            style={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
          />
        ) : (
          <div 
            className="w-28 h-28 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: primaryColor + '15', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
          >
            <span className="text-4xl font-bold" style={{ color: primaryColor }}>
              {basicDetails.fullName?.charAt(0) || '?'}
            </span>
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold" style={{ color: textColor }}>
            {basicDetails.fullName || 'Your Name'}
          </h2>
          <p className="text-sm font-medium" style={{ color: primaryColor }}>
            {basicDetails.designation || 'Designation'}
          </p>
          <p className="text-sm" style={{ color: secondaryColor }}>
            {basicDetails.companyName || 'Company Name'}
          </p>
          
          <div className="flex flex-wrap gap-3 mt-3">
            {contactDetails.mobileNumber && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-3 h-3" style={{ color: secondaryColor }} />
                <span className="text-xs" style={{ color: secondaryColor }}>{contactDetails.mobileNumber}</span>
              </div>
            )}
            {contactDetails.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="w-3 h-3" style={{ color: secondaryColor }} />
                <span className="text-xs truncate" style={{ color: secondaryColor }}>{contactDetails.email}</span>
              </div>
            )}
            {(contactDetails.city || contactDetails.country) && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3" style={{ color: secondaryColor }} />
                <span className="text-xs" style={{ color: secondaryColor }}>
                  {contactDetails.city}{contactDetails.city && contactDetails.country && ', '}{contactDetails.country}
                </span>
              </div>
            )}
            {contactDetails.website && (
              <div className="flex items-center gap-1.5">
                <Globe className="w-3 h-3" style={{ color: secondaryColor }} />
                <span className="text-xs truncate" style={{ color: secondaryColor }}>{contactDetails.website.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
          </div>
          
          {basicDetails.employeeId && (
            <p 
              className="text-xs mt-2 px-2 py-0.5 rounded inline-block font-medium"
              style={{ backgroundColor: primaryColor + '15', color: primaryColor }}
            >
              ID: {basicDetails.employeeId}
            </p>
          )}
        </div>

        {qrCodeUrl && (
          <div className="flex-shrink-0">
            <img src={qrCodeUrl} alt="QR Code" className="w-16 h-16" />
          </div>
        )}
      </div>
    </div>
  );
}