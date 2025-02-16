import jwt from "jsonwebtoken";

import { db } from "../db/connect.js";

export const getRelationships = (req, res) => {
  const query =
    "SELECT followerUserId FROM relationship WHERE followedUserId = ? ";

  db.query(query, [req.query.followedUserId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res
      .status(200)
      .json(data.map((relationship) => relationship.followerUserId));
  });
};

export const getFollowed = (req, res) => {
  const query =
    "SELECT followedUserId FROM relationship WHERE followerUserId = ? ";

  db.query(query, [req.query.followerUserId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res
      .status(200)
      .json(data.map((relationship) => relationship.followedUserId));
  });
};

export const addRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const query =
      "INSERT INTO relationship (`followerUserId`,`followedUserId`) VALUES (?) ";

    const values = [userInfo.id, req.body.userId];

    db.query(query, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User is Followed");
    });
  });
};

export const deleteRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const query =
      "DELETE FROM relationship WHERE `followerUserId` = ? AND `followedUserId` = ? ";

    db.query(query, [userInfo.id, req.query.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User is Followed");
    });
  });
};
