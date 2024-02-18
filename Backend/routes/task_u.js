const express = require("express");
const router = express.Router();
const authController = require("../controllers/task_u");

router.post("/login", authController.Login);

router.post("/register", authController.Register);

router.post("/forget", authController.ForgetPassword);

router.put("/changePass", authController.changePassword);

router.post("/createProject", authController.createProject);

router.delete("/delete", authController.deleteProject);

router.post("/like", authController.Like);

router.post("/dislike", authController.DisLike);

router.post("/feedback", authController.Feedback);

router.put("/comment", authController.Comment);

router.post("/logout", authController.Logout);

router.post("/createChannel", authController.createChannel);

router.post("/talk", authController.Talk);

router.delete("/deleteChannel", authController.deleteChannel);

router.delete(
  "/projects/:projectId/comments/:commentId",
  authController.deleteComment
);

router.delete("/channels/:channelId/talks/:talkId", authController.deleteTalk);

router.post("/join", authController.joinChannel);

module.exports = router;
