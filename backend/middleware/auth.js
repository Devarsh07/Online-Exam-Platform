// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
    
//     const authHeader = req.header("Authorization");
//     //console.log(authHeader);
    

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ msg: "No token, authorization denied" });
//     }

//     //console.log("Its okay");
//     let jsonString = authHeader.split(" ")[1]; 

//     // Parse the JSON string
//     let dataObj = JSON.parse(jsonString); 

//     //console.log(dataObj);

//     // Extract token
//     const token = dataObj.token;
//     //console.log(token);

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; 
//         next(); 
//     } catch (error) {
//         res.status(401).json({ msg: "Invalid token" });
//     }
// };


const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1]; // This is the raw JWT

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Invalid token" });
    }
};
