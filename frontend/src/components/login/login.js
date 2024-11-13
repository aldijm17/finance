import React, { useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import '../../style.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            const { token } = response.data;

            if (token) {
                localStorage.setItem('token', token);
                setMessage('Login berhasil!');
                navigate('/dashboard');
            } else {
                setMessage('Login gagal. Token tidak ditemukan.');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMessage('Login gagal. Periksa email atau password Anda.');
            } else {
                setMessage('Terjadi masalah jaringan atau server. Silakan coba lagi nanti.');
            }
        }
    };

    return (
        <div  style={{ maxWidth: '400px', margin: '0 auto',border:'solid', marginTop:'180px',padding:'20px',borderRadius:'10px',color:'#28fcb4',
            boxShadow:'0px 5px 10px black'
        }}>
            <h2 style={{ textAlign:'center', color:'black' }}>Login</h2>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '15px' }}>
                    <label className='text-black'>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder='Masukan Email'
                        style={{ width: '100%', padding: '10px', margin: '10px 0 ', borderRadius:'20px',}}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label  className='text-black'>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder='Maksukan Password'
                        style={{ width: '100%', padding: '8px', margin: '5px 0',borderRadius:'20px',}}
                    />
                </div>
               <center> <button type="submit" style={{ padding: '10px 20px', backgroundColor:'#883cec',color:'white'}} className='btn btn'>Login</button></center>
            </form>
            {message && <p>{message}</p>}
        </div>
    
    );
};

export default Login;
