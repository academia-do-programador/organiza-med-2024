using Microsoft.EntityFrameworkCore;
using OrganizaMed.Dominio.Compartilhado;

namespace OrganizaMed.Infraestrutura.Orm.Compartilhado;

public class OrganizaMedDbContext(DbContextOptions option) : DbContext, IContextoPersistencia
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
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

