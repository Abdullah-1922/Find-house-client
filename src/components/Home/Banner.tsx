

const Banner = () => {
  return (
    <div>
      <div
        className="hero min-h-[820px]"
        style={{
          backgroundImage: `url(https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/home-improvement/wp-content/uploads/2022/04/UrbanologyDesigns_JTurnbowPhotography.jpg)`,
        }}
      >
        <div className=" "></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-xl">
            <h1 className="mb-5 text-5xl font-bold text-[#414754]">Find Your Dream Home</h1>
            <p className="mb-5 text-[#414754]">
            We Have Over Million Properties For You
            </p>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
