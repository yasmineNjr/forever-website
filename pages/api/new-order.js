import { MongoClient } from "mongodb";

async function handler(req, res){
    if(req.method === 'POST'){
        const data= JSON.parse(req.body);
        //const {title, image, description, price, department, groups, date, rate, salesCount} = data;
        //save to database
        const client = await MongoClient.connect(
            'mongodb+srv://foreverUser:PwDV1m7yVI0D72uc@cluster0.ci8azls.mongodb.net/foreverDB?retryWrites=true&w=majority'
            );
        const db = client.db();
        const ordersCollection = db.collection('orders');
        const result = await ordersCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({message: 'Order Inserted!'})
    }
}

export default handler;