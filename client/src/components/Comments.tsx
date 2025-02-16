import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";

import { AuthContext } from "../context/auth.context";
import { makeRequest } from "../utils";
import { DarkModeContext } from "../context/darkMode.context";
import { commentStyle } from "../styles";
import { Comment } from "../types";

export default function Comments({ postId }: { postId: number }) {
  const [desc, setDesc] = useState("");

  const authContext = useContext(AuthContext);
  const darkContext = useContext(DarkModeContext);

  //* Getting Custom Styles
  const { img, input, button, p, write, comment, info, date } = commentStyle(
    darkContext?.darkMode
  );

  //* query for sending comment to db
  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, any>({
    mutationFn: async (newComment) => {
      await makeRequest.post("/comments", newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  //* Fetching Comments from db
  const { isLoading, error, data } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await makeRequest.get(`/comments?postId=${postId}`);
      return res.data;
    },
  });

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div>
      <div className={write}>
        <img
          src={`/upload/${authContext?.currentUser?.profile_pic}`}
          className={img}
          alt=""
        />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className={input}
        />
        <button onClick={handleClick} className={button}>
          Send
        </button>
      </div>

      {error
        ? "Something is Wrong"
        : isLoading
        ? "loading"
        : data.map((com: Comment) => (
            <div className={comment}>
              <img src={`/upload/${com.profile_pic}`} alt="" className={img} />
              <div className={info}>
                <span className="font-medium uppercase">{com.username}</span>
                <p className={p}>{com.desc}</p>
              </div>
              <span className={date}>{moment(com.createdAt).fromNow()}</span>
            </div>
          ))}
    </div>
  );
}
