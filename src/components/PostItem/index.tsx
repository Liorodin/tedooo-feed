import { useEffect, useRef, useState } from "react";
import { Post } from "../../types/feedTypes";
import PostHeader from "./components/PostHeader";
import PostContent from "./components/PostContent";
import PostFooter from "./components/PostFooter";
import { VIEW_API_URL } from "./constants";
import "./index.css";

type PostItemProps = {
  post: Post;
};

export default function PostItem({ post }: PostItemProps) {
  const {
    id,
    likes,
    didLike,
    comments,
    images,
    avatar,
    username,
    shopName,
    date,
    text,
  } = post;

  const [likesCount, setLikesCount] = useState<number>(likes);
  const [liked, setLiked] = useState<boolean>(didLike);
  const timerIdRef = useRef<number | null>(null);
  const hasMultipleImages = images.length > 1;

  const nodeRef = useRef<HTMLDivElement | null>(null);
  const hasFetchedRef = useRef<boolean>(false);

  const cleanup = () => {
    if (timerIdRef.current !== null) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
  }

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasFetchedRef.current) {
          timerIdRef.current = window.setTimeout(() => {
            fetch(`${VIEW_API_URL}${id}`)
              .catch((error) => {
                console.error("Error fetching:", error);
              })
              .finally(() => {
                hasFetchedRef.current = true;
              });
          }, 500);
        } else {
          cleanup();
        }
      },
      {
        threshold: 1.0
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cleanup();
    };
  }, [id]);

  const onLikeClick = () => {
    setLikesCount((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
    setLiked((prevLiked) => !prevLiked);
  };

  return (
    <div className="post" ref={nodeRef}>
      <PostHeader
        avatar={avatar}
        username={username}
        shopName={shopName}
        date={date}
        text={text}
      />
      <PostContent images={images} hasMultipleImages={hasMultipleImages} />
      <PostFooter
        likesCount={likesCount}
        comments={comments}
        liked={liked}
        onLikeClick={onLikeClick}
      />
    </div>
  );
}
