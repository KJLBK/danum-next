'use client';

import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { login } from '../../service/authService';
import { useAuthStore } from '../../store/authStore';
import {
    useRouter,
    useSearchParams,
} from 'next/navigation';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { setAuth } = useAuthStore();
    const router = useRouter();
    const searchParams = useSearchParams();

    const redirectPath = searchParams.get('from') || '/';

    // 로그인 로직 셋팅
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { user } = await login(email, password);
            const expiration = new Date(
                user.exp * 1000
            ).toLocaleString();

            setAuth(
                user.sub,
                user.role[0].authority,
                expiration
            );
            console.log(redirectPath);
            router.push(redirectPath); // /chat으로 안가짐.
        } catch (err) {
            setError('로그인 실패 : ' + err.message);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    placeholder="이메일을 입력해 주세요"
                    required
                />
                <Input
                    type="password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    placeholder="비밀번호를 입력해 주세요"
                    required
                />
                <Button type="submit">로그인</Button>
            </form>
            {error && (
                <p style={{ color: 'red' }}>{error}</p>
            )}
            {/* TODO: 비밀번호가 생각나지 않나요? */}{' '}
        </>
    );
}
