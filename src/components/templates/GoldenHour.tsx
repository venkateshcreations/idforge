import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Phone, Mail, MapPin, Globe, Crown } from 'lucide-react';
import type { UserData } from '../../types';

interface CardProps {
  userData: UserData;
}

export function GoldenHour({ userData }: CardProps) {
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
    return { background: 'linear-gradient(135deg, #1C1917 0%, #292524 50%, #44403C 100%)' };
  };

  const gold = '#F59E0B';
  const amber = '#D97706';

  const getPhotoStyle = () => { const base = previewMode === 'print' ? 'w-20 h-20' : 'w-24 h-24'; return `${base} object-cover`; };

  return (
    <div className="id-card-container relative overflow-hidden rounded-2xl shadow-2xl" style={getBackgroundStyle()}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-900/30 via-transparent to-transparent" />
      <div className="absolute top-3 right-3"><Crown className="w-5 h-5 text-amber-500/50" /></div>
      <div className="relative p-5 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full" style={{ background: gold, opacity: 0.3, filter: 'blur(12px)' }} />
            {photoSettings.imageData ? (
              <img src={photoSettings.imageData} alt="Profile" className={getPhotoStyle()} style={{ borderRadius: '50%', position: 'relative', border: `3px solid ${gold}`, boxShadow: `0 0 25px ${gold}40` }} />
            ) : (
              <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: `${gold}20`, border: `3px solid ${gold}` }}>
                <span className="text-3xl font-bold" style={{ color: gold }}>{basicDetails.fullName?.charAt(0) || '?'}</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-white tracking-wide">{basicDetails.fullName || 'Your Name'}</h2>
            <p className="text-sm font-medium" style={{ color: gold }}>{basicDetails.designation || 'Designation'}</p>
            <p className="text-xs text-stone-400 mt-1">{basicDetails.companyName || 'Company Name'}</p>
            {basicDetails.employeeId && <p className="text-xs mt-2 px-2 py-0.5 rounded font-mono inline-block" style={{ backgroundColor: `${gold}20`, color: gold }}>👑 {basicDetails.employeeId}</p>}
          </div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {contactDetails.mobileNumber && <div className="flex items-center gap-2"><Phone className="w-3 h-3" style={{ color: amber }} /><span className="text-stone-300">{contactDetails.mobileNumber}</span></div>}
            {contactDetails.email && <div className="flex items-center gap-2"><Mail className="w-3 h-3" style={{ color: amber }} /><span className="text-stone-300 truncate">{contactDetails.email}</span></div>}
            {(contactDetails.city || contactDetails.country) && <div className="flex items-center gap-2"><MapPin className="w-3 h-3" style={{ color: gold }} /><span className="text-stone-300 truncate">{contactDetails.city}{contactDetails.city && contactDetails.country && ', '}{contactDetails.country}</span></div>}
            {contactDetails.website && <div className="flex items-center gap-2"><Globe className="w-3 h-3" style={{ color: gold }} /><span className="text-stone-300 truncate">{contactDetails.website.replace(/^https?:\/\//, '')}</span></div>}
          </div>
        </div>
        <div className="flex items-end justify-between mt-3">
          <div>{basicDetails.tagline && <p className="text-xs italic text-stone-600">"{basicDetails.tagline}"</p>}</div>
          {qrCodeUrl && <div className="bg-white/5 backdrop-blur-sm rounded-lg p-1.5 border border-amber-600/30"><img src={qrCodeUrl} alt="QR Code" className="w-14 h-14" /></div>}
        </div>
      </div>
    </div>
  );
}