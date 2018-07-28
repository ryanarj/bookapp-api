
import express from 'express';
import Blog from '../models/Blog';
import parseErrors from '../utils/parseErrors';
const router = express.Router();

router.post('/', (req, res) => {
    const {subject, body_txt} = req.body.body_txt;
    const blog = new Blog({ subject });
    blog.catch(err => res.status(400).json({errors: parseErrors(err.errors)}));
})

export default router;