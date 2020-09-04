import { EasyconfigService } from 'nestjs-easyconfig';

import { join } from 'path';

const config: EasyconfigService = new EasyconfigService({ path: '' });

export const DATABASE_TYPE = config.get('DB_TYPE');

export const DATABASE_CONFIG = {
    host: config.get('DB_HOST'),
    port: config.get('DB_PORT'),
    username: config.get('DB_USERNAME'),
    password: config.get('DB_PASSWORD'),
    name: config.get('DB_NAME'),
    entities: [join(__dirname, '/../**/*{.ts,.js}')],
    logging: parseInt(config.get('DB_LOGGING'), 10) ? true : false,
    synchronize: parseInt(config.get('DB_SYNC'), 10) ? true : false
};
