export type LicenseResponse = {
  items: ItemsLicense[];
  filename?: string;
  idCedula?: string;
  idProfesionista?: string;
  sessionId?: string;
  theStream?: string;
  token?: string;
  urlVideo?: string;
};

export type ItemsLicense = {
  anioreg: number;
  carArea?: string;
  carCons?: string;
  carNivel?: string;
  carSarea?: string;
  curp?: string;
  desins: string;
  foja?: string;
  idCedula: string;
  inscons: number;
  insedo: number;
  libro: string;
  materno: string;
  maternoM: string;
  nombre: string;
  nombreM?: string;
  numero?: string;
  paterno: string;
  paternoM?: string;
  sexo: '1' | '2';
  tipo: string;
  titulo: string;
};
