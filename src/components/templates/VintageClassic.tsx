import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Phone, Mail, MapPin, Globe, PenTool } from 'lucide-react';
import type { UserData } from '../../types';

interface CardProps {
  userData: UserData;
}

export function VintageClassic({ userData }: CardProps) {
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
    return { 
      background: 'linear-gradient(135deg, #F5F5DC 0%, #FFF8DC 50%, #F5DEB3 100%)',
      backgroundImage: `
        linear-gradient(135deg, #F5F5DC 0%, #FFF8DC 50%, #F5DEB3 100%),
        url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D2B48C' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
      `
    };
  };

  const brown = '#8B4513';
  const tan = '#D2B48C';
  const cream = '#FFFDD0';

  const getPhotoStyle = () => { const base = previewMode === 'print' ? 'w-20 h-20' : 'w-24 h-24'; return `${base} object-cover`; };

  return (
    <div className="id-card-container relative overflow-hidden rounded-2xl shadow-2xl" style={getBackgroundStyle()}>
      <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: brown }} />
      <div className="absolute top-0 left-0 w-px h-full bg-brown-900/20" />
      <div className="absolute top-2 left-2">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: brown, opacity: 0.4 + i * 0.15 }} />
          ))}
        </div>
      </div>
      <div className="absolute bottom-2 right-2 opacity-30"><PenTool className="w-8 h-8" style={{ color: brown }} /></div>
      <div className="relative p-5 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-lg" style={{ background: tan, opacity: 0.3, filter: 'blur(8px)' }} />
            {photoSettings.imageData ? (
              <img src={photoSettings.imageData} alt="Profile" className={getPhotoStyle()} style={{ borderRadius: '4px', position: 'relative', border: `3px solid ${brown}`, boxShadow: '4px 4px 0 rgba(0,0,0,0.1)' }} />
            ) : (
              <div className="w-24 h-24 rounded-sm flex items-center justify-center" style={{ background: cream, border: `3px solid ${brown}`, boxShadow: '4px 4px 0 rgba(0,0,0,0.1)' }}>
                <span className="text-3xl font-serif" style={{ color: brown }}>{basicDetails.fullName?.charAt(0) || '?'}</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-serif font-bold tracking-wide" style={{ color: brown }}>{basicDetails.fullName || 'Your Name'}</h2>
            <p className="text-sm font-medium italic" style={{ color: tan }}>{basicDetails.designation || 'Designation'}</p>
            <p className="text-xs mt-1" style={{ color: brown, opacity: 0.7 }}>{basicDetails.companyName || 'Company Name'}</p>
            {basicDetails.employeeId && <p className="text-xs mt-2 px-2 py-0.5 rounded font-mono inline-block border" style={{ borderColor: brown, color: brown }}>No. {basicDetails.employeeId}</p>}
          </div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {contactDetails.mobileNumber && <div className="flex items-center gap-2 bg-white/40 rounded px-2 py-1 border" style={{ borderColor: tan }}><Phone className="w-3 h-3" style={{ color: brown }} /><span style={{ color: brown }}>{contactDetails.mobileNumber}</span></div>}
            {contactDetails.email && <div className="flex items-center gap-2 bg-white/40 rounded px-2 py-1 border" style={{ borderColor: tan }}><Mail className="w-3 h-3" style={{ color: brown }} /><span style={{ color: brown }} className="truncate">{contactDetails.email}</span></div>}
            {(contactDetails.city || contactDetails.country) && <div className="flex items-center gap-2 bg-white/40 rounded px-2 py-1 border" style={{ borderColor: tan }}><MapPin className="w-3 h-3" style={{ color: brown }} /><span style={{ color: brown }}>{contactDetails.city}{contactDetails.city && contactDetails.country && ', '}{contactDetails.country}</span></div>}
            {contactDetails.website && <div className="flex items-center gap-2 bg-white/40 rounded px-2 py-1 border" style={{ borderColor: tan }}><Globe className="w-3 h-3" style={{ color: brown }} /><span style={{ color: brown }} className="truncate">{contactDetails.website.replace(/^https?:\/\//, '')}</span></div>}
          </div>
        </div>
        <div className="flex items-end justify-between mt-3 pt-2 border-t" style={{ borderColor: tan }}>
          {basicDetails.tagline && <p className="text-xs italic" style={{ color: brown, opacity: 0.6 }}>"{basicDetails.tagline}"</p>}
          {qrCodeUrl && <div className="bg-white rounded-sm p-1 border-2" style={{ borderColor: brown }}><img src={qrCodeUrl} alt="QR Code" className="w-12 h-12" /></div>}
        </div>
      </div>
    </div>
  );
}