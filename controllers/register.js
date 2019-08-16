const handleRegister = (req, res, postgres, bcrypt) => {
    const { email, name, password } = req.body;

    if(!email || !name || !password) {
        return res.status(400).json('incorrect form submission')
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    postgres.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('logins')
        .returning('email')
        .then( loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                email: email,
                fullname: name
            }).then(user => {
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    }) 
    .catch(err => res.status(400).json('err'))

}

module.exports = {
    handleRegister : handleRegister
}