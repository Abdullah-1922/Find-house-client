import Container from '@/components/ui/container';
import IndustryLocation from './_components/IndustryLocation';
import ResentPropertySlider from './_components/resentPropertySlider';

const HomeMap = () => {
  return (
    <div className="">
      <IndustryLocation />
      <Container>
        <div className="max-w-7xl mx-auto">
          <ResentPropertySlider />
        </div>
      </Container>
    </div>
  );
};

export default HomeMap;
