import { buildClassName } from "../../../../services/classNameService";
import Like from "../../../../icons/Like";
import MessageSquare from "../../../../icons/MessageSquare";
import ThumbsUp from "../../../../icons/ThumbsUp";

type PostFooterProps = {
  likesCount: number;
  comments: number;
  liked: boolean;
  onLikeClick: () => void;
};

export default function PostHeader({ likesCount, comments, liked, onLikeClick }: PostFooterProps) {
  return (
    <footer className="post_footer">
      <div className="post_metrics">
        <span className="metric">
          <Like />
          {`${likesCount} Likes`}
        </span>
        <span className="metric">{`${comments} Comments`}</span>
      </div>
      <div className="spacer"></div>
      <div className="actions">
        <button
          className={buildClassName("post_btn", liked && "active")}
          onClick={onLikeClick}
          aria-pressed={liked}
        >
          <ThumbsUp svgclassname={buildClassName(liked && "active")} />
          Like
        </button>
        <button className="post_btn">
          <MessageSquare />
          Comment
        </button>
      </div>
    </footer>
  );
}
