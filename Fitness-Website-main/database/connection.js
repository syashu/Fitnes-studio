var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost:27017/demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"))

const userDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    phno: String,
    password: String,
});

const UserData = mongoose.model('UserData', userDataSchema);

app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;


    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "password": password


    }

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");

    });
    return res.redirect('signup_success.html')
})

/*app.post('/submit_form', (req, res) => {
      const formData = req.body;
    
      const userData = new UserData({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        
      });
    
      userData.save((err) => {
        if (err) {
          res.status(500).send(err.message);
        } else {
          res.send('Form submitted successfully!');
        }
      });
    });
*/
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('contact.html');
}).listen(5000);


console.log("Listening on PORT 5000");