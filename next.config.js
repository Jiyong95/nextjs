const API_KEY = process.env.API_KEY;

module.exports = {
  reactStrictMode: true,
  // redirect 설정
  async redirects() {
    return [
      // 여러개 만들 수 있다. 객체 형식으로
      {
        // /source url 접속시
        source: '/old-url/:path*',
        // destination 으로 redirect
        destination: '/new-url/:path*',
        permanent: false,
      },
    ];
  },
  // rewrites는 source는 그대로지만 destination으로 접속한다.
  // => url을 노출시키지 않을 수 있다(보안)
  // redirect는 url 자체를 바꿔서 접속해주기 때문에 url이 노출된다.
  async rewrites() {
    return [
      {
        source: '/api/movies',
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        source: '/api/movies/:id',
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
      },
    ];
  },
};
