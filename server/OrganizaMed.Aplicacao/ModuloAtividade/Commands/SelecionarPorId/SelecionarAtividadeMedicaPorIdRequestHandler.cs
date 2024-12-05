using FluentResults;
using MediatR;
using OrganizaMed.Aplicacao.Compartilhado;
using OrganizaMed.Dominio.ModuloAtividade;

namespace OrganizaMed.Aplicacao.ModuloAtividade.Commands.SelecionarPorId;

public class SelecionarAtividadeMedicaPorIdRequestHandler(IRepositorioAtividadeMedica repositorioAtividadeMedica) : IRequestHandler<SelecionarAtividadeMedicaPorIdRequest, Result<SelecionarAtividadeMedicaPorIdResponse>>
{
    public async Task<Result<SelecionarAtividadeMedicaPorIdResponse>> Handle(
        SelecionarAtividadeMedicaPorIdRequest request, CancellationToken cancellationToken)
    {
        var atividadeSelecionada = await repositorioAtividadeMedica.SelecionarPorIdAsync(request.Id);

        if (atividadeSelecionada == null)
            return Result.Fail(ErrorResults.NotFoundError(request.Id));


        var resposta = new SelecionarAtividadeMedicaPorIdResponse(
            atividadeSelecionada.Id,
            atividadeSelecionada.Inicio,
            atividadeSelecionada.Termino,
            atividadeSelecionada.TipoAtividade,
            atividadeSelecionada.Medicos
                .Select(a => new SelecionarMedicoDto(a.Id, a.Nome, a.Crm))
        );

        return Result.Ok(resposta);
    }
}