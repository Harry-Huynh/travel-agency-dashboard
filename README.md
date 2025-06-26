# 🧠 Admin Dashboard Application

![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Appwrite](https://img.shields.io/badge/Appwrite-F02E65?style=for-the-badge&logo=appwrite&logoColor=white)
![Google OAuth](https://img.shields.io/badge/OAuth-Google-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Syncfusion](https://img.shields.io/badge/Syncfusion-1A237E?style=for-the-badge&logoColor=white)
![Sentry](https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-3C3C3C?style=for-the-badge&logo=google&logoColor=white)
![Unsplash](https://img.shields.io/badge/Unsplash-000000?style=for-the-badge&logo=unsplash&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/ISC-License-lightgrey)

A powerful and intelligent admin dashboard built with Next.js App Router. Features include Google OAuth authentication, real-time charts powered by Syncfusion, AI-generated travel planning using Gemini, and robust error tracking with Sentry. Secure, scalable, and fully responsive.

---

## 📚 Table of Contents

- [🧠 Admin Dashboard Application](#-admin-dashboard-application)
  - [🔗 Project Links](#-project-links)
  - [🚀 Features](#-features)
  - [🧪 Testing Information](#-testing-information)
  - [🌱 Environment Variables](#-environment-variables)
  - [📦 Dependencies](#-dependencies)
  - [🔐 Authentication Flow (Appwrite)](#-authentication-flow-appwrite)
  - [🌐 API \& Service Integrations](#-api--service-integrations)
  - [🧩 Key Components \& Pages](#-key-components--pages)
  - [🛡️ Route Protection Flow](#️-route-protection-flow)
  - [📌 Notes](#-notes)

---

## 🔗 Project Links

🌐 **Live Website**: [Visit the Dashboard](https://travel-agency-dashboard-inky.vercel.app/sign-in)  
📄 **License**: ISC License

---

## 🚀 Features

🔐 `Google OAuth via Appwrite`

- Secure sign-in with Google
- Server-side session validation
- Admin access control

📈 `Real-Time Charts with Syncfusion`

- Dynamic data visualization
- Real-time updates for key metrics
- Responsive, theme-aware components

🧠 `AI-Powered Trip Planning using Gemini`

- Enter destination and get suggested plans
- Google Gemini API integration
- Real-time feedback and recommendation engine

📊 `Dashboard Analytics`

- Overview of platform statistics
- Historical and current data monitoring

⚠️ `Error Monitoring with Sentry`

- Full-stack error tracking
- Real-time performance monitoring
- Context-rich debugging

🎨 `Responsive UI with Tailwind`

- Mobile-first design
- User-friendly pages

🌍 `Deployed on Vercel`

- Fast server-side rendering (SSR)
- Seamless deployment pipeline

---

## 🧪 Testing Information

- OAuth testing enabled for trusted emails only
- Use your email to test login and view the pages

---

## 🌱 Environment Variables

```env
#SYNCFUSION
NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY=

#APPWRITE
NEXT_PUBLIC_APPWRITE_PROJECT_ID=
APPWRITE_API_KEY=
APPWRITE_DATABASE_ID=
APPWRITE_USERS_COLLECTION_ID=
APPWRITE_TRIPS_COLLECTION_ID=
NEXT_PUBLIC_APPWRITE_API_ENDPOINT=https://fra.cloud.appwrite.io/v1

#SENTRY
SENTRY_AUTH_TOKEN=

#GEMINI
GEMINI_API_KEY=

#UNSPLASH
UNSPLASH_ACCESS_KEY=

```

---

## 📦 Dependencies

- `next`: App Router, SSR support
- `tailwindcss`: Utility-first styling
- `@sentry/nextjs`: Error tracking
- `@google/generative-ai`: Gemini API
- `syncfusion`: Real-time charts & UI components
- `appwrite`: Appwrite SDK for auth and DB

---

## 🔐 Authentication Flow (Appwrite)

1. User logs in via Google using Appwrite's OAuth2 provider.
2. Handle the callback and create a session for the user.
3. Session is securely stored via cookies.
4. Admin-level validation is performed server-side.
5. Unauthorized access is blocked at route level.

---

## 🌐 API & Service Integrations

| Service          | Description                                           |
| ---------------- | ----------------------------------------------------- |
| **Google OAuth** | Handles secure login via Appwrite’s OAuth interface   |
| **Gemini AI**    | Provides AI-based itinerary planning and generation   |
| **Sentry**       | Tracks errors and performance issues across the stack |
| **Syncfusion**   | Renders real-time analytics and dashboards            |
| **Unsplash**     | Retrieves the images for using in the itinerary       |
| **Appwrite**     | Manages authentication and user session data          |

---

## 🧩 Key Components & Pages

- **SignIn** – UI for logging in using OAuth
- **Dashboard** – Displays all information about AI-generated trips and user
- **Trips** – Creates and views trips created by AI Gemini
- **AllUsers** – Displays all information about users

---

## 🛡️ Route Protection Flow

1. Each route is checked using OAuth token stored in cookies.
2. Unauthenticated users are redirected to `/sign-in`.
3. If authenticated, users and trip data is loaded automatically.
4. Session state is stored in cookies and validated on route change.

---

## 📌 Notes

- Make sure all API keys are stored securely in environment variables.
- Only authorized admin emails are allowed dashboard access.
- Gemini API calls may be rate-limited or cost-based—cache where possible.

---
