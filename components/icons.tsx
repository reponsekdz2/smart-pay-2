// FIX: Provide implementations for all icon components.
import React from 'react';

type IconProps = {
  style?: React.CSSProperties;
  className?: string;
  width?: number;
  height?: number;
};

export const ArrowLeftIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

export const HomeIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);

export const ArrowRightLeftIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h18m-7.5-12L21 9m0 0l-4.5 4.5M21 9H3" />
  </svg>
);

export const PieChartIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
  </svg>
);

export const UserIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

export const DownloadIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const SendIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
    </svg>
);

export const BanknotesIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125-1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const PiggyBankIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
    </svg>
);

export const HeartIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);

export const MtnIcon: React.FC<IconProps> = ({ width = 40, height = 40 }) => (
    <svg width={width} height={height} viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="240" rx="40" fill="#FFCC00"/>
        <path d="M40 120H80L120 160L160 80L200 120H240" stroke="#004B8D" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const AirtelIcon: React.FC<IconProps> = ({ width = 40, height = 40 }) => (
    <svg width={width} height={height} viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="240" rx="40" fill="#E40613"/>
        <path d="M120 40C120 40 80 160 40 160M120 40C120 40 160 160 200 160M80 120H160" stroke="white" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const BankIcon: React.FC<IconProps> = ({ width = 40, height = 40 }) => (
    <svg width={width} height={height} viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="240" rx="40" fill="#F0F2F5"/>
        <path d="M120 40L40 100H200L120 40Z" fill="#65676B"/>
        <rect x="50" y="100" width="140" height="20" fill="#65676B"/>
        <rect x="70" y="120" width="20" height="60" fill="#65676B"/>
        <rect x="110" y="120" width="20" height="60" fill="#65676B"/>
        <rect x="150" y="120" width="20" height="60" fill="#65676B"/>
        <rect x="40" y="180" width="160" height="20" fill="#65676B"/>
    </svg>
);

export const CardIcon: React.FC<IconProps> = ({ width = 40, height = 40 }) => (
     <svg width={width} height={height} viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="240" rx="40" fill="#F0F2F5"/>
        <rect x="40" y="60" width="160" height="120" rx="20" fill="#1877F2"/>
        <rect x="50" y="140" width="60" height="20" fill="white"/>
    </svg>
);

// --- NEW ADVANCED ICONS ---

export const WalletIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6.25A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.25V12m18 0V6.75A2.25 2.25 0 0018.75 4.5H5.25A2.25 2.25 0 003 6.75v5.25m16.5 0v3.75m-16.5-3.75v3.75m16.5 0a2.25 2.25 0 01-2.25 2.25H5.25a2.25 2.25 0 01-2.25-2.25m16.5 0H3.75" />
    </svg>
);

export const UsersIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM12 21a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72M12 21a3 3 0 01-3-3v-1.5m3 4.5a3 3 0 01-3-3v-1.5m6-13.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
);

export const ChartBarIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
);

export const SparklesIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.456-2.456L12.5 17.25l1.178-.398a3.375 3.375 0 002.456-2.456L16.5 13.5l.398 1.178a3.375 3.375 0 002.456 2.456L20.25 18l-1.178.398a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
);

export const MicrophoneIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m12 5.25v-1.5m-12 0v-1.5m6-9v12.75a3 3 0 01-3 3z" />
    </svg>
);

export const AcademicCapIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path d="M12 14.25a3.75 3.75 0 003.75-3.75V6.75A3.75 3.75 0 0012 3a3.75 3.75 0 00-3.75 3.75v3.75A3.75 3.75 0 0012 14.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25L5.25 18v-2.25M12 14.25L18.75 18v-2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.75l-9-5.25-9 5.25" />
    </svg>
);

export const BuildingStorefrontIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5A2.25 2.25 0 0011.25 11.25H6.75A2.25 2.25 0 004.5 13.5V21M6 10.5v10.5M18 10.5v10.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5v3h-16.5v-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 0h16.5" />
    </svg>
);

// --- NEW NEXT-LEVEL ICONS ---

export const AtomIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.071 4.929c-3.808 3.808-9.933 3.808-13.742 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.929 19.071c3.808-3.808 9.933-3.808 13.742 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18" />
    </svg>
);

export const CubeTransparentIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25-9 5.25M21 7.5v9l-9 5.25-9-5.25v-9M21 7.5L12 12.75M12 21V12.75M3 7.5l9 5.25M16.5 9.75L12 7.5 7.5 9.75M12 21l4.5-2.625M12 12.75L7.5 15.375" />
    </svg>
);

