import { json } from 'express';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/util.js';
import second from '../lib/cloudinary.js';
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
			password: hashedPassword,
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

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ message: 'Invalid credential' });
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(400).json({ message: 'Invalid Credential' });
		}
		generateToken(user._id, res);
		res.status(200).json({
			id: user._id,
			fullName: user.fullName,
			email: user.email,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log('Error inlogging in', error);
		res.status(500).json({
			message: 'Internal server error',
		});
	}
};

export const logout = async (req, res) => {
	try {
		res.cookie('jwt', {
			maxAge: 0,
		});
		res.status(200).json({
			message: 'logged out successfully',
		});
	} catch (error) {
		res.status(500).json({
			message: 'Internal server error',
		});
	}
};

export const updateProfile = async (req, res) => {
	try {
		const { profilePic } = req.body;
		const userID = req.user._id;

		if (!profilePic) {
			return res.status(400).json({ message: 'Profile pic is required' });
		}
		const uploadResponse = await cloudinary.uploder.upload(profilePic);
		const updatedUser = await User.findByIdAndUpdate(
			userID,
			{ profilePic: uploadResponse.secure_url },
			{ new: true }
		);
		res.status(200).json(updatedUser);
	} catch (error) {
		console.log('Error in updating User');
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const checkAuth = (req, res) => {
	try {
		res.status(200).json(req.user);
	} catch (error) {
		console.log('Error in check AuthControler', error.message);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};
