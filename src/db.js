import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'notebook',
  password: 'sua_senha_aqui',
  port: 5433,
});

export default pool;