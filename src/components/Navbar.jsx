import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

function Navbar() {

  const { totalItems, clearCart } = useCart()
  const { user, logout } = useAuth()

  function handleLogout() {
    clearCart()
    logout()
    toast.success("You're logged out!")
  }

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">ShopApp</Link>
      <div className="flex gap-6 items-center">
        <Link to="/" className="text-gray-600 hover:text-blue-600">Proizvodi</Link>

        {user ? (
          <>
            <span className="text-gray-700 font-medium">Zdravo, {user.name}!</span>
            <button onClick={handleLogout} className="text-red-500 hover:text-red-700 text-sm font-medium">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
            <Link to="/register" className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-sm">Register</Link>
          </>
        )}

        <Link to="/cart" className="relative text-gray-600 hover:text-blue-600">
          <ShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  )
}

export default Navbar