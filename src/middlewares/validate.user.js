const validateUser = (req, res, next) => {
    const { email, gender, age, fullName, phone } = req.body;

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (gender !== 'male' && gender !== 'female') {
        return res.status(400).json({ message: 'Gender must be male or female' });
    }

    if (!Number.isInteger(age) || age <= 0 || age >= 20) {
        return res.status(400).json({ message: 'Age must be between 1 and 19' });
    }

    if (!fullName || fullName.trim().length < 10) {
        return res.status(400).json({ message: 'Full name must be at least 10 characters' });
    }

    const phoneRegex = /^09\d{9}$/;
    if (!phone || !phoneRegex.test(phone)) {
        return res.status(400).json({ message: 'Phone must start with 09 and be 11 digits' });
    }

    next();
};

export default validateUser;
