﻿using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using OrganizaMed.Aplicacao.ModuloAutenticacao.DTOs;
using OrganizaMed.Dominio.ModuloAutenticacao;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace OrganizaMed.Aplicacao.ModuloAutenticacao.Services;

public class JwtProvider : ITokenProvider
{
    private readonly string? chaveJwt;
    private readonly DateTime dataExpiracaoJwt;
    private string? audienciaValida;

    public JwtProvider(IConfiguration config)
    {
        chaveJwt = config["JWT_GENERATION_KEY"];

        if (string.IsNullOrEmpty(chaveJwt))
            throw new ArgumentException("Chave de geração de tokens não configurada");

        audienciaValida = config["JWT_AUDIENCE_DOMAIN"];

        if (string.IsNullOrEmpty(audienciaValida))
            throw new ArgumentException("Audiência válida para transmissão de tokens não configurada");

        dataExpiracaoJwt = DateTime.Now.AddDays(3);
    }

    public IAccessToken GerarTokenDeAcesso(Usuario usuario)
    {
        var tokenHandler = new JwtSecurityTokenHandler();

        var chaveEmBytes = Encoding.ASCII.GetBytes(chaveJwt!);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Issuer = "OrganizaMed",
            Audience = audienciaValida,
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, usuario.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, usuario.Email!),
                new Claim(JwtRegisteredClaimNames.UniqueName, usuario.UserName!)
            }),
            Expires = dataExpiracaoJwt,
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(chaveEmBytes),
                SecurityAlgorithms.HmacSha256Signature
            )
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        var tokenString = tokenHandler.WriteToken(token);

        return new TokenResponse()
        {
            Chave = tokenString,
            DataExpiracao = dataExpiracaoJwt,
            Usuario = new UsuarioAutenticadoDto
            {
                Id = usuario.Id,
                UserName = usuario.UserName!,
                Email = usuario.Email!
            }
        };
    }
}