import express from 'express';
import { json } from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import { handleRegister } from './controllers/register';
import { handleSignin } from './controllers/signin';
import { handleProfile } from './controllers/profile';
import { handleImage, handleApiCall } from './controllers/image';

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_URL,
        ssl: true,
    }
});

const app = express();
app.use(json());
app.use(cors());

app.get('/', (req, res) => { res.send("it worked!") })

app.post('/signin', handleSignin(db, bcrypt))
app.post('/register', handleRegister(db, bcrypt))
app.get('/profile/:id', handleProfile(db))
app.put('/image', handleImage(db))
app.post('/imageurl', (req, res) => { handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () =>{
    console.log(`app is running on port ${process.env.PORT}`);
})








