import { json } from 'express';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/util.js';

export const signup = async (req, res) => {
	const { fullName, email, password } = req.body;
	try {
		if (!fullName || !email || !password) {
			return res.status(400).json({
				message: 'All fields are required',
			});
		}
		if (password.length < 8) {
			return res
				.status(400)
				.json({ message: 'Password must be at least 8 character' });
		}
		const user = await User.findOne({ email });

		if (user) return res.status(400).json({ message: 'User already exist' });

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			fullName,
			email,
			password,
		});

		if (newUser) {
			generateToken(newUser._id, res);
			console.log('before saving');
			await newUser.save();
			console.log('after saving');
			res.status(201).json({
				id: newUser._id,
				email: newUser.email,
				profilePIc: newUser.profilePic,
			});
		} else {
			res.status(400).json({ message: 'invalid user Data' });
		}
	} catch (error) {
		console.log('Error in signup controller', error.message);
	}
};

export const login = (req, res) => {
	res.send('Sign up Page');
};

export const logout = (req, res) => {
	res.send('Sign up Page');
};
