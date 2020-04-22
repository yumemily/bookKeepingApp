const User = require("../models/user")

const jwt = require("jsonwebtoken")

exports.login = async function (req,res){
    const { email, password } = req.body;
    //use email to find the correct user or document

    try{
        const user = await User.loginWithCredentials(email, password)
        //generate token for that user
        const token = await user.generateToken() // 
        return res.status(200).json({status: "ok", data:token })
    }catch (err){
        return res.status(400).json({status:"fail", error: err.message})
    }
}

exports.auth = async (req, res, next) => {
    // make sure we get the token
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer"))
      return res.status(401).json({ status: "fail", message: "Unauthorized" });
  
    // verify token  
    const token = req.headers.authorization.replace("Bearer ", "");
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      // find User with token 
      const user = await User.findOne({ _id: decoded.id, tokens: token });
      if (!user) throw new Error("Unauthorized");
  
      // attach user object to req object
      req.user = user;
    } catch (err) {
      return res.status(401).json({ status: "fail", message: err.message });
    };
    next();
  };

  exports.logout = async function (req, res) {
    try {
      const token = req.headers.authorization.replace("Bearer ", "");
      req.user.tokens = req.user.tokens.filter(el => el !== token);
      await req.user.save();
      res.status(204).json({ status: "logged out success", data: null });
    } catch (err) {
      res.status(401).json({ status: "logged out fail", message: err.message });
    };
  }


  exports.logoutAll = async function (req, res) {
    try {
      const token = req.headers.authorization.replace("Bearer ", "");
      req.user.tokens = []
      await req.user.save();
      res.status(204).json({ status: "logged out success", data: null });
    } catch (err) {
      res.status(401).json({ status: "logged out fail", message: err.message });
    };
  }
  