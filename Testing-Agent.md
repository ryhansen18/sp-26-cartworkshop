# Testing Agent — Buckeye Marketplace

## Project Structure
- Backend: `backend/` — .NET 8 Web API, EF Core, SQLite
- Frontend: `frontend/` — React + Vite + TypeScript
- API project name: `backend`
- Frontend path: `frontend/src`

## Commands
- Backend tests: `dotnet test` (run from `backend/`)
- Frontend tests: `npm test -- --run` (run from `frontend/`)
- E2E tests: `npx playwright test` (run from `frontend/`)

## Before Generating Any Test
1. Read the actual source file first — do not invent classes, methods, or endpoints
2. Confirm the class/function exists before referencing it
3. Never weaken assertions to make a test pass
4. Never mock away the behavior the test is supposed to verify

## Backend Unit Test Rules
- Use xUnit
- Target real logic: cart reducer logic, claims parsing, ownership filtering, password validation
- Assert exact status codes — never change Assert.Equal(401, ...) to something weaker
- Do not invent services or repositories that do not exist

## Backend Integration Test Rules
- Use WebApplicationFactory<Program>
- Cover at least one auth/ownership scenario: unauthenticated request returns 401, wrong user cannot access another user's cart
- Use a real in-memory or SQLite test database, not mocks of the DB layer

## Frontend Unit Test Rules
- Use Vitest + React Testing Library
- Include: one pure function test, one reducer test, one component test
- Import from actual source files in `frontend/src`
- Do not invent helper files

## E2E Rules (Playwright)
- Use getByRole, getByLabel, or getByTestId where possible
- Add data-testid attributes to components if selectors are ambiguous
- Happy path: register/login → browse products → add to cart → checkout → verify confirmation
- Snapshot after each major step
- If a step fails, stop and document exactly what failed

## Key Files to Read Before Generating Tests
- `backend/Controllers/CartController.cs`
- `backend/Controllers/AuthController.cs`
- `backend/Models/Cart.cs`
- `backend/Models/CartItem.cs`
- `frontend/src/reducers/cartReducer.ts`
- `frontend/src/context/CartContext.tsx`
- `frontend/src/types/cart.ts`
- `frontend/src/pages/CartPage.tsx`
- `frontend/src/components/ProductCard.tsx`