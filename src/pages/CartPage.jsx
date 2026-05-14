import { Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const SIZES = ['XS', 'S', 'M', 'L', 'XL']

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, changeSize, totalPrice } = useCart()
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto px-8 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">You need to log-in to have a cart</h2>
        <Link to="/login" className="text-blue-600 hover:underline">← Go to Login</Link>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-8 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Vaša košarica je prazna</h2>
        <Link to="/" className="text-blue-600 hover:underline">← Nazad na proizvode</Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">← Nazad na proizvode</Link>
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Vaša košarica</h2>

      <div className="flex gap-8">
        {/* Lijeva strana - proizvodi */}
        <div className="flex-1 flex flex-col gap-4">
          {cartItems.map(item => (
            <div key={item.cartKey} className="bg-white rounded-xl shadow-md p-4 flex gap-4 items-center">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />

              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-blue-600 font-bold mt-1">{item.price} KM</p>

                {/* Odabir veličine */}
                <div className="flex gap-2 mt-2">
                  {SIZES.map(size => (
                    <button
                      key={size}
                      onClick={() => changeSize(item.cartKey, size)}
                      className={`w-8 h-8 text-xs rounded-md border font-medium transition-colors ${
                        item.size === size
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Količina */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold text-gray-600"
                >
                  −
                </button>
                <span className="w-6 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold text-gray-600"
                >
                  +
                </button>
              </div>

              {/* Trash */}
              <button
                onClick={() => removeFromCart(item.cartKey)}
                className="text-red-400 hover:text-red-600 transition-colors ml-2"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Desna strana - proračun */}
        <div className="w-80">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Pregled narudžbe</h3>

            {cartItems.map(item => (
              <div key={item.cartKey} className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{item.name} ({item.size}) x{item.quantity}</span>
                <span>{item.price * item.quantity} KM</span>
              </div>
            ))}

            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Dostava</span>
                <span className="text-green-600">Besplatno</span>
              </div>
              <div className="flex justify-between font-bold text-gray-800 text-lg mt-2">
                <span>Ukupno</span>
                <span className="text-blue-600">{totalPrice} KM</span>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold mt-6 hover:bg-blue-700 transition-colors">
              Nastavi na plaćanje
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage