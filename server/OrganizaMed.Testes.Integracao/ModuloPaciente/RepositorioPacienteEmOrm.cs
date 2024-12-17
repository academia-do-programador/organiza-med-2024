using Microsoft.EntityFrameworkCore;
using OrganizaMed.Dominio.ModuloAutenticacao;
using OrganizaMed.Dominio.ModuloPaciente;
using OrganizaMed.Infraestrutura.Orm.ModuloPaciente;
using OrganizaMed.Testes.Integracao.Compartilhado;
using System.Diagnostics;

namespace OrganizaMed.Testes.Integracao.ModuloPaciente;

[TestClass]
[TestCategory("Testes de Integração")]
public class RepositorioPacienteOrmTests : TesteIntegracaoBase
{
    private readonly IRepositorioPaciente _repositorioPacienteOrm;

    public RepositorioPacienteOrmTests()
    {
        _repositorioPacienteOrm = new RepositorioPacienteEmOrm(DbContext);
    }

    [TestInitialize]
    public void Inicializar()
    {
        Debug.WriteLine("Criando banco de dados");
        DbContext.Database.EnsureDeleted();

        DbContext.Database.Migrate();
        Debug.WriteLine("Banco de dados criado com sucesso");

        DbContext.Users.Add(new Usuario
        {
            Id = TenantProvider.UsuarioId.GetValueOrDefault()
        });

        DbContext.SaveChanges();
    }

    [TestMethod]
    public async Task Deve_Inserir_Paciente_Corretamente()
    {
        // Arrange
        var pacienteOriginal = new Paciente("Maria Silva", "000.000.000-00", "maria@gmail.com", "(11) 98765-4321")
        {
            UsuarioId = TenantProvider.UsuarioId.GetValueOrDefault()
        };

        // Act
        var id = await _repositorioPacienteOrm.InserirAsync(pacienteOriginal);

        await DbContext.SaveChangesAsync();

        // Assert
        var pacienteSelecionado = await _repositorioPacienteOrm.SelecionarPorIdAsync(id);

        Assert.IsNotNull(pacienteSelecionado);
        Assert.AreEqual(pacienteOriginal, pacienteSelecionado);
    }

    [TestMethod]
    public async Task Deve_Editar_Paciente_Corretamente()
    {
        // Arrange
        var pacienteOriginal = new Paciente("Maria Silva", "000.000.000-00", "maria@gmail.com", "(11) 98765-4321")
        {
            UsuarioId = TenantProvider.UsuarioId.GetValueOrDefault()
        };

        var id = await _repositorioPacienteOrm.InserirAsync(pacienteOriginal);
        await DbContext.SaveChangesAsync();

        pacienteOriginal.Nome = "Mariana Souza";
        pacienteOriginal.Email = "mariana.souza@gmail.com";
        pacienteOriginal.Telefone = "11912345678";

        // Act
        var edicaoBemSucedida = await _repositorioPacienteOrm.EditarAsync(pacienteOriginal);
        await DbContext.SaveChangesAsync();

        // Assert
        var pacienteSelecionado = await _repositorioPacienteOrm.SelecionarPorIdAsync(id);

        Assert.IsTrue(edicaoBemSucedida);
        Assert.AreEqual(pacienteOriginal, pacienteSelecionado);
    }

    [TestMethod]
    public async Task Deve_Excluir_Paciente_Corretamente()
    {
        // Arrange
        var pacienteOriginal = new Paciente("Maria Silva", "000.000.000-00", "maria@gmail.com", "(11) 98765-4321")
        {
            UsuarioId = TenantProvider.UsuarioId.GetValueOrDefault()
        };

        var id = await _repositorioPacienteOrm.InserirAsync(pacienteOriginal);
        await DbContext.SaveChangesAsync();

        // Act
        var exclusaoBemSucedida = await _repositorioPacienteOrm.ExcluirAsync(pacienteOriginal);
        await DbContext.SaveChangesAsync();

        // Assert
        var pacienteSelecionado = await _repositorioPacienteOrm.SelecionarPorIdAsync(id);

        Assert.IsTrue(exclusaoBemSucedida);
        Assert.IsNull(pacienteSelecionado);
    }

    [TestMethod]
    public async Task Deve_Selecionar_Pacientes_Corretamente()
    {
        // Arrange
        List<Paciente> pacientes = new List<Paciente>
        {
            new Paciente("Maria Silva", "000.000.000-00", "maria@gmail.com", "(11) 98765-4321"),
            new Paciente("João Souza", "000.000.000-01", "joao.souza@gmail.com", "(11) 97654-3210")
        };

        foreach (var paciente in pacientes)
        {
            paciente.UsuarioId = TenantProvider.UsuarioId.GetValueOrDefault();
            await _repositorioPacienteOrm.InserirAsync(paciente);
        }

        await DbContext.SaveChangesAsync();

        // Act
        var entidades = await _repositorioPacienteOrm.SelecionarTodosAsync();

        // Assert
        Assert.AreEqual(2, entidades.Count);
        CollectionAssert.AreEquivalent(pacientes, entidades);
    }
}
