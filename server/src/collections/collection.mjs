
import { ObjectId } from "mongodb";
import { db } from "../db.mjs";

export default class Collection {
  constructor(name) {
    this.name = name;
  }

  find(query) {
    return db.collection(this.name).findMany(query);
  }

  findOne(query) {
    return db.collection(this.name).findOne(query);
  }

  get(id) {
    return this.one({ _id: new ObjectId(id) });
  }

  updateOne(query, update) {
    return db.collection(this.name).updateOne(query, update);
  }

  insert(object) {
    return db.collection(this.name).insertOne(object);
  }

  remove(query) {
    return db.collection(this.name).remove(query);
  }

  aggregate(agg) {
    return db.collection(this.name).aggregate(agg);
  }
}
