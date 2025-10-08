import React from 'react';

const Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    </svg>
);

export const WalletIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 3a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m-1.5-1.5l1.5-1.5m16.5 1.5l-1.5-1.5" />
    </Icon>
);
export const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </Icon>
);
export const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </Icon>
);
export const ChartBarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </Icon>
);
export const PuzzlePieceIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.69.56-1.25 1.25-1.25h.01a1.25 1.25 0 011.25 1.25v.01M16.5 12a2.25 2.25 0 00-2.25-2.25h-.01a2.25 2.25 0 00-2.25 2.25v.01M15 15.75a.75.75 0 01.75.75v.01a.75.75 0 01-1.5 0v-.01a.75.75 0 01.75-.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5v5.25a2.25 2.25 0 002.25 2.25h5.25a2.25 2.25 0 002.25-2.25V10.5A2.25 2.25 0 0010.5 8.25H5.25A2.25 2.25 0 003 10.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18.75a.75.75 0 01.75.75v.01a.75.75 0 01-1.5 0v-.01a.75.75 0 01.75-.75z" />
    </Icon>
);
export const MicrophoneIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 013-3 3 3 0 013 3v8.25a3 3 0 01-3 3z" />
    </Icon>
);
export const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.624l.216.962-.216.962a.75.75 0 01-1.214.585l-.707-.707a.75.75 0 01.585-1.214l.962-.216z" />
    </Icon>
);
export const AtomIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12a7.5 7.5 0 0115 0m-15 0a7.5 7.5 0 0015 0M3.75 6.75h16.5m-16.5 10.5h16.5" />
    </Icon>
);
export const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 00-10.236-2.924M15 19.128v-3.328c0-1.028.704-1.928 1.69-2.31M15 19.128a2.25 2.25 0 01-2.25-2.25V6.75a2.25 2.25 0 012.25-2.25h.008a2.25 2.25 0 012.25 2.25v8.598a2.25 2.25 0 01-2.25 2.25h-.008zM4.5 16.872A9.38 9.38 0 0112 15.099m-7.5 1.773V9.128c0-1.028.704-1.928 1.69-2.31m-1.69 10.053a2.25 2.25 0 01-2.25-2.25V6.75a2.25 2.25 0 012.25-2.25h.008a2.25 2.25 0 012.25 2.25v8.598a2.25 2.25 0 01-2.25 2.25h-.008z" />
    </Icon>
);
export const LeafIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-3.023 3.023c0 .873.342 1.684.9 2.257l.046.046a.75.75 0 001.06-1.06l-.046-.046a1.5 1.5 0 01.44-2.124l3.1-3.1a1.5 1.5 0 012.123.44l3.1 3.1a1.5 1.5 0 01-2.123 2.124l-1.03-1.03a.75.75 0 00-1.06 1.06l1.03 1.03a3 3 0 004.243-4.243l-3.1-3.1a3 3 0 00-4.243 0z" />
    </Icon>
);

export const CubeTransparentIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </Icon>
);
export const DnaIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-3.023 3.023c0 .873.342 1.684.9 2.257l.046.046a.75.75 0 001.06-1.06l-.046-.046a1.5 1.5 0 01.44-2.124l3.1-3.1a1.5 1.5 0 012.123.44l3.1 3.1a1.5 1.5 0 01-2.123 2.124l-1.03-1.03a.75.75 0 00-1.06 1.06l1.03 1.03a3 3 0 004.243-4.243l-3.1-3.1a3 3 0 00-4.243 0z" /></Icon>
);
export const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></Icon>
);
export const BrainIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></Icon>
);
export const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></Icon>
);
export const LockClosedIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></Icon>
);
export const ShieldCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></Icon>
);
export const FingerPrintIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.702-1.588 8.262M9.75 16.5c.355.14.722.255 1.107.337M12.75 4.5c-.385-.1.78-.24-1.14-.337M11.25 10.5a1.5 1.5 0 00-1.5 1.5v2.625c0 .375.324.698.698.698l.004-.001.004-.001h1.505c.375 0 .698-.324.698-.698V12a1.5 1.5 0 00-1.5-1.5z" /></Icon>
);
export const KeyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></Icon>
);
export const CloudArrowUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></Icon>
);
export const ServerStackIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3.75v3.75m3.75-3.75v3.75m-7.5-12v12a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-12a2.25 2.25 0 00-2.25-2.25h-9a2.25 2.25 0 00-2.25 2.25z" /></Icon>
);