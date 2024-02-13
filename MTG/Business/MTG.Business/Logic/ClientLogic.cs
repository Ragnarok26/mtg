using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MTG.Business.Logic.Interface;
using MTG.Data.Operations.Interface;
using MTG.Entities.Database;
using MTG.Entities.Models;
using MTG.Entities.Settings;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MTG.Business.Logic;

public class ClientLogic(IClientData clientData, IOptions<AuthenticationSettings> options) : IClientLogic
{
    public async Task<Client> Add(Client client)
    {
        return await clientData.Add(client);
    }

    public async Task<Client?> Delete(string id)
    {
        return await clientData.Delete(Guid.Parse(id));
    }

    public async Task<IEnumerable<Client>?> GetAll()
    {
        return await clientData.GetAll();
    }

    public async Task<Client?> GetById(string id)
    {
        return await clientData.GetById(Guid.Parse(id));
    }

    public async Task<TokenResult> Login(Client data)
    {
        if (await clientData.ValidateUser(data.Username, data.Password))
        {
            var client = await clientData.GetByUsername(data.Username);
            if (client == null) throw new UnauthorizedAccessException();
            var date = DateTime.UtcNow;
            var expire = date.Add(TimeSpan.FromDays(5300));

            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, data.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat,
                    new DateTimeOffset(date).ToUniversalTime().ToUnixTimeSeconds().ToString(),
                    ClaimValueTypes.Integer64
                ),
                new Claim("id", client.Id.ToString()),
                new Claim("user", client.Username)
            };

            AuthenticationSettings authenticationSettings = options.Value;
            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(authenticationSettings.SigningKey)
                ),
                SecurityAlgorithms.HmacSha256Signature
            );
            var token = new JwtSecurityToken(
                issuer: authenticationSettings.Issuer,
                audience: authenticationSettings.Audience,
                claims: claims,
                notBefore: date,
                expires: expire,
                signingCredentials: signingCredentials
            );

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(token);

            return new TokenResult
            {
                Token = encodedJwt,
                ExpireAt = expire
            };
        }
        else
        {
            throw new UnauthorizedAccessException();
        }
    }

    public async Task<Client?> Update(Client client)
    {
        return await clientData.Update(client);
    }
}
