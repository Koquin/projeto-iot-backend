// entities/dispositivo.js
export class Dispositivo {
  constructor(id, nome, tipo, estado, comodo_id) {
    this.id = id;
    this.nome = nome;
    this.tipo = tipo;
    this.estado = estado;
    this.comodo_id = comodo_id;
  }
}