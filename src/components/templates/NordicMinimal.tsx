import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';
import type { UserData } from '../../types';

interface CardProps {
  userData: UserData;
}

export function NordicMinimal({ userData }: CardProps) {
  const { basicDetails, contactDetails, photoSettings, qrSettings, backgroundSettings, previewMode } = userData;
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    const generateQR = async () => {
      const url = qrSettings.customUrl || contactDetails.website || contactDetails.email;
      if (url) {
        const qrSize = previewMode === 'print' ? 60 : qrSettings.size;
        const qr = await QRCode.toDataURL(url, { width: qrSize, margin: 1, color: { dark: qrSettings.foregroundColor, light: qrSettings.backgroundColor }, errorCorrectionLevel: qrSettings.errorCorrectionLevel });
        setQrCodeUrl(qr);
      }
    };
    generateQR();
  }, [qrSettings, contactDetails, previewMode]);

  const getBackgroundStyle = (): React.CSSProperties => {
    if (backgroundSettings.type === 'gradient' && backgroundSettings.gradientColors?.length) return { background: `linear-gradient(135deg, ${backgroundSettings.gradientColors[0]}, ${backgroundSettings.gradientColors[1]})` };
    return { backgroundColor: '#FAFAFA' };
  };

  const charcoal = '#1A1A1A';
  const gray = '#6B7280';

  const getPhotoStyle = () => { const base = previewMode === 'print' ? 'w-20 h-20' : 'w-24 h-24'; return `${base} object-cover`; };

  return (
    <div className="id-card-container relative overflow-hidden rounded-2xl shadow-xl" style={getBackgroundStyle()}>
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: charcoal }} />
      <div className="relative p-5 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          {photoSettings.imageData ? (
            <img src={photoSettings.imageData} alt="Profile" className={getPhotoStyle()} style={{ borderRadius: '4px' }} />
          ) : (
            <div className="w-24 h-24 rounded-sm flex items-center justify-center" style={{ backgroundColor: '#F3F4F6' }}>
              <span className="text-3xl font-light" style={{ color: charcoal }}>{basicDetails.fullName?.charAt(0) || '?'}</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-light tracking-wide" style={{ color: charcoal }}>{basicDetails.fullName || 'Your Name'}</h2>
            <p className="text-sm font-light" style={{ color: gray }}>{basicDetails.designation || 'Designation'}</p>
            <p className="text-xs text-gray-400 mt-1">{basicDetails.companyName || 'Company Name'}</p>
          </div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {contactDetails.mobileNumber && <div className="flex items-center gap-2"><Phone className="w-3 h-3" style={{ color: gray }} /><span style={{ color: gray }}>{contactDetails.mobileNumber}</span></div>}
            {contactDetails.email && <div className="flex items-center gap-2"><Mail className="w-3 h-3" style={{ color: gray }} /><span style={{ color: gray }} className="truncate">{contactDetails.email}</span></div>}
            {(contactDetails.city || contactDetails.country) && <div className="flex items-center gap-2"><MapPin className="w-3 h-3" style={{ color: gray }} /><span style={{ color: gray }}>{contactDetails.city}{contactDetails.city && contactDetails.country && ', '}{contactDetails.country}</span></div>}
            {contactDetails.website && <div className="flex items-center gap-2"><Globe className="w-3 h-3" style={{ color: gray }} /><span style={{ color: gray }} className="truncate">{contactDetails.website.replace(/^https?:\/\//, '')}</span></div>}
          </div>
        </div>
        <div className="flex items-end justify-between mt-3">
          {basicDetails.employeeId && <p className="text-xs" style={{ color: gray }}>ID: {basicDetails.employeeId}</p>}
          {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" className="w-12 h-12" />}
        </div>
      </div>
    </div>
  );
}