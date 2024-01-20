import { MongoClient } from "mongodb";

async function handler(req, res){
    if(req.method === 'POST'){
        const data= JSON.parse(req.body);
        //save to database
        const client = await MongoClient.connect(
            'mongodb+srv://foreverUser:PwDV1m7yVI0D72uc@cluster0.ci8azls.mongodb.net/foreverDB?retryWrites=true&w=majority'
            );
        const db = client.db();
        const usersCollection = db.collection('users');
        const exist = await usersCollection.findOne({firstName: data.firstName, lastName: data.lastName});
        let result;
        if(!exist){
            console.log('not exist');
            const notValid = await usersCollection.findOne({userName: data.userName});
            if(!notValid){
                console.log('valid');
                result = await usersCollection.insertOne(data);
                res.status(201).json({message: 'inserted'});
            }else{
                console.log('not valid');
                result = notValid;
                res.status(201).json({message: 'notValid'});
            }
        }else{
            console.log('exist');
            result = exist;
            res.status(201).json({message: 'exist'});
        }
        client.close();
    }
}

export default handler;