export interface AutorizaObject {
  autorizaciones: Autoriza[];
}

export interface Autoriza {
  culminacion: string;
  id: string;
  empresa: string;
  nombre: string;
  tipo_doc: string;
  n_doc: string;
  descripcion: string;
  valor: number;
  iva: number;
  total: number;
  name_doc: string;
  autorizado: number;
  token_autorizacion: string;
  user_autorizacion: string;
  motivo: string;
  fecha_autorizacion: string;
  user: string;
  img_pach: string;
}
