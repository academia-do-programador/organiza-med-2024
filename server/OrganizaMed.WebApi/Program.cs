
using OrganizaMed.WebApi.Config;
using Serilog;

namespace OrganizaMed.WebApi;

public class Program
{
    public static void Main(string[] args)
    {
        const string corsPolicyName = "PoliticaCorsOrganizaMed";

        var builder = WebApplication.CreateBuilder(args);

        // Logging [env NEWRELIC_LICENSE_KEY]
        builder.Services.ConfigureSerilog(builder.Logging, builder.Configuration);

        // Database Provider [env SQLSERVER_CONNECTION_STRING]
        builder.Services.ConfigureDbContext(builder.Configuration, builder.Environment);

        // Validation
        builder.Services.ConfigureFluentValidation();

        // Services
        builder.Services.ConfigureRepositories();
        builder.Services.ConfigureMediatR();

        // Auth [env JWT_GENERATION_KEY, JWT_AUDIENCE_DOMAIN]
        builder.Services.ConfigureJwtAuthentication(builder.Configuration);
        builder.Services.ConfigureIdentityProviders();

        // Controllers
        builder.Services.ConfigureControllersWithFilters();

        // API Documentation 
        builder.Services.ConfigureOpenApiAuthHeaders();

        // CORS
        builder.Services.ConfigureCorsPolicy(corsPolicyName);

        var app = builder.Build();

        app.UseGlobalExceptionHandler();

        var migracoesRealizadas = app.AutoMigrateDatabase();

        Log.Debug(migracoesRealizadas
            ? "Migrações de banco de dados realizadas."
            : "Nenhuma migração de banco de dados aplicadas."
        );

        app.UseSwagger();

        app.UseSwaggerUI();

        app.UseHttpsRedirection();

        app.UseCors(corsPolicyName);

        app.UseAuthentication();

        app.UseAuthorization();

        app.MapControllers();

        try
        {
            app.Run();
        }
        catch (Exception ex)
        {
            Log.Fatal("Ocorreu um erro fatal durante a execução da aplicação: {@Excecao}", ex);
        }
    }
}
