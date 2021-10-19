import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'

import { ReactComponent as Logo } from '../../assets/4.1 crown.svg'
import {auth} from '../../firebase/Firebase.utils'
import { connect } from 'react-redux'
import CartIcon from '../Cart-Icon/CartIcon'
import CartDropdown from '../Cart-Dropdown/CartDropdown'
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from '../../redux/user/user.selector'
import { selectCartHidden } from '../../redux/cart/cart.selectors'

const Header = ({currentUser, hidden}) => {
    return (
        <div className= "header">
            <Link className = "logo-container" to = "/">
                <Logo className = " logo" />
            </Link>
            <div className =  "options">
                <Link className = "option" to = "/shop">
                SHOP
                </Link>

                <Link className = "option" to = "/contact">
                CONTACT
                </Link>
                {currentUser ? (
                    <div className = 'option' onClick={() => auth.signOut()}>
                    SIGN OUT
                    </div>
                ) : (
                    <Link className = "option" to="/sign-in">
                        SIGN IN
                    </Link>
                )}
            <CartIcon />
            </div>
            { hidden ? null  : 
            <CartDropdown /> 
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
    hidden : selectCartHidden
})

export default connect(mapStateToProps)(Header)
