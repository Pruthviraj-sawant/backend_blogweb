



const Post=require("../model/postmodel");
const Comment=require("../model/commentmodel");
exports.dummycomment = async (req, res) => {
    try {
      // Log request body
      console.log("Request Body:", req.body);
  
      const { post, user, body } = req.body;
  
      // Create a new comment object
      const comment = new Comment({
        post,
        user,
        body
      });
  
      console.log("Comment Data:", comment);
  
      // Save the comment to the database
      const savedcomment = await comment.save();
  
      // Log saved comment
      console.log("Saved Comment:", savedcomment);
  
      // Update the post to include the new comment in the comments array
      const updatedPost = await Post.findByIdAndUpdate(
        post,
        { $push: { comments: savedcomment._id } },
        { new: true }
      )
        .populate('comments')
        .exec();
  
      // Log updated post
      console.log("Updated Post:", updatedPost);
  
      // Send response with the updated post and its comments
      res.json({
        post: updatedPost
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal server error"
      });
    }
  };
  