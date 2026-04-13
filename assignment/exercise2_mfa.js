const jwt = require('jsonwebtoken');

const otpStore = new Map();

const verifyMFA = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const otp = req.headers['x-otp'];

        if (!token || !otp) {
            return res.status(401).json({ message: 'Token and OTP required' });
        }

        const decoded = jwt.verify(token, "SECRET_KEY");

        const storedOtp = otpStore.get(decoded.userId);

        if (storedOtp !== otp) {
            return res.status(403).json({ message: 'Invalid OTP' });
        }

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { verifyMFA, otpStore };
