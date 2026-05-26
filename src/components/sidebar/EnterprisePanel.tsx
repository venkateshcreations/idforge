import { useState, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { useStore } from '../../store';
import { Input, Button } from '../ui';
import { Users, Upload, FileSpreadsheet, Trash2, Plus, Download, Check, X, Eye, FileImage, FileText, Search } from 'lucide-react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { EnterpriseIcon } from './SidebarIcons';
import { Corporate, Modern, Minimal, Executive, Glassmorphism, NeoNoir, FestivalVibe, TechSpark, CreativePulse, NeonCyber, WidescreenPro, Artisan, RetroWave, NatureSerenity, OceanDepth, SunsetGlow, MidnightElegance, NordicMinimal, UrbanEdge, CherryBloom, CosmicDust, GoldenHour, SteelForge, VintageClassic } from '../templates';
import type { Organization as OrgType, ManagedCard, TemplateType, UserData } from '../../types';

const templateComponents: Record<TemplateType, React.FC<{ userData: UserData }>> = {
  corporate: Corporate,
  modern: Modern,
  minimal: Minimal,
  executive: Executive,
  glassmorphism: Glassmorphism,
  neonoir: NeoNoir,
  festivalvibe: FestivalVibe,
  techspark: TechSpark,
  creativepulse: CreativePulse,
  neoncyber: NeonCyber,
  widescreenpro: WidescreenPro,
  artisan: Artisan,
  retrowave: RetroWave,
  natureserenity: NatureSerenity,
  oceandepth: OceanDepth,
  sunsetglow: SunsetGlow,
  midnightelegance: MidnightElegance,
  nordicminimal: NordicMinimal,
  urbanedge: UrbanEdge,
  cherrybloom: CherryBloom,
  cosmicdust: CosmicDust,
  goldenhour: GoldenHour,
  steelforge: SteelForge,
  vintageclassic: VintageClassic,
};

export function EnterprisePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const organization = useStore((state) => state.organization);
  const setOrganization = useStore((state) => state.setOrganization);
  const managedCards = useStore((state) => state.managedCards);
  const addManagedCard = useStore((state) => state.addManagedCard);
  const removeManagedCard = useStore((state) => state.removeManagedCard);
  const updateManagedCard = useStore((state) => state.updateManagedCard);
  const updateCardStatus = useStore((state) => state.updateCardStatus);
  const importBulkCards = useStore((state) => state.importBulkCards);
  const userData = useStore((state) => state.userData);
  const template = useStore((state) => state.template);
  const brandPresets = useStore((state) => state.brandPresets);
  
  const [orgName, setOrgName] = useState('');
  const [showOrgForm, setShowOrgForm] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showCardList, setShowCardList] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('corporate');
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [previewCard, setPreviewCard] = useState<ManagedCard | null>(null);
  const [previewZoom, setPreviewZoom] = useState(100);
  const [showBulkExport, setShowBulkExport] = useState(false);
  const [bulkExportFormat, setBulkExportFormat] = useState<'png' | 'pdf'>('png');
  const [bulkExportQuality, setBulkExportQuality] = useState<'standard' | 'hd' | '2k' | '4k'>('hd');
  const [isExporting, setIsExporting] = useState(false);
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());
  const photoInputRefs = useRef<Record<string, HTMLInputElement>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  const filteredCards = useMemo(() => {
    return managedCards.filter(card => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        card.userData.basicDetails.fullName?.toLowerCase().includes(query) ||
        card.userData.basicDetails.designation?.toLowerCase().includes(query) ||
        card.userData.basicDetails.companyName?.toLowerCase().includes(query) ||
        card.userData.basicDetails.department?.toLowerCase().includes(query) ||
        card.userData.basicDetails.employeeId?.toLowerCase().includes(query) ||
        card.userData.contactDetails.email?.toLowerCase().includes(query);
      
      const matchesStatus = statusFilter === 'all' || card.status === statusFilter;
      const matchesDept = departmentFilter === 'all' || card.userData.basicDetails.department === departmentFilter;
      
      return matchesSearch && matchesStatus && matchesDept;
    });
  }, [managedCards, searchQuery, statusFilter, departmentFilter]);

  const departments = useMemo(() => {
    const depts = new Set(managedCards.map(c => c.userData.basicDetails.department).filter(Boolean));
    return Array.from(depts).sort();
  }, [managedCards]);

  const toggleCardSelection = (cardId: string) => {
    setSelectedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const selectAllCards = () => {
    if (selectedCards.size === filteredCards.length && filteredCards.length > 0) {
      setSelectedCards(new Set());
    } else {
      setSelectedCards(new Set(filteredCards.map(c => c.id)));
    }
  };

  const handleCardPhotoUpload = (cardId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result as string;
      const card = managedCards.find(c => c.id === cardId);
      if (card) {
        const updatedUserData = {
          ...card.userData,
          photoSettings: {
            ...card.userData.photoSettings,
            imageData,
          },
        };
        updateManagedCard(cardId, updatedUserData);
      }
    };
    reader.readAsDataURL(file);
    if (photoInputRefs.current[cardId]) {
      photoInputRefs.current[cardId].value = '';
    }
  };

  const downloadSampleCSV = () => {
    const csvContent = `name,designation,company,department,employeeid,email,phone,website,expires
John Doe,Software Engineer,Acme Corp,Engineering,EMP001,john.doe@acme.com,+1234567890,https://acme.com,2026-12-31
Jane Smith,Product Manager,Acme Corp,Product,EMP002,jane.smith@acme.com,+1234567891,https://acme.com,2026-12-31
Mike Johnson,Designer,Acme Corp,Design,EMP003,mike.j@acme.com,+1234567892,https://acme.com,2026-12-31
Sarah Williams,Data Analyst,Acme Corp,Analytics,EMP004,sarah.w@acme.com,+1234567893,https://acme.com,2026-12-31
Tom Brown,Marketing Lead,Acme Corp,Marketing,EMP005,tom.b@acme.com,+1234567894,https://acme.com,2026-12-31`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-cards.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const createOrganization = () => {
    if (!orgName.trim()) return;
    const newOrg: OrgType = {
      id: `org-${Date.now()}`,
      name: orgName,
      logo: null,
      teams: [],
      defaultBranding: {
        primary: '#3B82F6',
        secondary: '#64748B',
        accent: '#10B981',
        text: '#0F172A',
        background: '#FFFFFF',
        border: '#E2E8F0',
      },
    };
    setOrganization(newOrg);
    setShowOrgForm(false);
    setOrgName('');
  };

  const handleCSVImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      if (lines.length < 2) return;

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      const cards: ManagedCard[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        const row: Record<string, string> = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });

        const cardUserData: UserData = JSON.parse(JSON.stringify(userData));
        if (row.name) cardUserData.basicDetails.fullName = row.name;
        if (row.designation) cardUserData.basicDetails.designation = row.designation;
        if (row.company) cardUserData.basicDetails.companyName = row.company;
        if (row.department) cardUserData.basicDetails.department = row.department;
        if (row.employeeid || row.id) cardUserData.basicDetails.employeeId = row.employeeid || row.id || '';
        if (row.email) cardUserData.contactDetails.email = row.email;
        if (row.phone) cardUserData.contactDetails.mobileNumber = row.phone;
        if (row.website) cardUserData.contactDetails.website = row.website;

        if (selectedPreset && brandPresets.find(p => p.id === selectedPreset)) {
          const preset = brandPresets.find(p => p.id === selectedPreset)!;
          cardUserData.brandingColors = preset.brandingColors;
          cardUserData.backgroundSettings = preset.backgroundSettings;
        }

        cards.push({
          id: `card-${Date.now()}-${i}`,
          userData: cardUserData,
          template: selectedTemplate,
          status: 'active',
          createdAt: new Date().toISOString(),
          expiresAt: row.expires ? row.expires : null,
          organizationId: organization?.id || 'default',
          teamId: null,
        });
      }

      importBulkCards(cards);
      setShowImport(false);
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const saveCurrentAsCard = () => {
    const newCard: ManagedCard = {
      id: `card-${Date.now()}`,
      userData: JSON.parse(JSON.stringify(userData)),
      template,
      status: 'active',
      createdAt: new Date().toISOString(),
      expiresAt: null,
      organizationId: organization?.id || 'default',
      teamId: null,
    };
    addManagedCard(newCard);
  };

  const copyCardId = (cardId: string) => {
    navigator.clipboard.writeText(cardId);
    setCopiedId(cardId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportCardsAsJSON = () => {
    const dataStr = JSON.stringify(managedCards, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `idforge-cards-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const qualityMultipliers = {
    standard: 1,
    hd: 2,
    '2k': 3,
    '4k': 4,
  };

  const exportBulkCards = async () => {
    const cardsToExport = selectedCards.size > 0 
      ? managedCards.filter(c => selectedCards.has(c.id))
      : managedCards;
    
    setIsExporting(true);
    try {
      for (let i = 0; i < cardsToExport.length; i++) {
        const card = cardsToExport[i];
        const Template = templateComponents[card.template];
        
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '0';
        document.body.appendChild(container);
        
        const tempDiv = document.createElement('div');
        tempDiv.className = 'id-card-container';
        tempDiv.style.width = '540px';
        tempDiv.style.height = '340px';
        container.appendChild(tempDiv);
        
        const root = createRoot(tempDiv);
        
        await new Promise<void>((resolve) => {
          root.render(<Template userData={card.userData} />);
          setTimeout(resolve, 100);
        });
        
        const multiplier = qualityMultipliers[bulkExportQuality];
        
        if (bulkExportFormat === 'pdf') {
          const dataUrl = await toPng(tempDiv, { pixelRatio: multiplier, cacheBust: true });
          const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'in',
            format: [3.375, 2.125],
          });
          pdf.addImage(dataUrl, 'PNG', 0, 0, 3.375, 2.125);
          pdf.save(`${card.userData.basicDetails.fullName || 'card'}-${card.id}.pdf`);
        } else {
          const dataUrl = await toPng(tempDiv, { pixelRatio: multiplier, cacheBust: true });
          const link = document.createElement('a');
          link.download = `${card.userData.basicDetails.fullName || 'card'}-${card.id}.png`;
          link.href = dataUrl;
          link.click();
        }
        
        root.unmount();
        document.body.removeChild(container);
        
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    } catch (err) {
      console.error('Bulk export failed:', err);
    } finally {
      setIsExporting(false);
      setShowBulkExport(false);
    }
  };

  const templateOptions: { value: TemplateType; label: string }[] = [
    { value: 'corporate', label: 'Corporate' },
    { value: 'modern', label: 'Modern' },
    { value: 'minimal', label: 'Minimal' },
    { value: 'executive', label: 'Executive' },
    { value: 'glassmorphism', label: 'Glassmorphism' },
    { value: 'neonoir', label: 'Neo Noir' },
    { value: 'festivalvibe', label: 'Festival Vibe' },
    { value: 'techspark', label: 'Tech Spark' },
    { value: 'creativepulse', label: 'Creative Pulse' },
    { value: 'neoncyber', label: 'Neon Cyber' },
    { value: 'widescreenpro', label: 'Widescreen Pro' },
    { value: 'artisan', label: 'Artisan' },
    { value: 'retrowave', label: 'Retro Wave' },
    { value: 'natureserenity', label: 'Nature Serenity' },
    { value: 'oceandepth', label: 'Ocean Depth' },
    { value: 'sunsetglow', label: 'Sunset Glow' },
    { value: 'midnightelegance', label: 'Midnight Elegance' },
    { value: 'nordicminimal', label: 'Nordic Minimal' },
    { value: 'urbanedge', label: 'Urban Edge' },
    { value: 'cherrybloom', label: 'Cherry Bloom' },
    { value: 'cosmicdust', label: 'Cosmic Dust' },
    { value: 'goldenhour', label: 'Golden Hour' },
    { value: 'steelforge', label: 'Steel Forge' },
    { value: 'vintageclassic', label: 'Vintage Classic' },
  ];

  return (
    <div className="border-b border-slate-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200 hover:bg-slate-50"
      >
        <div className="flex items-center gap-3">
          <span className="text-slate-400">
            <EnterpriseIcon className="w-5 h-5" />
          </span>
          <span className="font-medium text-slate-700">Enterprise</span>
          {managedCards.length > 0 && (
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
              {managedCards.length}
            </span>
          )}
        </div>
        {isOpen ? (
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4 space-y-4">
          {!organization ? (
            <div className="space-y-3">
              <p className="text-sm text-slate-500">Set up your organization to manage team cards</p>
              {showOrgForm ? (
                <div className="space-y-3">
                  <Input
                    label="Organization Name"
                    placeholder="Acme Corp"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button onClick={createOrganization} className="flex-1">
                      <Plus className="w-4 h-4 mr-1" />
                      Create
                    </Button>
                    <Button variant="secondary" onClick={() => setShowOrgForm(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <Button onClick={() => setShowOrgForm(true)} className="w-full">
                  <EnterpriseIcon className="w-4 h-4 mr-2" />
                  Setup Organization
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-blue-900">{organization.name}</p>
                  <p className="text-xs text-blue-600">{managedCards.length} cards</p>
                </div>
                <button
                  onClick={() => setOrganization(null)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button onClick={saveCurrentAsCard} variant="secondary" className="text-xs py-2">
                  <Plus className="w-4 h-4 mr-1" />
                  Save Card
                </Button>
                <Button onClick={() => setShowImport(true)} variant="secondary" className="text-xs py-2">
                  <Upload className="w-4 h-4 mr-1" />
                  Import CSV
                </Button>
              </div>

              {managedCards.length > 0 && (
                <Button onClick={() => setShowCardList(true)} variant="secondary" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Cards ({managedCards.length})
                </Button>
              )}

              {managedCards.length > 0 && (
                <Button onClick={exportCardsAsJSON} variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Export JSON
                </Button>
              )}

              {managedCards.length > 0 && (
                <Button onClick={() => setShowBulkExport(true)} variant="secondary" className="w-full">
                  <FileImage className="w-4 h-4 mr-2" />
                  Bulk Export
                </Button>
              )}
            </div>
          )}

          {showImport && (
            <div className="bg-slate-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <FileSpreadsheet className="w-5 h-5 text-green-600" />
                <span className="font-medium text-slate-700">CSV Import</span>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-slate-600">Template</label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value as TemplateType)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                >
                  {templateOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {brandPresets.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm text-slate-600">Brand Preset (optional)</label>
                  <select
                    value={selectedPreset}
                    onChange={(e) => setSelectedPreset(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                  >
                    <option value="">None</option>
                    {brandPresets.map(preset => (
                      <option key={preset.id} value={preset.id}>{preset.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="text-xs text-slate-500 space-y-1">
                <p className="font-medium">CSV columns: name, designation, company, department, employeeid, email, phone, website, expires</p>
                <button
                  onClick={downloadSampleCSV}
                  className="text-blue-600 hover:underline flex items-center gap-1 mt-2"
                >
                  <Download className="w-3 h-3" />
                  Download sample CSV
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleCSVImport}
                className="w-full text-sm"
              />

              <Button variant="secondary" onClick={() => setShowImport(false)} className="w-full">
                Cancel
              </Button>
            </div>
          )}

          {showBulkExport && (
            <div className="bg-slate-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <FileImage className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-slate-700">Bulk Export</span>
              </div>
              
              <div>
                <label className="text-sm text-slate-600 block mb-2">Format</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setBulkExportFormat('png')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border transition-colors ${
                      bulkExportFormat === 'png'
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <FileImage className="w-4 h-4" />
                    <span className="text-sm">PNG</span>
                  </button>
                  <button
                    onClick={() => setBulkExportFormat('pdf')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border transition-colors ${
                      bulkExportFormat === 'pdf'
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">PDF</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-600 block mb-2">Quality</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['standard', 'hd', '2k', '4k'] as const).map((q) => (
                    <button
                      key={q}
                      onClick={() => setBulkExportQuality(q)}
                      className={`py-2 px-3 rounded-lg border text-sm transition-colors ${
                        bulkExportQuality === q
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      {q.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-500">
                {selectedCards.size > 0 
                  ? `This will export ${selectedCards.size} selected card${selectedCards.size > 1 ? 's' : ''}`
                  : `This will export all ${managedCards.length} card${managedCards.length > 1 ? 's' : ''}`
                }
              </p>

              <Button 
                onClick={exportBulkCards} 
                loading={isExporting} 
                className="w-full"
                icon={isExporting ? undefined : <Download className="w-4 h-4" />}
              >
                {isExporting ? 'Exporting...' : `Export ${bulkExportFormat.toUpperCase()}`}
              </Button>

              <Button variant="secondary" onClick={() => setShowBulkExport(false)} className="w-full">
                Cancel
              </Button>
            </div>
          )}

          {showCardList && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl">
                <div className="p-4 border-b flex items-center justify-between flex-shrink-0">
                  <div>
                    <h3 className="font-semibold text-slate-800">Managed Cards</h3>
                    <p className="text-sm text-slate-500">{managedCards.length} card{managedCards.length !== 1 ? 's' : ''}</p>
                  </div>
                  <button onClick={() => setShowCardList(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {managedCards.length > 0 && (
                  <div className="px-4 py-3 bg-slate-50 border-b space-y-2 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCards.size === filteredCards.length && filteredCards.length > 0}
                          onChange={selectAllCards}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-slate-600">
                          {selectedCards.size > 0 ? `${selectedCards.size} selected` : 'Select All'}
                        </span>
                      </label>
                      <div className="flex-1" />
                      <span className="text-xs text-slate-500">
                        {filteredCards.length} of {managedCards.length} cards
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search name, designation, email..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="expired">Expired</option>
                        <option value="revoked">Revoked</option>
                      </select>
                      <select
                        value={departmentFilter}
                        onChange={(e) => setDepartmentFilter(e.target.value)}
                        className="px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All Departments</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                      <Button
                        onClick={() => {
                          setShowBulkExport(true);
                          setShowCardList(false);
                        }}
                        variant="secondary"
                        size="sm"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Export {selectedCards.size > 0 ? `(${selectedCards.size})` : ''}
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="overflow-y-auto flex-1 p-4">
                  {managedCards.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      No cards yet. Save a card or import from CSV.
                    </div>
                  ) : filteredCards.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      No cards match your search criteria.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredCards.map(card => (
                        <div key={card.id} className="border rounded-lg p-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={selectedCards.has(card.id)}
                              onChange={() => toggleCardSelection(card.id)}
                              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <div className="relative w-12 h-12 flex-shrink-0">
                              {card.userData.photoSettings.imageData ? (
                                <img 
                                  src={card.userData.photoSettings.imageData} 
                                  alt="Profile" 
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
                                  <span className="text-lg font-medium text-slate-500">
                                    {(card.userData.basicDetails.fullName || 'U').charAt(0).toUpperCase()}
                                  </span>
                                </div>
                              )}
                              <label 
                                htmlFor={`photo-${card.id}`}
                                className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 shadow-sm"
                                title="Upload photo"
                              >
                                <Upload className="w-3 h-3 text-white" />
                              </label>
                              <input
                                ref={(el: HTMLInputElement) => { photoInputRefs.current[card.id] = el; }}
                                id={`photo-${card.id}`}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleCardPhotoUpload(card.id, e)}
                                className="hidden"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-slate-800">{card.userData.basicDetails.fullName || 'Unnamed'}</p>
                              <p className="text-sm text-slate-500">
                                {card.userData.basicDetails.designation} {card.userData.basicDetails.companyName && `at ${card.userData.basicDetails.companyName}`}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                  card.status === 'active' ? 'bg-green-100 text-green-700' :
                                  card.status === 'expired' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {card.status}
                                </span>
                                <button
                                  onClick={() => copyCardId(card.id)}
                                  className="text-xs text-blue-600 hover:underline"
                                >
                                  {copiedId === card.id ? <Check className="w-3 h-3 inline" /> : 'Copy ID'}
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setPreviewCard(card)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                              title="Preview"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <select
                              value={card.status}
                              onChange={(e) => updateCardStatus(card.id, e.target.value as any)}
                              className="text-xs border rounded px-2 py-1"
                            >
                              <option value="active">Active</option>
                              <option value="expired">Expired</option>
                              <option value="revoked">Revoked</option>
                            </select>
                            <button
                              onClick={() => removeManagedCard(card.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {previewCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-800">Card Preview</h3>
                <p className="text-sm text-slate-500">{previewCard.userData.basicDetails.fullName}</p>
              </div>
              <button onClick={() => setPreviewCard(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-slate-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 bg-white rounded-lg p-1">
                  <button
                    onClick={() => setPreviewZoom(prev => Math.max(prev - 25, 50))}
                    className="p-1.5 rounded text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                    title="Zoom out"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="text-xs font-medium text-slate-600 w-12 text-center">{previewZoom}%</span>
                  <button
                    onClick={() => setPreviewZoom(prev => Math.min(prev + 25, 200))}
                    className="p-1.5 rounded text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                    title="Zoom in"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center min-h-[400px] overflow-auto">
                <div 
                  className="transition-transform duration-200"
                  style={{ 
                    transform: `scale(${previewZoom / 100})`,
                    transformOrigin: 'center center'
                  }}
                >
                  <div className="w-[540px] h-[340px]">
                    {(() => {
                      const Template = templateComponents[previewCard.template];
                      return <Template userData={previewCard.userData} />;
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}