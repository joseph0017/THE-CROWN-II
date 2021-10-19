
import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeButton = ({ price }) => {
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_51JmETEEkCIACB3VhdUofkyWzHO51bWIG9CNewedJRgFcRWhj9YtfH14DvY1EGlkLOpNlN36KnQkN4PuqrId6n9yJ00btm6u4V1'

    const onToken = token => {
        console.log(token)
        alert('Payment Successful')
    }

    return (
        <StripeCheckout
        label = 'Pay Now'
        name = 'THE CROWN' 
        billingAddress
        shippingAddress
        image = 'https://svgshare.com/i/CUz.svg'
        description = {`Your total is $${price}`} 
        amount = {priceForStripe} 
        panelLabel = 'Pay Now'
        token = {onToken} 
        stripeKey = {publishableKey} 
        />
            

    )
}

export default StripeButton
