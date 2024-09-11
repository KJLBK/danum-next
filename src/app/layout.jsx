import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: '다눔',
    description: '지식 커뮤니티 플랫폼, danum(다눔)',
};

export default function RootLayout({ children }) {
    return (
        <html lang="kr">
            <body className={inter.className}>
                <Header />
                {children}
            </body>
        </html>
    );
}
