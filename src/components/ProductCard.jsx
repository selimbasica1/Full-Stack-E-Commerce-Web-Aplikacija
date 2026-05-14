import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import  ProductModal  from './ProductModal'
import toast from 'react-hot-toast'

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { user } = useAuth()
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-500 text-sm mt-1">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-blue-600 font-bold text-lg">{product.price} KM</span>
          <button
            onClick={() => {
            if (!user) {
              toast.error('You need to log-in to add items to cart!')
              return
            }
            addToCart(product, 'M')
          }}
            className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            Dodaj u košaricu
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="text-blue-600 text-sm hover:underline mt-2 w-full"
          >
            View Details
          </button>
        </div>
      </div>
      {showModal && (
        <ProductModal 
          product={product} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>

    
  )
}

export default ProductCard


