"use client";
import useSWR, { useSWRConfig } from "swr";
import { SWRProvider } from "./swr-provider";

interface DogsApiResponse {
  url: string;
  isLiked: boolean;
}

const fetcher = (url: string) => {
  return fetch(url).then((response) => response.json());
};

const DOGS_URL = "https://dogs-api.nomadcoders.workers.dev";

export default function Home() {
  const { data, isLoading } = useSWR<DogsApiResponse>(DOGS_URL, fetcher);
  const { mutate } = useSWRConfig();

  const onNewDogClick = () => {
    mutate(DOGS_URL);
  };

  const onLikeClick = () => {
    mutate(
      DOGS_URL,
      (prev: any) => ({
        ...prev,
        isLiked: !prev.isLiked,
      }),
      false
    );
  };

  return (
    <SWRProvider>
      <div className="absolute left-0 right-0 w-full max-w-2xl mx-auto my-0">
        <h1 className="mt-10 text-2xl font-bold">Woof.tv</h1>
        <div className="p-5 mt-10 rounded-sm bg-[#131B21]">
          <div className="flex items-center justify-center w-full pb-2 h-80">
            {data?.url && !isLoading ? (
              <video className="h-full" src={data?.url} autoPlay muted loop />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="w-5 h-5 rotate-45 bg-red-300"></div>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              className="w-full py-2 text-sm text-black bg-white rounded-sm hover:bg-slate-200"
              onClick={onNewDogClick}
            >
              New Dog!
            </button>
            <button
              className="w-full py-2 text-sm rounded-sm bg-sky-700 hover:bg-sky-800"
              onClick={onLikeClick}
            >
              {data?.isLiked ? "Unlike" : "Like"}
            </button>
          </div>
        </div>
      </div>
    </SWRProvider>
  );
}
