import jwt from "jsonwebtoken";
import moment from "moment";

import { db } from "../db/connect.js";

export const getComments = (req, res) => {
  const query = `SELECT c.*, u.id AS userId, username, profile_pic FROM comments AS c JOIN users AS u ON (u.id = c.userId)  WHERE c.postId = ?  ORDER BY c.createdAt DESC `;

  db.query(query, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addComment = (req, res) => {
  // Checking if user is logged in
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  //Verifying the identity of the user and the accessToken
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const query =
      "INSERT INTO comments (`desc`, `createdAt`, `userId`, `postId`) VALUES (?) ";

    const values = [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postId,
    ];

    db.query(query, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment as been created ");
    });
  });
};
