import React, { Component } from 'react'
import HomePage from './pages/HomePage/HomePage';
import { Route, Switch, Redirect } from 'react-router-dom'

import ShopPage from './pages/Shop/Shop';
import Header from './component/Header/Header';
import SignInAndSignUpPage from './pages/SignIn/SignIn';
import Checkout from './pages/Checkout/Checkout';

import {auth, createUserProfileDocument} from './firebase/Firebase.utils'
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions'

import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from './redux/user/user.selector';



class App extends Component {
  unsubscribeFromAuth = null

  componentDidMount(){
    const {setCurrentUser} = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
      const userRef = await createUserProfileDocument(userAuth)

      userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })

        // console.log(this.state)
      } 
        setCurrentUser(userAuth)    
    })
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }
  render(){
  return (
    <div>
      <Header />
      <Switch>
      <Route exact path = '/' component={HomePage}/>
      <Route  path = '/shop' component={ShopPage}/>
      <Route exact path = '/checkout' component={Checkout}/>
      <Route exact path = '/sign-in' render = {() => this.props.currentUser ? 
      (<Redirect to = '/' />) : (<SignInAndSignUpPage />)} />
      </Switch>
    </div>
  );
  }
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps )(App);


