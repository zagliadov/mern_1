import express from 'express';
import mongoose from 'mongoose';
import 'colors';
import morgan from 'morgan';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
import { Post } from './models/post.js';
import { User } from './models/user.js';
import { Role } from './models/Role.js';
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
import './config/index.js';
import { connectDB } from './config/index.js';
import { PORT } from './config/index.js';
import { generateAccessToken } from './generateAccessToken.js';





const app = express();
//config
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.route('/signin')
    .post(async (req, res) => {
        //portal.sid@gmail.com
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!email) {
                return res.status(400).json({ message: 'Такой пользователь не зарегистрирован' });
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json(validPassword)
            }
            const token = generateAccessToken(user._id, user.roles);
            return res.json( user.roles )
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'bad password' })
        }

    })



app.route('/signup')
    .post(async (req, res) => {

        const { firstname, lastname, password, email, sub } = req.body;
        console.log(`1. ${firstname} 2. ${lastname} 3. ${password}`)
        try {
            // const userRole = new Role(); // по дефолту юзер
            // const adminRole = new Role({value: "ADMIN"});
            // await userRole.save();
            // await adminRole.save();
            //>> Проверяем есть ли  пользователь с таким именем
            const candidate = await User.findOne({ firstname });
            if (candidate) {
                return res.status(400).json({ message: 'a user with the same name already exists' })
            }
            const hashPassword = bcrypt.hashSync(password, 4);
            const userRole = await Role.findOne({ value: "USER" })
            const newUser = await new User({
                roles: [userRole.value],
                firstname,
                lastname,
                password: hashPassword,
                email,
                sub,
            })

            await newUser.save();
            res.status(201).json(newUser);

        } catch (error) {
            console.log(error)
        }
    })





//POSTS
app.route('/posts/:scrollPosition')
    .get(async (req, res) => {
        let scroll = +req.params.scrollPosition;
        await Post.find().then((posts) => {
            console.log(posts.length, scroll)
            if (posts.length > scroll + 6) {
                if (scroll == 0) {
                    res.status(200).json((posts.length = 6) ? posts : null)
                } else {
                    res.status(200).json((posts.length = scroll + 6) ? posts : null)
                }
            } else {
                res.status(200).json((posts.length--) ? posts : null)
            }
        });
    });

app.route('/post-update')
    .put(async (req, res) => {
        await Post.findByIdAndUpdate({ _id: req.body.data._id },
            {
                $set: { ...req.body.data }
            },
            {
                new: true
            },
            (err, results) => {
                if (err) {
                    return res.status(422)
                        .json({ message: err })
                }
                return res.status(200).json(results);
            }
        );
    });

app.route('/post/:id')
    .get(async (req, res) => {
        console.log(req.params)
        await Post.findById(req.params.id, (err, advent) => {
            res.status(200).json(advent)
        })
    })
    .delete(async (req, res) => {
        try {
            await Post.findOne({ _id: req.params.id })
                .exec((err, result) => {
                    if (err) return res.status(422).json({ message: 'not found' })
                    result
                        .remove()
                        .then(() => res.status(200).json({ message: 'Success' }))
                        .catch((err) => console.log(err))
                });
        } catch (error) {
            console.log(error)
        }
    });

app.route('/create')
    .post(async (req, res) => {
        const { title, text } = req.body;
        try {
            if (!title.trim() || !text.trim()) {
                return res.status(422).json({ message: 'Error, all fields are required' })
            }
            const newPost = await new Post({ ...req.body })
            await newPost.save();
            res.status(201).json(newPost);
        } catch (error) {
            console.log(error)
        }
    });







connectDB().then(() => app.listen(PORT, (req, res) => {
    console.log(`Server start on http://localhost:${PORT}`.bgMagenta)
}));