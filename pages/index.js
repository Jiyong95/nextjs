import Link from 'next/link';
import { useRouter } from 'next/router';
import Seo from '../components/Seo';

export default function Home({ results }) {
  const router = useRouter();

  const onClick = (id, title) => {
    // <Link> 안 쓰고 navigating 하는 방법. query 이용
    // 단점 : Home을 안거치고 Detail페이지로 이동하면 query에 정보가 담기지 않는다.
    // router.push(`/movies/${id}`);

    // 데이터도 보내는 방법.
    router.push(
      {
        pathname: `/movies/${id}`,
        query: {
          title,
        },
      },
      `/movies/${id}` // 이게 없으면 url에  query 정보가 들어간다.
    );
  };

  return (
    <div className="container">
      <Seo title="Home" />
      {results.map((movie) => (
        <div
          onClick={() => onClick(movie.id, movie.original_title)}
          className="movie"
          key={movie.id}
        >
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          {/* router.push랑 똑같은 방법 */}
          <Link
            href={{
              pathname: `/movies/${movie.id}`,
              query: {
                title: movie.original_title,
              },
            }}
            as={`/movies/${movie.id}`}
          >
            <a>{movie.original_title}</a>
          </Link>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
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
// data를 다 받아온 후에(HTML태그도 안보인다.) 렌더링 하고 싶은 경우에 사용.
// 안쓰면 data부분을 제외한 HTML이 보여지고 data가 받아와지기 전까지 해당 부분은 안보임.

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
