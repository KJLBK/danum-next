'use client';

import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { join } from '../../service/join';
import KakaoMap from '../../app/map/page'; // KakaoMap 컴포넌트를 가져옴

export default function JoinForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState(''); // 위도 저장
    const [longitude, setLongitude] = useState(''); // 경도 저장

    const handleSubmit = async (e) => {
        e.preventDefault();

        const parsedLatitude = parseFloat(latitude);
        const parsedLongitude = parseFloat(longitude);

        try {
            const response = await join(
                email,
                password,
                phone,
                name,
                parsedLatitude, // double 타입으로 변환된 위도
                parsedLongitude // double 타입으로 변환된 경도
            );
            console.log(response);
        } catch (err) {
            console.log('회원가입 실패');
        }
    };

    // KakaoMap에서 위치 변경 시 위도와 경도를 각각 업데이트
    const handleLocationChange = (location) => {
        setLatitude(location.latitude);
        setLongitude(location.longitude);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Input
                    type='email'
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    placeholder='이메일'
                    required
                />
                <Input
                    type='password'
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    placeholder='비밀번호'
                    required
                />
                <Input
                    type='password'
                    value={passwordCheck}
                    onChange={(e) =>
                        setPasswordCheck(e.target.value)
                    }
                    placeholder='비밀번호 확인'
                    required
                />
                <Input
                    type='text'
                    value={phone}
                    onChange={(e) =>
                        setPhone(e.target.value)
                    }
                    placeholder='전화번호'
                    required
                />
                <Input
                    type='text'
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    placeholder='이름'
                    required
                />
                <KakaoMap
                    onLocationChange={handleLocationChange}
                />{' '}
                {/* KakaoMap에서 위도/경도 받기 */}
                <Button
                    type='submit'
                    disabled={!latitude || !longitude}
                >
                    회원가입
                </Button>
            </form>
        </>
    );
}
