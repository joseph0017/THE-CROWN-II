import React from 'react'
import './Checkout.scss'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors'
import CheckoutItem from '../../component/Checkout-Item/Checkout-Item';
import StripeButton from '../../component/StripeButton/StripeButton';


const Checkout = ({ cartItems, total }) => {
    return (
        <div className ="checkout-page">
            <div className ="checkout-header">
                <div className = "header-block">
                    <span> Product </span>
                </div>
                <div className = "header-block">
                    <span> Desctiprion </span>
                </div>
                <div className = "header-block">
                    <span> Quantity </span>
                </div>
                <div className = "header-block">
                    <span> Price </span>
                </div>
                <div className = "header-block">
                    <span> Remove </span>
                </div>
            </div> 
            {
                cartItems.map(cartItem => (
                    <CheckoutItem  key = {cartItem.id} cartItem = {cartItem} />
                )
                )
            }
            <div className = 'total'>
                <span> TOTAL: ${total} </span>
                <div className="test-warning">
                    *Please use the following test credit card for test payments*
                    <br />
                    4242 4242 4242 4242 - Exp: 01/23 CVV:  456
                    
                    <br />
                    Exp and CVV can be anything but for the Exp, it must be at a future date 
                    for example: Exp: 04/19, it won't work, it must be at a future date
                </div>
                <StripeButton price = {total} />
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector ({
    cartItems: selectCartItems, 
    total: selectCartTotal
})

export default connect(mapStateToProps)(Checkout)
