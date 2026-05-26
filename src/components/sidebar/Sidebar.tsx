import { useState } from 'react';
import { useStore } from '../../store';
import { Input, TextArea } from '../ui';
import { PhotoUploader } from './PhotoUploader';
import { QRControls } from './QRControls';
import { TemplateSelector } from './TemplateSelector';
import { BrandingControls } from './BrandingControls';
import { BackgroundControls } from './BackgroundControls';
import { EnterprisePanel } from './EnterprisePanel';
import { ChevronDown, ChevronRight } from 'lucide-react';
import {
  UserIcon,
  PhoneIcon,
  GlobeIcon,
  ImageIcon,
  QRIcon,
  TemplateIcon,
  PaletteIcon,
  LayersIcon,
} from './SidebarIcons';

interface SectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Section({ id, title, icon, children, defaultOpen = true }: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const activeSection = useStore((state) => state.activeSection);
  const setActiveSection = useStore((state) => state.setActiveSection);

  const isActive = activeSection === id;

  return (
    <div className="border-b border-slate-100">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setActiveSection(id);
        }}
        className={`w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200 ${
          isActive ? 'bg-blue-50' : 'hover:bg-slate-50'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-slate-400">{icon}</span>
          <span className="font-medium text-slate-700">{title}</span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-slate-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 space-y-3">
          {children}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const userData = useStore((state) => state.userData);
  const updateBasicDetails = useStore((state) => state.updateBasicDetails);
  const updateContactDetails = useStore((state) => state.updateContactDetails);
  const updateSocialLinks = useStore((state) => state.updateSocialLinks);

  return (
    <div className="w-full h-full overflow-y-auto bg-white border-r border-slate-200">
      <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 40px)' }}>
        <Section id="basic" title="Basic Details" icon={<UserIcon className="w-5 h-5" />}>
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={userData.basicDetails.fullName}
            onChange={(e) => updateBasicDetails({ fullName: e.target.value })}
          />
          <Input
            label="Designation"
            placeholder="Software Engineer"
            value={userData.basicDetails.designation}
            onChange={(e) => updateBasicDetails({ designation: e.target.value })}
          />
          <Input
            label="Company Name"
            placeholder="Acme Corporation"
            value={userData.basicDetails.companyName}
            onChange={(e) => updateBasicDetails({ companyName: e.target.value })}
          />
          <Input
            label="Department"
            placeholder="Engineering"
            value={userData.basicDetails.department}
            onChange={(e) => updateBasicDetails({ department: e.target.value })}
          />
          <Input
            label="Employee ID"
            placeholder="EMP-001"
            value={userData.basicDetails.employeeId}
            onChange={(e) => updateBasicDetails({ employeeId: e.target.value })}
          />
          <Input
            label="Tagline"
            placeholder="Building the future"
            value={userData.basicDetails.tagline}
            onChange={(e) => updateBasicDetails({ tagline: e.target.value })}
          />
        </Section>

        <Section id="contact" title="Contact Details" icon={<PhoneIcon className="w-5 h-5" />}>
          <Input
            label="Mobile Number"
            placeholder="+1 234 567 8900"
            value={userData.contactDetails.mobileNumber}
            onChange={(e) => updateContactDetails({ mobileNumber: e.target.value })}
          />
          <Input
            label="Alternate Number"
            placeholder="+1 234 567 8901"
            value={userData.contactDetails.alternateNumber}
            onChange={(e) => updateContactDetails({ alternateNumber: e.target.value })}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="john@company.com"
            value={userData.contactDetails.email}
            onChange={(e) => updateContactDetails({ email: e.target.value })}
          />
          <Input
            label="Website URL"
            placeholder="https://company.com"
            value={userData.contactDetails.website}
            onChange={(e) => updateContactDetails({ website: e.target.value })}
          />
          <TextArea
            label="Office Address"
            placeholder="123 Business Street, Suite 100"
            rows={2}
            value={userData.contactDetails.officeAddress}
            onChange={(e) => updateContactDetails({ officeAddress: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="City"
              placeholder="New York"
              value={userData.contactDetails.city}
              onChange={(e) => updateContactDetails({ city: e.target.value })}
            />
            <Input
              label="Country"
              placeholder="USA"
              value={userData.contactDetails.country}
              onChange={(e) => updateContactDetails({ country: e.target.value })}
            />
          </div>
        </Section>

        <Section id="social" title="Social Links" icon={<GlobeIcon className="w-5 h-5" />}>
          <Input
            label="LinkedIn"
            placeholder="https://linkedin.com/in/username"
            value={userData.socialLinks.linkedin}
            onChange={(e) => updateSocialLinks({ linkedin: e.target.value })}
          />
          <Input
            label="Instagram"
            placeholder="https://instagram.com/username"
            value={userData.socialLinks.instagram}
            onChange={(e) => updateSocialLinks({ instagram: e.target.value })}
          />
          <Input
            label="Facebook"
            placeholder="https://facebook.com/username"
            value={userData.socialLinks.facebook}
            onChange={(e) => updateSocialLinks({ facebook: e.target.value })}
          />
          <Input
            label="YouTube"
            placeholder="https://youtube.com/@channel"
            value={userData.socialLinks.youtube}
            onChange={(e) => updateSocialLinks({ youtube: e.target.value })}
          />
          <Input
            label="Twitter/X"
            placeholder="https://x.com/username"
            value={userData.socialLinks.twitter}
            onChange={(e) => updateSocialLinks({ twitter: e.target.value })}
          />
          <Input
            label="GitHub"
            placeholder="https://github.com/username"
            value={userData.socialLinks.github}
            onChange={(e) => updateSocialLinks({ github: e.target.value })}
          />
          <Input
            label="Portfolio"
            placeholder="https://portfolio.com"
            value={userData.socialLinks.portfolio}
            onChange={(e) => updateSocialLinks({ portfolio: e.target.value })}
          />
        </Section>

        <Section id="photo" title="Photo" icon={<ImageIcon className="w-5 h-5" />} defaultOpen={false}>
          <PhotoUploader />
        </Section>

        <Section id="qr" title="QR Code" icon={<QRIcon className="w-5 h-5" />} defaultOpen={false}>
          <QRControls />
        </Section>

        <Section id="template" title="Template" icon={<TemplateIcon className="w-5 h-5" />} defaultOpen={false}>
          <TemplateSelector />
        </Section>

        <Section id="branding" title="Branding" icon={<PaletteIcon className="w-5 h-5" />} defaultOpen={false}>
          <BrandingControls />
        </Section>

        <Section id="background" title="Background" icon={<LayersIcon className="w-5 h-5" />} defaultOpen={false}>
          <BackgroundControls />
        </Section>

        <EnterprisePanel />
      </div>
    </div>
  );
}