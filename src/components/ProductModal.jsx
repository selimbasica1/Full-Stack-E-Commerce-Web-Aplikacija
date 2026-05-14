import {useState} from 'react'
import {useCart} from '../context/CartContext'
import {useAuth} from '../context/AuthContext'
import toast from 'react-hot-toast'

function ProductModal ({ product, onClose }) {

    const [selectedSize, setSelectedSize] = useState('M')
    const [quantity, setQuantity] = useState(1)
    const [currentImage, setCurrentImage] = useState(0)

    const { addToCart } = useCart()
    const { user } = useAuth()
    
    // logika za veličine i slike
    const isFootwear = product.category === 'patike'
    const sizes = isFootwear 
    ? ['38', '39', '40', '41', '42', '43', '44', '45'] 
    : ['XS', 'S', 'M', 'L', 'XL']

    const images = [product.image, product.image, product.image, product.image, product.image]

    function handleAddToCart() {
    if (!user) {
        toast.error('You need to log-in to add items to cart!')
        return
    }
    addToCart({ ...product, quantity }, selectedSize)
    toast.success(`${product.name} dodan u košaricu!`)
    onClose()
    }

    return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
    >
        <div 
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
        >
        <div className="flex flex-col md:flex-row">
            
            {/* Lijeva strana - slike */}
            <div className="md:w-1/2 p-4">
            <img 
                src={images[currentImage]} 
                alt={product.name}
                className="w-full h-72 object-cover rounded-xl"
            />
            <div className="flex gap-2 mt-3 justify-center">
                {images.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt=""
                    onClick={() => setCurrentImage(index)}
                    className={`w-14 h-14 object-cover rounded-lg cursor-pointer border-2 transition-colors ${
                    currentImage === index ? 'border-blue-600' : 'border-transparent'
                    }`}
                />
                ))}
            </div>
            </div>

            {/* Desna strana - detalji */}
            <div className="md:w-1/2 p-6 flex flex-col">
            <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
                <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold ml-4"
                >
                ✕
                </button>
            </div>

            <p className="text-blue-600 font-bold text-2xl mb-3">{product.price} KM</p>
            <p className="text-gray-500 text-sm mb-4">{product.description}</p>

            {/* Veličine */}
            <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                {isFootwear ? 'Odaberi broj:' : 'Odaberi veličinu:'}
                </p>
                <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                    <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
                        selectedSize === size
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
            <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-2">Količina:</p>
                <div className="flex items-center gap-3">
                <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold text-gray-600"
                >
                    −
                </button>
                <span className="font-semibold text-lg">{quantity}</span>
                <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold text-gray-600"
                >
                    +
                </button>
                </div>
            </div>

            <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors mt-auto"
            >
                Dodaj u košaricu
            </button>
            </div>
        </div>
        </div>
    </div>
    )
}

export default ProductModal