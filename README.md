# [SkinTime Booking Service Application]
![Expo](https://img.shields.io/badge/expo-v49.0.0-blue?logo=expo)
![React Native](https://img.shields.io/badge/react--native-0.73+-blue?logo=react)
![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow?logo=javascript)
![Node.js](https://img.shields.io/badge/node.js-v18%2B-green?logo=node.js)
![React Navigation](https://img.shields.io/badge/react--navigation-v6+-blueviolet?logo=react)
![NativeBase](https://img.shields.io/badge/nativebase-v3+-purple?logo=npm)
![Reanimated](https://img.shields.io/badge/react--native--reanimated-v3+-orange?logo=react)

Công Nghệ Sử Dụng

🔹 **Expo**: Cung cấp bộ công cụ giúp chạy, phát triển và build ứng dụng React Native mà không cần cấu hình phức tạp. <br>
🔹 **React Native**: Framework giúp phát triển ứng dụng di động trên iOS và Android với một codebase duy nhất bằng JavaScript.
🔹 **JavaScript (ES6+)**: Ngôn ngữ lập trình chính của dự án.
🔹 **React Navigation**: Thư viện điều hướng chính trong React Native.
🔹 **NativeBase** : Bộ thư viện giao diện (UI Library) giúp xây dựng các thành phần UI đẹp mắt.
🔹 **React Native Reanimated** : Thư viện hỗ trợ tạo hiệu ứng animation mượt mà trong React Native.
📌 **Cấu trúc cây thư mục:**  
```bash
📦 MyReactNativeApp
├── 📂 android/               # Mã nguồn Android (Native)
├── 📂 ios/                   # Mã nguồn iOS (Native)
├── 📂 assets/                # Hình ảnh, font, icon, v.v.
│   ├── fonts/
│   ├── icons/
│   ├── images/
├── 📂 src/                   # Thư mục chính của code React Native
│   ├── 📂 api/               # Gọi API, Axios, Fetch
│   ├── 📂 components/        # Component dùng chung
│   ├── 📂 screens/           # Màn hình của ứng dụng
│   │   ├── HomeScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── LoginScreen.tsx
│   ├── 📂 navigation/        # Điều hướng (React Navigation)
│   │   ├── AppNavigator.tsx
│   ├── 📂 store/             # Redux, Zustand, MobX
│   │   ├── authSlice.ts
│   │   ├── store.ts
│   ├── 📂 hooks/             # Custom Hooks
│   │   ├── useAuth.ts
│   ├── 📂 utils/             # Hàm tiện ích, helper
│   │   ├── formatDate.ts
│   │   ├── constants.ts
│   ├── 📂 context/           # React Context API
│   │   ├── AuthContext.tsx
│   ├── 📂 services/          # Firebase, Storage, Authentication
│   ├── App.tsx               # Entry point của ứng dụng
│   ├── index.js              # Entry chính
├── 📂 node_modules/          # Thư viện npm
├── .gitignore                # Ignore file không cần commit
├── package.json              # Danh sách package
├── tsconfig.json             # Cấu hình TypeScript
├── babel.config.js           # Cấu hình Babel
└── README.md                 # Tài liệu hướng dẫn dự án
```
📲**Cách Chạy Ứng Dụng**

1️⃣ Cài đặt các dependencies

npm install

2️⃣ Chạy ứng dụng trên điện thoại (Expo Go)

npx expo start

📌 Mở Expo Go trên điện thoại và quét mã QR để chạy ứng dụng.

3️⃣ Chạy ứng dụng trên trình duyệt (Web)

npx expo start --web
// Expo sẽ yêu cầu cài thêm 1 bộ hay gói gì nữa ấy mới cho run trên web. 

🔗 Tài Liệu Tham Khảo

Expo

React Native

React Navigation

NativeBase

React Native Reanimated

✨ Happy Coding! 🚀


