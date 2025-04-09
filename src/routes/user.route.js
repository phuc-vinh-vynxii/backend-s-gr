import { Router } from 'express';
import db from '../../db.json' with { type: 'json' };
import fs from 'fs';
import path from 'path';
import validateUser from '../middlewares/validate.user.js';

const router = Router();
const dbFilePath = path.resolve('db.json');

router.get('/users', (req, res) => {
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({message:'Error'})
        }
        const users = JSON.parse(data).users;
        return res.status(200).json(users);
    })
})

router.get('/users/:id', (req, res) => {
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({message:'Error'})
        }
        const user = JSON.parse(data).users.find(user => user.id === parseInt(req.params.id));
        if (!user) {
            return res.status(404).json({message: '404 Not Found'});
        }
        return res.status(200).json(user);
    })
})

router.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;
    //ktra xem có truyền đủ thông tin để data hắn đồng bộ với nhau 
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }
        const users = JSON.parse(data).users;
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }
        users[userIndex] = {id: userId, ...updatedUser};
        fs.writeFile(dbFilePath, JSON.stringify(db, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ message: 'Server error' });
            }
            res.status(204).send();
        })

    })
})

router.post('/users', validateUser, (req, res) => {
    const newUser = req.body;
    //ktra xem có truyền đủ thông tin để data hắn đồng bộ với nhau 
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }
        const db = JSON.parse(data);
        const users = db.users;

        const newId = users.length > 0 ? Math.max(...users.map(user => user.id || 0)) + 1 : 1;
        const newUserAdd = {id: newId, ...newUser};
        users.push(newUserAdd);
        fs.writeFile(dbFilePath, JSON.stringify(db, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ message: 'Server error' });
            }
            res.status(201).json(newUserAdd);
        })
    })
})


router.delete('/users/:id', (req, res) => {
    const idToDelete = parseInt(req.params.id);
    fs.readFile(dbFilePath, 'utf8', (err, data) =>{
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }
        const db = JSON.parse(data);
        const users = db.users;

        const userIndex = users.findIndex(user => user.id === idToDelete);
        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }
        users.splice(userIndex, 1);
        fs.writeFile(dbFilePath, JSON.stringify(db, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({message: 'Server error'});
            }
            res.status(200).json(true);
        })
    })
})

export default router;
