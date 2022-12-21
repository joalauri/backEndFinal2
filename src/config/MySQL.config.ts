import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(".env")});

export const mysqlDBConfig = { host:"127.0.0.1",
port: 3307,
user: 'Joaquin2',
password: process.env.PASSWORD_MYSQL,
database: 'coderhousedb'}
