const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/solarDB', { useNewUrlParser: true })


const solarSystemSchema = new Schema({
    planets: [{type: Schema.Types.ObjectId, ref: 'Planet'}],
    starName: String
})


const planetSchema = new Schema({
    name: String,
    system: {type: Schema.Types.ObjectId, ref: 'SolarSystem'},
    visitors: [{type: Schema.Types.ObjectId, ref: 'Visitor'}]
})


const visitorSchema = new Schema({
    name: String,
    homePlanet: {type: Schema.Types.ObjectId, ref: 'Planet'},
    visitedPlanets: [{type: Schema.Types.ObjectId, ref: 'Planet'}]
})


const SolarSystem = mongoose.model("SolarSystem", solarSystemSchema)
const Planet = mongoose.model("Planet", planetSchema)
const Visitor = mongoose.model("Visitor", visitorSchema)


let s1 = new SolarSystem({
    planets: [],
    starName: "shams"
})


let p1 = new Planet({
    name: "alared",
    system: s1,
    visitors: []
})


let p2 = new Planet({
    name: "zo7al",
    system: s1,
    visitors: []
})


let p3 = new Planet({
    name: "zomordh",
    system: s1,
    visitors: []
})

let p4 = new Planet({
    name: "najmalshamal",
    system: s1,
    visitors: []
})

let v1 = new Visitor({
    name: "sameer",
    homePlanet: p4,
    visitedPlanets: []
})


let v2 = new Visitor({
    name: "aboashraf",
    homePlanet: p1,
    visitedPlanets: []
})

let v3 = new Visitor({
    name: "mokeh",
    homePlanet: p2,
    visitedPlanets: []
})


// let planetList = [p1 ,p2,p3,p4]
// s1.planets = planetList

// v1.visitedPlanets.push(p1)
// p1.visitors.push(v1)

// v2.visitedPlanets.push(p1)
// p1.visitors.push(v2)

// v1.visitedPlanets.push(p2)
// p2.visitors.push(v1)

// v3.visitedPlanets.push(p3)
// p3.visitors.push(v3)

// v2.visitedPlanets.push(p3)
// p3.visitors.push(v2)

// s1.save()
// planetList.forEach(p => p.save())
// v1.save()
// v2.save()
// v3.save()




Visitor.findOne({}).populate("visitedPlanets").exec(function(err, visitor) {
    visitor.visitedPlanets.forEach(p => console.log(p.name))
}) 



Planet.findOne({}).populate("visitors").exec(function(err, planet) {
    planet.visitors.forEach(v => console.log(v.name))
})



SolarSystem.findOne({}).populate({
        path: "planets",
        populate: {
            path: "visitors"
        }
    }).exec(function (err, solarSystem){  
        for(planet of solarSystem.planets) {
            planet.visitors.forEach(v => console.log(v.name))
        }
    })




