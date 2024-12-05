using FluentResults;
using MediatR;
using OrganizaMed.Dominio.ModuloAtividade;

namespace OrganizaMed.Aplicacao.ModuloAtividade.Commands.Editar;

public record EditarAtividadeMedicaPartialRequest(
    DateTime Inicio,
    DateTime Termino,
    List<Guid>? MedicosAdicionados = null,
    List<Guid>? MedicosRemovidos = null
) : IRequest<Result<EditarAtividadeMedicaResponse>>;