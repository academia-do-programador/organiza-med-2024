using FluentResults;
using MediatR;
using OrganizaMed.Dominio.ModuloAtividade;

namespace OrganizaMed.Aplicacao.ModuloAtividade.Commands.Editar;

public record EditarAtividadeMedicaPartialRequest(
    DateTime Inicio,
    DateTime Termino,
    IEnumerable<Guid> Medicos
) : IRequest<Result<EditarAtividadeMedicaResponse>>;