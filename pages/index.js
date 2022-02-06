import Seo from '../components/Seo';

export default function Home({ results }) {
  return (
    <div className="container">
      <Seo title="Home" />
      {results.map((movie) => (
        <div className="movie" key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <h4>{movie.original_title}</h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

// server (side)에서만 작동하는 함수.
export async function getServerSideProps() {
  const { results } = await (
    await fetch('http://localhost:3000/api/movies')
  ).json();
  return {
    props: {
      results,
    },
  };
}
// data를 Server에서 받아와서 렌더링하기 때문에 {!results && <h4>Loading...</h4>} 실행될 일이 없어진다.
// data를 다 받아온 후에 렌더링 하고 싶은 경우에 사용.

/*
_app.js

 export default function App({ Component, pageProps }) {
   return (
     <Layout>
       <Component {...pageProps} />
     </Layout>
   );
 }


Component <= Home()
pageProps <= getServerSideProps() = {props:{results}}가 전달된다.

즉, Home으로 getServerSideProps()가 전달되어 사용하는 방식.
*/
