export default {
    type: 'sqlite',
    database: '/home/ubuntu/pis.db',
    synchronize: true,
    logging: false,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};