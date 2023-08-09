import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";

export const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`${
        message.senderId === currentUser.uid && "flex-row-reverse"
      } flex items-start gap-[15px] mb-3`}
    >
      <div className="flex flex-col text-gray-500">
        {message.senderId === currentUser.uid && (
          <img
            className="w-8 h-8 object-cover aspect-square rounded-full"
            src="https://thumb9.shutterstock.com/image-photo/stock-photo-head-shot-portrait-close-up-smiling-confident-businessman-wearing-glasses-looking-at-camera-250nw-1714666150.jpg"
            alt=""
          />
        )}
      </div>
      <div className="max-w-[80%] flex flex-col items-end gap-[10px]">
        <p
          className={`${
            message.senderId !== currentUser.uid
              ? "bg-white"
              : "bg-purple-600 text-white"
          } px-3 py-1 rounded-2xl`}
        >
          {message.text}
        </p>
      </div>
    </div>
  );
};
