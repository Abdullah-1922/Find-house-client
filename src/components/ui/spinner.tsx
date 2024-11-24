import spinnerIcon from "@/../public/assets/icon/spinner.svg";
import Image from "next/image";
const Spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={`mx-auto text-center flex justify-center items-center w-full h-[300px] ${className}`}
    >
      <Image
        src={spinnerIcon}
        alt="spinner"
        width={140}
        height={140}
        className="mx-auto"
      />
    </div>
  );
};

export default Spinner;
