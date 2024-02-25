import React from "react";
import {
  FaSquareFacebook,
  FaSquareTwitter,
  FaSquareReddit,
  FaSquareWhatsapp,
} from "react-icons/fa6";

const SocialShareButtons = ({ url, title }) => {
  return (
    <div className="w-full flex justify-between ">
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.facebook.com/dialog/share?app_id=217533984714963&display=popup&href=${url}`}
      >
        <FaSquareFacebook className="text-[#3b5998] w-12 h-auto" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://twitter.com/intent/tweet?url=${url}`}
      >
        <FaSquareTwitter className="text-[#00acee] w-12 h-auto" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`http://www.reddit.com/submit?url=${url}&title=${title}`}
      >
        <FaSquareReddit className="text-[#ff4500] w-12 h-auto" />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://api.whatsapp.com/send/?text=${url}`}
      >
        <FaSquareWhatsapp className="text-[#25d366] w-12 h-auto" />
      </a>
    </div>
  );
};

export default SocialShareButtons;
