import Layout from '../component/Layout';
import '../styles/globals.css';

function MyApp({ Component, pagesProps }) {
  return (
    <Layout>
      <Component {...pagesProps} />
    </Layout>
  );
}

export default MyApp;
