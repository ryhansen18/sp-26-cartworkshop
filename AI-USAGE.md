# AI Usage Log for AI security, OA Testing Workshop

## Tools Used
- Claude (Opus 4.7) — General project architecture/development
- GitHub Copilot (Gemini 2.5 Pro) — Agent mode utilized, primarily for purposes of code debugging, initial setup of xUnit

---

## Prompts Used

**Prompt 1 — Identity + JWT Setup:**
You are a senior .NET developer specializing in ASP.NET Core security and authentication. You've been assigned the task of configuring ASP.NET Core Identity with JWT bearer authentication for an existing marketplace API. Utilize the existing AGENTS.md and project structure as a reference when completing the task. Prioritize deep reasoning within your output, explaining what each piece does and why it's structured that way.

**Prompt 2 — Security Audit:**
You are a senior .NET developer specializing in OWASP security review and secure configuration. You've been assigned a full auth audit of this marketplace API to identify M5 vulnerabilities before submission. Utilize the existing SECURITY-AGENT.md checklist and Program.cs when completing the task. Prioritize deep reasoning within your output so I can understand what each finding means and why it matters.

**Prompt 3 — Backend Test Generation:**
You are a fullstack developer specializing in .NET testing and test-driven quality assurance. You've been assigned a suite of backend unit and integration tests for an existing marketplace API. Utilize the existing TESTING-AGENT.md and actual controller and model files when completing the task. Prioritize deep reasoning so I can learn what each test covers and why it matters for authorization and ownership correctness.

**Prompt 4 — Frontend Test Generation:**
You are a fullstack developer specializing in React and Vitest unit testing. You've been assigned a suite of frontend tests for an existing cart reducer. Utilize the existing TESTING-AGENT.md and cartReducer.ts when completing the task. Prioritize deep reasoning so I can learn what each test validates and what failure would indicate.

**Prompt 5 — E2E Playwright Test:**
You are a fullstack developer specializing in end-to-end testing with Playwright. You've been assigned a happy-path E2E test for an existing React marketplace frontend. Utilize the existing TESTING-AGENT.md and ProductCard.tsx when completing the task. Prioritize deep reasoning so I can learn what each step verifies and why the selector strategy was chosen.

---

## Errors

AI generated `UpdateCartItemRequest` without `ProductId`, but was fixed using new chat tab within Gemini 2.5 Pro in VScode github copilot

---

## Test Results

| Command | Result |
|---------|--------|
| `dotnet test` | ✅ 11 passed |
| `npm test -- --run` | ✅ 6 passed |
| `npx playwright test` | ✅ 2 passed |