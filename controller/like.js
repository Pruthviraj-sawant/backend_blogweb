
const Post=require("../model/postmodel");
const Like=require("../model/likemodel");
exports.dummylink = async (req, res) => {
    try {
      // Log request body
      console.log("Request Body:", req.body);
  
      const { post, user } = req.body;
  
      // Create a new comment object
      const like = new Like({
        post,
        user,
      });
  
      console.log("like Data:", like);
  
      // Save the comment to the database
      const savedlike = await like.save();
  
      // Log saved comment
      console.log("Saved like:", savedlike);
  
      // Update the post to include the new comment in the comments array
      const updatedPost = await Post.findByIdAndUpdate(
        post,
        { $push: { likes: savedlike._id } },
        { new: true }
      )
        .populate('likes')
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


  exports.dummyunlink = async (req, res) => {
    try {
      // Log request body
      console.log("Request Body:", req.body);
  
      const { post, like } = req.body;
  
      // Find and delete the like from the Like model
      const deletelike = await Like.findOneAndDelete({ post: post, _id: like });
  
      // If the like doesn't exist, send a 404 error
      if (!deletelike) {
        return res.status(404).json({
          error: "Like not found for this post"
        });
      }
  
      // Update the post to remove the like from the 'likes' array
      const updatedPost = await Post.findByIdAndUpdate(
        post,
        { $pull: { likes: deletelike._id } },
        { new: true }
      );
  
      // If the post is not found, return an error
      if (!updatedPost) {
        return res.status(404).json({
          error: "Post not found"
        });
      }
  
      // Return the updated post
      res.json({
        post: updatedPost,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal server error"
      });
    }
  };
  
  