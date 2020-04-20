import React from 'react'

import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { AnimatePresence } from 'framer-motion';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';

import {Router} from "../routes";
import rootReducer from "../reducers";
import Nav from "../components/nav";

const middlewares = [thunk];
export const store = createStore(rootReducer,{},applyMiddleware(logger,...middlewares));

const privateUrl = [
  "/slots_view",
  "/payment",
  "/settings",
  "/payment_success"
];

const authUrl = [
  "/login",
  "/signup",
  "/forgot_password",
  "/reset_password"
]

class MyApp extends React.PureComponent{

  static async getInitialProps({Component, ctx}){
    let pageProps = {};
    const {asPath} = ctx;
    const { token } = nextCookie(ctx)

    if(Component.getInitialProps){
      pageProps = await Component.getInitialProps(ctx);
    } 

    if(typeof token === "undefined"){
      var found = privateUrl.find(function(element) { 
        return element == asPath; 
      });
      if (found || asPath === "/"){
        if (typeof window === 'undefined') {
          ctx.res.writeHead(302, { Location: '/login' })
          ctx.res.end()
        } else {
          Router.push('/login')
        }
      }
    }else{
      var found = authUrl.find(function(element) { 
        return element == asPath; 
      });
      if (found || asPath === "/"){
        if (typeof window === 'undefined') {
          ctx.res.writeHead(302, { Location: '/slots_view' })
          ctx.res.end()
        } else {
          Router.push('/slots_view')
        }
      }
    }

    const loggedIn = !(typeof token === "undefined");

    return {
      pageProps,
      loggedIn, 
    };
  }

  handleLogout = () => {
    if(typeof window !== 'undefined'){
      cookie.remove('token')
      Router.pushRoute('login');
    }
  };

  render(){
    const {Component, pageProps, router, loggedIn} = this.props;

    return(
        <Provider store={store}>
          {loggedIn && <Nav handleLogout={() => this.handleLogout()} loggedIn={loggedIn}/>}
          <main>
            <AnimatePresence exitBeforeEnter>
              <Component loggedIn={loggedIn} route={router} key={router.route} {...pageProps} />
            </AnimatePresence>
          </main>
        </Provider>
    )
  }
}

export default MyApp;