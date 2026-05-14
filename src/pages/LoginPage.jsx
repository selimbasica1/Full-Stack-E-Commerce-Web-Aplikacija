import {useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

//Notifikacija za uspješan login
import toast from 'react-hot-toast'
//

function LoginPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Za navigaciju na home page
    const {login} = useAuth()
    const navigate = useNavigate()
    //


    async function handleLogin(){
        try {
            const response = await api.post('/auth/login', {email, password})
            login (response.data.user, response.data.token)
            toast.success('Uspješno ste se prijavili!', { duration: 5000 })
            navigate('/')
        } catch (err) {
                console.log(err.response?.data)
                toast.error(err.response?.data?.message || 'Greška pri prijavi!')
            }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='bg-white rounded-xl shadow-md p-8 w-full max-w-md'>
                <h2 className='text-2xl font-bold text-gray-800 mb-2'>Login</h2>
                <p className='text-gray-500 text-sm mb-6'>Dobrodošli nazad!</p>
                
                <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                <input type="email" placeholder='Email addres' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500' />
                
                <label className='text-sm font-medium text-gray-700 mb-1 block'>Password</label>
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500' />

                <button
                    onClick={handleLogin} className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold mt-6 hover:bg-blue-700 transition-colors">
                    Login
                </button>
                
                <div className="text-center mt-4 text-sm text-gray-500">
                    Nemaš nalog? <Link to="/register" className="text-blue-600 hover:underline">Registruj se</Link>
                </div>


            </div>
        </div>
    )

}




export default LoginPage