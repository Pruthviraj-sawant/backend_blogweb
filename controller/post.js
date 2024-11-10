const Post=require("../model/postmodel");

exports.dummypost = async (req, res) => {
    try {
      // Log request body
      console.log("Request Body:", req.body);
  
      const { title, body } = req.body;
  
      // Create a new comment object
      const post = new Post({
        title,
        body
      });
  
      console.log("post Data:", post);
  
      // Save the post to the database
      const savedpost = await post.save();
  
      // Log saved post
      console.log("Saved post:", savedpost);


      res.json({
        post: savedpost,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal server error"
      });
    }
  };
  
  exports.getallpost = async(req,res) =>{
    try{
             const posts= await Post.find().populate("comments").exec();
             res.json({
                post: posts,
              });
    }
    catch(error){
        console.error(error);
        res.status(500).json({
          error: "Internal server error"
        });
    }
  }