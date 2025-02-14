import jwt from "jsonwebtoken";
import moment from "moment";

import { db } from "../db/connect.js";

export const getPosts = (req, res) => {
  const userId = req.query.userId;
  //Checking if login
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  //Verifying user Identity to get the post  of the user
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const query = userId
      ? `SELECT p.*, u.id AS userId, name, profile_pic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC `
      : `SELECT p.*, u.id AS userId, name, profile_pic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationship AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC `;

    const values = userId ? [userId] : [userInfo.id, userInfo.id];

    db.query(query, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const addPost = (req, res) => {
  // Checking if user is logged in
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  //Verifying the identity of the user and the accessToken
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const query =
      "INSERT INTO posts (`desc`,`img`,`createdAt`, `userId`) VALUES (?) ";

    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    db.query(query, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post as been created ");
    });
  });
};

export const deletePost = (req, res) => {
  // Checking if user is logged in
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  //Verifying the identity of the user and the accessToken
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const query = "DELETE FROM posts WHERE `id`=? AND `userId`=?";

    db.query(query, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0)
        return res.status(200).json("Post as been deleted ");
      return res.status(403).json("Unauthorized");
    });
  });
};
