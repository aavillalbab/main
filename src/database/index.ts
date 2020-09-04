import 'reflect-metadata';

export { DatabaseProvider } from './database-provider';

export * from './entities';

// DatabaseProvider.getConnection()
//     .then(async connection => {
//         console.log('Loading users from the database...');
//         const users = await connection.manager.find(User);
//         console.log('Loaded users: ', users);
//     })
//     .catch(error => console.log(error));
