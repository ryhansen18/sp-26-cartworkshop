using backend.DTOs;
using backend.Models;
using Xunit;

namespace backend.Tests;

public class CartModelTests
{
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

    [Fact]
    public void UpdateCartItemRequest_WithValidData_ShouldHoldValues()
    {
        var request = new UpdateCartItemRequest(ProductId: 3, Quantity: 5);
        Assert.Equal(3, request.ProductId);
        Assert.Equal(5, request.Quantity);
    }

    [Fact]
    public void UpdateCartItemRequest_QuantityBelowOne_ShouldBeDetectable()
    {
        var request = new UpdateCartItemRequest(ProductId: 1, Quantity: 0);
        Assert.True(request.Quantity < 1);
    }
}