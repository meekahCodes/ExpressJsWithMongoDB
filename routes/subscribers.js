const express = require('express');
const router = express.Router();

//get the susruber schema model
const Subscriber = require('../models/subscriber');

//Getting All Subsibers
router.get('/', async (req,res) => {
    try {
        const subscribers = await Subscriber.find();
        res.send(subscribers)      
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
  
});
//Get one Subscruber By Id
router.get('/:id', getSubsriber, (req,res) => {
    res.json(res.subscriber)  //without status mean  default status will be 200
});
//Store a Subcriber
router.post('/', async (req,res) => {
    const subscriber = new Subscriber({
        name : req.body.name,
        subscribeToChannel: req.body.subscribeToChannel
    })

    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber) //201 means something created in db
    } catch (error) {
        res.status(400).json({  //400 means user given invalid date to process
            message: error.message
        })
    }

});
//Update a Subscriber
router.patch('/:id', getSubsriber, async (req,res) => {

    try {
        //need to find better way to update it
        if(req.body.name != null){
            res.subscriber.name = req.body.name
        }
        if(req.body.subscribeToChannel != null){
            res.subscriber.subscribeToChannel = req.body.subscribeToChannel
        }
    
        const updatedSubsriber = await res.subscriber.save()
        res.json(updatedSubsriber)

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

});
//Delete A Subscriber
router.delete('/:id', getSubsriber, async (req,res) => {
    try {
        
        await res.subscriber.remove();
        res.json({
            message: 'Subscriber deleted successfully'
        })

    } catch (error) {       
        res.status(500).json(error.message);
    }
});

async function getSubsriber(req,res,next){ // middle ware whish make easy to get the subsruber by id easily

    let subscriber;

    try {  
        subscriber = await Subscriber.findById(req.params.id)
        
        if(subscriber == null){
            res.status(404).json({
                message:  "Subscriber Not Found"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

    //assiging the subsriber response make use to all
    res.subscriber = subscriber;
    next();

}

//this will export all the routes
module.exports = router 