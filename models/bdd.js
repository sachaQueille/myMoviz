let mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://mymovizuser:Lacapsule@cluster0.prvpu.mongodb.net/mymovizapp?retryWrites=true&w=majority', 
   options, function(err) {
     if(err) {
      console.log(err);
     } else {
       console.log('*****Connection Success*****')
     }
    }
   );