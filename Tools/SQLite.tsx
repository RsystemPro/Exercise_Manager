import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('history.db');

export async function SQLite_CreateDB(name: string, columns: string) {
    try {
        await new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS ${name} (${columns});`,
                    [],
                    resolve,
                    (_: any, error: any) => {
                        reject(error);
                        return true; // Rollback the transaction
                    }
                );
            });
        });
    } catch (error: any) {
        throw new Error(error)
    }

}

export async function SQLite_Insert(table: string, time: string, timer: string, set: string, exercise: string) {
    try {
        await SQLite_CreateDB('history', 'time TEXT, timer TEXT, set_col TEXT, exercise TEXT')
        await new Promise((resolve, reject) => {
            db.transaction(
                (tx: any) => {
                    tx.executeSql(`insert into ${table} values (?, ?, ?, ?)`,
                        [time, timer, set, exercise],
                        resolve,
                        (_: any, error: any) => {
                            reject(error);
                            return true; // Rollback the transaction
                        }
                    );
                }
            )
        })
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function SQLite_GetTable(table: string) {
    try {
        return await new Promise((resolve, reject) => {
            db.transaction(
                (tx: any) => {
                    tx.executeSql(`select * from ${table}`,
                        [],
                        (_: any, { rows }: any) => (
                            resolve(rows)
                        )
                    ),
                        (_: any, error: any) => {
                            console.log(error);
                            reject(error);
                            return true; // Rollback the transaction
                        }
                },
            )
        })
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function SQLite_RemoveItem(time: string, timer: string) {
    try {
        return await new Promise((resolve, reject) => {
            db.transaction(
                (tx: any) => {
                    tx.executeSql(`DELETE FROM history WHERE time = ? AND timer = ?`,
                        [time, timer],
                        (_: any, { rows }: any) => (
                            resolve(rows)
                        )
                    ),
                        (_: any, error: any) => {
                            console.log(error);
                            reject(error);
                            return true; // Rollback the transaction
                        }
                },
            )
        })
    } catch (error: any) {
        throw new Error(error)
    }
}

