import { DataSource } from "typeorm";

export default new DataSource({
    type: "postgres",
    host: "bd_postgres",//"localhost",
    port: 5432,//5432,
    username: 'postgres',
    password: '12345',
    database: 'backend_nest_inventario',
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/database/migrations/*.ts'],
});