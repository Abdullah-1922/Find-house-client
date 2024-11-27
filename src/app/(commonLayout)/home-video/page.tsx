import dynamic from 'next/dynamic';

const HomeVideo = dynamic(() => import('../_components/module/homeVideo'), {
  ssr: false,
});

export default function HomeVidePage() {
  return <HomeVideo />;
}
