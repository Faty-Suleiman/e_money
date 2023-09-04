const {Op, UUID, UUIDV1} = require('sequelize')

const User = require('../20230804093953-create-user')
const {uuidv4} = require('uuidv4')


const register = async(req, res)=> {
const {surname, othernames, email, password, phone } = req.body
try{
const error = validateUser(req.body)
if(error !== undefined){
    res.send('Acess denied')
}
const user = await models.Users.findOne({
  where: {
    [Op.or]: { email: email },
  },
});
  if(user) {
    res.send("user already exist")
  }
const {hash, salt} = await hashPassword(password)
const newUser = await models.Users.create({
    user_id: uuidv4(),
    surname,
    othernames,
    email,
    password,
    phone
})
res.send('User successfully created')
} catch (error) {
    res.send('User failed to be created')
}

}


module.exports = {register}