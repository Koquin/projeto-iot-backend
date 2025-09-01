// repositories/comodoRepositorio.js
import pool from '../db.js';

export class ComodoRepositorio {
  static async criar(nome, descricao, usuario_id) {
    const result = await pool.query(
      'INSERT INTO Comodo (nome, descricao, usuario_id) VALUES ($1, $2, $3) RETURNING *',
      [nome, descricao, usuario_id]
    );
    return result.rows[0];
  }

  static async listar() {
    const result = await pool.query('SELECT * FROM Comodo');
    return result.rows;
  }

  static async buscarPorId(id) {
    const result = await pool.query('SELECT * FROM Comodo WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async atualizar(id, nome, descricao, usuario_id) {
    const result = await pool.query(
      'UPDATE Comodo SET nome = $1, descricao = $2, usuario_id = $3 WHERE id = $4 RETURNING *',
      [nome, descricao, usuario_id, id]
    );
    return result.rows[0] || null;
  }

  static async deletar(id) {
    const result = await pool.query('DELETE FROM Comodo WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }
}