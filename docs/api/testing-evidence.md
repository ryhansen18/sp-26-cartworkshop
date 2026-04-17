# Testing Evidence — M5

## Backend Tests

**File:** `backend.Tests/CartModelTests.cs` + `backend.Tests/AuthIntegrationTests.cs`

**Command run:**
```bash
dotnet test
```

**Result:** 11 tests passed, 0 failed

- `Cart_NewCart_ShouldHaveEmptyItems` ✅
- `Cart_UserId_ShouldMatchAssignedValue` ✅
- `UpdateCartItemRequest_WithValidData_ShouldHoldValues` ✅
- `UpdateCartItemRequest_QuantityBelowOne_ShouldBeDetectable` ✅
- `GetCart_WithoutToken_Returns401` ✅
- `Login_WithInvalidCredentials_Returns401` ✅
- `Register_WithValidCredentials_Returns200AndToken` ✅

---

## Frontend Tests

**File:** `frontend/src/test/cartReducer.test.ts`

**Command run:**
```bash
npm test -- --run
```

**Result:** 6 tests passed, 0 failed

- `ADD_TO_CART adds a new item with quantity 1` ✅
- `ADD_TO_CART increments quantity if item already exists` ✅
- `REMOVE_FROM_CART removes the correct item` ✅
- `UPDATE_QUANTITY removes item when quantity drops below 1` ✅
- `CLEAR_CART empties all items` ✅
- `TOGGLE_CART flips isOpen` ✅

---

## E2E Tests

**File:** `frontend/e2e/shop-flow.spec.ts`

**Command run:**
```bash
npx playwright test
```

**Result:** 2 tests passed, 0 failed

- `browse products and add to cart` ✅
- `register a new user` ✅

---

## Security Self-Check (Week 13)

| Item | Status |
|------|--------|
| UserId from JWT, not route/body | ✅ `ClaimTypes.NameIdentifier` only |
| Admin endpoints enforce roles | ✅ N/A — no admin endpoints |
| JWT key in User Secrets | ✅ `dotnet user-secrets set` confirmed |
| No raw SQL string concatenation | ✅ EF Core only |
| No dangerouslySetInnerHTML | ✅ Not used anywhere |
| CORS correct for frontend origin | ✅ `http://localhost:5173` only |
| README has test credentials | ✅ Added |

---

## Quality Dimensions (Wednesday QA Lecture)

- **Functionality:** Products load, cart state managed via reducer, auth endpoints return tokens
- **Security:** JWT via User Secrets, UserId from claims only, CORS scoped, passwords hashed via ASP.NET Identity
- **Code Quality:** DTOs for all responses, no raw SQL, EF Core throughout, separation of concerns maintained