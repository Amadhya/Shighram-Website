import React from 'react';
import Document, {Html, Head, Main, NextScript} from "next/document";

export default class MyDocument extends Document{
  static async getInitialProps(ctx){
    const initialProps = await Document.getInitialProps(ctx)
    return {...initialProps}
  }

  render() {
    return(
        <Html lang="en">
          <Head>
            <style>
              {`
              body{
                margin:0;
              }        
            `}
            </style>
            <link rel="shortcut icon" href="/static/images/logo.png"/>
          </Head>
          <body>
          <Main/>
          <NextScript/>
          </body>
        </Html>
    );
  }
}