import React from 'react'

function CartItemList() {
  return (
    <div>
        <div>
        {Array.isArray(cartItems) && cartItems.map((cart, index) => (
  <div key={index}>
    <image src={cart.image} width={70} height={70} alt={cart.name} />
  </div>
))}

        </div>
    </div>
  )
}

export default CartItemList
