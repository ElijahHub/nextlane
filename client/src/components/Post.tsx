import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import moment from "moment";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { DarkModeContext } from "../context/darkMode.context";
import { AuthContext } from "../context/auth.context";
import { makeRequest } from "../utils";
import { postStyle } from "../styles";
import { PostProps } from "../types";
import Comments from "./Comments";

export default function Post({ post }: { post: PostProps }) {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  //* Calling use context
  const authContext = useContext(AuthContext);
  const darkContext = useContext(DarkModeContext);

  //* Query for Liking a post and UnLiking a post
  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, any>({
    mutationFn: async (liked: Boolean) => {
      if (liked) return await makeRequest.delete(`/likes?postId=${post.id}`);
      return await makeRequest.post("/likes", { postId: post.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes"] });
    },
  });

  const deleteMutation = useMutation<void, Error, any>({
    mutationFn: async (postId) => {
      return await makeRequest.delete(`/posts/${postId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  //* Fetching like data from endpoints
  const { isLoading, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: async () => {
      const res = await makeRequest.get(`/likes?postId=${post.id}`);
      return res.data;
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  const handleLike = () => {
    mutation.mutate(data?.includes(authContext?.currentUser?.id));
  };

  return (
    <div className={postStyle(darkContext?.darkMode)}>
      <div className="p-[20px]">
        <div className=" relative flex items-center justify-between ">
          <div className="flex gap-[20px]">
            <img
              src={`/upload/${post.profile_pic}`}
              alt=""
              className="w-[40px] h-[40px] rounded-[50%] object-cover "
            />
            <div className="flex flex-col">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="font-medium uppercase">{post.name}</span>
              </Link>
              <span className="text-[12px]">
                {" "}
                {moment(post.createdAt).fromNow()}{" "}
              </span>
            </div>
          </div>
          <MoreHorizIcon
            onClick={() => setMenuOpen(!menuOpen)}
            className="cursor-pointer"
          />
          {authContext &&
            menuOpen &&
            post.userId === authContext?.currentUser?.id && (
              <button
                onClick={handleDelete}
                className="absolute top-[30px] right-0 border-none bg-[#f0544f] p-[5px] cursor-pointer text-white "
              >
                delete
              </button>
            )}
        </div>
        <div className="my-[20px] ">
          <p>{post.desc}</p>
          <img
            src={`/upload/${post.img}`}
            alt=""
            className="w-full max-h-[500px] object-cover mt-[20px] "
          />
        </div>
        <div className="flex items-center gap-[20px]">
          <div className="flex items-center gap-[10px] cursor-pointer text-[14px]">
            {isLoading ? (
              "loading"
            ) : data?.includes(authContext?.currentUser?.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data?.length} Likes
          </div>
          <div
            className="flex items-center gap-[10px] cursor-pointer text-[14px]"
            onClick={() => setCommentOpen(!commentOpen)}
          >
            <TextsmsOutlinedIcon />
            See Comments
          </div>
          <div className="flex items-center gap-[10px] cursor-pointer text-[14px] ">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
}
