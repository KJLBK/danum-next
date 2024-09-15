import { cookies } from 'next/headers';
import CheckAuthButton from '../../components/auth/CheckAuthButton';

export default function Test() {
    // 서버 측에서 cookies 사용
    const cookieStore = cookies();
    const RefreshToken =
        cookieStore.get('refreshToken')?.value;

    return (
        <>
            {/* 클라이언트 컴포넌트에 RefreshToken 전달 */}
            <CheckAuthButton RefreshToken={RefreshToken} />
        </>
    );
}
