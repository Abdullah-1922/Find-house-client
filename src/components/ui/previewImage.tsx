/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Loader, Trash2 } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

const PreviewImage = ({
  image,
  setImages,
}: {
  image: string;
  setImages: Dispatch<SetStateAction<string[]>>;
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const publicId = image.split("/").pop()?.split(".")[0];
    try {
      await axios.post("/api/delete-cloudinary-media", {
        public_id: publicId,
      });

      setImages((images) => images.filter((i) => i !== image));
    } catch (error: any) {
      toast.error(error.message || "Failed to delete image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative max-h-[300px] min-h-[120px]">
      <a href={image} target="_blank">
        <Image
          src={image}
          alt="image"
          width={250}
          className="rounded-lg h-auto"
          height={20}
        />
      </a>
      {!loading && image && (
        <Trash2
          onClick={handleDelete}
          className="bg-red-600 p-2 rounded-md text-white absolute top-3 right-3 cursor-pointer"
          size={35}
        />
      )}
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-black/50 flex items-center justify-center">
          <Loader className="animate-spin text-white/90" size={30} />
        </div>
      )}
    </div>
  );
};

export default PreviewImage;
