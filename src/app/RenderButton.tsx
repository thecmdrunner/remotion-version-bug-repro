"use client";

import React, { useState } from "react";

const RenderButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [renderId, setRenderId] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);

  const handleOnClick = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch("/api/render", {});

      console.log(`Finished res with: `, res.status);

      if (res.status === 200) {
        const { renderId } = await res.json();
        setRenderId(renderId);
      } else {
        console.log(`Error: ${res.status}`, res.statusText);
        const error = await res.text();
        console.log(error);
        throw new Error(error);
      }
    } catch (err) {
      console.error(err);
      setError((err as Error).message || (err as Error).toString());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="flex aspect-square items-center justify-center rounded-full bg-black p-3 text-white sm:aspect-auto sm:w-[8rem] sm:px-5 sm:py-2"
        onClick={handleOnClick}
        disabled={isLoading}
      >
        {isLoading ? "Rendering..." : "Render"}
      </button>

      {renderId && (
        <div className="border-2 flex items-center gap-3 border-green-500 p-3 text-black">
          <span>Render successful with Render ID:</span>
          <code>{renderId}</code>
        </div>
      )}

      {error && (
        <div className="border-2 border-red-500 p-3 text-black">{error}</div>
      )}
    </>
  );
};

export default RenderButton;
