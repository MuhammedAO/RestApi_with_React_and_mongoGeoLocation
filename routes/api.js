const express = require ('express');

//express router : this allows us to make modular routes. you store your route handlers to this.
const router = express.Router();
const Developer = require ('../models/developers');



//get a list of developers from the database
// router.get ('/developer', (req,res,next) =>{
//   // Developer.find({}).then((developers)=>{
//   //   res.send(developers);
//   // })
//   Developer.geoNear({
//     type: "point",coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
//   {maxDistance:100000, spherical: true}
//   ).then((developers) =>{
//     res.send(developers);
//   });
// });

router.get('/developer', (req, res, next) => {
  Developer.aggregate([{
  $geoNear: {
      near: {
          type: "Point",
          coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
      },
      distanceField: "dis",
      maxDistance: 100000,
      spherical: true
  }
  }]).then(function (developers) {
  res.send(developers);
  }).catch(next);
  });
//add a new developer to the database
router.post('/developer', (req,res, next) =>{
  Developer.create(req.body).then((developer) =>{
    res.send(developer);
  }).catch((next));
  });


//update a developer from the database
  router.put('/developer/:id', (req,res,next) =>{
    Developer.findByIdAndUpdate({_id:req.params.id},req.body).then(() =>{
   Developer.findOne({_id:req.params.id}).then((developer)=>{
     res.send(developer);
   });
    }).catch(next);
  });


  //delete a developer from the database
  router.delete('/developer/:id', (req,res,next) =>{
    Developer.findByIdAndRemove({_id:req.params.id}).then((developer) =>{
     res.send(developer);
    }).catch(next);
    // console.log(req.params.id);
  });

//export your routes for useage
  module.exports = router;

  //remove config