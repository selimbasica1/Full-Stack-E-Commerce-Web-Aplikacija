import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { Toaster } from 'react-hot-toast'
import api from './api/axios'

function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedGender, setSelectedGender] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [filters, setFilters] = useState({ gender: '', category: '' })

  const categories = ['patike', 'majice', 'dukserice', 'pantalone', 'kape', 'čarape']

  useEffect(() => {
    fetchProducts()
  }, [filters])

  async function fetchProducts() {
    setLoading(true)
    try {
      const params = {}
      if (filters.gender) params.gender = filters.gender
      if (filters.category) params.category = filters.category
      const response = await api.get('/products', { params })
      setProducts(response.data)
    } catch (err) {
      console.log('Greška:', err)
    }
    setLoading(false)
  }

  function handleFilter() {
    setFilters({ gender: selectedGender, category: selectedCategory })
  }

  function handleReset() {
    setSelectedGender('')
    setSelectedCategory('')
    setFilters({ gender: '', category: '' })
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-12 flex gap-8">
      {/* Lijeva strana - filteri */}
      <div className="w-56 flex-shrink-0">
        <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
          <h3 className="font-bold text-gray-800 mb-4">Filteri</h3>

          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Spol</p>
            <div className="flex flex-col gap-2">
              {['muško', 'žensko'].map(g => (
                <label key={g} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={selectedGender === g}
                    onChange={() => setSelectedGender(g)}
                  />
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </label>
              ))}
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value=""
                  checked={selectedGender === ''}
                  onChange={() => setSelectedGender('')}
                />
                Svi
              </label>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Kategorija</p>
            <div className="flex flex-col gap-2">
              {categories.map(cat => (
                <label key={cat} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                  />
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </label>
              ))}
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={selectedCategory === ''}
                  onChange={() => setSelectedCategory('')}
                />
                Sve
              </label>
            </div>
          </div>

          <button
            onClick={handleFilter}
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors mb-2"
          >
            Primijeni filtere
          </button>
          <button
            onClick={handleReset}
            className="w-full bg-gray-100 text-gray-600 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
          >
            Osvježi
          </button>
        </div>
      </div>

      {/* Desna strana - proizvodi */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Our Products</h2>
        {loading ? (
          <p className="text-gray-500">Učitavanje proizvoda...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">Nema proizvoda za odabrane filtere.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Toaster position="bottom-right" toastOptions={{ duration: 5000 }} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </div>
  )
}

export default App