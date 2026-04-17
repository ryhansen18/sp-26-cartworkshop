using System.Security.Claims;
using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize] // all cart endpoints require a valid JWT
public class CartController : ControllerBase
{
    private readonly MarketplaceContext _context;

    public CartController(MarketplaceContext context)
    {
        _context = context;
    }

    // UserId ALWAYS comes from the JWT claim — never from route or body
    private string GetUserId() =>
        User.FindFirstValue(ClaimTypes.NameIdentifier)
        ?? throw new UnauthorizedAccessException("User ID not found in token.");

    [HttpGet]
    public async Task<ActionResult<CartResponse>> GetCart()
    {
        var userId = GetUserId();
        var cart = await GetOrCreateCartAsync(userId);
        return Ok(MapToResponse(cart));
    }

    [HttpPost("items")]
    public async Task<ActionResult<CartResponse>> AddItem(UpdateCartItemRequest request)
    {
        var userId = GetUserId();
        var cart = await GetOrCreateCartAsync(userId);

        var product = await _context.Products.FindAsync(request.ProductId);
        if (product is null) return NotFound("Product not found.");

        var existing = cart.Items.FirstOrDefault(i => i.ProductId == request.ProductId);
        if (existing is not null)
        {
            existing.Quantity += request.Quantity;
        }
        else
        {
            cart.Items.Add(new CartItem
            {
                ProductId = request.ProductId,
                Quantity = request.Quantity
            });
        }

        cart.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return Ok(MapToResponse(cart));
    }

    [HttpPut("items/{productId}")]
    public async Task<ActionResult<CartResponse>> UpdateItem(int productId, UpdateCartItemRequest request)
    {
        var userId = GetUserId();
        var cart = await _context.Carts
            .Include(c => c.Items).ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(c => c.UserId == userId);

        if (cart is null) return NotFound();

        var item = cart.Items.FirstOrDefault(i => i.ProductId == productId);
        if (item is null) return NotFound();

        if (request.Quantity < 1)
            cart.Items.Remove(item);
        else
            item.Quantity = request.Quantity;

        cart.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return Ok(MapToResponse(cart));
    }

    [HttpDelete("items/{productId}")]
    public async Task<ActionResult<CartResponse>> RemoveItem(int productId)
    {
        var userId = GetUserId();
        var cart = await _context.Carts
            .Include(c => c.Items).ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(c => c.UserId == userId);

        if (cart is null) return NotFound();

        var item = cart.Items.FirstOrDefault(i => i.ProductId == productId);
        if (item is null) return NotFound();

        cart.Items.Remove(item);
        cart.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return Ok(MapToResponse(cart));
    }

    [HttpDelete]
    public async Task<IActionResult> ClearCart()
    {
        var userId = GetUserId();
        var cart = await _context.Carts
            .Include(c => c.Items)
            .FirstOrDefaultAsync(c => c.UserId == userId);

        if (cart is null) return NoContent();

        cart.Items.Clear();
        cart.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    private async Task<Cart> GetOrCreateCartAsync(string userId)
    {
        var cart = await _context.Carts
            .Include(c => c.Items).ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(c => c.UserId == userId);

        if (cart is null)
        {
            cart = new Cart { UserId = userId };
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }

        return cart;
    }

    private static CartResponse MapToResponse(Cart cart) => new(
        cart.Id,
        cart.UserId,
        cart.Items.Select(i => new CartItemResponse(
            i.Id,
            i.ProductId,
            i.Product?.Name ?? string.Empty,
            i.Product?.Price ?? 0,
            i.Quantity,
            i.Product?.ImageUrl
        )).ToList()
    );
}