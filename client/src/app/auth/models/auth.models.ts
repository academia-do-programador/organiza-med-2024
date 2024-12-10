export interface RegistrarUsuarioRequest {
  userName: string;
  email: string;
  password: string;
}

export interface AutenticarUsuarioRequest {
  userName: string;
  password: string;
}

export interface TokenResponse {
  chave: string;
  dataExpiracao: Date;
  usuario: UsuarioAutenticadoDto;
}

export interface UsuarioAutenticadoDto {
  id: string;
  userName: string;
  email: string;
}
