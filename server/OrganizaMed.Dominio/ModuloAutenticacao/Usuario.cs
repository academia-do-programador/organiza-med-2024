﻿using Microsoft.AspNetCore.Identity;

namespace NoteKeeper.Dominio.ModuloAutenticacao;

public class Usuario : IdentityUser<Guid>
{
    public Usuario()
    {
        Id = Guid.NewGuid();
        EmailConfirmed = true;
    }
}