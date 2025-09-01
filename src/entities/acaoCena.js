// entities/acaoCena.js
export class AcaoCena {
  constructor(dispositivo_id, cena_id, intervalo, estadoDesejado, id) {
    this.id = id;
    this.dispositivo_id = dispositivo_id;
    this.cena_id = cena_id;
    this.intervalo = intervalo;
    this.estadoDesejado = estadoDesejado;
  }
}