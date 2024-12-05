using Microsoft.EntityFrameworkCore;
using OrganizaMed.Dominio.Compartilhado;
using OrganizaMed.Infraestrutura.Orm.ModuloAtividade;
using OrganizaMed.Infraestrutura.Orm.ModuloMedico;

namespace OrganizaMed.Infraestrutura.Orm.Compartilhado;

public class OrganizaMedDbContext(DbContextOptions options) : DbContext(options), IContextoPersistencia
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new MapeadorMedicoEmOrm());
        modelBuilder.ApplyConfiguration(new MapeadorAtividadeMedicaEmOrm());

        base.OnModelCreating(modelBuilder);
    }

    public async Task<int> GravarAsync()
    {
        return await SaveChangesAsync();
    }

    public async Task RollbackAsync()
    {
        foreach (var entry in ChangeTracker.Entries())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.State = EntityState.Detached;
                    break;
                case EntityState.Modified:
                    entry.State = EntityState.Unchanged;
                    break;
                case EntityState.Deleted:
                    entry.State = EntityState.Unchanged;
                    break;
            }
        }

        await Task.CompletedTask;
    }
}

