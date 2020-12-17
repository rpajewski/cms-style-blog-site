const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const hbs = exphbs.create({})

const app = express()
const PORT = process.env.PORT || 3001

// connect session to sequelize
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sess = {
    secret: 'Super Secret Secret',
    cookie: { maxAge: 3600000},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session(sess))

app.use(routes)

// template language engine
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

// connect to server and database
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'))
})
