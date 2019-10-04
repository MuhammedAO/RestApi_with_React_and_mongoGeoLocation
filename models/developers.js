const mongoose = require('mongoose');

//schemas determine the structure of our data objects 
const Schema = mongoose.Schema;

//create geolocation schema of developer(s)
const GeoSchema = new Schema({
  type : {
      type: String,
      default: "Point"
  },
  coordinates :{
      type: [Number],
      index: "2dsphere"
  }
});


//create developer schema&model
//inside the schema we will define how our object will look like
const DeveloperSchema = new Schema({
  name :{
      type: String,
      required: [true, "Name field is required"]
  },
  Job : {
      type: String,
  },

  Available :{
      type: Boolean,
      default: false
  },
  geometry: GeoSchema
})

//this will be the collection in the database
//developer model = developer collection
//the object will be structured based on the developerschema
const Developer = mongoose.model('developer', DeveloperSchema);


//export the model to be used in other files
module.exports = Developer;
