import mongoose from 'mongoose';
import {mongo} from 'mongoose'
import {DB_COLLECTIONS} from "./constants";

export class DatabaseService {
    static instance: DatabaseService;
    private db: mongo.Db | undefined;
    constructor(link: string) {
        if (!!DatabaseService.instance) return;
        DatabaseService.instance = this;
        mongoose.connect(link)
            .then(() => {
                console.log('Connected to database', mongoose.connection.db?.databaseName);
                this.db = mongoose.connection.db;
            })
            .catch(err => console.log(err));
    }

    async getCollection(collection: DB_COLLECTIONS){
        if (!this.db) return;
         return await this.db.collection(collection).find({}).toArray()
    }
}