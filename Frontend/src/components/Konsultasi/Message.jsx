import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleImageClick = () => {
    const a = document.createElement("a");
    a.href = message.img;
    a.download = "image";
    window.open(message.img, "_blank");
  };

  return (
    <div className={`flex ${message.senderId === currentUser.uid ? 'flex-row-reverse' : ''} items-start gap-2.5 mb-4`} ref={ref}>
      <img
        className="w-8 h-8 rounded-full"
        src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}
        alt=""
      />
      <div className="flex flex-col gap-1">
        <div className={`flex flex-col w-full max-w-[326px] leading-1.5 p-4 border-gray-200 bg-white ${message.senderId === currentUser.uid? 'rounded-br-xl rounded-tl-xl rounded-bl-xl':'rounded-br-xl rounded-tr-xl rounded-bl-xl'}`}>
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
            <span className="text-sm font-semibold text-gray-900">
              {message.senderId === currentUser.uid ? currentUser.displayName : data.user.displayName}
            </span>
            <span className="text-sm font-normal text-gray-500 ">
              {formatTime(message.date)}
            </span>
          </div>
          <p className="text-sm font-normal text-gray-900  ">{message.text}</p>
          {message.img && (
            <div className="group relative my-2.5">
              <div className="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <button
                  data-tooltip-target="download-image"
                  className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none   focus:ring-gray-50"
                  onClick={handleImageClick}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                    />
                  </svg>
                </button>
                <div
                  id="download-image"
                  role="tooltip"
                  className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                >
                  Download image
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
              </div>
              <img src={message.img} alt="" className="rounded-lg" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
