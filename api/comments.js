const express = require("express");
const commentsRouter = express.Router();
const {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} = require("../db/index");

//get all comments
commentsRouter.get("/", async (req, res, next) => {
  try {
    const comments = await getAllComments();
    res.send({ comments });
  } catch (error) {
    next(error);
  }
});

//get comment by ID
commentsRouter.get("/:commentId", async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await getCommentById(commentId);
    if (comment) {
      res.send({ comment });
    } else {
      next({
        name: "CommentNotFoundError",
        message: "Comment not found",
      });
    }
  } catch (error) {
    next(error);
  }
});

//post new comment
commentsRouter.post("/", async (req, res, next) => {
  try {
    const { user_id, review_id, comment_text } = req.body;
    const newComment = await createComment({
      user_id,
      review_id,
      comment_text,
    });
    res.send({ message: "Comment created", newComment });
  } catch (error) {
    next(error);
  }
});

//patch comment
commentsRouter.patch("/:commentId", async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { comment_text } = req.body;
    const updatedComment = await updateComment(commentId, {
      comment_text,
    });
    res.send({ message: "Comment updated", updatedComment });
  } catch (error) {
    next(error);
  }
});

//delete comment
commentsRouter.delete("/:commentId", async (req, res, next) => {
  try {
    const { commentId } = req.params;
    await deleteComment(commentId);
    res.send({ message: "Comment deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = commentsRouter;
