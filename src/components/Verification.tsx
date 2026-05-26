import { useState } from 'react';
import { useStore } from '../store';
import { Search, CheckCircle, XCircle, AlertTriangle, User, Building, Mail, Phone, ArrowLeft } from 'lucide-react';
import type { ManagedCard } from '../types';

interface VerificationPageProps {
  onClose: () => void;
}

export function VerificationPage({ onClose }: VerificationPageProps) {
  const managedCards = useStore((state) => state.managedCards);
  const [searchId, setSearchId] = useState('');
  const [verifiedCard, setVerifiedCard] = useState<ManagedCard | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'valid' | 'invalid' | 'expired' | 'revoked'>('idle');

  const handleVerify = () => {
    const card = managedCards.find(c => 
      c.id.toLowerCase() === searchId.toLowerCase().trim() || 
      c.userData.basicDetails.employeeId.toLowerCase() === searchId.toLowerCase().trim()
    );
    
    if (!card) {
      setVerifiedCard(null);
      setVerificationStatus('invalid');
      return;
    }

    setVerifiedCard(card);
    
    if (card.status === 'expired') {
      setVerificationStatus('expired');
    } else if (card.status === 'revoked') {
      setVerificationStatus('revoked');
    } else {
      setVerificationStatus('valid');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h3 className="font-semibold text-slate-800">Card Verification</h3>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-md mx-auto">
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter Card ID or Employee ID"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={handleVerify}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Verify
                </button>
              </div>

              {verificationStatus !== 'idle' && (
                <div className={`mt-6 p-4 rounded-lg ${
                  verificationStatus === 'valid' ? 'bg-green-50 border border-green-200' :
                  verificationStatus === 'invalid' ? 'bg-red-50 border border-red-200' :
                  verificationStatus === 'expired' ? 'bg-yellow-50 border border-yellow-200' :
                  'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    {verificationStatus === 'valid' && <CheckCircle className="w-6 h-6 text-green-600" />}
                    {verificationStatus === 'invalid' && <XCircle className="w-6 h-6 text-red-600" />}
                    {verificationStatus === 'expired' && <AlertTriangle className="w-6 h-6 text-yellow-600" />}
                    {verificationStatus === 'revoked' && <XCircle className="w-6 h-6 text-red-600" />}
                    <span className={`font-semibold ${
                      verificationStatus === 'valid' ? 'text-green-800' :
                      verificationStatus === 'invalid' ? 'text-red-800' :
                      verificationStatus === 'expired' ? 'text-yellow-800' :
                      'text-red-800'
                    }`}>
                      {verificationStatus === 'valid' && 'Card Verified'}
                      {verificationStatus === 'invalid' && 'Card Not Found'}
                      {verificationStatus === 'expired' && 'Card Expired'}
                      {verificationStatus === 'revoked' && 'Card Revoked'}
                    </span>
                  </div>

                  {verifiedCard && verificationStatus === 'valid' && (
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-500" />
                        <span className="font-medium">{verifiedCard.userData.basicDetails.fullName}</span>
                      </div>
                      {verifiedCard.userData.basicDetails.designation && (
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-slate-500" />
                          <span>{verifiedCard.userData.basicDetails.designation} {verifiedCard.userData.basicDetails.companyName && `at ${verifiedCard.userData.basicDetails.companyName}`}</span>
                        </div>
                      )}
                      {verifiedCard.userData.contactDetails.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-slate-500" />
                          <span>{verifiedCard.userData.contactDetails.email}</span>
                        </div>
                      )}
                      {verifiedCard.userData.contactDetails.mobileNumber && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-slate-500" />
                          <span>{verifiedCard.userData.contactDetails.mobileNumber}</span>
                        </div>
                      )}
                      <div className="mt-3 pt-3 border-t border-green-200 text-xs text-slate-500">
                        Card ID: {verifiedCard.id}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}