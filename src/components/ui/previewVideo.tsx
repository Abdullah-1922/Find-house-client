/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Loader, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

const PreviewVideo = ({
  url,
  setUrl,
}: {
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const publicId = url.split("/").pop()?.split(".")[0];
    try {
      await axios.post("/api/delete-cloudinary-media", {
        public_id: publicId,
        resource_type: "video",
      });
      setUrl("");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[350px] h-[200px] relative rounded-lg">
      <video
        src={url}
        controls
        className="w-full h-full object-cover rounded-lg"
      />
      {!loading && url && (
        <Trash2
          onClick={handleDelete}
          className="bg-red-600 p-2 rounded-md text-white absolute top-3 right-3 cursor-pointer"
          size={35}
        />
      )}
      {loading && (
        <div className="absolute top-0 left-0 w-[350px] h-[200px] rounded-lg bg-black/80 flex items-center justify-center">
          <Loader className="animate-spin text-white" size={30} />
        </div>
      )}
    </div>
  );
};

export default PreviewVideo;
