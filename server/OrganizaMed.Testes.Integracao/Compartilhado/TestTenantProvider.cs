using OrganizaMed.Dominio.ModuloAutenticacao;

namespace OrganizaMed.Testes.Integracao.Compartilhado;

public class TestTenantProvider : ITenantProvider
{
    public Guid? UsuarioId { get; set; }
}
