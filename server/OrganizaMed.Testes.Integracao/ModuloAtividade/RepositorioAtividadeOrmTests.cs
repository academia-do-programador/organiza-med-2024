using Microsoft.EntityFrameworkCore;
using OrganizaMed.Dominio.ModuloAtividade;
using OrganizaMed.Dominio.ModuloMedico;
using OrganizaMed.Infraestrutura.Orm.ModuloAtividade;
using OrganizaMed.Infraestrutura.Orm.ModuloMedico;
using OrganizaMed.Testes.Integracao.Compartilhado;
using System.Diagnostics;

namespace OrganizaMed.Testes.Integracao.ModuloAtividade;

[TestClass]
[TestCategory("Testes de Integração")]
public class RepositorioAtividadeOrmTests : TesteIntegracaoBase
{
    private readonly IRepositorioMedico _repositorioMedico;
    private readonly IRepositorioAtividadeMedica _repositorioAtividadeMedica;

    public RepositorioAtividadeOrmTests()
    {
        _repositorioMedico = new RepositorioMedicoEmOrm(DbContext);
        _repositorioAtividadeMedica = new RepositorioAtividadeMedicaEmOrm(DbContext);
    }

    [TestInitialize]
    public void Inicializar()
    {
        Debug.WriteLine("Criando banco de dados");
        DbContext.Database.EnsureDeleted();

        DbContext.Database.Migrate();
        Debug.WriteLine("Banco de dados criado com sucesso");
    }

    // Consultas
    [TestMethod]
    public async Task Deve_Inserir_Consulta_Corretamente()
    {
        // Arrange
        var medico = new Medico("João da Silva", "12345-SP");

        await _repositorioMedico.InserirAsync(medico);

        var atividade = new Consulta(DateTime.Today, DateTime.Today.AddHours(1), medico);

        // Act
        await _repositorioAtividadeMedica.InserirAsync(atividade);

        await DbContext.SaveChangesAsync();

        // Assert
        var entidadeSelecionada = await _repositorioAtividadeMedica.SelecionarPorIdAsync(atividade.Id);

        Assert.IsNotNull(entidadeSelecionada);
    }

    [TestMethod]
    public async Task Deve_Editar_Consulta_Corretamente()
    {
        // Arrange
        var medico = new Medico("João da Silva", "12345-SP");

        await _repositorioMedico.InserirAsync(medico);

        var atividade = new Consulta(DateTime.Today, DateTime.Today.AddHours(1), medico);

        await _repositorioAtividadeMedica.InserirAsync(atividade);

        await DbContext.SaveChangesAsync();

        atividade.Inicio = DateTime.Today.AddDays(5);
        atividade.Termino = DateTime.Today.AddDays(5).AddHours(1);

        // Act
        await _repositorioAtividadeMedica.EditarAsync(atividade);

        await DbContext.SaveChangesAsync();

        // Assert
        var entidadeSelecionada = await _repositorioAtividadeMedica.SelecionarPorIdAsync(atividade.Id);

        Assert.AreEqual(atividade, entidadeSelecionada);
    }

    [TestMethod]
    public async Task Deve_Excluir_Consulta_Corretamente()
    {
        // Arrange
        var medico = new Medico("João da Silva", "12345-SP");

        await _repositorioMedico.InserirAsync(medico);

        var atividade = new Consulta(DateTime.Today, DateTime.Today.AddHours(1), medico);

        await _repositorioAtividadeMedica.InserirAsync(atividade);

        await DbContext.SaveChangesAsync();

        // Act
        await _repositorioAtividadeMedica.ExcluirAsync(atividade);

        await DbContext.SaveChangesAsync();

        // Assert
        var entidadeSelecionada = await _repositorioAtividadeMedica.SelecionarPorIdAsync(atividade.Id);

        Assert.IsNull(entidadeSelecionada);
    }

    // Cirurgias
    [TestMethod]
    public async Task Deve_Inserir_Cirurgia_Corretamente()
    {
        // Arrange
        List<Medico> medicos =
        [
            new("João da Silva", "12345-SP"),
            new("Ana Siqueira", "32155-SP"),
            new("Gabriel Alves", "45123-SP"),
        ];

        foreach (var medico in medicos)
            await _repositorioMedico.InserirAsync(medico);

        await DbContext.SaveChangesAsync();

        var atividade = new Cirurgia(DateTime.Today, DateTime.Today.AddHours(6), medicos);

        // Act
        var id = await _repositorioAtividadeMedica.InserirAsync(atividade);

        await DbContext.SaveChangesAsync();

        // Assert
        var entidadeSelecionada = await _repositorioAtividadeMedica.SelecionarPorIdAsync(id);

        Assert.IsNotNull(entidadeSelecionada);
    }

    [TestMethod]
    public async Task Deve_Editar_Cirurgia_Corretamente()
    {
        // Arrange
        List<Medico> medicos =
        [
            new("João da Silva", "12345-SP"),
            new("Ana Siqueira", "32155-SP"),
            new("Gabriel Alves", "45123-SP"),
        ];

        foreach (var medico in medicos)
            await _repositorioMedico.InserirAsync(medico);

        await DbContext.SaveChangesAsync();

        var atividade = new Cirurgia(DateTime.Today, DateTime.Today.AddHours(6), medicos);

        var id = await _repositorioAtividadeMedica.InserirAsync(atividade);

        await DbContext.SaveChangesAsync();

        atividade.Inicio = DateTime.Today.AddDays(5);
        atividade.Termino = DateTime.Today.AddDays(5).AddHours(5);

        atividade.RemoverMedico(medicos.Last());

        // Act
        await _repositorioAtividadeMedica.EditarAsync(atividade);

        // Assert
        var entidadeSelecionada = await _repositorioAtividadeMedica.SelecionarPorIdAsync(id);

        Assert.AreEqual(atividade, entidadeSelecionada);
    }

    [TestMethod]
    public async Task Deve_Excluir_Cirurgia_Corretamente()
    {
        // Arrange
        List<Medico> medicos =
        [
            new("João da Silva", "12345-SP"),
            new("Ana Siqueira", "32155-SP"),
            new("Gabriel Alves", "45123-SP"),
        ];

        foreach (var medico in medicos)
            await _repositorioMedico.InserirAsync(medico);

        await DbContext.SaveChangesAsync();

        var atividade = new Cirurgia(DateTime.Today, DateTime.Today.AddHours(6), medicos);

        var id = await _repositorioAtividadeMedica.InserirAsync(atividade);

        await DbContext.SaveChangesAsync();

        // Act
        await _repositorioAtividadeMedica.ExcluirAsync(atividade);

        await DbContext.SaveChangesAsync();

        // Assert
        var entidadeSelecionada = await _repositorioAtividadeMedica.SelecionarPorIdAsync(id);

        Assert.IsNull(entidadeSelecionada);
    }
}