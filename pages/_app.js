import Layout from '../components/Layout';
import '../styles/globals.css';
//next.js가 컴포넌트를 렌더링하기 전에 해당 App()안의 component로 해당 컴포넌트를 전달한다.
// _app.js파일만 css파일을 import 해서 사용가능.
// 다른 파일들은 module.css 파일 or styled jsx를 이용해야한다.
export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
