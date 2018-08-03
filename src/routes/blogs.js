
import express from 'express';
import Blog from '../models/Blog';
import parseErrors from '../utils/parseErrors';
const router = express.Router();

router.get('/search', (req, res) => {
    res.json({
    })
})

router.get('/', (req, res) => {
    Blog.find({}).then(blogs => res.json({blogs}));
})

router.post('/', (req, res) => {
    Blog.create({ ...req.body.blog})
    .then(blog => res.json({ blog })
    ).catch(err => res.status(400).json({errors: parseErrors(err.errors)}));
})

export default router;