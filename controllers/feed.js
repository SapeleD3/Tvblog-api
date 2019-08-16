const handleFeed = (req, res, postgres) => {
    postgres.select('*').from('feeds')
    .then(users => {
            res.json(users)
    })
    .catch(err => res.status(400).json('err getting user'))
}

module.exports = {
    handleFeed: handleFeed
}