namespace MTG.Entities.Settings;

public class AuthenticationSettings
{
    public string Issuer { get; set; } = null!;
    public string Audience { get; set; } = null!;
    public string SigningKey { get; set; } = null!;
}