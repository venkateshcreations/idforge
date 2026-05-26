import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Phone, Mail, MapPin, Globe, Leaf } from 'lucide-react';
import type { UserData } from '../../types';

interface CardProps {
  userData: UserData;
}

export function NatureSerenity({ userData }: CardProps) {
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
      return { background: `linear-gradient(135deg, ${backgroundSettings.gradientColors[0]}, ${backgroundSettings.gradientColors[1]})` };
    }
    return { background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 50%, #A5D6A7 100%)' };
  };

  const green = '#2E7D32';
  const teal = '#00897B';

  const getPhotoStyle = () => {
    const base = previewMode === 'print' ? 'w-20 h-20' : 'w-24 h-24';
    return `${base} object-cover`;
  };

  return (
    <div className="id-card-container relative overflow-hidden rounded-2xl shadow-2xl" style={getBackgroundStyle()}>
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <Leaf className="w-full h-full text-green-800" />
      </div>
      <div className="absolute bottom-0 left-0 w-24 h-24 opacity-10 -scale-x-100">
        <Leaf className="w-full h-full text-green-800" />
      </div>
      <div className="absolute top-3 left-3">
        <div className="flex gap-1">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: green, opacity: 0.3 - i * 0.04 }} />
          ))}
        </div>
      </div>
      <div className="relative p-5 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full" style={{ background: green, opacity: 0.2, filter: 'blur(10px)' }} />
            {photoSettings.imageData ? (
              <img src={photoSettings.imageData} alt="Profile" className={getPhotoStyle()} style={{ borderRadius: '50%', position: 'relative', border: `3px solid ${green}` }} />
            ) : (
              <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: `${green}20`, border: `3px solid ${green}` }}>
                <span className="text-3xl font-bold" style={{ color: green }}>{basicDetails.fullName?.charAt(0) || '?'}</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold" style={{ color: green }}>{basicDetails.fullName || 'Your Name'}</h2>
            <p className="text-sm font-medium" style={{ color: teal }}>{basicDetails.designation || 'Designation'}</p>
            <p className="text-xs text-green-700/70 mt-1">{basicDetails.companyName || 'Company Name'}</p>
            {basicDetails.employeeId && (
              <p className="text-xs mt-2 px-2 py-0.5 rounded-full inline-block" style={{ backgroundColor: green, color: 'white' }}>✦ {basicDetails.employeeId}</p>
            )}
          </div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {contactDetails.mobileNumber && (
              <div className="flex items-center gap-2 bg-white/60 rounded-lg px-2 py-1.5">
                <Phone className="w-3 h-3" style={{ color: green }} />
                <span style={{ color: green }}>{contactDetails.mobileNumber}</span>
              </div>
            )}
            {contactDetails.email && (
              <div className="flex items-center gap-2 bg-white/60 rounded-lg px-2 py-1.5">
                <Mail className="w-3 h-3" style={{ color: green }} />
                <span style={{ color: green }} className="truncate">{contactDetails.email}</span>
              </div>
            )}
            {(contactDetails.city || contactDetails.country) && (
              <div className="flex items-center gap-2 bg-white/60 rounded-lg px-2 py-1.5">
                <MapPin className="w-3 h-3" style={{ color: teal }} />
                <span style={{ color: teal }} className="truncate">{contactDetails.city}{contactDetails.city && contactDetails.country && ', '}{contactDetails.country}</span>
              </div>
            )}
            {contactDetails.website && (
              <div className="flex items-center gap-2 bg-white/60 rounded-lg px-2 py-1.5">
                <Globe className="w-3 h-3" style={{ color: teal }} />
                <span style={{ color: teal }} className="truncate">{contactDetails.website.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-end justify-between mt-3">
          <div>
            {basicDetails.tagline && <p className="text-xs italic text-green-800/60">"{basicDetails.tagline}"</p>}
          </div>
          {qrCodeUrl && (
            <div className="bg-white rounded-xl p-1.5 shadow-lg">
              <img src={qrCodeUrl} alt="QR Code" className="w-14 h-14" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}