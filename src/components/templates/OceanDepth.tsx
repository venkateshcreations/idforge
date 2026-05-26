import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';
import type { UserData } from '../../types';

interface CardProps {
  userData: UserData;
}

export function OceanDepth({ userData }: CardProps) {
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
    if (backgroundSettings.type === 'gradient' && backgroundSettings.gradientColors?.length) return { background: `linear-gradient(180deg, ${backgroundSettings.gradientColors[0]}, ${backgroundSettings.gradientColors[1]})` };
    return { background: 'linear-gradient(180deg, #0C1929 0%, #1B3A4B 50%, #065A60 100%)' };
  };

  const cyan = '#00BCD4';
  const lightCyan = '#B2EBF2';

  const getPhotoStyle = () => { const base = previewMode === 'print' ? 'w-20 h-20' : 'w-24 h-24'; return `${base} object-cover`; };

  return (
    <div className="id-card-container relative overflow-hidden rounded-2xl shadow-2xl" style={getBackgroundStyle()}>
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          <path d="M0 150 Q 50 130 100 150 T 200 150 T 300 150 T 400 150 L 400 200 L 0 200 Z" fill="rgba(0, 188, 212, 0.3)" />
          <path d="M0 160 Q 50 140 100 160 T 200 160 T 300 160 T 400 160 L 400 200 L 0 200 Z" fill="rgba(0, 188, 212, 0.2)" />
          <path d="M0 170 Q 50 150 100 170 T 200 170 T 300 170 T 400 170 L 400 200 L 0 200 Z" fill="rgba(0, 188, 212, 0.1)" />
        </svg>
      </div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <div className="relative p-5 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full" style={{ background: cyan, opacity: 0.3, filter: 'blur(12px)' }} />
            {photoSettings.imageData ? (
              <img src={photoSettings.imageData} alt="Profile" className={getPhotoStyle()} style={{ borderRadius: '50%', position: 'relative', border: `3px solid ${cyan}`, boxShadow: `0 0 20px ${cyan}50` }} />
            ) : (
              <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: `${cyan}30`, border: `3px solid ${cyan}` }}>
                <span className="text-3xl font-bold" style={{ color: cyan }}>{basicDetails.fullName?.charAt(0) || '?'}</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-white tracking-wide">{basicDetails.fullName || 'Your Name'}</h2>
            <p className="text-sm font-medium" style={{ color: cyan }}>{basicDetails.designation || 'Designation'}</p>
            <p className="text-xs text-cyan-200/70 mt-1">{basicDetails.companyName || 'Company Name'}</p>
            {basicDetails.employeeId && <p className="text-xs mt-2 px-2 py-0.5 rounded font-mono inline-block" style={{ backgroundColor: `${cyan}30`, color: cyan, border: `1px solid ${cyan}` }}>⦿ {basicDetails.employeeId}</p>}
          </div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {contactDetails.mobileNumber && <div className="flex items-center gap-2"><Phone className="w-3 h-3" style={{ color: lightCyan }} /><span className="text-cyan-100">{contactDetails.mobileNumber}</span></div>}
            {contactDetails.email && <div className="flex items-center gap-2"><Mail className="w-3 h-3" style={{ color: lightCyan }} /><span className="text-cyan-100 truncate">{contactDetails.email}</span></div>}
            {(contactDetails.city || contactDetails.country) && <div className="flex items-center gap-2"><MapPin className="w-3 h-3" style={{ color: cyan }} /><span className="text-cyan-100 truncate">{contactDetails.city}{contactDetails.city && contactDetails.country && ', '}{contactDetails.country}</span></div>}
            {contactDetails.website && <div className="flex items-center gap-2"><Globe className="w-3 h-3" style={{ color: cyan }} /><span className="text-cyan-100 truncate">{contactDetails.website.replace(/^https?:\/\//, '')}</span></div>}
          </div>
        </div>
        <div className="flex items-end justify-between mt-3">
          <div>{basicDetails.tagline && <p className="text-xs italic text-cyan-300/50">"{basicDetails.tagline}"</p>}</div>
          {qrCodeUrl && <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 border border-cyan-500/30"><img src={qrCodeUrl} alt="QR Code" className="w-14 h-14" /></div>}
        </div>
      </div>
    </div>
  );
}