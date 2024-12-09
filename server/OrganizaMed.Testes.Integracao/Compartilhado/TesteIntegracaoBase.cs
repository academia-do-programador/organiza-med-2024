using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NoteKeeper.Dominio.ModuloAutenticacao;
using OrganizaMed.Infraestrutura.Orm.Compartilhado;

namespace OrganizaMed.Testes.Integracao.Compartilhado;

public abstract class TesteIntegracaoBase
{
    protected OrganizaMedDbContext DbContext { get; }
    protected ITenantProvider TenantProvider { get; }

    protected TesteIntegracaoBase()
    {
        var config = new ConfigurationBuilder()
            .AddUserSecrets<TesteIntegracaoBase>()
            .Build();

        var options = new DbContextOptionsBuilder<OrganizaMedDbContext>()
            .UseSqlServer(config["SQLSERVER_CONNECTION_STRING"])
            .Options;

        TenantProvider = new TestTenantProvider()
        {
            UsuarioId = Guid.NewGuid()
        };

        DbContext = new OrganizaMedDbContext(options, TenantProvider);
    }
}