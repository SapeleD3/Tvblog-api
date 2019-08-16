const handleUpload = (req, res, postgres) => {
    const { title, tagline, imageurl, videourl, description } = req.body;

    if(!title || !tagline || !description) {
        return res.status(400).json('You are not uploading anything')
    }
    postgres('feeds')
    .returning('*')
        .insert({
            title: title,
            tagline: tagline,
            imageurl: imageurl,
            videourl: videourl,
            description: description
    })
    .then(data => {
        res.json(data[0])
    })
    .catch(err => res.status(400).json('wrong credentials'))
}
module.exports = {
    handleUpload: handleUpload
}