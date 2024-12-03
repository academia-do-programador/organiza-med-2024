using Microsoft.EntityFrameworkCore;
using OrganizaMed.Dominio.Compartilhado;
using OrganizaMed.Dominio.ModuloMedico;
using OrganizaMed.Infraestrutura.Orm.Compartilhado;

namespace OrganizaMed.Infraestrutura.Orm.ModuloMedico;

public class RepositorioMedicoEmOrm(IContextoPersistencia context)
    : RepositorioBase<Medico>(context), IRepositorioMedico
{
    public override Task<Medico?> SelecionarPorIdAsync(Guid id)
    {
        return registros.FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<List<Medico>> SelecionarMuitosPorId(IEnumerable<Guid> medicosRequisitados)
    {
        return await registros.Where(m => medicosRequisitados.Contains(m.Id)).ToListAsync();
    }
}