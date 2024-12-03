namespace OrganizaMed.Dominio.Compartilhado;

public abstract class EntidadeBase
{
    public Guid Id { get; set; }

    protected EntidadeBase()
    {
        Id = Guid.NewGuid();
    }
}