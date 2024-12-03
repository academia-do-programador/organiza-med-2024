using OrganizaMed.Dominio.Compartilhado;

namespace OrganizaMed.Dominio.ModuloMedico;

public class Medico : EntidadeBase
{
    public string Nome { get; set; }
    public string Crm { get; set; }

    protected Medico()
    {
    }

    public Medico(string nome, string crm) : this()
    {
        Nome = nome;
        Crm = crm;
    }
}
