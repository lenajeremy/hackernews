import {
    enablePromise,
    openDatabase,
    SQLiteDatabase
} from 'react-native-sqlite-storage';

enablePromise(true);

export const TABLE_NAMES = {
    user: 'user'
}

export const getDBConnection = async () => {
    const db = await openDatabase({ name: 'newsifyData.db', location: 'default' });

    console.log(db)
    return db;
}

export const createTable = async (db: SQLiteDatabase, tableName: string, query: string) => {

    const QUERY = `CREATE TABLE IF NOT EXISTS ${tableName}(${query});`;

    const table = await db.executeSql(QUERY);

}

export const getUser = async (db: SQLiteDatabase, username: string) => {

    const QUERY = `SELECT username FROM ${TABLE_NAMES.user} WHERE username == '${username}'`

    const user = await db.executeSql(QUERY);

    return user;
}

export const createUser = async (db: SQLiteDatabase, username : string, password: string, bookmarks: string) => {
    const QUERY = `INSERT INTO ${TABLE_NAMES.user}(username, password, bookmarks) VALUES ('${username}', '${password}', '${bookmarks}');`;

    console.log(QUERY)
    try{
        const user = await db.executeSql(QUERY);
        console.log(user[0].rows.length);
    }catch(error){
        console.error(error)
    }
}

export const deleteTable = async (db: SQLiteDatabase, tableName: string) => {
    await db.executeSql(`drop table ${tableName}`);

    return true;
}

