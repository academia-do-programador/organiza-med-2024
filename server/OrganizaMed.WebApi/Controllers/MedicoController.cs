using MediatR;
using Microsoft.AspNetCore.Mvc;
using OrganizaMed.Aplicacao.ModuloMedico.Commands.Editar;
using OrganizaMed.Aplicacao.ModuloMedico.Commands.Excluir;
using OrganizaMed.Aplicacao.ModuloMedico.Commands.Inserir;
using OrganizaMed.Aplicacao.ModuloMedico.Commands.SelecionarPorId;
using OrganizaMed.Aplicacao.ModuloMedico.Commands.SelecionarTodos;
using OrganizaMed.WebApi.Extensions;

namespace OrganizaMed.WebApi.Controllers;

[ApiController]
[Route("api/medicos")]
public class MedicoController(IMediator mediator) : ControllerBase
{

    [HttpPost]
    [ProducesResponseType(typeof(InserirMedicoResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> Inserir(InserirMedicoRequest request)
    {
        var resultado = await mediator.Send(request);

        return resultado.ToHttpResponse();
    }

    [HttpPut("{id:guid}")]
    [ProducesResponseType(typeof(EditarMedicoResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> Editar(Guid id, EditarMedicoPartialRequest request)
    {
        var editarRequest = new EditarMedicoRequest(
            id,
            request.Nome,
            request.Crm
        );

        var resultado = await mediator.Send(editarRequest);

        return resultado.ToHttpResponse();
    }

    [HttpDelete("{id:guid}")]
    [ProducesResponseType(typeof(ExcluirMedicoResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> Excluir(Guid id)
    {
        var excluirRequest = new ExcluirMedicoRequest(id);

        var resultado = await mediator.Send(excluirRequest);

        return resultado.ToHttpResponse();
    }

    [HttpGet]
    [ProducesResponseType(typeof(SelecionarMedicosResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> SelecionarTodos()
    {
        var resultado = await mediator.Send(new SelecionarMedicosRequest());

        return resultado.ToHttpResponse();
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(SelecionarMedicoPorIdResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> SelecionarPorId(Guid id)
    {
        var selecionarPorIdRequest = new SelecionarMedicoPorIdRequest(id);

        var resultado = await mediator.Send(selecionarPorIdRequest);

        return resultado.ToHttpResponse();
    }
}
