using OrganizaMed.Dominio.ModuloAtividade;

namespace OrganizaMed.Aplicacao.ModuloAtividade.Commands.SelecionarPorId;

public record SelecionarMedicoDto(Guid Id, string Nome, string Crm);

public record SelecionarAtividadeMedicaPorIdResponse(
    Guid Id, 
    DateTime Inicio, 
    DateTime? Termino, 
    TipoAtividadeMedica TipoAtividade,
    IEnumerable<SelecionarMedicoDto> Medicos
);