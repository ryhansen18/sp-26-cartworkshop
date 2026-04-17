namespace backend.DTOs;

public record CartItemResponse(
    int Id,
    int ProductId,
    string ProductName,
    decimal Price,
    int Quantity,
    string? ImageUrl);

public record CartResponse(
    int Id,
    string UserId,
    List<CartItemResponse> Items);