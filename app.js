import express from 'express';
import env from 'dotenv';
import cors from 'cors';
import usersRouter from './routes/usersRoute.js';
import authRouter from './routes/authRoute.js';
import moviesRouter from './routes/moviesRoute.js';

env.config();
const app = express();
app.use(cors());

const port = process.env.SERVER_PORT;
app.use(express.json());

app.use('/auth',authRouter);
app.use('/users',usersRouter);
app.use('/movies',moviesRouter);

app.use('/',(req,res)=>{
    res.send("ramans app is working...")
});

app.listen(port,()=>{
    console.log(`serving is running on port:${port}`);
});