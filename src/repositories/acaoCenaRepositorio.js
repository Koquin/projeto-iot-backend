// repositories/acaoCenaRepositorio.js
import pool from '../db.js';

export class AcaoCenaRepositorio {
  static async criar(dispositivo_id, cena_id, intervalo, estadoDesejado) {
    const result = await pool.query(
      'INSERT INTO AcaoCena (dispositivo_id, cena_id, intervalo, estadoDesejado) VALUES ($1, $2, $3, $4) RETURNING *',
      [dispositivo_id, cena_id, intervalo, estadoDesejado]
    );
    return result.rows[0];
  }

  static async listar() {
    const result = await pool.query('SELECT * FROM AcaoCena');
    return result.rows;
  }

  static async buscarPorId(id) {
    const result = await pool.query('SELECT * FROM AcaoCena WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async atualizar(id, dispositivo_id, cena_id, intervalo, estadoDesejado) {
    const result = await pool.query(
      'UPDATE AcaoCena SET dispositivo_id = $1, cena_id = $2, intervalo = $3, estadoDesejado = $4 WHERE id = $5 RETURNING *',
      [dispositivo_id, cena_id, intervalo, estadoDesejado, id]
    );
    return result.rows[0] || null;
  }

  static async deletar(id) {
    const result = await pool.query('DELETE FROM AcaoCena WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }
}