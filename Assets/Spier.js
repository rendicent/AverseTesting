import React from "react";

function Spier() {
  return (
    <div>
      <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
        <div className="border-t-transparent border-solid animate-spin  rounded-full border-teal-500 border-8 h-32 w-32"></div>
      </div>
      <div className="flex flex-auto justify-center items-center text-3xl bold">Loading.......Waiting to complete</div>
    </div>
  );
}

export default Spier;
