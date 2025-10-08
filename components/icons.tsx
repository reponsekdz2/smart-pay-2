import React from 'react';

const Icon = ({ children, ...props }: React.SVGProps<SVGSVGElement> & { children: React.ReactNode }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        {children}
    </svg>
);

export const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></Icon>
);

export const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></Icon>
);

export const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></Icon>
);

export const KeyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></Icon>
);
export const ShieldCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></Icon>
);
export const FingerPrintIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.588 8.263M4.5 19.5A7.5 7.5 0 0110.5 4.5c2.281 0 4.402.996 5.864 2.643M15 10.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></Icon>
);
export const CloudArrowUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /></Icon>
);
export const ServerStackIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 21H3a2.25 2.25 0 01-2.25-2.25V5.25A2.25 2.25 0 013 3h12a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0118 21H6.75zM6 9h12M6 12h12M6 15h12M6 18h12M6 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></Icon>
);
export const MicrophoneIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 016 0v8.25a3 3 0 01-3 3z" /></Icon>
);
export const AtomIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m-6.364-.805l1.591-1.591M20.195 4.805l-1.591 1.591M4.805 4.805l1.591 1.591m12.239 12.239l-1.591-1.591M3 12h2.25m13.5 0H21" /></Icon>
);
export const CubeTransparentIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></Icon>
);
export const DnaIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h10.5c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H6.75zM6.75 17.625c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h10.5c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H6.75z" /><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 9.75a3 3 0 013-3h1.5a3 3 0 013 3v4.5a3 3 0 01-3 3h-1.5a3 3 0 01-3-3v-4.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75a3 3 0 013-3h1.5a3 3 0 013 3v4.5a3 3 0 01-3 3h-1.5a3 3 0 01-3-3v-4.5z" /></Icon>
);
export const LeafIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></Icon>
);
export const PuzzlePieceIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></Icon>
);
export const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 01-1.423-1.423L13.5 18.75l1.188-.648a2.25 2.25 0 011.423-1.423L16.25 15l.648 1.188a2.25 2.25 0 011.423 1.423L18.75 18l-1.188.648a2.25 2.25 0 01-1.423 1.423z" /></Icon>
);
export const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></Icon>
);
export const BrainIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 01-1.423-1.423L13.5 18.75l1.188-.648a2.25 2.25 0 011.423-1.423L16.25 15l.648 1.188a2.25 2.25 0 011.423 1.423L18.75 18l-1.188.648a2.25 2.25 0 01-1.423 1.423z" /></Icon>
);

export const CircleStackIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Icon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" /></Icon>
);
