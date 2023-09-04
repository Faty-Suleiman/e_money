const models = require("../models");
const { Op, where } = require("sequelize");
const { validateSignup, validateLogin } = require("../validations/index");
const {
  generateToken,
  authentication,
} = require("../middleWares/authentication");
const {
  hashPassword,
  comparePassword,
  generateOtp,
  validatePhone,
} = require("../utils/helpers");
const { v4: uuidv4 } = require("uuid");
const user = require("../models/user");
const signUp = async (req, res) => {
  const { surname, othernames, email, password, phone } = req.body;
  try {
    const { error } = validateSignup(req.body);
    if (error !== undefined) { 
      res.status(400).send(error.details[0].message);
    }
    const user = await models.User.findOne({

      where: { [Op.or]: { email: email } },
    });
    if (user) {
      res.status(400).send("user already exist");
    }
    const { hash, salt } = await hashPassword(password);
    console.log(hash, salt)
    const newUser = await models.User.create({
      user_id: uuidv4(),
      surname,
      othernames,
      email,
      passwordHash: hash,
      passwordSalt: salt,
      phone,
    });

    console.log(newUser.json());
    await models.Wallet.create({
      wallet_id: uuidv4(),
      user_id: user,
    });
    // credit(200, user_id, `Wallet funding for sighup credit `);
    const otp = generateOtp(4);
    const insertData = {
      otp_id: uuidv4(),
      email_or_phone: email,
      otp: otp,
    };
    await models.Otp.create(insertData);
    // sendEmail(email, "OTP", `Hey ${surname}, your otp is ${otp}`);
    res.status(201).send("User successfully created"), newUser;
  } catch (error) {
    res.status(500).send(error.message || "User failed to be created");
  }
};

//   const verifyUserAccount = async(req, res) => {
//     const {email, phone} = req.body
//     if(!email || !phone) {
//     return res.status(400).send('Invalid credentials')}
//        try{
//     const otpData = await models.Otp.findOne({
//       email_or_phone: email, otp_type, otp})
//   if(!otpData) throw new error('ssssss')
//   console.log('error')
//   await models.User.update({where:{email:email}, isOtpVerified: true})
//   await models.Otp.destroy({where: {email:email, otp_type}})
//   res.status(200).send('Account successfully verified')
//   } catch (error) {res.status(500).send('') || error.message}
//   }

// const getUserDetails = async(req, res) => {
//   const {user_id} = req.params
//   if(!user_id) throw new error('')
//   try{
//   const user = await models.User.findOne({
// attributes: ['username', 'firstname', 'phone'],
// where: {email: email}})
// if(!user) throw new error('')
// res.status(200).send('')
//   }catch (error) {res.status(500).send('User deatils retrieved successfully') || error.message}}

//   updateUserProfile = async(req, res) => {
//     const {user_id} = req.params
//     if(!user_id) throw new error('')
//     const error = validateUserProfile.req.body
//   if(error !== undefined){return res.status(400).send('bad request')}
//   try{
//     await models.User.update(req.body, {where: {user_id: user_id}})
//     res.status(200).send('User updated successfully')
//   }catch (error) {res.status(500).send('User deatils retrieved successfully') || error.message}}

const login = async(req, res) => {
  try{
    const { error } = validateLogin(req.body);
    if (error !== undefined) {
      res.status(400).send(error.details[0].message)};
const {email, password} = req.body
if(!email || !password){res.status(400).send('Access denied')}
const user = await models.User.findOne({where:{email: email}})
console.log(user)
  if(user === null){return res.status(400).send('User not found')}
  const dataPayLoad = {email: user.email,_id: uuidv4()}
  const checkPassword = await comparePassword(password, user.passwordHash)
  if(!checkPassword.isOtpVerified){return res.status(401).send('Access denied')}
  const token = await jwt.verify(dataPayLoad,process.env.JWT_SCERET, {expired: '1h'})
  console.log(token, 'im here!')
  res.status(200).send({message:'user successfully logged in', user_id, email, token})
} catch (error){res.status(500).send( error.message || 'Failed')}}

