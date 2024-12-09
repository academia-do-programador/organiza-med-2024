# OrganizaMed

[![Stack](https://skillicons.dev/icons?i=dotnet,cs,postman,nodejs,typescript,angular&perline=8)](https://skillicons.dev)

## Projeto

Desenvolvido durante o curso Full-Stack da [Academia do Programador](https://www.academiadoprogramador.net) 2024

## Descrição

Uma clínica médica é um centro onde atividades, como cirurgias e consultas, são realizadas por profissionais médicos. Os alunos da Academia do Programador 2024 foram contratados para criar um aplicativo web que mantenha e organize o cronograma dessas atividades dentro da clínica.

## Funcionalidades

1. O cadastro do **Médicos** consiste de:

   - nome
   - CRM
   - atividades

2. O cadastro do **Atividades Médicas** consiste de:
   - início
   - término
   - tipo de atividade (consulta ou cirurgia)
   - médicos

## Requisitos para Execução do Projeto Completo

- .NET SDK (recomendado .NET 8.0 ou superior) para compilação e execução do projeto back-end.
- Node.js v20+
- Angular v18

## Configuração de Variáveis de Ambiente (Desenvolvimento)

O funcionamento da aplicação depende que variáveis de ambiente sejam configuradas.

Utilize o sistema de gerenciamento de segredos de usuário do dotnet (dotnet user secrets). [Documentação da Microsoft](https://learn.microsoft.com/pt-br/aspnet/core/security/app-secrets?view=aspnetcore-9.0&tabs=windows) no projeto **OrganizaMed.WebApi**.

```json
{
  "SQLSERVER_CONNECTION_STRING": "{substitua-pelo-segredo}",
  "NEWRELIC_LICENSE_KEY": "{substitua-pelo-segredo}",
  "JWT_GENERATION_KEY": "{substitua-pelo-segredo}",
  "JWT_AUDIENCE_DOMAIN": "https://localhost"
}
```

## Executando o Back-End

Vá para a pasta do projeto da WebAPI:

```bash
cd server/OrganizaMed.WebApi
```

Execute o projeto:

```bash
dotnet run
```

A API poderá ser acessada no endereço `https://localhost:7043/api`.

A documentação **OpenAPI** também estará disponível em: `https://localhost:7043/swagger`.

## Executando o Front-End

Vá para a pasta do projeto Angular:

```bash
cd client
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm start
```

A aplicação Angular estárá disponível no endereço `http://localhost:4200`.
