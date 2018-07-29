
import express from 'express';
import Blog from '../models/Blog';
import parseErrors from '../utils/parseErrors';
const router = express.Router();

router.get('/search', (req, res) => {
    res.json({
        // Dummy Data
        blogs: [
            {
                id: 1,
                title: 'React1',
                author: 'Author1',
                body: 'React 123123123123',
            },
            {
                id: 2,
                title: 'React2',
                author: 'Author2',
                body: 'React 321321321',
            }
        ] 
    })
})

router.post('/', (req, res) => {
    const {subject, body_txt} = req.body.body_txt;
    const blog = new Blog({ subject });
    blog.catch(err => res.status(400).json({errors: parseErrors(err.errors)}));
})

export default router;