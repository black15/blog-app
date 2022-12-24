import '../styles/globals.scss'
import Header from '../components/Header'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
      <Layout>
        <Component {...pageProps}/>
      </Layout>
  )
}

export default MyApp
