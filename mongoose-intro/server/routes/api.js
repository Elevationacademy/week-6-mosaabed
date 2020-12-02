const express = require('express')
const router = express.Router()

const Person = require('../models/Person')

router.get('/people', function (req, res) {
    Person.find({}, function (err, people) {
        console.log(people)
        res.send(people)
    })
})

router.post('/person', function(req, res) {
    let person = req.body
    let p1 = new Person({
        firstName: person.firstName,
        lastName: person.lastName,
        age: person.age
    })
    //console.log(p1)
    p1.save()
    res.send("Done")
})

router.put('/person/:id', function(req, res) {
    let id = req.params.id
    Person.findByIdAndUpdate(id, {age: 80}, function(err, person) {
        res.send("Done")
    })
})


router.delete('/apocalypse', function(req, res) {
    Person.find({}, function(err, people) {
        people.forEach(p => p.remove())
    })
    res.send("Done")
})




module.exports = router
