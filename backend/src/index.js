import express from 'express';
import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
	connectDB();
	console.log('env', process.env.PORT);
});
