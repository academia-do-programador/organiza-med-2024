export interface LinkNavegacao {
  titulo: string;
  icone: string;
  rota: string;
  subLinks?: SubLink[];
}

export interface SubLink {
  titulo: string;
  icone: string;
  rota: string;
}
