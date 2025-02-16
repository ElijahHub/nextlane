import jwt from "jsonwebtoken";

import { db } from "../db/connect.js";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const query = "SELECT * FROM users WHERE id = ?";

  db.query(query, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (typeof data !== "object") return res.status(404).json("Not found");
    const { password, ...info } = data[0];
    return res.status(200).json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const query =
      "UPDATE users SET `name`=?,`city`=?,`website`=?,`profile_pic`=?,`cover_pic`=? WHERE id=? ";

    db.query(
      query,
      [
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.profile_pic,
        req.body.cover_pic,
        userInfo.id,
      ],
      (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated");
        return res.status(403).json("Unauthorized");
      }
    );
  });
};

export const getUsers = (req, res) => {
  const query = "SELECT id, username, profile_pic FROM users ";

  db.query(query, [], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getFriends = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const query =
      "SELECT username, profile_pic FROM users AS u LEFT JOIN relationship AS r ON (u.id = r.followedUserId) WHERE  r.followerUserId = ?";

    db.query(query, [userInfo.id], (err, data) => {
      if (err) return res.status(403).json(err);
      return res.status(200).json(data);
    });
  });
};
