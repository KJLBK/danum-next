import './globals.css';
import Header from '../components/Layout/Header';
import QueryProvider from '../components/Layout/QueryProvider';

export const metadata = {
    title: '다눔: 지식 커뮤니티 플랫폼',
    siteName: 'DANUM | 다눔',
    description: '지식 커뮤니티 플랫폼, 다눔(danum)',
    ogImage: '/public/danum-logo.png',
};

export default function RootLayout({
    children,
    auth,
    board,
}) {
    return (
        <html lang="kr">
            <head>
                <link
                    rel="stylesheet"
                    as="style"
                    crossOrigin="anonymous"
                    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
                />
            </head>
            <body>
                <>
                    <QueryProvider>
                        <Header />
                        <div className="header-margin">
                            {children}
                            {auth}
                            {board}
                        </div>
                    </QueryProvider>
                </>
            </body>
        </html>
    );
}
