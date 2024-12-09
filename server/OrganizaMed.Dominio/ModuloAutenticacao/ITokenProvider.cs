namespace OrganizaMed.Dominio.ModuloAutenticacao;

public interface ITokenProvider
{
    IAccessToken GerarTokenDeAcesso(Usuario usuario);
}