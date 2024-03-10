var express = require('express')
var mongoose = require('mongoose')
var cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());
port = 8846;

const atlas = "mongodb+srv://riteshborikar2133:riteshborikar321@cluster0.y5ctwtu.mongodb.net/Desk_Assistant?retryWrites=true&w=majority"


mongoose
    .connect(atlas)
    .then(() => app.listen(5500))
    .then(() => console.log("connected database at 5500"))
    .catch((error) => console.log(`${error}is error`));

const Schedule = mongoose.Schema({
    Time: "String",
    Subject: "String",
    Year: "String",
})

const schedules = mongoose.model("timetable", Schedule);

app.get('/', async (req, res) => {
    try {
        let data = await schedules.find()
        if (data) {
            res.status(200).json(data)
        }
        else {
            console.log("error")
        }
    }
    catch (err) {
        console.log(err)
    }
})

app.post('/',async(req,res)=>{
    const {Time,Subject,Year} = req.body;
    const data = new schedules({
        Time,Subject,Year
    });
    try{
        await data.save();
    }catch(err){
        return console.log("error");
    }
    return res.status(201).json({ data });
})