export default {
    type: 'sqlite',
    database: 'database.db',
    synchronize: true,
    logging: false,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};