// //wallet
// // const credit = async(amount_passed, user_id, comment) => {
// //   const amount = Number(amount_passed)
// //   const userDetails = await getUserInfo(user_id)
// //   const initialBalance = Number(userDetails.amount_after)
// //   const newBalance = Number(initialBalance + amount)
// //   await updateWallet (user_id, initialBalance, newBalance)
// //   transaction(TransactionTypeEnum.CREDIT,comments,amount,userDetails.user_id,TransactionStatusEnum.SUCCESS);
// //   return;
// // }
// // const debit = async (amount_passed, user_id, comment) => {
// //   const amount = Number(amount_passed);
// //   const userDetails = await getUserInfo(user_id);
// //   const initialBalance = Number(userDetails.amount_after);
// //   if(initialBalance < amount) return false
// //   const newBalance = Number(initialBalance - amount);
// //   await updateWallet(user_id, initialBalance, newBalance);
// //   transaction(TransactionTypeEnum.DEBIT,comments,amount,userDetails.use r_id,TransactionStatusEnum.SUCCESS);
// //   return true
// // };

// const userBalance = async(req, res) => {
//   const {user_id} = req.params
//   if(!user_id) throw new error('User does not exist')
//   try{
//   const getUserBalance = await models.Users.findOne({where:{user_id: user_id}})
//   if(!getUserBalance){return res.status(401).send('User balance failed to be retrieved')}
//   res.status(200).send('User balance retrieved successfully')}
//   catch (error) { res.status(500).send('internal error')}}

//  const credit = async(req, res) => {
//   const {user_id} = req.params
//   if(!user_id) throw new error('User does not exist')
//   try{
//     const amount = Math.abs(Number(amount));
//     const user = await models.User.findOne({ where: { user_id: user_id } });
//     if (!user) throw new error("User not found");
//     const initialBalance = (user.getUserBalance);
//     const newBalance = initialBalance + amount
//     await updateWallet(user_id, initialBalance, newBalance);
//     transaction(TransactionTypeEnum.CREDIT, amount, user.user_id,TransactionStatusEnum.SUCCESS );
//     res.status(200).send("Account credited successfully")}
//      catch (error) {res.status(500).send('Account failed to be credited' || error.message)}}

//   const debit = async(req, res) => {
//     const {user_id} = req.params
//     if(!user_id) throw new error('User does not exist')
//     try{
//      const amount = Math.abs(Number(amount));
//      const user = await models.Users.findOne({where:{user_id:user_id}})
//     if(!user) throw new error("User not found")
//     const initialBalance = (user.getUserBalance)
//     if(initialBalance < amount) return ('Insufficient balance')
//     const newBalance = initialBalance - amount
//     await updateWallet(user_id, initialBalance, newBalance)
//     res.status(200).send('Account debbited successfully')}
//      catch{res.status(500).send('Account failed to be debited' || error.message)}
//   }

//   const updateWallet = (user_id, amount) => {
//    return models.Wallet.update({amount}, {where:{user_id: user_id}})}

//    const startWalletFunding = async (req, res) => {
//     const {email, amount} = req.body
//     if(!email || !amount)
//     return res.status(400).send('Amount and email are reqiured')
//    const initialiseTransaction  = await startPayment(amount, email)
//     delete initialiseTransaction.data.data.access_code
//     res.status(200).json({status: true, message: "Transaction initialized successfully",
//     data: initialiseTransaction.data.data})}
//   // const transaction = async(req, res) => {
//   //   const {receiver, sender, amount} = req.body
//   //   const senderUser = await models.Users.findOne({wdhere:{user_id:sender}})
//   //   const receiverUser = await models.Users.findOne({where: { user_id: receiver }});
//   //   if(senderUser && receiverUser){
//   //     if(senderUser.getUserBalance >= amount){
//   //       senderUser.getUserBalance -=amount;
//   //       receiverUser.user +=amount;
//   //       res.status(200).send('Transaction successfull')
//   //     } else {res.status(400).send("Insuficient balance")}
//   //   }else {res.status(404).send("User not found" || error.message)}
//   // }

// module.exports = { signUp, login , userBalance,credit,debit, transaction};
module.exports = { signUp, login };
