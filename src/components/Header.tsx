import { useState } from 'react';
import { useStore } from '../store';
import { HelpCircle, ShieldCheck, LayoutGrid } from 'lucide-react';
import { ExportPanel } from './export/ExportPanel';
import { VerificationPage } from './Verification';
import { CardSheet } from './export/CardSheet';

export function Header() {
  const userData = useStore((state) => state.userData);
  const managedCards = useStore((state) => state.managedCards);
  const hasContent = Boolean(userData.basicDetails.fullName || userData.photoSettings.imageData);
  const [showVerification, setShowVerification] = useState(false);
  const [showCardSheet, setShowCardSheet] = useState(false);

  return (
    <header className="h-12 px-4 flex items-center justify-between border-b border-slate-200 bg-white">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-xs font-bold">ID</span>
        </div>
        <h1 className="text-lg font-semibold text-slate-800">IDForge</h1>
      </div>

      <div className="flex items-center gap-2">
        {managedCards.length > 0 && (
          <>
            <button
              onClick={() => setShowVerification(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors text-sm"
              title="Verify Cards"
            >
              <ShieldCheck className="w-4 h-4" />
              Verify
            </button>
            <button
              onClick={() => setShowCardSheet(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors text-sm"
              title="Card Sheet"
            >
              <LayoutGrid className="w-4 h-4" />
              Sheet
            </button>
          </>
        )}
        
        {hasContent && <ExportPanel />}
        
        <button
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          title="Help"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>

      {showVerification && <VerificationPage onClose={() => setShowVerification(false)} />}
      {showCardSheet && <CardSheet onClose={() => setShowCardSheet(false)} />}
    </header>
  );
}