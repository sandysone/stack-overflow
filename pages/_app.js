import App from 'next/app'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>Stack Overflow Clone</title>
        </Head>
        <Component {...pageProps} />
      </>
    )
  }
}
