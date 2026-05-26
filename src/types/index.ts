export interface BasicDetails {
  fullName: string;
  designation: string;
  companyName: string;
  department: string;
  employeeId: string;
  tagline: string;
}

export interface ContactDetails {
  mobileNumber: string;
  alternateNumber: string;
  email: string;
  website: string;
  officeAddress: string;
  city: string;
  country: string;
}

export interface SocialLinks {
  linkedin: string;
  instagram: string;
  facebook: string;
  youtube: string;
  twitter: string;
  github: string;
  portfolio: string;
}

export interface OptionalDetails {
  shortBio: string;
  emergencyContact: string;
  bloodGroup: string;
  joiningDate: string;
}

export interface PhotoSettings {
  imageData: string | null;
  style: 'circle' | 'rounded' | 'square' | 'borderGlow' | 'glassEffect';
}

export type QRRedirectTarget = 
  | 'linkedin' 
  | 'instagram' 
  | 'facebook' 
  | 'youtube' 
  | 'website' 
  | 'portfolio' 
  | 'github' 
  | 'vcard' 
  | 'custom';

export interface QRSettings {
  redirectTarget: QRRedirectTarget;
  customUrl: string;
  foregroundColor: string;
  backgroundColor: string;
  size: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
}

export type TemplateType = 'corporate' | 'modern' | 'minimal' | 'executive' | 'glassmorphism' | 'neonoir' | 'festivalvibe' | 'techspark' | 'creativepulse' | 'neoncyber' | 'widescreenpro' | 'artisan' | 'retrowave' | 'natureserenity' | 'oceandepth' | 'sunsetglow' | 'midnightelegance' | 'nordicminimal' | 'urbanedge' | 'cherrybloom' | 'cosmicdust' | 'goldenhour' | 'steelforge' | 'vintageclassic';

export interface BrandingColors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
  border: string;
}

export type BackgroundType = 'solid' | 'gradient' | 'glass' | 'pattern';

export interface BackgroundSettings {
  type: BackgroundType;
  gradientColors?: string[];
  pattern?: string;
  imageData?: string;
}

export interface UserData {
  basicDetails: BasicDetails;
  contactDetails: ContactDetails;
  socialLinks: SocialLinks;
  optionalDetails: OptionalDetails;
  photoSettings: PhotoSettings;
  qrSettings: QRSettings;
  brandingColors: BrandingColors;
  backgroundSettings: BackgroundSettings;
  previewMode?: PreviewMode;
}

export type ExportFormat = 'png' | 'pdf';
export type ExportQuality = 'standard' | 'hd' | '2k' | '4k';

export interface ExportSettings {
  format: ExportFormat;
  quality: ExportQuality;
}

export type AppTheme = 'light' | 'dark';

export type PreviewMode = 'desktop' | 'mobile' | 'print';

export interface BrandPreset {
  id: string;
  name: string;
  brandingColors: BrandingColors;
  backgroundSettings: BackgroundSettings;
  template: TemplateType;
}

export type CardStatus = 'active' | 'expired' | 'revoked';

export interface ManagedCard {
  id: string;
  userData: UserData;
  template: TemplateType;
  status: CardStatus;
  createdAt: string;
  expiresAt: string | null;
  organizationId: string;
  teamId: string | null;
}

export interface Team {
  id: string;
  name: string;
  defaultTemplate: TemplateType;
  brandPresetId: string | null;
}

export interface Organization {
  id: string;
  name: string;
  logo: string | null;
  teams: Team[];
  defaultBranding: BrandingColors;
}

export interface ActivityLog {
  id: string;
  cardId: string;
  action: 'created' | 'updated' | 'exported' | 'status_changed';
  details: string;
  timestamp: string;
}

export interface BulkImportConfig {
  template: TemplateType;
  brandPresetId: string | null;
  columnMapping: Record<string, keyof UserData | keyof BasicDetails | keyof ContactDetails>;
}