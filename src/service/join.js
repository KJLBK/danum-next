export default async function join(email, password, phone, name) {
  let res;
  try {
    res = await fetch('/api/member/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, phone, name }),
    });

    if (!res.ok) {
      throw new Error('Join failed');
    }
  } catch (err) {
    throw new Error(err.message);
  }

  return await res.json();
}

// /member/join
// POST
// register
// RequestBody: RegisterDto (email: String, password: String, phone: String, name: String)
