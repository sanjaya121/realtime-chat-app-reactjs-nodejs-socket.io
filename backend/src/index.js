import express from 'express';
import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';
import dotenv from 'dotenv';
const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
	connectDB();
	console.log('env', process.env.PORT);
});
