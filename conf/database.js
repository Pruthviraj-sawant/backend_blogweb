const mongoose=require('mongoose');

require('dotenv').config();
const dbconneect=()=>{
    mongoose.connect(process.env.database_url)
    .then(()=>{console.log("db connection sucessful...")})
    .catch((error)=>{console.log("got error not connect...")
        console.error(error.message);
        process.exit(1);
    });
}

module.exports=dbconneect;