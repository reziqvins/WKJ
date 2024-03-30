import React from "react";
import { Doctor, heroImg } from "../../assets";

function Layanan2() {
  return (
    <div className="w-full bg-white p-20">
      <div className="md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px] ">
        <img
          src={Doctor}
          className="md:order-first order-last w-[350px] mx-auto"
        />
        <div className="flex flex-col justify-start">
          <p className="font-">What is Lorem Ipsum?</p>
          <h1 className="text-[32px]">
            Lorem Ipsum is simply dummy text of the printing
          </h1>
          <p className="leading-7">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Layanan2;
