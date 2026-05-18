# Novus - Learning Course Mobile App

A modern, feature-rich mobile learning platform built with React Native and Expo. Browse courses, track your learning progress, and access premium educational content with an intuitive and beautiful user interface.

## 📱 Screenshots

<!-- Add screenshots here -->

## ✨ Features

- 📚 **Course Browsing** - Explore a wide variety of courses with beautiful card layouts
- 🔍 **Smart Search** - Real-time course search with debouncing for optimal performance
- 📖 **Chapter Management** - Organized chapter-based learning structure with duration tracking
- 💎 **Premium Subscriptions** - Unlock premium courses with subscription system
- 🎨 **Modern UI/UX** - Clean, responsive design with NativeWind (Tailwind CSS)
- 🔐 **Secure Authentication** - User authentication powered by Clerk
- ✉️ **Email Verification** - Secure signup with email verification modal
- 🎯 **Course Categories** - Free and premium course differentiation
- ⚡ **Fast Performance** - Optimized with React Native and Expo

## 🛠️ Tech Stack

- **Framework:** React Native 0.83.6 with Expo SDK 55
- **Navigation:** Expo Router 6.0
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **UI Components:** Gluestack UI
- **Authentication:** Clerk
- **Animations:** React Native Reanimated & Legendapp Motion
- **Icons:** Expo Vector Icons (Ionicons)
- **Language:** JavaScript/JSX

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac) or Android Emulator
- Clerk account for authentication

## 🚀 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/novus-learning-app.git
cd novus-learning-app/Novus
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
```

4. **Create your own Sanity backend if you are cloning this repo:**
- Create a Sanity project and dataset in the Sanity dashboard.
- This is required for uploading and managing courses, because the app reads course content from Sanity.
- Replace the sample values in `.env` with your own Sanity project settings.
- Required Sanity env vars:
```env
EXPO_PUBLIC_SANITY_PROJECT_ID=your_project_id
EXPO_PUBLIC_SANITY_DATASET=your_dataset
EXPO_PUBLIC_SANITY_API_VERSION=2024-01-01
EXPO_PUBLIC_SANITY_TOKEN=your_token_here
```

5. **Add your Clerk publishable key to `.env`:**
```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

> Get your Clerk key from: [Clerk Dashboard](https://dashboard.clerk.com/last-active?path=api-keys)

5. **Start the development server:**
```bash
npm start
```

## 📱 Running the App

**Start development server:**
```bash
npm start
```

**Run on specific platform:**
```bash
npm run android  # Run on Android
npm run ios      # Run on iOS (Mac only)
npm run web      # Run on Web
```

**Clear cache and restart:**
```bash
npm start -- --clear
```

## 📁 Project Structure

```
Novus/
├── app/                          # App screens and navigation
│   ├── (auth)/                   # Authentication screens
│   │   ├── login.jsx            # Login screen
│   │   ├── signup.jsx           # Signup with email verification
│   │   └── welcome.jsx          # Welcome/onboarding screen
│   ├── (main)/                   # Main app screens
│   │   ├── home.jsx             # Home screen with course list & search
│   │   ├── courses.jsx          # All courses screen
│   │   └── course-details.jsx   # Course details with chapters
│   ├── _layout.jsx              # Root layout with providers
│   └── index.jsx                # Entry point
├── components/                   # Reusable components
│   ├── ui/                      # UI components (Gluestack)
│   ├── course-list.jsx          # Course list with cards
│   ├── chapter-list.jsx         # Chapter list with icons
│   ├── email-verification-modal.jsx  # Email verification modal
│   ├── header.jsx               # Header component
│   └── setting-menu.jsx         # Settings menu
├── constants/                    # App constants
│   ├── data.js                  # Dummy course data
│   └── theme.ts                 # Theme configuration
├── assets/                       # Images and static files
│   └── images/                  # App images
├── .env                         # Environment variables (not in git)
├── .env.example                 # Environment variables template
└── README.md                    # Project documentation
```

## 🎯 Features Overview

### 🏠 Home Screen
- Welcome header with user avatar
- Search bar with real-time filtering
- Course list with free/premium badges
- Navigation to course details

### 📚 Course Details
- Course thumbnail and description
- Chapter list with duration
- Premium subscription prompt for paid courses
- Back navigation

### 🔐 Authentication
- Signup with email verification
- Email verification modal with 6-digit code
- Secure authentication with Clerk
- Toast notifications for validation

### 💎 Premium System
- Premium course identification
- "Go Premium" call-to-action
- Subscribe button with custom styling
- Chapter preview for all courses

> **Note:** The built‑in Clerk `PricingTable` component only runs on web. On native devices the app now navigates to the `/profile` or `/billing` route and embeds the web checkout in a `WebView`.
>
> - This keeps the user inside the app and prevents crashes caused by deep‑link redirects from Clerk.
> - For debugging the app logs deep link events (`novus://`, `exp://`, etc.) in the console.
> - During development the WebView loads `http://localhost:8081/...` (Expo web default).
>   * iOS simulators can use `localhost`; Android emulators use `10.0.2.2` or your PC’s LAN IP.
> - When you deploy to production update the URL or use an environment variable so the WebView hits your deployed site.

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk authentication publishable key | Yes |

### Color Scheme

Primary brand color: `#488cdf` (Blue)
Secondary color: `#2E5E99` (Dark Blue)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 👨‍💻 Author

**Mihsan Alam**

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) - React Native framework
- [Gluestack UI](https://gluestack.io/) - UI component library
- [Clerk](https://clerk.com/) - Authentication solution
- [NativeWind](https://www.nativewind.dev/) - Tailwind CSS for React Native

## 📞 Support

For support, open an issue in the repository or contact the maintainer.

---

**Made with ❤️ using React Native & Expo**
