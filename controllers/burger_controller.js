const express = require("express"),
    router = express.Router(),
    Burger = require("../models/Burger");

router.get("/", async (req, res) => {
    try {
        let burgers = await new Burger().menu();
    
        let fresh = burgers.filter(b => !b.devoured)
        let devoured = burgers.filter(b => b.devoured)
        return res.render("index", {
            freshBurgers: fresh,
            devouredBurgers: devoured
        });
    } catch (error) {
        console.error(error)
        return res.sendStatus(404).end();
    }
});


router.post("/api/burgers", async (req, res) => {
    let myBurger = new Burger({ name: req.body.name })
    try {
        let result = await myBurger.cook();
        if (result.insertId) 
            return res.status(200).json(result.insertId).end()
        else
            return res.sendStatus(404).end()
    } catch (error) {
        console.error(error)
        return res.sendStatus(500).end();
    }
});


// Export routes for server.js to use.
module.exports = router;
