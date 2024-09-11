'use client';

import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import join from '../../service/join';

export default function JoinForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await join(email, password, phone, name);
      console.log(response);
    } catch (err) {
      console.log('회원가입 실패');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='이메일'
          required
        />
        <Input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='비밀번호'
          required
        />
        <Input
          type='password'
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
          placeholder='비밀번호 확인'
          required
        />
        <Input
          type='text'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder='전화번호'
          required
        />
        <Input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='이름'
          required
        />
        <Button type='submit'>회원가입</Button>
      </form>
    </>
  );
}
