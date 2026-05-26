import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  UserData,
  BasicDetails,
  ContactDetails,
  SocialLinks,
  OptionalDetails,
  PhotoSettings,
  QRSettings,
  BrandingColors,
  BackgroundSettings,
  TemplateType,
  ExportFormat,
  ExportQuality,
  AppTheme,
  PreviewMode,
  BrandPreset,
  ManagedCard,
  Organization,
  ActivityLog,
  CardStatus,
} from '../types';

interface AppState {
  theme: AppTheme;
  template: TemplateType;
  previewMode: PreviewMode;
  activeSection: string;
  
  userData: UserData;
  exportSettings: {
    format: ExportFormat;
    quality: ExportQuality;
  };
  brandPresets: BrandPreset[];
  
  organization: Organization | null;
  managedCards: ManagedCard[];
  activityLog: ActivityLog[];
  
  setTheme: (theme: AppTheme) => void;
  toggleTheme: () => void;
  setTemplate: (template: TemplateType) => void;
  setPreviewMode: (mode: PreviewMode) => void;
  setActiveSection: (section: string) => void;
  
  updateBasicDetails: (details: Partial<BasicDetails>) => void;
  updateContactDetails: (details: Partial<ContactDetails>) => void;
  updateSocialLinks: (links: Partial<SocialLinks>) => void;
  updateOptionalDetails: (details: Partial<OptionalDetails>) => void;
  updatePhotoSettings: (settings: Partial<PhotoSettings>) => void;
  updateQRSettings: (settings: Partial<QRSettings>) => void;
  updateBrandingColors: (colors: Partial<BrandingColors>) => void;
  updateBackgroundSettings: (settings: Partial<BackgroundSettings>) => void;
  
  setExportFormat: (format: ExportFormat) => void;
  setExportQuality: (quality: ExportQuality) => void;
  
  addBrandPreset: (preset: BrandPreset) => void;
  removeBrandPreset: (id: string) => void;
  
  setOrganization: (org: Organization | null) => void;
  addManagedCard: (card: ManagedCard) => void;
  updateManagedCard: (cardId: string, userData: UserData) => void;
  updateCardStatus: (cardId: string, status: CardStatus) => void;
  removeManagedCard: (cardId: string) => void;
  addActivityLog: (log: ActivityLog) => void;
  importBulkCards: (cards: ManagedCard[]) => void;
  
  resetToDefaults: () => void;
}

const defaultBrandingColors: BrandingColors = {
  primary: '#3B82F6',
  secondary: '#64748B',
  accent: '#10B981',
  text: '#0F172A',
  background: '#FFFFFF',
  border: '#E2E8F0',
};

