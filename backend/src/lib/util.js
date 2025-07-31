import jwt from 'jsonwebtoken';
export const generateToken = (userid, res) => {
	const token = jwt.sign({ userid }, process.env.JWT_SECRET, {
		expiresIn: '7d',
	});

	res.cookie('Jwt', token, {
		maxAge: 7 * 24 * 60 * 60 * 1000, //Milli seconds only
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV !== 'development',
	});
	return token;
};
