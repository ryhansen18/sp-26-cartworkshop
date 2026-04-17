# amis4630-spring26-cartlab

## Test Credentials

| Email | Password |
|-------|----------|
| test@osu.edu | Password1! |
| admin@osu.edu | Password1! |

## JWT 
```bash
cd backend
dotnet user-secrets set "Jwt:Key" "your-secret-key-32-chars-minimum"
dotnet user-secrets set "Jwt:Issuer" "BuckeyeMarketplace"
dotnet user-secrets set "Jwt:Audience" "BuckeyeMarketplaceUsers"
```