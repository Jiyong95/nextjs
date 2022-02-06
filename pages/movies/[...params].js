// movies/:id

import { useRouter } from 'next/router';
import Seo from '../../components/Seo';

export default function Detail({ params }) {
  // const router = useRouter();
  // const [title, id] = router.query.params || [];
  // 단점 : Home을 안거치고 Detail페이지로 이동하면 query에 정보가 담기지 않는다.
  //router.query는 client에서 일어나기 때문에. 그래서 || 써준다.
  const [title, id] = params || [];
  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
    </div>
  );
}

export function getServerSideProps({ params: { params } }) {
  return {
    props: {
      params,
    },
  };
}