const defaultUserData: UserData = {
  basicDetails: {
    fullName: '',
    designation: '',
    companyName: '',
    department: '',
    employeeId: '',
    tagline: '',
  },
  contactDetails: {
    mobileNumber: '',
    alternateNumber: '',
    email: '',
    website: '',
    officeAddress: '',
    city: '',
    country: '',
  },
  socialLinks: {
    linkedin: '',
    instagram: '',
    facebook: '',
    youtube: '',
    twitter: '',
    github: '',
    portfolio: '',
  },
  optionalDetails: {
    shortBio: '',
    emergencyContact: '',
    bloodGroup: '',
    joiningDate: '',
  },
  photoSettings: {
    imageData: null,
    style: 'rounded',
  },
  qrSettings: {
    redirectTarget: 'website',
    customUrl: '',
    foregroundColor: '#0F172A',
    backgroundColor: '#FFFFFF',
    size: 120,
    errorCorrectionLevel: 'M',
  },
  brandingColors: defaultBrandingColors,
  backgroundSettings: {
    type: 'solid',
  },
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      template: 'corporate',
      previewMode: 'desktop',
      activeSection: 'basic',
      
      userData: defaultUserData,
      exportSettings: {
        format: 'png',
        quality: 'hd',
      },
      brandPresets: [],
      
      organization: null,
      managedCards: [],
      activityLog: [],
      
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setTemplate: (template) => set({ template }),
      setPreviewMode: (previewMode) => set({ previewMode }),
      setActiveSection: (activeSection) => set({ activeSection }),
      
      updateBasicDetails: (details) =>
        set((state) => ({
          userData: {
            ...state.userData,
            basicDetails: { ...state.userData.basicDetails, ...details },
          },
        })),
      
      updateContactDetails: (details) =>
        set((state) => ({
          userData: {
            ...state.userData,
            contactDetails: { ...state.userData.contactDetails, ...details },
          },
        })),
      
      updateSocialLinks: (links) =>
        set((state) => ({
          userData: {
            ...state.userData,
            socialLinks: { ...state.userData.socialLinks, ...links },
          },
        })),
      
      updateOptionalDetails: (details) =>
        set((state) => ({
          userData: {
            ...state.userData,
            optionalDetails: { ...state.userData.optionalDetails, ...details },
          },
        })),
      
      updatePhotoSettings: (settings) =>
        set((state) => ({
          userData: {
            ...state.userData,
            photoSettings: { ...state.userData.photoSettings, ...settings },
          },
        })),
      
      updateQRSettings: (settings) =>
        set((state) => ({
          userData: {
            ...state.userData,
            qrSettings: { ...state.userData.qrSettings, ...settings },
          },
        })),
      
      updateBrandingColors: (colors) =>
        set((state) => ({
          userData: {
            ...state.userData,
            brandingColors: { ...state.userData.brandingColors, ...colors },
          },
        })),
      
      updateBackgroundSettings: (settings) =>
        set((state) => ({
          userData: {
            ...state.userData,
            backgroundSettings: { ...state.userData.backgroundSettings, ...settings },
          },
        })),
      
      setExportFormat: (format) =>
        set((state) => ({
          exportSettings: { ...state.exportSettings, format },
        })),
      
      setExportQuality: (quality) =>
        set((state) => ({
          exportSettings: { ...state.exportSettings, quality },
        })),
      
      addBrandPreset: (preset) =>
        set((state) => ({
          brandPresets: [...state.brandPresets, preset],
        })),
      
      removeBrandPreset: (id) =>
        set((state) => ({
          brandPresets: state.brandPresets.filter((p) => p.id !== id),
        })),
      
      setOrganization: (org) => set({ organization: org }),
      
      addManagedCard: (card) =>
        set((state) => ({
          managedCards: [...state.managedCards, card],
          activityLog: [
            ...state.activityLog,
            {
              id: `log-${Date.now()}`,
              cardId: card.id,
              action: 'created',
              details: `Card created for ${card.userData.basicDetails.fullName}`,
              timestamp: new Date().toISOString(),
            },
          ],
        })),

      updateManagedCard: (cardId, userData) =>
        set((state) => ({
          managedCards: state.managedCards.map((card) =>
            card.id === cardId ? { ...card, userData } : card
          ),
          activityLog: [
            ...state.activityLog,
            {
              id: `log-${Date.now()}`,
              cardId,
              action: 'updated',
              details: `Card updated`,
              timestamp: new Date().toISOString(),
            },
          ],
        })),
      
      updateCardStatus: (cardId, status) =>
        set((state) => ({
          managedCards: state.managedCards.map((card) =>
            card.id === cardId ? { ...card, status } : card
          ),
          activityLog: [
            ...state.activityLog,
            {
              id: `log-${Date.now()}`,
              cardId,
              action: 'status_changed',
              details: `Card status changed to ${status}`,
              timestamp: new Date().toISOString(),
            },
          ],
        })),
      
      removeManagedCard: (cardId) =>
        set((state) => ({
          managedCards: state.managedCards.filter((card) => card.id !== cardId),
        })),
      
      addActivityLog: (log) =>
        set((state) => ({
          activityLog: [...state.activityLog, log],
        })),
      
      importBulkCards: (cards) =>
        set((state) => ({
          managedCards: [...state.managedCards, ...cards],
          activityLog: [
            ...state.activityLog,
            {
              id: `log-${Date.now()}`,
              cardId: 'bulk',
              action: 'created',
              details: `Bulk imported ${cards.length} cards`,
              timestamp: new Date().toISOString(),
            },
          ],
        })),
      
      resetToDefaults: () =>
        set({
          userData: defaultUserData,
          template: 'corporate',
        }),
    }),
    {
      name: 'idforge-storage',
      partialize: (state) => ({
        theme: state.theme,
        template: state.template,
        userData: state.userData,
        exportSettings: state.exportSettings,
        brandPresets: state.brandPresets,
        organization: state.organization,
        managedCards: state.managedCards,
      }),
    }
  )
);