# IDForge - Professional QR Enabled Digital ID Card Generator

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-TypeScript-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-Vite-purple?style=for-the-badge&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/TailwindCSS-TailwindCSS-38bdf8?style=for-the-badge&logo=tailwind-css" alt="TailwindCSS">
  <a href="https://github.com/venkateshcreations/idforge"><img src="https://img.shields.io/badge/GitHub-View-black?style=for-the-badge&logo=github" alt="GitHub"></a>
</p>

<p align="center">
  <strong>Author:</strong> Venkatesh Ammireddy
</p>

IDForge is a powerful, frontend-only web application for creating professional digital ID cards with QR codes. Design, customize, and export beautiful ID cards for employees, events, or personal use - all directly in your browser.

---

## Features

###  Design & Templates

- **25+ Professionally Designed Templates** - Choose from a diverse collection of ID card styles:
  - Corporate, Modern, Minimal, Executive, Glassmorphism
  - NeoNoir, FestivalVibe, TechSpark, CreativePulse, NeonCyber
  - WidescreenPro, Artisan, RetroWave, NatureSerenity, OceanDepth
  - SunsetGlow, MidnightElegance, NordicMinimal, UrbanEdge, CherryBloom
  - CosmicDust, GoldenHour, SteelForge, VintageClassic

- **Real-time Live Preview** - See your card update instantly as you make changes
- **Device Preview Modes** - Desktop view, Mobile view, and Print view
- **Zoom Controls** - Adjust preview zoom from 50% to 200%

###  Customization

- **Photo Upload** - Drag & drop or click to upload photos (PNG, JPG, JPEG, WEBP)
- **Photo Styles** - Circle, Rounded, Square, Border Glow, Glass Effect
- **Branding Controls** - Customize primary, secondary, accent, text, and background colors
- **Background Options** - Solid colors, gradients, glassmorphism, and patterns

###  QR Code Generation

- **Smart QR Redirects** - QR code automatically links to:
  - LinkedIn, Instagram, Facebook, YouTube, Twitter, GitHub, Portfolio
  - Website, vCard (contact), or Custom URL
- **QR Customization** - Foreground/background colors, size, error correction level

###  Enterprise Features

- **Organization Setup** - Create and manage your organization profile
- **Bulk Import** - Import multiple employee cards from CSV files
- **Managed Cards Dashboard** - Search, filter, and manage all created cards:
  - Search by name, designation, email, employee ID, department
  - Filter by status (Active, Expired, Revoked)
  - Filter by department
- **Bulk Export** - Export multiple cards as PNG or PDF in various qualities (Standard, HD, 2K, 4K)
- **JSON Export** - Backup and restore all card data
- **Card Status Management** - Track card status (active/expired/revoked)
- **Individual Photo Upload** - Upload photos for each managed card

###  Export Options

- **PNG Export** - High-quality PNG images
- **PDF Export** - Print-ready PDF documents
- **Quality Levels** - Standard (1x), HD (2x), 2K (3x), 4K (4x)
- **Batch Export** - Export all or selected cards at once

---

## Benefits

###  For HR Professionals
- Quickly generate ID cards for new employees
- Bulk import from CSV for team onboarding
- Consistent branding across all employee cards

###  For Event Organizers
- Create event badges and passes in minutes
- Customizable templates for different event types
- Bulk export for printing

###  For Small Business Owners
- Professional-looking ID cards without design skills
- Cost-effective solution - no expensive software needed
- All processing happens locally - no data leaves your browser

###  For Freelancers
- Create personal portfolio ID cards
- Showcase your work with QR-linked portfolios
- Multiple templates for different occasions

---

## User Experience

###  Intuitive Interface
- Clean, modern two-column layout (sidebar + preview)
- Collapsible accordion sections for easy navigation
- Smooth animations and transitions throughout
- Responsive design works on desktop, tablet, and mobile

###  Fast & Efficient
- Real-time preview updates
- No backend required - runs entirely in browser
- Instant export with quality options

###  Private & Secure
- All data processed locally in your browser
- No accounts, no tracking, no cookies
- Your data never leaves your device

---

## Getting Started

###  Prerequisites
- Node.js 18+ 
- npm or yarn

###  Installation

```bash
# Clone the repository
git clone https://github.com/venkateshcreations/idforge.git
cd idforge

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173/`

###  Build for Production

```bash
npm run build
```

Production files will be in the `dist` folder.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| TailwindCSS | Styling |
| Zustand | State Management |
| Framer Motion | Animations |
| qrcode | QR Generation |
| html-to-image | Image Export |
| jsPDF | PDF Export |
| lucide-react | Icons |
| react-colorful | Color Picker |
| xlsx | CSV Processing |

---

## CSV Import Format

To bulk import cards, use a CSV file with these columns:

```
name, designation, company, department, employeeid, email, phone, website, expires
```

Example:
```csv
John Doe,Software Engineer,Acme Corp,Engineering,EMP001,john.doe@acme.com,+1234567890,https://acme.com,2026-12-31
Jane Smith,Product Manager,Acme Corp,Product,EMP002,jane.smith@acme.com,+1234567891,https://acme.com,2026-12-31
```

---

## License

MIT License - Feel free to use this project for any purpose.

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

<p align="center">
  <img src="https://img.shields.io/github/stars/venkateshcreations/idforge?style=social" alt="Stars">
  <img src="https://img.shields.io/github/forks/venkateshcreations/idforge?style=social" alt="Forks">
</p>

<p align="center">
  If you find IDForge useful, please consider starring the repository!
</p>