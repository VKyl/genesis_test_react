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

    public async connect(link: string){
        if (!!this.db) return
        return mongoose.connect(link)
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

    async getEntityByQuery(query: Record<any, any>, collection: DB_COLLECTIONS){
        if (!this.db) return;
        return await this.db.collection(collection).findOne(query);
    }

    async getEntityGroupByQuery(query: Record<string, any>, collection: DB_COLLECTIONS){
        if (!this.db) return;
        return await this.db.collection(collection).find(query).toArray();
    }

    async updateEntityByQuery(query: Record<string, any>, updated: Record<string, any>, collection: DB_COLLECTIONS){
        if (!this.db) return;
        return await this.db.collection(collection).findOneAndUpdate(query, updated);
    }

    async createEntity(entity: Record<string, any>, collection: DB_COLLECTIONS){
        if (!this.db) return null;
        return await this.db.collection(collection).insertOne(entity);
    }
}