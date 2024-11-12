import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // Fungsi untuk menangani form submit
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Kirim data login ke backend
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            const { token } = response.data;

            // Simpan token di localStorage dan tampilkan pesan sukses
            localStorage.setItem('token', token);
            setMessage('Login berhasil!');
        } catch (error) {
            // Tampilkan pesan error jika login gagal
            setMessage('Login gagal. Periksa email atau password Anda.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px' }}>Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
