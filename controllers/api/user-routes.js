const router = require('express').Router()
const { User, Blog, Comment } = require('../../models')

// get users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// get one users
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Blog,
                attributes: ['id', 'title', 'content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Blog,
                    attributes: ['title']
                }
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user found with this ID' })
            return
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// create new user
router.post('/', (req, res) => {
    // expects { username: 'newUser', password: 'eightLetterPass' }
    User.create(req.body)
    .then(dbUserData => {
        res.json(dbUserData)
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router