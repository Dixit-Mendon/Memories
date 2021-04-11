import jwt from 'jsonwebtoken';

// user wants to like a post
// click the like button => auth middleware (next) => like controller...

const auth = async (req, res, next) => {
    try {
        console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;  //sub differentiates every google user 
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;