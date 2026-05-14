import {useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import toast from 'react-hot-toast'

function RegisterPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)

    async function handleRegister(){
        try {
            await api.post('/auth/register', {name, email, password})
            setSuccess(true)
            toast.success('Registracija uspješna!')
        } catch (err) {
            toast.error(err.response?.data?.message || 'Greška pri registraciji!')
        }
    }

    if (success) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-gray-100'>
                <div className='bg-white rounded-xl shadow-md p-8 w-full max-w-md text-center'>
                    <h2 className='text-2xl font-bold text-gray-800 mb-4'>Registracija uspješna! 🎉</h2>
                    <p className='text-gray-500 mb-6'>Možeš se prijaviti sa svojim nalogom.</p>
                    <Link to="/login" className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
                        Login
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='bg-white rounded-xl shadow-md p-8 w-full max-w-md'>
                <h2 className='text-2xl font-bold text-gray-800 mb-2'>Register</h2>
                <p className='text-gray-500 text-sm mb-6'>Dobrodošli nazad!</p>
                
                <label className="text-sm font-medium text-gray-700 mb-1 block">Name</label>
                <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500' />

                <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                <input type="email" placeholder='Email address' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500' />
                
                <label className='text-sm font-medium text-gray-700 mb-1 block'>Password</label>
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500' />

                <button onClick={handleRegister} className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold mt-6 hover:bg-blue-700 transition-colors">
                    Register
                </button>
                
                <div className="text-center mt-4 text-sm text-gray-500">
                    Imaš nalog? <Link to="/login" className="text-blue-600 hover:underline">Prijavi se</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage