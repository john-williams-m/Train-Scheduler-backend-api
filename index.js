const express = require('express')
const fetch = require('node-fetch')

const app = express()

const authRoutes = require('./routes/auth-routes')
const trainRoutes = require('./routes/train-routes')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    next();
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))
app.use('/auth', authRoutes)
app.use('/train', trainRoutes)

app.get('/', async (req, res) => {
    const { AccessToken } = req.body;
    const response = await fetch('http://104.211.219.98/train/trains', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${AccessToken}`
        }
    })
    const data = await response.json();
    res.status(200)
    res.json({ data: data })
})


app.use((error, req, res, next) => {
    res.status(error.code || 500)
    res.json({ message: error.message || 'Something went wrong!' })
})

const PORT = process.env.PORT || 6001
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
