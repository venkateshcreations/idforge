# IDForge - QR Enabled Digital ID Card Generator

## Project Overview
- **Project Name:** IDForge
- **Type:** Frontend-only Web Application
- **Core Functionality:** Professional digital ID card generator with QR codes, branding customization, and export capabilities
- **Target Users:** HR professionals, event organizers, small business owners, freelancers

## Technology Stack
- React 18 + TypeScript
- Vite (Build Tool)
- Tailwind CSS
- Zustand (State Management)
- Framer Motion (Animations)
- Lucide React (Icons)
- qrcode (QR Generation)
- html-to-image (Image Export)
- jsPDF (PDF Export)
- react-colorful (Color Picker)

## UI/UX Specification

### Layout Structure
- **Header:** 56px height, logo left, theme toggle right
- **Main Content:** Two-column layout (sidebar 380px | preview area flex-1)
- **Sidebar:** Scrollable, collapsible sections
- **Preview Area:** Centered card with device preview toggles

### Responsive Breakpoints
- Mobile: < 768px (stacked layout, bottom sheet controls)
- Tablet: 768px - 1024px (narrower sidebar)
- Desktop: > 1024px (full two-column layout)

### Color Palette
**Light Theme:**
- Background: #F8FAFC
- Surface: #FFFFFF
- Primary: #3B82F6 (Blue-500)
- Secondary: #64748B (Slate-500)
- Accent: #10B981 (Emerald-500)
- Text Primary: #0F172A
- Text Secondary: #475569
- Border: #E2E8F0

**Dark Theme:**
- Background: #0F172A
- Surface: #1E293B
- Primary: #60A5FA (Blue-400)
- Secondary: #94A3B8 (Slate-400)
- Accent: #34D399 (Emerald-400)
- Text Primary: #F8FAFC
- Text Secondary: #CBD5E1
- Border: #334155

### Typography
- **Font Family:** Inter (headings), system-ui (body)
- **Heading Sizes:** H1: 24px, H2: 20px, H3: 16px
- **Body:** 14px regular, 14px medium
- **Small:** 12px
- **Line Height:** 1.5

### Spacing System
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64

### Visual Effects
- Border radius: 6px (small), 8px (medium), 12px (large), 16px (xl)
- Shadows: sm, md, lg, xl
- Transitions: 150ms ease, 200ms ease, 300ms ease
- Glassmorphism: backdrop-blur-xl, bg-opacity-80

## Components Specification

### 1. Header Component
- Logo (IDForge text + icon)
- Theme toggle (sun/moon icons)
- Help button (question mark)

### 2. Sidebar Controls
Sections (collapsible accordion style):
1. **Basic Details** - Name, designation, company, department, employee ID, tagline
2. **Contact** - Mobile, alternate, email, website, address, city, country
3. **Social Links** - LinkedIn, Instagram, Facebook, YouTube, Twitter, GitHub, Portfolio
4. **Photo** - Upload area, crop/resize, style selector (circle/rounded/square)
5. **QR Code** - Redirect target selector, custom URL, QR customization (colors, size)
6. **Template** - 5 template cards with preview thumbnails
7. **Branding** - Primary color, secondary color, accent color, text color picker
8. **Background** - Solid/gradient/glass/pattern options

### 3. Card Preview
- Live preview updates in real-time
- Device switcher: Desktop view / Mobile view / Print view
- Zoom controls (50% - 200%)

### 4. Export Panel
- Format selector: PNG, PDF
- Quality selector: Standard, HD, 2K, 4K
- Download button with progress indicator

## ID Card Templates

### Template 1: Corporate
- Horizontal layout (3.375" x 2.125" standard ID card ratio)
- Left: Photo with subtle border
- Right: Company logo area, name, designation, details
- Bottom: QR code + company tagline
- Colors: Navy blue primary, white background, gray text

### Template 2: Modern
- Vertical layout option
- Large photo with rounded corners (16px)
- Bold typography, high contrast
- Accent color highlights
- Floating QR code

### Template 3: Minimal
- Maximum whitespace
- Thin 1px borders
- Small photo (circle, 80px)
- Monochrome with single accent
- Clean typography

### Template 4: Executive
- Dark background (premium black/dark blue)
- Gold/champagne accent colors
- Elegant serif-inspired typography
- Subtle gradient overlays
- Embossed-style effects

### Template 5: Glassmorphism
- Frosted glass background (backdrop-blur)
- Colorful gradient or image background
- Semi-transparent card surface
- Glowing borders
- Modern blur effects

## Functionality Specification

### Photo Upload System
- Drag & drop support
- Click to browse files
- Accept: PNG, JPG, JPEG, WEBP
- Max file size: 5MB
- Client-side image preview
- Style options: Circle, Rounded (16px), Square, Border Glow, Glass Effect

### QR Code Generation
- Auto-generate based on selected redirect:
  - LinkedIn, Instagram, Facebook, YouTube, Website, Portfolio, GitHub, vCard, Custom URL
- Customization:
  - Foreground color (default: auto from brand)
  - Background color (default: white/transparent)
  - Size: 100px - 200px
  - Error correction level: L, M, Q, H

### Branding System
- Primary color (affects: headers, borders, accents)
- Secondary color (affects: secondary text, backgrounds)
- Accent color (affects: highlights, QR accent)
- Text color (affects: main text)
- Background color (affects: card background)
- Real-time preview updates

### Export System
- PNG export via html-to-image
- PDF export via jsPDF
- Quality options:
  - Standard: 1x (300px width)
  - HD: 2x (600px width)
  - 2K: 3x (900px width)
  - 4K: 4x (1200px width)
- Print-ready with proper margins

### Local Storage
- Save user preferences (theme, last used template)
- Cache uploaded photo (base64)
- Store brand presets
- Auto-restore on app load

## Acceptance Criteria

### Must Have
- [ ] Application loads without backend
- [ ] All 5 templates render correctly
- [ ] Photo upload works with preview
- [ ] QR code generates and scans correctly
- [ ] Branding colors apply in real-time
- [ ] Light/dark theme toggles correctly
- [ ] PNG export downloads successfully
- [ ] PDF export downloads successfully
- [ ] Responsive on mobile/tablet/desktop
- [ ] Smooth animations throughout

### Should Have
- [ ] Local storage persistence
- [ ] Social media link validation
- [ ] Print preview mode
- [ ] Mobile device preview

### Nice to Have
- [ ] Custom font selection
- [ ] Background pattern options
- [ ] Batch generation from CSV
- [ ] Theme preset save/load

## Performance Requirements
- Initial load: < 2 seconds
- Template switch: < 100ms
- Color change: < 50ms (real-time)
- QR generation: < 200ms
- Export: < 3 seconds for HD quality

## Security & Privacy
- No data transmitted externally
- No analytics or tracking
- All processing in browser
- No cookies required