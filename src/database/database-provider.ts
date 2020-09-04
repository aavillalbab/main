import { Connection, createConnection, getConnectionManager } from 'typeorm';

import { DATABASE_CONFIG, DATABASE_TYPE } from '../config';

/**
 * Clase Singleton que devuelve una conexión de una base de datos por medio de su metodo estático getConnection.
 */
export class DatabaseProvider {
    /**
     * Devuelve la conexión de una base de datos.
     *
     * @param nameConnection Nombre de la conexión.
     */
    public static async getConnection(
        nameConnection: string = 'default'
    ): Promise<Connection> {
        try {
            const connectionManager = getConnectionManager();

            if (connectionManager.has(nameConnection)) {
                return connectionManager.get(nameConnection);
            }

            if (!connectionManager.has(nameConnection)) {
                return await createConnection({
                    type: DATABASE_TYPE,
                    host: DATABASE_CONFIG.host,
                    port: DATABASE_CONFIG.port,
                    username: DATABASE_CONFIG.username,
                    password: DATABASE_CONFIG.password,
                    database: DATABASE_CONFIG.name,
                    entities: DATABASE_CONFIG.entities,
                    synchronize: DATABASE_CONFIG.synchronize,
                    logging: DATABASE_CONFIG.logging
                });
            }
        } catch (error) {
            throw error;
        }
    }
}
