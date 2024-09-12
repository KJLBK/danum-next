import './globals.css';
import Header from '../components/Layout/Header';

export const metadata = {
    title: '다눔',
    description: '지식 커뮤니티 플랫폼, danum(다눔)',
};

export default function RootLayout({ children }) {
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
                <Header />
                {children}
            </body>
        </html>
    );
}
