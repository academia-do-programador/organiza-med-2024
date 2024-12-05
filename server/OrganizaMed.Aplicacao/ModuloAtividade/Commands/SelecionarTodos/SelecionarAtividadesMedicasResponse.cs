using OrganizaMed.Aplicacao.ModuloMedico.Commands.SelecionarTodos;
using OrganizaMed.Dominio.ModuloAtividade;

namespace OrganizaMed.Aplicacao.ModuloAtividade.Commands.SelecionarTodos;

public record SelecionarAtividadesDto(
    Guid Id, 
    DateTime Inicio,
    DateTime? Termino,
    TipoAtividadeMedica TipoAtividade,
    IEnumerable<SelecionarMedicosDto> Medicos
);

public record SelecionarAtividadesMedicasResponse
{
    public required int QuantidadeRegistros { get; init; }
    public required IEnumerable<SelecionarAtividadesDto> Registros { get; init; }
}