import { useQuery } from "@tanstack/react-query";

import { makeRequest } from "../utils";
import { PostProps } from "../types";
import Post from "./Post";

export default function Posts({ userId }: { userId: string | number }) {
  //* Fetching data from endpoint
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await makeRequest.get(`/posts?userId=${userId}`);
      return res.data;
    },
  });

  return (
    <div className="flex flex-col gap-[50px]">
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((post: PostProps) => <Post post={post} key={post.id} />)}
    </div>
  );
}
