'use client';

import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { useLogin } from '../../hooks/useLogin';
import Link from 'next/link';

import {
    useRouter,
    useSearchParams,
} from 'next/navigation';

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const router = useRouter();
    const SearchParams = useSearchParams();
    const redirectUrl = SearchParams.get('from') || '/';

    const { mutate, isLoading, isError } = useLogin();
    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(
            {
                email: formData.email,
                password: formData.password,
            },
            {
                onSuccess: () => {
                    router.push(redirectUrl);
                    console.log(
                        `로그인 성공 ${redirectUrl}`,
                    );
                },
                onError: (err) => {
                    setError('로그인 실패: ' + err.message);
                },
            },
        );
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                        }))
                    }
                    placeholder="이메일을 입력해 주세요"
                    required
                />
                <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            password: e.target.value,
                        }))
                    }
                    placeholder="비밀번호를 입력해 주세요"
                    required
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? '로그인 중...' : '로그인'}
                </Button>
                <br />
                <Link href="/join">
                    <Button>회원가입</Button>
                </Link>
            </form>
            {isError && (
                <p style={{ color: 'red' }}>
                    로그인 중 오류가 발생했습니다.
                </p>
            )}
            {error && (
                <p style={{ color: 'red' }}>{error}</p>
            )}
        </>
    );
}
