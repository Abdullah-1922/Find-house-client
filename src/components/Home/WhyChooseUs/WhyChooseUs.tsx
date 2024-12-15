import Image from 'next/image';

const WhyChooseUs = () => {
  return (
    <>
      <div
        className="md:pt-20 pt-12 pb-44"
        style={{
          backgroundImage:
            'url(https://code-theme.com/html/findhouses/images/bg/bg-service-home-5.jpg)',
        }}
      >
        <div className="pt-28">
          <h1 className="text-center text-4xl font-medium mb-2  ">
            Why Choose Us
          </h1>
          <p className="text-center">We offer perfect real estate services</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 md:px-4 relative -mt-[130px]">
        <div className="flex justify-center flex-wrap gap-10 bg-white shadow-xl py-10">
          <div className="flex flex-col sm:border-r-4 border-0 pr-5 justify-center items-center w-60  ">
            <Image
              className="w-20"
              width={1000}
              height={1000}
              src="https://code-theme.com/html/findhouses/images/icons/i-5.svg"
              alt=""
            ></Image>
            <h2 className="text-xl text-center font-bold mt-2">
              Find Your Home
            </h2>
            <p className="text-center mt-2 text-xs">
              Lorem ipsum suspendisse ultrices gravida. Risus commodo viverra
              maecenas accumsan.
            </p>
          </div>
          <div className="flex flex-col md:border-r-4 border-0 pr-5 justify-center items-center w-60  ">
            <Image
              className="w-20"
              width={1000}
              height={1000}
              src="https://code-theme.com/html/findhouses/images/icons/i-6.svg"
              alt=""
            ></Image>
            <h2 className="text-xl text-center font-bold mt-2">
              Trusted by thousands
            </h2>
            <p className="text-center mt-2 text-xs">
              Lorem ipsum suspendisse ultrices gravida. Risus commodo viverra
              maecenas accumsan.
            </p>
          </div>
          <div className="flex flex-col md:border-r-4 border-0 pr-5 justify-center items-center w-60  ">
            <Image
              className="w-20"
              width={1000}
              height={1000}
              src="https://code-theme.com/html/findhouses/images/icons/i-7.svg"
              alt=""
            ></Image>
            <h2 className="text-xl text-center font-bold mt-2">
              Financing made easy
            </h2>
            <p className="text-center mt-2 text-xs">
              Lorem ipsum suspendisse ultrices gravida. Risus commodo viverra
              maecenas accumsan.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center w-60  ">
            <Image
              className="w-20"
              width={1000}
              height={1000}
              src="https://code-theme.com/html/findhouses/images/icons/i-8.svg"
              alt=""
            ></Image>
            <h2 className="text-xl text-center font-bold mt-2">24/7 support</h2>
            <p className="text-center mt-2 text-xs">
              Lorem ipsum suspendisse ultrices gravida. Risus commodo viverra
              maecenas accumsan.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyChooseUs;
