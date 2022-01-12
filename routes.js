const router = require('express').Router()
const yup = require('yup')
const { nanoid } = require('nanoid')
const Url = require('./model/Url')

const urlSchema = yup.object().shape({
    slug: yup.string().trim().matches(/^[\w\-]+$/i),
    url: yup.string().trim().url().required()
})


router.get('/', (req, res) => {
    res.send('running the server')
})

router.get('/:id', async (req,res) => {
    const {id:alias} = req.params
    try {
        const url = await Url.findOne({alias})
        if (url){
            return res.redirect(url.url)
        }else {
            return res.status(404).send({message: 'invalid url ab'})
        }
    } catch (error) {
        return res.status(404).send({message: 'invalid url'})
    }
})

router.post('/url', async (req, res, next) => {
    let { alias, url} = req.body
    try {
        if (!alias){
            alias=nanoid(5)
            console.log(alias)
        }else {
            const existing = await Url.findOne({alias})
            if (existing) {
                throw new Error('already in database')
            }
        }
        const newUrlSchema = {alias, url}
        const created = await Url.create(newUrlSchema)
        res.json(created)
    } catch (error){
        next(error)
    }
})

module.exports = router;

