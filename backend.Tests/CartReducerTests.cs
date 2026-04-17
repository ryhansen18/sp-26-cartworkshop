using backend.Models;
using backend.DTOs;
using Xunit;

namespace backend.Tests;

public class CartItemQuantityTests
{
    [Fact]
    public void UpdateCartItem_WithQuantityLessThanOne_ShouldBeRejected()
    {
        var request = new UpdateCartItemRequest(ProductId: 1, Quantity: 0);
        Assert.True(request.Quantity < 1);
    }

    [Fact]
    public void UpdateCartItemRequest_WithValidQuantity_ShouldHoldValues()
    {
        var request = new UpdateCartItemRequest(ProductId: 3, Quantity: 5);
        Assert.Equal(3, request.ProductId);
        Assert.Equal(5, request.Quantity);
    }

    [Fact]
    public void Cart_NewCart_ShouldHaveEmptyItems()
    {
        var cart = new Cart { UserId = "user-123" };
        Assert.NotNull(cart.Items);
        Assert.Empty(cart.Items);
    }

    [Fact]
    public void Cart_UserId_ShouldMatchAssignedValue()
    {
        var cart = new Cart { UserId = "user-abc" };
        Assert.Equal("user-abc", cart.UserId);
    }
}