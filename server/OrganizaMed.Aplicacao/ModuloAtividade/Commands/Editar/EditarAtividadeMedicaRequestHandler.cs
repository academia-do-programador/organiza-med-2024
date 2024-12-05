using FluentResults;
using FluentValidation;
using MediatR;
using OrganizaMed.Aplicacao.Compartilhado;
using OrganizaMed.Dominio.Compartilhado;
using OrganizaMed.Dominio.ModuloAtividade;
using OrganizaMed.Dominio.ModuloMedico;

namespace OrganizaMed.Aplicacao.ModuloAtividade.Commands.Editar;

public class EditarAtividadeMedicaRequestHandler(
    IRepositorioAtividadeMedica repositorioAtividadeMedica,
    IRepositorioMedico repositorioMedico,
    IContextoPersistencia contexto,
    IValidator<AtividadeMedica> validador
) : IRequestHandler<EditarAtividadeMedicaRequest, Result<EditarAtividadeMedicaResponse>>
{
    public async Task<Result<EditarAtividadeMedicaResponse>> Handle(
        EditarAtividadeMedicaRequest request, CancellationToken cancellationToken)
    {
        var atividadeSelecionada = await repositorioAtividadeMedica.SelecionarPorIdAsync(request.Id);

        if (atividadeSelecionada is null)
            return Result.Fail(ErrorResults.NotFoundError(request.Id));

        atividadeSelecionada.Inicio = request.Inicio;
        atividadeSelecionada.Termino = request.Termino;

        if (request.MedicosAdicionados is not null && request.MedicosAdicionados.Count > 0)
        {
            var medicosSelecionados = await repositorioMedico.SelecionarMuitosPorId(request.MedicosAdicionados);

            if (medicosSelecionados.Count == 0)
                return Result.Fail(AtividadeMedicaErrorResults.MedicosNaoEncontradosError());

            foreach (var medico in medicosSelecionados)
                atividadeSelecionada.AdicionarMedico(medico);
        }

        if (request.MedicosRemovidos is not null && request.MedicosRemovidos.Count > 0)
        {
            var medicosSelecionados = await repositorioMedico.SelecionarMuitosPorId(request.MedicosRemovidos);

            if (medicosSelecionados.Count == 0)
                return Result.Fail(AtividadeMedicaErrorResults.MedicosNaoEncontradosError());

            foreach (var medico in medicosSelecionados)
                atividadeSelecionada.RemoverMedico(medico);
        }

        var resultadoValidacao =
            await validador.ValidateAsync(atividadeSelecionada, cancellationToken);

        if (!resultadoValidacao.IsValid)
        {
            var erros = resultadoValidacao.Errors
                .Select(failure => failure.ErrorMessage)
                .ToList();

            return Result.Fail(ErrorResults.BadRequestError(erros));
        }

        try
        {
            await repositorioAtividadeMedica.EditarAsync(atividadeSelecionada);

            await contexto.GravarAsync();
        }
        catch (Exception ex)
        {
            await contexto.RollbackAsync();

            return Result.Fail(ErrorResults.InternalServerError(ex));
        }

        return Result.Ok(new EditarAtividadeMedicaResponse(atividadeSelecionada.Id));
    }
}