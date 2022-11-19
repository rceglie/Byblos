import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Token from "../models/token.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";


export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        let existingUser = await User.find({ email: email });

        if (existingUser.length == 0){
            return res.status(404).json({ message: "Invalid credentials" })
        } else {
            existingUser = existingUser[0];
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" })

        // if (!existingUser.verified) {
        //     console.log("not verify")
		// 	let token = await Token.findOne({ userId: existingUser._id });
        //     console.log(token);
		// 	if (!token) { // If token for user does not exist, create new one
		// 		token = await new Token({
		// 			userId: existingUser._id,
		// 			token: crypto.randomBytes(32).toString("hex"),
		// 		}).save();
        //     }
        //     // Then send email
		// 	const url = `${process.env.BASE_URL}users/${existingUser._id}/verify/${token.token}`;
		// 	await sendEmail(existingUser.email, "Verify Email", url);

		// 	return res
		// 		.status(400)
		// 		.send({ message: "An email was sent to your account to verify." });
		// }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '6hr' })

        res.status(200).json({ message: "SUCCESS", _id: existingUser._id, displayName: existingUser.name, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const signup = async (req, res) => {
    console.log("here");
    const { email, password, displayName } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(404).json({ message: "User already exists." })

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${displayName}` })

        // const authtoken = await Token.create({
        //     userId: result._id,
        //     token: crypto.randomBytes(32).toString("hex")
        // })
        // console.log(authtoken)
        // const url = `${process.env.BASE_URL}users/${authtoken.userId}/verify/${authtoken.token}`;
        // console.log(url)
		// await sendEmail(result.email, "Verify Email", url);

        let newUser = await User.find({ email: email });
        newUser = newUser[0];

        console.log(newUser)

        const token = jwt.sign({ email: newUser.email, id: newUser.id }, 'test', { expiresIn: '6hr' })
        res.status(200).json({ message: "SUCCESS", _id: newUser._id, displayName: newUser.name, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const verify = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
        console.log('Token:');
        console.log(req.params.token)
        console.log(token);
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({ _id: user._id }, { verified: true });
		await Token.deleteOne({ token: req.params.token});

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
        console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
}

export const getInfo = async (req, res) => {
    console.log("here");
    try {
        const id = req.params.id;
        console.log(id)
        const result = await User.find({ _id: id });
        console.log(result.length)
        res.status(200).send(result)
    } catch (e) {
        //console.log(e)
        res.status(500).send({message: "Internal Server Error"})
    }
}