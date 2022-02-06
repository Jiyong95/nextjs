//파일명과 컴포넌트는 상관없음.

import NavBar from '../components/NavBar';

//파일명으로 Routing이 일어난다.
export default function Home() {
  return (
    <div>
      <NavBar />
      <h1>Home</h1>
    </div>
  );
}
