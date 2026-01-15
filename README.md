
# Track Analyzer Pro

**Version 1.0.0**

A professional race track data recording and analysis app for track specialists. Record detailed track conditions, compare readings across different days and conditions, and make data-driven decisions in the field.

## Features

### 📊 Track Management
- Create and manage multiple race tracks
- Store track name and location information
- Quick access to all your tracks

### 📝 Reading Recording
- Record detailed lane-by-lane conditions:
  - Track Temperature
  - UV Index
  - Keg SL & Keg Out measurements
  - Grippo SL & Grippo Out measurements
  - Shine readings
  - Custom notes
- Upload photos for each lane
- Timestamp-based organization

### 🔍 Browse & Compare
- Browse readings by track and year
- View readings organized by day
- Expandable day groups for easy navigation
- Quick access to detailed reading information
- Compare conditions across different time periods

### 🔐 Multi-User Support
- Secure authentication with email/password
- Team collaboration features
- Personal data storage with Supabase

### 🎨 Modern UI
- Clean, professional interface
- Dark mode support
- Smooth animations and transitions
- Optimized for iOS, Android, and Web

## Technology Stack

- **Framework**: React Native with Expo 54
- **Navigation**: Expo Router (file-based routing)
- **Backend**: Supabase (Authentication, Database, Storage)
- **UI Components**: React Native core components
- **Charts**: react-native-chart-kit
- **Image Handling**: expo-image-picker

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Expo CLI installed globally
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Configure Supabase:
   - Create a Supabase project at https://supabase.com
   - Copy your project URL and anon key
   - Update `utils/supabase.ts` with your credentials

4. Run the app:
```bash
# Development
npm run dev

# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Building for Production

### iOS
```bash
npx expo prebuild -p ios
# Then open in Xcode and build
```

### Android
```bash
npx expo prebuild -p android
# Then open in Android Studio and build
```

### Web
```bash
npm run build:web
```

## Database Schema

The app uses the following Supabase tables:

- **tracks**: Store track information (name, location, created_by)
- **readings**: Store reading data with lane-specific measurements
- **team_members**: Manage team access and collaboration

See `supabase-setup.sql` for the complete schema and RLS policies.

## Support

For issues or questions, please contact the development team.

## License

Copyright © 2024 Track Analyzer Pro. All rights reserved.

---

Built with ❤️ using [Natively.dev](https://natively.dev)
