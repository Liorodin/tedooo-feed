import { buildClassName } from "../../../../services/classNameService";
import { MAX_PHOTOS_IN_POST } from "../../constants";

type PostContentProps = {
  images: string[];
  hasMultipleImages: boolean;
};

export default function PostContent({ images, hasMultipleImages }: PostContentProps) {
  return (
    <section
      className={buildClassName("post_content", hasMultipleImages && "multiple")}
    >
      {images.slice(0, MAX_PHOTOS_IN_POST).map((src) => (
        <img className="post_img" key={src} src={src} alt="Post content" />
      ))}
    </section>
  );
}
