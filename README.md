# John Adkerson - Resume Website

A modern, responsive React website showcasing John Adkerson's professional experience, skills, and projects.

## 🚀 Features

- **Modern Design**: Sleek, professional design with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Interactive**: Smooth scrolling navigation and hover effects
- **Professional**: Clean, employer-friendly presentation of skills and experience
- **Fast**: Optimized performance with modern React practices

## 🛠️ Technologies Used

- **React 18** with TypeScript
- **Styled Components** for styling
- **Framer Motion** for animations
- **React Icons** for icons
- **Modern CSS** with gradients and glassmorphism effects

## 📋 Sections

1. **Hero Section**: Introduction and call-to-action
2. **Experience**: Professional work history
3. **Skills**: Technical skills and expertise
4. **Projects**: Featured projects and achievements
5. **Education**: Academic background
6. **Contact**: Contact information and social links

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd resumewebsite
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🚀 Deploy to GitHub Pages

### Automatic Deployment (Recommended)

This project is configured with GitHub Actions for automatic deployment. Simply push to the `main` branch and your site will be automatically deployed to GitHub Pages.

### Manual Deployment

If you prefer manual deployment:

1. Build the project:

```bash
npm run build
```

2. Deploy to GitHub Pages:

```bash
npm run deploy
```

### GitHub Pages Configuration

Make sure your repository settings are configured correctly:

1. Go to your repository Settings → Pages
2. Set Source to "Deploy from a branch"
3. Select the `gh-pages` branch
4. Set folder to `/ (root)`
5. Click Save

Your site will be available at: https://adkersonjohn.github.io/resume-website

## 🎨 Customization

### Personal Information

Update the following files with your information:

- `src/components/Hero.tsx` - Name, title, and description
- `src/components/Experience.tsx` - Work experience
- `src/components/Skills.tsx` - Skills and expertise
- `src/components/Projects.tsx` - Projects and achievements
- `src/components/Education.tsx` - Education details
- `src/components/Contact.tsx` - Contact information

### Styling

The website uses styled-components for styling. You can customize:

- Colors in the gradient themes
- Typography in `src/styles/GlobalStyles.ts`
- Layout and spacing in individual components

### Resume PDF

Place your resume PDF in the `public` folder and update the download link in the Hero and Contact components.

## 📱 Responsive Design

The website is fully responsive and includes:

- Mobile-first design approach
- Responsive navigation with hamburger menu
- Adaptive layouts for different screen sizes
- Touch-friendly interactions

## 🎯 Performance Features

- Lazy loading animations
- Optimized images and assets
- Efficient React rendering
- Minimal bundle size

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

Built with ❤️ using React and modern web technologies.
