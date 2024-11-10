'use client';
import { useState, useEffect } from 'react';
import { fetchUserData } from '../../../services/authService';
// import Profile from '../../../components/auth/Profile';
// import KakaoMap from '../../map/page';

export default function ProfileEdit() {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchUserData();
                setUserData(data);
            } catch (err) {
                setError(
                    '사용자 데이터를 불러오는데 실패했습니다.',
                );
                console.error(
                    'Error fetching user data:',
                    err,
                );
            } finally {
                setIsLoading(false);
            }
        };

        getUserData();
    }, []);

    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <form>
                {/* <Profile />
                이메일 :{' '}
                <input type="text" value={userData.email} />
                닉네임 :{' '}
                <input type="text" value={userData.name} />
                <KakaoMap /> */}
            </form>
        </div>
    );
}
