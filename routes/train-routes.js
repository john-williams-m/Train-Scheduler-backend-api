const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

router.get('/:trainID', async (req, res) => {
    const { AccessToken } = req.body;
    const response = await fetch(`http://104.211.219.98/train/trains/${req.params.trainID}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${AccessToken}`
        }
    })
    const data = await response.json();
    res.status(200)
    res.json({ data: data })
})

module.exports = router