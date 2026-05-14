import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  function addToCart(product, size) {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size)
      if (existing) {
       return prev.map(item =>
          item._id === product._id && item.size === size
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        )
      }
      return [...prev, { ...product, size, quantity: product.quantity || 1, cartKey: `${product.id}-${size}-${Date.now()}` }]
    })
  }

  function removeFromCart(cartKey) {
    setCartItems(prev => prev.filter(item => item.cartKey !== cartKey))
  }

  function updateQuantity(cartKey, newQuantity) {
    if (newQuantity < 1) return
    setCartItems(prev =>
      prev.map(item =>
        item.cartKey === cartKey
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  function changeSize(cartKey, newSize) {
    setCartItems(prev =>
      prev.map(item =>
        item.cartKey === cartKey
          ? { ...item, size: newSize }
          : item
      )
    )
  }

  function clearCart() {
    setCartItems([])
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, changeSize, totalItems, totalPrice, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}