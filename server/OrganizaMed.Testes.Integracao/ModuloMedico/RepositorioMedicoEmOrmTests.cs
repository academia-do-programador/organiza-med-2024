using Microsoft.EntityFrameworkCore;
using OrganizaMed.Dominio.ModuloMedico;
using OrganizaMed.Infraestrutura.Orm.ModuloMedico;
using OrganizaMed.Testes.Integracao.Compartilhado;
using System.Diagnostics;

namespace OrganizaMed.Testes.Integracao.ModuloMedico;

[TestClass]
[TestCategory("Testes de Integração")]
public class RepositorioMedicoOrmTests : TesteIntegracaoBase
{
    private readonly IRepositorioMedico _repositorioMedicoOrm;

    public RepositorioMedicoOrmTests()
    {
        _repositorioMedicoOrm = new RepositorioMedicoEmOrm(DbContext);
    }

    [TestInitialize]
    public void Inicializar()
    {
        Debug.WriteLine("Criando banco de dados");
        DbContext.Database.EnsureDeleted();

        DbContext.Database.Migrate();
        Debug.WriteLine("Banco de dados criado com sucesso");
    }

    [TestMethod]
    public async Task Deve_Inserir_Medico_Corretamente()
    {
        // Arrange
        var entidadeOriginal = new Medico("João da Silva", "12345-SP");

        // Act
        var id = await _repositorioMedicoOrm.InserirAsync(entidadeOriginal);

        await DbContext.SaveChangesAsync();

        // Assert
        var entidadeSelecionada = await _repositorioMedicoOrm.SelecionarPorIdAsync(id);

        Assert.IsNotNull(entidadeSelecionada);
        Assert.AreEqual(entidadeOriginal, entidadeSelecionada);
    }

    [TestMethod]
    public async Task Deve_Editar_Medico_Corretamente()
    {
        // Arrange
        var entidadeOriginal = new Medico("João da Silva", "12345-SP");

        var id = await _repositorioMedicoOrm.InserirAsync(entidadeOriginal);

        await DbContext.SaveChangesAsync();

        entidadeOriginal.Nome = "Marco da Silva";
        entidadeOriginal.Crm = "12369-SP";

        // Act
        var edicaoBemSucedida = await _repositorioMedicoOrm.EditarAsync(entidadeOriginal);

        await DbContext.SaveChangesAsync();

        // Assert
        var entidadeSelecionada = await _repositorioMedicoOrm.SelecionarPorIdAsync(id);

        Assert.IsTrue(edicaoBemSucedida);
        Assert.AreEqual(entidadeOriginal, entidadeSelecionada);
    }

    [TestMethod]
    public async Task Deve_Excluir_Medico_Corretamente()
    {
        // Arrange
        var entidadeOriginal = new Medico("João da Silva", "12345-SP");

        var id = await _repositorioMedicoOrm.InserirAsync(entidadeOriginal);

        await DbContext.SaveChangesAsync();

        // Act
        var exclusaoBemSucedida = await _repositorioMedicoOrm.ExcluirAsync(entidadeOriginal);

        await DbContext.SaveChangesAsync();

        // Assert
        var entidadeSelecionada = await _repositorioMedicoOrm.SelecionarPorIdAsync(id);

        Assert.IsTrue(exclusaoBemSucedida);
        Assert.IsNull(entidadeSelecionada);
    }

    [TestMethod]
    public async Task Deve_Selecionar_Medicos_Corretamente()
    {
        // Arrange
        List<Medico> medicos = new List<Medico>
        {
            new Medico("João da Silva", "12345-SP"),
            new Medico("Pedro Alves", "32511-SP")
        };

        foreach (var medico in medicos)
            await _repositorioMedicoOrm.InserirAsync(medico);

        await DbContext.SaveChangesAsync();

        // Act
        var entidades = await _repositorioMedicoOrm.SelecionarTodosAsync();

        // Assert
        CollectionAssert.AreEqual(medicos, entidades.ToList());
    }
}