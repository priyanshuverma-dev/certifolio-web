import { features } from "@/lib/constants";
import React from "react";

export default function Features() {
  return (
    <section>
      <h2 className="text-3xl font-bold text-center mt-20">Features</h2>
      <div
        className="
          flex
          items-start
          justify-start
          w-full
          flex-wrap
          my-6
          lg:justify-around
          lg:mt-20

        "
      >
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex items-start p-4 flex-col border-2 w-full  mx-4 rounded-sm mt-6 lg:w-[30%]"
          >
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              {feature.name}
            </h2>
            <p className="leading-7 mt-6 lg:w-[60%]">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
