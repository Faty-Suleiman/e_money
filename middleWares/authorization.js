// const jwt = require("jsonwebtoken");

// const authourization = (req, res, next) => {
//   const { authourization } = req.headers;
//   try{
//   if (!authourization) {
//     res.status(401).json({
//       status: false,
//       message: "authourization denied",
//     });
//   }
//   const token = authourization.split(" ");
//   jwt.verify(token[1], process.env.SECRET_SALT, 
//     async(error, decoded) => {
//     if (error) {
//       return res.status(401).json({
//         status: false,
//         message: "Unauthorised",
//       });
//     } 
//       return
//     }
//     const UserData = await models.User.findOne({where: {email:decoded.email}})
//     if(UserData == null) throw new error('Unauthorized access')
//     req.params.customerEmail = decoded.email
//   req.params.user_id = UserData.dataValues.user_id
//   next()
//   });
//  } catch (error) {
//     res.status(401).json({
//       status: false,
//       message: error.message || 'Unauthorized Access'
//     })
//     return
//   }


// module.exports = { authourization };
require('dotenv').config();
const jwt = require('jsonwebtoken');
const models = require('../models');

const authorization = (req, res, next) => {

    const { authorization } = req.headers
    try {
        if (!authorization) throw new Error('Unauthorized Access......')
        
        const tokenSplit = authorization.split(" ")
        jwt.verify(tokenSplit[1], process.env.JWT_SECRET,)
            
            async (err, decoded) => {
               
                if (err) {
                    
                    res.status(401).send({
                        status: false,
                        message: 'Unauthorized Acesss'
                            
                    })
                    return
                }
           
            const userData = await models.User.findOne({
                 where: { email: decoded.email } 
                })

            if (userData == null) throw new Error('Unauthorized Access')
           
            req.params.customerEmail = decoded.email
            req.params.user_id = userData.dataValues.user_id
            next()
        }
    } catch (error) {
        res.status(401).send({
            status: false,
            message: error.message || 'Unauthorized Acesss'
                
        })
        return
    }
   

}


module.exports = {
    authorization
}



