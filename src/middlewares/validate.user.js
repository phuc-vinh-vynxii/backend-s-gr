import db from '../db/db.json' with {type: 'json'};
class UserValidator {
    
    static validateCreate(req, res, next) {
        const user = req.body;

        if(user) {
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!user.email || !emailRegex.test(user.email)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }
            const existEmail = db.users.find(u => u.email === user.email);
            if (existEmail) {
                return res.status(400).json({ message: 'Email already exists' });
            }
        }

        if (user.gender !== 'male' && user.gender !== 'female') {
            return res.status(400).json({ message: 'Gender must be male or female' });
        }

        user.age = parseInt(user.age);
        if (user.age <= 0 ) {
            return res.status(400).json({ message: 'Age must be larger than 1' });
        }

        if (!user.fullName || user.fullName.trim().length < 10) {
            return res.status(400).json({ message: 'Full name must be at least 10 characters' });
        }

        const phoneRegex = /^09\d{9}$/;
        if (!user.phone || !phoneRegex.test(user.phone)) {
            return res.status(400).json({ message: 'Phone must start with 09 and be 11 digits' });
        }

        next();
    }

    static validateUpdate(req, res, next) {
        const user = req.body;

        if(user) {
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!user.email || !emailRegex.test(user.email)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }
            const existEmail = db.users.find(item => {
                return item.email === user.email && item.id !== req.params.id;
            })
        }

        if (user.gender !== 'male' && user.gender !== 'female') {
            return res.status(400).json({ message: 'Gender must be male or female' });
        }

        user.age = parseInt(user.age);
        if (user.age <= 0) {
            return res.status(400).json({ message: 'Age must be between 1 and 19' });
        }

        if (!user.fullName || user.fullName.trim().length < 10) {
            return res.status(400).json({ message: 'Full name must be at least 10 characters' });
        }

        const phoneRegex = /^09\d{9}$/;
        if (!user.phone || !phoneRegex.test(user.phone)) {
            return res.status(400).json({ message: 'Phone must start with 09 and be 11 digits' });
        }

        next();
    }
}

export default UserValidator;
