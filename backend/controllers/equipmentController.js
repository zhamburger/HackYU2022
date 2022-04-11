const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = ""; /*Add URI to mongodb database*/

exports.add_equipment_post = function (req, res) {
    var body = req.body;
    var hospitalName = body['hospitalName'];
    var type = body['type'];
    var name = body['name'];
    var year = body['year'];
    var model = body['model'];
    var price = body['price'];
    var desc = body['description'];

    addToDB(hospitalName, type, name, year, model, price, desc);
    console.log("hospital added")
};



exports.get_type = async function (req, res) {
    let type = req.query.type;
    let data = await getTypeFromDB(type);
    res.send(data);
}

async function getTypeFromDB(type) {
    const client = await new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    let ret;

    try {
        await client.connect().then(async s => {
            console.log("connected");
            ret = await client.db('test').collection("equipments").aggregate([
                {
                    '$match': {
                        'type': type
                    }
                },
                {
                    '$group': {
                        '_id': 'personalProtective',
                        'equipment': {
                            '$addToSet': '$name'
                        }
                    }
                }
            ]).toArray();
        }).catch(err => {
            console.error(err);
        })
        return ret;
    } finally {
        client.close();
    }
}

async function addToDB(hospitalName, type, name, year, model, price, desc) {
    const client = await new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect(async err => {
        await addToDBs(client, hospitalName, type, name, year, model, price, desc);
        client.close();
    });
}

async function addToDBs(client, hospitalName, type, name, year, model, price, desc) {
    await addToHospitals(client, hospitalName, type, name, year, model, price, desc);
    await addToEquipments(client, hospitalName, type, name, year, model, price, desc);
}

async function addToEquipments(client, hospitalName, type, name, year, model, price, desc) {
    const equipments = await client.db("test").collection("equipments");
    await equipments.insertOne({
        'type': type,
        'name': name,
        'year': year,
        'model': model,
        'price': price,
        'desc': desc,
        'hospital': hospitalName
    });
}


async function addToHospitals(client, hospitalName, type, name, year, model, price, desc) {
    const hospitals = await client.db("test").collection("hospitals");
    await hospitals.updateOne(
        {
            name: hospitalName
        },
        {
            $addToSet: {
                "equipment": {
                    'type': type,
                    'name': name,
                    'year': year,
                    'model': model,
                    'price': price,
                    'description': desc
                }
            }
        }
    );
}