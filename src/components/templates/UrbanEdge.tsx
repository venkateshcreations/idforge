import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Phone, Mail, MapPin, Globe, Building2 } from 'lucide-react';
import type { UserData } from '../../types';

interface CardProps {
  userData: UserData;
}

export function UrbanEdge({ userData }: CardProps) {
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
    return { background: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)' };
  };

  const lime = '#84CC16';
  const zinc = '#71717A';

  const getPhotoStyle = () => { const base = previewMode === 'print' ? 'w-20 h-20' : 'w-24 h-24'; return `${base} object-cover`; };

  return (
    <div className="id-card-container relative overflow-hidden rounded-2xl shadow-2xl" style={getBackgroundStyle()}>
      <div className="absolute top-0 left-0 w-full h-1 bg-lime-500" />
      <div className="absolute top-0 right-0 w-px h-full bg-lime-500/30" />
      <div className="absolute bottom-4 left-4 opacity-20"><Building2 className="w-16 h-16 text-white" /></div>
      <div className="relative p-5 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-lg" style={{ background: lime, opacity: 0.3, filter: 'blur(10px)' }} />
            {photoSettings.imageData ? (
              <img src={photoSettings.imageData} alt="Profile" className={getPhotoStyle()} style={{ borderRadius: '8px', position: 'relative', border: `2px solid ${lime}` }} />
            ) : (
              <div className="w-24 h-24 rounded-lg flex items-center justify-center" style={{ background: `${lime}20`, border: `2px solid ${lime}` }}>
                <span className="text-3xl font-bold" style={{ color: lime }}>{basicDetails.fullName?.charAt(0) || '?'}</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-white tracking-wide uppercase">{basicDetails.fullName || 'Your Name'}</h2>
            <p className="text-sm font-medium" style={{ color: lime }}>{basicDetails.designation || 'Designation'}</p>
            <p className="text-xs text-zinc-400 mt-1">{basicDetails.companyName || 'Company Name'}</p>
            {basicDetails.employeeId && <p className="text-xs mt-2 px-2 py-0.5 rounded font-mono inline-block" style={{ backgroundColor: lime, color: 'black' }}>#{basicDetails.employeeId}</p>}
          </div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {contactDetails.mobileNumber && <div className="flex items-center gap-2 bg-white/5 rounded px-2 py-1"><Phone className="w-3 h-3" style={{ color: lime }} /><span className="text-gray-300">{contactDetails.mobileNumber}</span></div>}
            {contactDetails.email && <div className="flex items-center gap-2 bg-white/5 rounded px-2 py-1"><Mail className="w-3 h-3" style={{ color: lime }} /><span className="text-gray-300 truncate">{contactDetails.email}</span></div>}
            {(contactDetails.city || contactDetails.country) && <div className="flex items-center gap-2 bg-white/5 rounded px-2 py-1"><MapPin className="w-3 h-3" style={{ color: zinc }} /><span className="text-gray-300 truncate">{contactDetails.city}{contactDetails.city && contactDetails.country && ', '}{contactDetails.country}</span></div>}
            {contactDetails.website && <div className="flex items-center gap-2 bg-white/5 rounded px-2 py-1"><Globe className="w-3 h-3" style={{ color: zinc }} /><span className="text-gray-300 truncate">{contactDetails.website.replace(/^https?:\/\//, '')}</span></div>}
          </div>
        </div>
        <div className="flex items-end justify-between mt-3">
          <div>{basicDetails.tagline && <p className="text-xs italic text-zinc-500">"{basicDetails.tagline}"</p>}</div>
          {qrCodeUrl && <div className="bg-white/10 rounded-lg p-1"><img src={qrCodeUrl} alt="QR Code" className="w-14 h-14" /></div>}
        </div>
      </div>
    </div>
  );
}