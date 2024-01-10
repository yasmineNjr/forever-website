import { MongoClient } from 'mongodb';

export async function connectDatabase() {
    
    const client = await MongoClient.connect(
        'mongodb+srv://foreverUser:PwDV1m7yVI0D72uc@cluster0.ci8azls.mongodb.net/foreverDB?retryWrites=true&w=majority'
        );
   
    return client;
}

export async function insertDocument(client, collection, document){

    const db = client.db('events');
    const result = await db.collection(collection).insertOne(document);
    return result;
}

export async function getAllDocumentIds(client, collection){
    
    const db = client.db();
    const coll = db.collection(collection);
    const documents = await productsCollection.find({}, {_id: 1}).toArray();
    return documents;
}
