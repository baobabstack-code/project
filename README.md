# Baobab Stack Website

A modern, responsive web application built with Next.js, featuring dynamic content management, interactive UI components, and a stunning starfield animation system.

## 🚀 Features

### Modern Design & Interactivity
- **StarField Animation**: Beautiful cosmic background with twinkling stars featuring:
  - 130 animated stars with varying brightness levels
  - Smooth twinkle animations with customizable durations
  - Responsive to window resizing
  - Optimized performance with React.memo
  
- **Responsive Layout**: Mobile-first design that adapts seamlessly across all devices
- **Glass Morphism UI**: Modern glass card design system with backdrop blur effects
- **Smooth Animations**: Powered by Framer Motion for fluid transitions and interactions
- **Interactive Components**: Enhanced user experience with hover effects and transitions

### Core Functionality
- Dynamic content management for blog posts, podcasts, and testimonials
- Multi-step contact form with validation
- Calendar booking system
- Service showcase with feature highlights
- Portfolio gallery
- Pricing plans display
- Admin dashboard for content management

### Accessibility & Standards
- WCAG 2.1 compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast focus indicators
- Semantic HTML structure

## 🛠️ Tech Stack

- **Framework**: Next.js (latest)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **State Management**: Redux Toolkit
- **Database**: Prisma with PostgreSQL
- **Authentication**: Clerk
- **Forms**: React Hook Form with Zod validation
- **Testing**: Jest + React Testing Library
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- npm or pnpm
- PostgreSQL database

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/baobabstack-code/project.git
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with the following variables:
   
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
   CLERK_SECRET_KEY=your_secret_key
   
   # Email (Resend)
   RESEND_API_KEY=your_resend_api_key
   EMAIL_FROM="Baobab Stack <no-reply@yourdomain.com>"
   CONTACT_TO_EMAIL=admin@example.com
   
   # Optional: Stripe (for payments)
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   
   # Seed the database (optional)
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests
- `npm run health-check` - Check system health
- `npm run db:seed` - Seed database with sample data
- `npm run db:reset` - Reset database and reseed
- `npm run analyze` - Analyze bundle size

## 🧪 Testing

The project includes comprehensive test coverage:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- StarField.test.tsx

# Run tests with coverage
npm test -- --coverage
```

### Test Structure
- **Unit Tests**: Component-level tests in `__tests__` directories
- **Integration Tests**: Service and API tests
- **Test Utilities**: Standardized testing patterns with React Testing Library

## 🎨 Component Library

### UI Components
- `StarField` - Animated cosmic background with twinkling stars
- `Button` - Customizable button with multiple variants
- `Input` - Form input with icons and error handling
- `Select` - Dropdown component with consistent styling
- `Textarea` - Multi-line text input
- `ResponsiveImage` - Optimized image with loading states

### Layout Components
- `Header` - Responsive navigation with mobile menu
- `Footer` - Site footer with links and information

### Section Components
- `Hero` - Landing page hero with StarField background
- `Features` - Feature showcase grid
- `Services` - Service offerings display
- `Testimonials` - Customer testimonials carousel
- `Portfolio` - Project gallery
- `Pricing` - Pricing plans comparison

## 🎯 Landing Page Enhancements

The landing page has been enhanced with:

1. **StarField Integration**: Added cosmic animation to Hero section
2. **Fixed Stars Bug**: Corrected CSS animation fallback value
3. **Responsive Design**: Ensured all components work across devices
4. **Type Safety**: Fixed all TypeScript errors
5. **Performance**: Optimized with dynamic imports and memoization

## 🔒 Security

- All dependencies are regularly audited
- CodeQL security scanning implemented
- XSS protection through React's built-in sanitization
- CSRF protection on all forms
- Secure authentication with Clerk

## 📱 Responsive Breakpoints

- `sm`: 640px - Small tablets and large phones
- `md`: 768px - Tablets
- `lg`: 1024px - Desktops
- `xl`: 1280px - Large desktops

## 🎨 Design System

### Colors
- **Primary**: Purple gradient (from-purple-600 to-indigo-600)
- **Background**: Dark theme (#0A0B14)
- **Text**: White with gray variations for hierarchy
- **Accents**: Purple, Indigo, Blue, Pink

### Typography
- **Headings**: Display font with tracking-wider
- **Body**: Sans-serif font
- **Responsive sizing**: Scales from mobile to desktop

### Spacing
- Consistent padding and margins using Tailwind utilities
- Responsive spacing patterns (py-8 sm:py-12 lg:py-16)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Follow TypeScript best practices
- Write tests for new features
- Use meaningful commit messages
- Ensure all tests pass before submitting PR
- Follow accessibility guidelines (WCAG 2.1)

## 📄 License

This project is private and proprietary to Baobab Stack.

## 🐛 Known Issues

None at this time. The stars functionality bug has been fixed.

## 🚦 Project Status

✅ Active Development - Landing page fully enhanced with modern design, responsive components, and fixed stars functionality.

## 📞 Support

For support, email support@baobabstack.com or open an issue in the repository.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Framer Motion for smooth animations
- Tailwind CSS for the utility-first approach
- All open-source contributors

---

**Built with ❤️ by Baobab Stack**
