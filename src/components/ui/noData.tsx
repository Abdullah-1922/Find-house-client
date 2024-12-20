import Image from 'next/image';
import icon from '@/../public/assets/icon/no data.png';

const Nodata = ({ className }: { className?: string }) => {
  return (
    <div
      className={`h-screen md:h-[70vh] flex items-center justify-center w-full ${className}`}
    >
      <div>
        <Image
          src={icon}
          width={100}
          height={100}
          alt="icon"
          className="mx-auto"
        />
        <p className="text-center text-gray-500 mt-2">No data found!</p>
      </div>
    </div>
  );
};

export default Nodata;
