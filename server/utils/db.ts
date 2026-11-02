import mysql from 'mysql2/promise';

const config = useRuntimeConfig();

export const db = mysql.createPool({
	host: config.db.host,
	port: Number(config.db.port),
	user: config.db.user,
	password: config.db.password,
	database: config.db.name,
});