export const DnaIcon: React.FC<IconProps> = (props) => (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v16.5m16.5-16.5v16.5M4.5 6h15m-15 12h15m-15-8.25h15m-15-3.75h15" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 3.75c-3.6 5.25-3.6 11.25 0 16.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.75c3.6 5.25 3.6 11.25 0 16.5" />
    </svg>
);

export const BrainIcon: React.FC<IconProps> = (props) => (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043 3.41A15.998 15.998 0 0014.47 16.122m-3.389-1.621a15.998 15.998 0 00-1.622-3.385m3.39 1.622a15.998 15.998 0 013.388-1.621m-5.043 5.042a15.998 15.998 0 01-3.388-1.621m5.043-5.042a15.998 15.998 0 00-3.388-1.622m2.478 6.666l-3.388-1.622m5.043 5.042l-5.043-5.042m5.043 5.042L14.47 16.122" />
    </svg>
);

export const LeafIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043 3.41A15.998 15.998 0 0014.47 16.122m-3.389-1.621a15.998 15.998 0 00-1.622-3.385m3.39 1.622a15.998 15.998 0 013.388-1.621m-5.043 5.042a15.998 15.998 0 01-3.388-1.621m5.043-5.042a15.998 15.998 0 00-3.388-1.622m2.478 6.666l-3.388-1.622m5.043 5.042l-5.043-5.042m5.043 5.042L14.47 16.122" />
    </svg>
);

export const PuzzlePieceIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75l.43-1.037a4.5 4.5 0 014.153-2.585h5.134a4.5 4.5 0 014.153 2.585l.43 1.037m-13.88 0a3 3 0 015.64 0m-5.64 0l-1.07-2.569a4.5 4.5 0 014.153-5.415h6.214a4.5 4.5 0 014.153 5.415l-1.07 2.569m-13.88 0h13.88" />
    </svg>
);

// --- NEW BACKEND ICONS ---
export const NestJsIcon: React.FC<IconProps> = (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#E0234E"/>
        <path d="M12 12.86l-3.53-2.04 1.76-1.02 1.77 1.02v2.04zm3.53-2.04L12 12.86v-2.04l1.77-1.02 1.76 1.02zM12 14.9l3.53 2.04-1.76 1.02-1.77-1.02v-2.04zM8.47 16.94l3.53-2.04v2.04l-1.77 1.02-1.76-1.02z" fill="#E0234E"/>
    </svg>
);
export const PostgreSqlIcon: React.FC<IconProps> = (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#336791"/>
        <path d="M12 6c-2.21 0-4 1.79-4 4v4h2v-4c0-1.1.9-2 2-2s2 .9 2 2v4h2v-4c0-2.21-1.79-4-4-4zm-2 8v2h6v-2H10z" fill="white"/>
    </svg>
);
export const RedisIcon: React.FC<IconProps> = (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#DC382D"/>
        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" fill="white"/>
    </svg>
);
export const RabbitMqIcon: React.FC<IconProps> = (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#FF6600"/>
        <path d="M14.5 9c-1.5 0-2.5 1-2.5 2.5S13 14 14.5 14s2.5-1 2.5-2.5S16 9 14.5 9zm-5 0C8 9 7 10 7 11.5S8 14 9.5 14s2.5-1 2.5-2.5S11 9 9.5 9z" fill="white"/>
    </svg>
);
export const DockerIcon: React.FC<IconProps> = (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M21.93 11.2c-.3-.21-.68-.21-.98 0l-1.28 1.01V7.12c0-.4-.32-.72-.72-.72h-5.87c-.4 0-.72.32-.72.72v5.09l-1.28-1.01c-.3-.21-.68-.21-.98 0L2.07 16.8c-.3.21-.3.56 0 .77l1.28 1.01c.15.11.33.16.51.16h16.3c.18 0 .36-.05.51-.16l1.28-1.01c.3-.21.3-.56 0-.77l-2.02-1.6zM14.17 6.4h4.32v4.32h-4.32V6.4zm-5.04 0h4.32v4.32H9.13V6.4zM4.09 6.4h4.32v4.32H4.09V6.4z" fill="#2496ED"/>
    </svg>
);
export const KubernetesIcon: React.FC<IconProps> = (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#326CE5"/>
        <path d="M12 12l-4-2.31v4.62L12 17l4-2.31V9.69L12 12zm0-2l4 2.31L12 10l-4 2.31L12 10z" fill="white"/>
    </svg>
);
export const ApiGatewayIcon: React.FC<IconProps> = (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4 11h16v2H4zm0-6h16v2H4zm0 12h16v2H4z" fill="currentColor"/>
    </svg>
);
