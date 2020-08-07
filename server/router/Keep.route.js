const express = require('express')
const route = express.Router()

const Keep = require('../model/Keep.model')
const KeepArchive = require('../model/KeepArchive.model')
const KeepBin = require('../model/KeepBin.model')

const { json } = require('body-parser')
const { text } = require('express')


/** get all = keep data */
route.get('/', (req, res) => {
    Keep.find()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

/** get all = archive data */
route.get('/archive', (req, res) => {
    KeepArchive.find()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

/** get all = bin data */
route.get('/bin', (req, res) => {
    KeepBin.find()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})


/**get/:id  one data = keep Data */
route.get('/:id', (req, res) => {
    Keep.find({ id: req.params.id },{_id:0,id:1,title:1,task:1})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

/** get/:id one data = archive data */
route.get('/archive/:id', (req, res) => {
    KeepArchive.find({id : req.params.id} ,{_id:0,id:1,title:1,task:1})
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

/** get/:id one data = bin data */
route.get('/bin/:id', (req, res) => {
    KeepBin.find({id : req.params.id} ,{_id:0,id:1,title:1,task:1})
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

/**post  create new = keep Data */
route.post('/', (req, res) => {
    const data = new Keep({
        id: req.body.id,
        title: req.body.title,
        task: req.body.task,
    })
    data.save()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

/**post  create new = archive Data */
route.post('/archive', (req, res) => {
    const data = new KeepArchive({
        id: req.body.id,
        title: req.body.title,
        task: req.body.task,
    })
    data.save()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

/**post  create new = bin Data */
route.post('/bin', (req, res) => {
    const data = new KeepBin({
        id: req.body.id,
        title: req.body.title,
        task: req.body.task,
    })
    data.save()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

/**put/:id Edit one = keep Data */
route.put('/:id', (req, res) => {
    Keep.updateOne({ id: req.params.id }, { $set: { title: req.body.title, task: req.body.task } })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(result)
        })
})

/**put/:id Edit one = keepArchive Data */
route.put('/archive/:id', (req, res) => {
    KeepArchive.updateOne({ id: req.params.id }, { $set: { title: req.body.title, task: req.body.task } })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(result)
        })
})

/**Delete one = keep Data */
route.delete('/:id', (req, res) => {
    Keep.deleteOne({ id: req.params.id })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(result)
        })
})

/**Delete one = archive Data */
route.delete('/archive/:id', (req, res) => {
    KeepArchive.deleteOne({ id: req.params.id })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(result)
        })
})
/**Delete one = bin Data */
route.delete('/bin/:id', (req, res) => {
    KeepBin.deleteOne({ id: req.params.id })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(result)
        })
})


/**Delete all = keep */
route.delete('/', (req, res) => {
    Keep.remove()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(result)
        })
})
/**Delete all = archive */
route.delete('/archive', (req, res) => {
    KeepArchive.remove()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(result)
        })
})
/**Delete all = bin */
route.delete('/bin', (req, res) => {
    KeepBin.remove()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(result)
        })
})

/** Search = keep */
route.get('/search/:text', (req, res) => {
    var text = new RegExp(req.params.text, 'i');
    var query = { $or: [{ title: { $regex: text, $options: 'i' } }, { task: { $regex: text, $options: 'i' } }] }
    Keep.find(query).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(400).json(err)
    })
});
/**  Search = archive */
route.get('/archive/search/:text', (req, res) => {
    var text = new RegExp(req.params.text, 'i');
    var query = { $or: [{ title: { $regex: text, $options: 'i' } }, { task: { $regex: text, $options: 'i' } }] }
    KeepArchive.find(query).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(400).json(err)
    })
});


module.exports = route