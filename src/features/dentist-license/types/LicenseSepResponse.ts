export interface LicenseSepResponse {
  items: Array<LicenseSepResponseItem>;
}

interface LicenseSepResponseItem {
  anioreg: number;
  desins: string;
  idCedula: string;
  materno: string;
  nombre: string;
  paterno: string;
  titulo: string;
}
