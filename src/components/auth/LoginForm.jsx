'use client';

import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import login from '../../service/authService';
import { useAuthStore } from '../../store/authStore';
import { useRouter } from 'next/navigation';

export default function LoginForm({ redirect }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const setUser = useAuthStore((state) => state.setUser);
    const router = useRouter();

    // 로그인 로직 셋팅
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = await login(email, password);
            const date = new Date(
                user.user.exp * 1000
            ).toLocaleString();

            setUser(user.user.sub);
            router.push('/');
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
