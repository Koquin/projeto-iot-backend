// repositories/cenaRepositorio.js
import pool from '../db.js';

export class CenaRepositorio {
  static async criar(usuario_id, nome, descricao) {
    const result = await pool.query(
      'INSERT INTO Cena (usuario_id, nome, descricao) VALUES ($1, $2, $3) RETURNING *',
      [usuario_id, nome, descricao]
    );
    return result.rows[0];
  }

  static async listar() {
    const result = await pool.query('SELECT * FROM Cena');
    return result.rows;
  }

  static async buscarPorId(id) {
    const result = await pool.query('SELECT * FROM Cena WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async atualizar(id, usuario_id, nome, descricao) {
    const result = await pool.query(
      'UPDATE Cena SET usuario_id = $1, nome = $2, descricao = $3 WHERE id = $4 RETURNING *',
      [usuario_id, nome, descricao, id]
    );
    return result.rows[0] || null;
  }

  static async deletar(id) {
    const result = await pool.query('DELETE FROM Cena WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }

  static async associarAcao(cena_id, acaocena_id) {
    const result = await pool.query(
      'INSERT INTO cena_acaocena (cena_id, acaocena_id) VALUES ($1, $2) RETURNING *',
      [cena_id, acaocena_id]
    );
    return result.rows[0];
  }

  static async desassociarAcao(cena_id, acaocena_id) {
    const result = await pool.query(
      'DELETE FROM cena_acaocena WHERE cena_id = $1 AND acaocena_id = $2',
      [cena_id, acaocena_id]
    );
    return (result.rowCount ?? 0) > 0;
  }

  static async buscarAcoesDaCena(id) {
    const result = await pool.query(
      `SELECT acaoCena.* FROM acaoCena 
       INNER JOIN cena_acaocena ON acaoCena.id = cena_acaocena.acaocena_id 
       WHERE cena_acaocena.cena_id = $1`,
      [id]
    );
    return result.rows;
  }

  
}