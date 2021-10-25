import React, {useEffect} from 'react';

import { 
    createTable, 
    TABLE_NAMES, 
    getDBConnection,
} from './index.database';

interface User {
    username: string,
    bookmarks : number[]
}

const SqliteProvider : React.FC = ({children}) => {

    const initializeDb = async () => {
        
        // // create the database connection
        const db = await getDBConnection();

        await createTable(db, TABLE_NAMES.user, `
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            bookmarks TEXT
        `);
    }
    
    useEffect(() => {
        initializeDb()
    },[])

    return (
        <>
        {children}
        </>
    )
}

export default SqliteProvider;