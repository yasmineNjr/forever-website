import { MongoClient } from "mongodb";

async function handler(req, res){
    const data= JSON.parse(req.body);
        //save to database
        const client = await MongoClient.connect(
            'mongodb+srv://foreverUser:PwDV1m7yVI0D72uc@cluster0.ci8azls.mongodb.net/foreverDB?retryWrites=true&w=majority'
            );
        const db = client.db();
        const cartCollection = db.collection('carts');
    if(req.method === 'POST'){
        const exist = await cartCollection.findOne({userId: data.userId});
        let result;
        if(exist){
            //console.log('exist');
            result = await cartCollection.updateOne({userId: data.userId}, {$set:{products: data.products}});
            res.status(201).json({message: 'Cart Updated!'});
        }else {
            //console.log('not exist');
            result = await cartCollection.insertOne(data);
            res.status(201).json({message: 'Cart Inserted!'});
        }
        //console.log(result);
        client.close();
    }else if(req.method === 'DELETE'){
        result = await cartCollection.deleteOne({userId: data.userId});
        res.status(201).json({message: 'Cart Deleted!'});
    }
}

export default handler;