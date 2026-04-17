using Microsoft.AspNetCore.Identity;

namespace backend.Models;

public class AppUser : IdentityUser
{
    public ICollection<Cart> Carts { get; set; } = new List<Cart>();
}