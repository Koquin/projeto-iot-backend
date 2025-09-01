// repositories/dispositivoRepositorio.js
import pool from '../db.js';

export class DispositivoRepositorio {
  static async criar(nome, tipo, estado, comodo_id) {
    const result = await pool.query(
      'INSERT INTO Dispositivo (nome, tipo, estado, comodo_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, tipo, estado, comodo_id]
    );
    return result.rows[0];
  }

  static async listar() {
    const result = await pool.query('SELECT * FROM Dispositivo');
    return result.rows;
  }

  static async buscarPorId(id) {
    const result = await pool.query('SELECT * FROM Dispositivo WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async atualizar(id, nome, tipo, estado, comodo_id) {
    const result = await pool.query(
      'UPDATE Dispositivo SET nome = $1, tipo = $2, estado = $3, comodo_id = $4 WHERE id = $5 RETURNING *',
      [nome, tipo, estado, comodo_id, id]
    );
    return result.rows[0] || null;
  }

  static async deletar(id) {
    const result = await pool.query('DELETE FROM Dispositivo WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }

  static async atualizarEstado(id, novoEstado) {
    const result = await pool.query(
      'UPDATE Dispositivo SET estado = $1 WHERE id = $2 RETURNING *',
      [novoEstado, id]
    );
    return result.rows[0] || null;
  }
}