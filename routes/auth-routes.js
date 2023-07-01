const express = require('express');
const router = express.Router()
const fetch = require('node-fetch')


router.post('/', async (req, res) => {
    const response = await fetch('http://104.211.219.98/train/auth', {
        method: 'POST',
        body: JSON.stringify(req.body)
    })
    const data = await response.json();
    res.status(200)
    res.json({ data: data })
})

module.exports = router