import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
//env file ke andar jo bhi data (variables) hain, unhe aap apni server.js file ke andar access aur 
// process kar sakein(iss ki help se hum .env file ke jo bhi content usse hum
//  server.js file ke andar access kar sakte hain aur usse process kar sakte hain.)
const url = process.env.MONGODB_URL || "";
// .ene naam ki file mein process karke MONGODB-URL ko load karo aur usse url variable mein
//  store kar doAgar MONGODB_URL load nahi hua to url variable ko empty string assign kar do.
if (url) {
    console.log("Username:", url.split("://")[1]?.split(":")[0]);
    console.log("Host:", url.split("@")[1]?.split("/")[0]);
}
// url variable ke andar jo bhi data h usse split karke username aur host ko console mein print kar do.
const app = express();
/*
v.IMP
 express ka ek instance create karo aur usse app variable ke andar store kar do.
express ki calling app Naam ke variable ke andar store kar do taki hum express ke methods 
aur properties ka use app naam ke variable ki help se  kar sakein.


ab express ka sara ka sara kaam app variable ke through hoga.
*/
// Middlewares
app.use(cors());
//app variable ke through cors middleware ka use karo taki hum apne backend ko frontend
//  ke saath connect kar sakein.(backend And Frontend ke beech mein communication ko rokne
//  se bachne ke liye cors middleware ka use karte hain.)
app.use(express.json());
/*
Express.json?
express.json() express ka ek Method/Function/Middleware h jiska use hum frontend se aaye hue data ko json
 format mein Convert karne ke liye karte hain.

app variable ka use karke express.json ko balau taki hum frotend se aaye hue data ko
  json format mein parse kar sakein(badal sake) aur usse backend mein access kar sakein.
*/

// MongoDB Environment Variable Check(iss code se pata chalega ki mongodb ka url server.js mein load hua ya nhi)
console.log("MONGODB_URL loaded:", !!process.env.MONGODB_URL);

console.log(
    "Password placeholder present:",
    process.env.MONGODB_URL?.includes("<db_password>")
);

// MongoDB Connection
mongoose.connect(url)
/* 
Mongoose.connect() ek method h jiska use MongoDB database se connect karne ke liye hota h.

*/
    .then(() => {
        console.log("MongoDB connected");
        // agar connection successful hua to ye message console mein print hoga.
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
        // agar connection mein koi error aaya to ye message console mein print hoga.
    });

// Schema Definition (Schema Create karna )
/*
What is Schema?
Schema ek tarah ka blueprint h jiska use MongoDB database ke andar data ko organize karne ke liye hota h.
schema ke andar hum ye define karte hain ki database ke andar kaunsa data 
kaunsa type ka hoga aur uska structure kaisa hoga.

*/
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

// Model Creation (Mongoose Model Create karna )
const User = mongoose.model("User", userSchema);
//userSchema Ke According( Userschema Rules Ke According) User Naam ka ek
// Mongoose Model Create karo Aur Usse User Naam K Variable Ke Andar Store Kar do.

// POST Route
app.post("/name", async (req, res) => {
    try {
        console.log("Post route hit");
        console.log(req.body);

        const name = req.body.name;
        const age = req.body.age;

        // Document Creation (Mongoose Document Create karna )
        const user1 = new User({
            name: name,
            age: age
        });

        /* User Mogoose Model Ke According ya User mongoose Model ke  Rules Ke 
        According( user naam ka Ek Mongoose Document Create karo Aur usse Use Naam ke  
        Mongoose Model se Connect kar do ) user Naam ka ek Mongoose Document(obj) Create karo Aur Usse
         user1 Naam K Variable Ke Andar Store Kar do. */

        // What is New?
        /* 
        New ek tarah ka Keyword h jiss ka use Object Create karne And Object kisi Another
         Function se Connect karne ke liye use hota h.
        */

        /* 
        user2(lower case) ka ek document Create karo.
        */
        // const user2 = new User({
        //     name: name,
        //     age: age
        // });

        // Document Save (Mongoose Document Save karna )
        //user1.save();---> Mongoose, user1 document ko database mein save karo.
        // save()---> This is a method jo database mein Data ko save karta h.

        await user1.save();
        //user1 document ke Data ko MongoDB mein save karne tak ka Wait karo.

        // await user2.save();


        console.log(name);
        console.log(age);

        const nextage = Number(age) + 1;

        console.log(nextage);

        res.json({
            name: name,
            age: age,
            nextage: nextage,
            message: "ye response backend ka h",
            success: true
        });
    }

    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            success: false,
            message: "Error creating user"
        });
    }
});

// Server Listen
app.listen(3000, () => {
    console.log("server port 3000 par chal raha h");
});
