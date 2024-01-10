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
        const productsCollection = db.collection('products');
        const exist = await productsCollection.findOne({titleId: data.titleId});
        // console.log(exist.salesCount);
        let result;
        if(exist){
            console.log('exist');
            let salesCount = exist.salesCount;
            if(data.quantity){
                salesCount = Number(exist.salesCount) + Number(data.quantity);
            }
            result = await productsCollection.updateOne({titleId: data.titleId}, {$set:{rate: data.rate, salesCount: salesCount}});
            res.status(201).json({message: 'Product Updated!'});
        }else {
            console.log('not exist');
            result = await productsCollection.insertOne(data);
            res.status(201).json({message: 'Product Inserted!'});
        }
        // //console.log(result);
        client.close();
    }
}

export default handler;