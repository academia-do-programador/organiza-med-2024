using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using OrganizaMed.Infraestrutura.Orm.Compartilhado;

namespace OrganizaMed.Testes.Integracao.Compartilhado;

public abstract class TesteIntegracaoBase
{
    protected OrganizaMedDbContext DbContext { get; }

    protected TesteIntegracaoBase()
    {
        var config = new ConfigurationBuilder()
            .AddUserSecrets<TesteIntegracaoBase>()
            .Build();

        var options = new DbContextOptionsBuilder<OrganizaMedDbContext>()
            .UseSqlServer(config["SQLSERVER_CONNECTION_STRING"])
            .Options;

        DbContext = new OrganizaMedDbContext(options);

    }
}