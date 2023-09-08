require("dotenv").config();

const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const models = require("../models");
const { Op } = require("sequelize");
const { validateSignup, validateLogin } = require("../validations/index");
const {
  hashPassword,
  comparePassword,
  generateOtp,
} = require("../utils/helpers");

const signUp = async (req, res) => {
  const { surname, othernames, email, password, phone, dob, nin } = req.body;
  try {
    const { error } = validateSignup(req.body);
    if (error !== undefined) throw new Error(error.details[0].message);
    const user = await models.User.findOne({
      where: { [Op.or]: { email: email } },
    });
    if (user) throw new Error("user already exist");
    const { hash, salt } = await hashPassword(password);
    const user_id = uuidv4(); // i kept the user_id variable here because it is also needed in th wallet table
    const newUser = await models.User.create({
      user_id: user_id, //see info at declaration
      surname,
      othernames,
      email,
      password_hash: hash, //used password_hash in your db you used passwordHash
      password_salt: salt, // used password_salt in your db you used passwordSalt
      phone,
      dob,
      nin,
    });

    await models.Wallet.create({
      wallet_id: uuidv4(),
      user_id: user_id,
      transaction_id: uuidv4(), //transaction_id is required and you did not pass it
    });
    // credit(200, user_id, `Wallet funding for sighup credit `);
    const otp = generateOtp(4);

    await models.Otp.create({
      otp_id: uuidv4(),
      email_or_phone: email,
      otp: otp,
    });
    // sendEmail(email, "OTP", `Hey ${surname}, your otp is ${otp}`);
    res.status(201).json({
      status: true,
      message: "User successfully created",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || "User failed to be created",
    });
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

const getUserDetails = async(req, res) => {
  const {user_id} = req.params
  if(!user_id) throw new error('User doent exist')
  try{
  const user = await models.User.findOne({
attributes: ['username', 'firstname', 'phone'],
where: {email: email}})
if(!user) throw new error('User failed')
res.status(200).json({
  status: true,
  message: "User's deatils retrieved successfully",
  user
});
  }catch (error) {res.status(500).json({
    status: false,
    message:  error.message || "User's details failed "})}}
//   updateUserProfile = async(req, res) => {
//     const {user_id} = req.params
//     if(!user_id) throw new error('')
//     const error = validateUserProfile.req.body
//   if(error !== undefined){return res.status(400).send('bad request')}
//   try{
//     await models.User.update(req.body, {where: {user_id: user_id}})
//     res.status(200).send('User updated successfully')
//   }catch (error) {res.status(500).send('User deatils retrieved successfully') || error.message}}

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = validateLogin(req.body);
    if (error !== undefined) throw new Error(error.details[0].message);
    const user = await models.User.findOne({ where: { email: email } });
    console.log(user.dataValues);
    if (user === null) throw new Error("User not found");
    const dataPayLoad = {
      email: user.email,
      _id: uuidv4(),
    };
    const checkPassword = await comparePassword(password, user.password_hash);
    if (!checkPassword) throw new Error(" invalid credentials");
    //if (!checkPassword.isOtpVerified) throw new Error("Access denied"); you dont have isOtpVerified on your user's table
    const token = await jwt.sign(dataPayLoad, process.env.JWT_SCERET, {
      //jwt.sign not jwt.verify
      expiresIn: "1h", //not  expired: "1h",
    });
    // console.log(process.env.JWT_SCERET);
    res.status(200).json({
      status: true,
      message: "user successfully logged in",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message || "User failed to be created",
    });
  }
};

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
module.exports = { signUp, login, getUserDetails };
