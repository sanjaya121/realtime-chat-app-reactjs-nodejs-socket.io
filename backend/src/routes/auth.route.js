import express from 'express';

const router = express.Router();

router.get('/signup', (req, res) => {
	res.send('Sign up  Page');
});
router.get('/login', (req, res) => {
	res.send('Login  Page');
});
router.post('/logout', (req, res) => {
	// Handle login logic here
	res.send('Logout successful');
});

export default router;
