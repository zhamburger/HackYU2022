const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = ""; /*Add URI to mongodb database*/

exports.add_hospital_post = function (req, res) {

    var body = req.body;
    var name = body['name'];
    var email = body['email'];
    var location = body['location'];
    var phone = body['phone'];
    var amountSaved = 0.0;
    let equipment = [];

    addToDB(name, email, location, phone, amountSaved, equipment);

    console.log(name);
    res.send("User Added");
};

exports.get_email = async function (req, res) {
    let email = req.query.email;
    let data = await getEmailFromDB(email);
    res.send(data);
}

exports.send_email = function (req, res) {
    var email = req.query.email;
    send(email);
    console.log('Email sent');
}

function send(email) {
    const nodemailer = require('nodemailer');
    const transport = nodemailer.createTransport({
        service: "Gmail",
        port: 587,
        secure: true,
        secureConnection: false,
        auth: {
            user: "medtracker613@gmail.com",
            pass: "JpTkZhNs613"
        },
        tls: {
            rejectUnathorized: true
        }
    });

    const mailOptions = {
        from: "medtracker613@gmail.com",
        to: email,
        subject: "You've been stitched!",
        text: "We have found a matching hospital based on your request."
    };

    transport.sendMail(mailOptions, function (err, success) {
        if (err) {
            console.error(err)
        }
        else {
            console.log("Email sent successfully")
        }
    });
}

async function getEmailFromDB(name) {
    const client = await new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    let ret;

    try {
        await client.connect().then(async s => {
            console.log("connected");
            ret = await client.db('test').collection("hospitals").find({ 'name': name }).toArray();
        }).catch(err => {
            console.error(err);
        })
        return ret[0].email;
    } finally {
        client.close();
    }
}

async function addToDB(name, email, location, phone, amountSaved, equipment) {
    const client = await new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect(async err => {
        const collection = await client.db("test").collection("hospitals");
        // perform actions on the collection object
        await collection.insertOne({
            'name': name,
            'email': email,
            'location': location,
            'phone': phone,
            'amountSaved': amountSaved,
            'equipment': equipment
        });
        client.close();
    });
}