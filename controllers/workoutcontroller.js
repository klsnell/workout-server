let Express = require('express');
let router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");

const{WorkoutModel} = require('../models');

// router.get('/practice', validateJWT, (req, res) => {
//     res.send('Hey!! This is a practice route!')
// });

router.post('/create', validateJWT, async (req, res) =>{
    const {title, date, entry} = req.body.workout;
    const {id} = req.user;
    const workoutEntry = {
        date,
        entry,
        owner: id
    }
    try{
        const newWorkout = await WorkoutModel.create(workoutEntry);
        res.status(200).json(newWorkout);
    }catch(err){
        res.status(500).json({error:err});
    }
    // JournalModel.create(workoutEntry)
});

router.get("/", async (req, res) => {
    try{
        const entries = await WorkoutModel.findAll();
        res.status(200).json(entries);
    }catch(err){
        res.status(500).json({error: err});
    }
});

router.get("/mine", validateJWT, async (req, res) => {
    let {id} = req.user;
    try{
        const userWorkout = await WorkoutModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userWorkout);
    }catch (err) {
        res.status(500).json({error: err});
    }
});

router.get("/:title", async (req, res) => {
    const {title} = req.params;
    try{
        const results = await WorkoutModel.findAll({
            where: {title: title}
        });
        res.status(200).json(results);
    }catch (err) {
        res.status(500).json({error: err});
    }
});

router.delete("/delete/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const workoutId = req.params.id;

    try{
        const query = {
            where: {
                id: journalId,
                owner: ownerId
            }
        };
        await WorkoutModel.destroy(query);
        res.status(200).json({message: "Workout Entry Removed"});
    }catch(err) {
        res.status(500).json({error:err});
    }
})

router.get('/about', (req, res) => {
    res.send('This is the about route!')
});


module.exports = router;