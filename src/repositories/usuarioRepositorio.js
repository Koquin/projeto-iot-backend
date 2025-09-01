// repositories/usuarioRepositorio.js
import pool from '../db.js';

export class UsuarioRepositorio {
  static async criar(nome, email, senha) {
    const result = await pool.query(
      'INSERT INTO Usuario (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, senha]
    );
    return result.rows[0];
  }

  static async listar() {
    const result = await pool.query('SELECT * FROM Usuario');
    return result.rows;
  }

  static async buscarPorId(id) {
    const result = await pool.query('SELECT * FROM Usuario WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async atualizar(id, nome, email, senha) {
    const result = await pool.query(
      'UPDATE Usuario SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *',
      [nome, email, senha, id]
    );
    return result.rows[0] || null;
  }

  static async deletar(id) {
    const result = await pool.query('DELETE FROM Usuario WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }
}