using OrganizaMed.Aplicacao.ModuloAtividade.Commands.SelecionarTodos;

namespace OrganizaMed.Aplicacao.ModuloPaciente.Commands.SelecionarPorId;

public record SelecionarPacientePorIdResponse(
    Guid Id,
    string Nome,
    string Cpf,
    string Email,
    string Telefone,
    IEnumerable<SelecionarAtividadesDto> Atividades
);