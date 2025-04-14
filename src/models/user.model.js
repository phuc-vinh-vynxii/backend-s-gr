import fs from 'fs/promises';
import path from 'path';

const dbFilePath = path.resolve('src/db/db.json');

class UserModel {
    constructor({id, email, gender, age, fullName, phone}) {
        this.id = id;
        this.email = email;
        this.gender = gender;
        this.age = age;
        this.fullName = fullName;
        this.phone = phone;
    }

    static async _readDB() {
      const data = await fs.readFile(dbFilePath, 'utf8');
      return JSON.parse(data);
    }
  
    static async _writeDB(db) {
      await fs.writeFile(dbFilePath, JSON.stringify(db, null, 2), 'utf8');
    }
  
    static async findAll() {
      const db = await this._readDB();
      return db.users.map(user => new UserModel(user));
    }
  
    static async findById(id) {
      const db = await this._readDB();
      const user = db.users.find(u => u.id === id);
      return user ? new UserModel(user) : null;
    }
  
    static async create(userData) {
      const db = await this._readDB();
      const users = db.users;
  
      const newId = users.length > 0 ? Math.max(...users.map(u => u.id || 0)) + 1 : 1;
      const newUser = new UserModel({ id: newId, ...userData });
      users.push(newUser);
      await this._writeDB(db);
      return newUser;
    }
  
    static async update(id, userData) {
      const db = await this._readDB();
      const index = db.users.findIndex(u => u.id === id);
      if (index === -1) return null;
  
      const updatedUser = new UserModel({ id, ...userData });
      db.users[index] = updatedUser;
      await this._writeDB(db);
      return updatedUser;
    }
  
    static async delete(id) {
      const db = await this._readDB();
      const index = db.users.findIndex(u => u.id === id);
      if (index === -1) return false;
  
      db.users.splice(index, 1);
      await this._writeDB(db);
      return true;
    }
}

export default UserModel;
