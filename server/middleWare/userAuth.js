import jwt from 'jsonwebtoken';


const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: 'Not authorized. Please log in again.!' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.customerId= tokenDecode.id;  
           console.log("✅ workerId set in middleware:", req.customerId);
            next(); 
        } else {
            return res.json({ success: false, message: 'Not authorized. Please log in again.' });
        }
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export default userAuth;
