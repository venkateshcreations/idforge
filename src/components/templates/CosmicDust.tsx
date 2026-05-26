import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';
import type { UserData } from '../../types';

interface CardProps {
  userData: UserData;
}

export function CosmicDust({ userData }: CardProps) {
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
    return { background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)' };
  };

  const violet = '#8B5CF6';
  const fuchsia = '#D946EF';
  const lavender = '#C4B5FD';

  const getPhotoStyle = () => { const base = previewMode === 'print' ? 'w-20 h-20' : 'w-24 h-24'; return `${base} object-cover`; };

  return (
    <div className="id-card-container relative overflow-hidden rounded-2xl shadow-2xl" style={getBackgroundStyle()}>
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-pulse" style={{ opacity: 0.8 }} />
        <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full animate-pulse" style={{ opacity: 0.5 }} />
        <div className="absolute bottom-10 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse" style={{ opacity: 0.6 }} />
        <div className="absolute top-1/2 right-10 w-1 h-1 bg-white rounded-full animate-pulse" style={{ opacity: 0.4 }} />
      </div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent" />
      <div className="relative p-5 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full" style={{ background: `linear-gradient(135deg, ${violet}, ${fuchsia})`, opacity: 0.4, filter: 'blur(15px)' }} />
            {photoSettings.imageData ? (
              <img src={photoSettings.imageData} alt="Profile" className={getPhotoStyle()} style={{ borderRadius: '50%', position: 'relative', border: `3px solid ${lavender}`, boxShadow: `0 0 30px ${violet}50` }} />
            ) : (
              <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: `${violet}30`, border: `3px solid ${lavender}` }}>
                <span className="text-3xl font-bold" style={{ color: lavender }}>{basicDetails.fullName?.charAt(0) || '?'}</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-white tracking-wider uppercase" style={{ textShadow: `0 0 20px ${violet}` }}>{basicDetails.fullName || 'Your Name'}</h2>
            <p className="text-sm font-medium" style={{ color: fuchsia }}>{basicDetails.designation || 'Designation'}</p>
            <p className="text-xs text-violet-300/70 mt-1">{basicDetails.companyName || 'Company Name'}</p>
            {basicDetails.employeeId && <p className="text-xs mt-2 px-2 py-0.5 rounded font-mono inline-block" style={{ backgroundColor: `${violet}30`, color: lavender, border: `1px solid ${violet}` }}>✧ {basicDetails.employeeId}</p>}
          </div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {contactDetails.mobileNumber && <div className="flex items-center gap-2"><Phone className="w-3 h-3" style={{ color: lavender }} /><span className="text-violet-200">{contactDetails.mobileNumber}</span></div>}
            {contactDetails.email && <div className="flex items-center gap-2"><Mail className="w-3 h-3" style={{ color: lavender }} /><span className="text-violet-200 truncate">{contactDetails.email}</span></div>}
            {(contactDetails.city || contactDetails.country) && <div className="flex items-center gap-2"><MapPin className="w-3 h-3" style={{ color: fuchsia }} /><span className="text-violet-200 truncate">{contactDetails.city}{contactDetails.city && contactDetails.country && ', '}{contactDetails.country}</span></div>}
            {contactDetails.website && <div className="flex items-center gap-2"><Globe className="w-3 h-3" style={{ color: fuchsia }} /><span className="text-violet-200 truncate">{contactDetails.website.replace(/^https?:\/\//, '')}</span></div>}
          </div>
        </div>
        <div className="flex items-end justify-between mt-3">
          <div>{basicDetails.tagline && <p className="text-xs italic text-violet-400/50">"{basicDetails.tagline}"</p>}</div>
          {qrCodeUrl && <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 border border-violet-500/30"><img src={qrCodeUrl} alt="QR Code" className="w-14 h-14" /></div>}
        </div>
      </div>
    </div>
  );
}