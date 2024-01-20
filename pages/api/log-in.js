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
        const exist = await usersCollection.findOne({userName: data.userName});
        let result;
        if(exist){
            console.log('exist');
            result = exist;
            const chkPassword = await usersCollection.findOne({userName: data.userName, password: data.password});
            if(chkPassword){
                console.log('valid password');
                result = chkPassword;
                res.status(201).json({message: 'valid'});
            }
            else{
                console.log('not valid password');
                result = chkPassword;
                res.status(201).json({message: 'notValid'});
            }
        }else{
            console.log('not exist');
            res.status(201).json({message: 'notExist'});
        }
        client.close();
    }
}

export default handler;