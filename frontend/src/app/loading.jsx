"use client";

import React from "react";
import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="flex flex-col items-center justify-center">
        <HashLoader size={55} color="#00008b" />
      </div>
    </div>
  );
};

export default Loading;