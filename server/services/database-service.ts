import mongoose from 'mongoose';
import {mongo} from 'mongoose'
import {DB_COLLECTIONS} from "./constants";

export class DatabaseService {
    static #instance: DatabaseService;
    private db: mongo.Db | undefined;
    private constructor() {}

    public static get instance(): DatabaseService {
        if (!DatabaseService.#instance) {
            DatabaseService.#instance = new DatabaseService();
        }
        return DatabaseService.#instance;
    }

    public connect(link: string): void {
        if (!!this.db) return
        mongoose.connect(link)
            .then(() => {
                console.log('Connected to database', mongoose.connection.db?.databaseName);
                this.db = mongoose.connection.db;
            })
            .catch(err => console.log(err));
    }

    async getCollection(collection: DB_COLLECTIONS){
        if (!this.db) return;
         return await this.db.collection(collection).find({}).toArray();
    }

    async getEntityById(id: string, collection: DB_COLLECTIONS){
        if (!this.db) return;
        const search_id = new mongoose.Types.ObjectId(id);
        return await this.db.collection(collection).findOne({_id: search_id});
    }

    async getEntityByQuery(query: mongoose.Query<any, any>, collection: DB_COLLECTIONS){
        if (!this.db) return;
        return await this.db.collection(collection).findOne({query: query});
    }

    async getEntityGroupByQuery(query: mongoose.Query<any, any>, collection: DB_COLLECTIONS){
        if (!this.db) return;
        return await this.db.collection(collection).find({query: query}).toArray();
    }

    async createEntity(entity: Record<string, any>, collection: DB_COLLECTIONS){
        if (!this.db) return null;
        return await this.db.collection(collection).insertOne(entity);
    }
}