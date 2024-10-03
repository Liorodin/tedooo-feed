import React from "react";
import { dateStringToDate, timeAgo } from "../../../../services/timeService";
import {
  AVATAR_DIMS,
  TIME_TEXT_BUFFER,
} from "../../constants";

type PostHeaderProps = {
  avatar: string;
  username: string;
  shopName: string;
  date: string;
  text: string;
};

export default function PostHeader({ avatar, username, shopName, date, text }: PostHeaderProps) {
  return <header className="post_header">
    <div className="avatar">
      <img
        className="avatar_img"
        src={avatar}
        width={AVATAR_DIMS}
        height={AVATAR_DIMS}
        alt={`${username}'s avatar`}
      />
      <div>
        <div className="username">{username}</div>
        <div>
          <a href="#" className="shop_name">{shopName}</a>
          <span className="post_date">
            {`${TIME_TEXT_BUFFER}${timeAgo(dateStringToDate(date))}`}
          </span>
        </div>
      </div>
    </div>
    <p className="post_text">{text}</p>
  </header>
}
