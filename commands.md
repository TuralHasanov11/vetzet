### OpenSSF socorecard
```sh
docker run -e GITHUB_AUTH_TOKEN=<your access token> gcr.io/openssf/scorecard:stable --repo=https://github.com/TuralHasanov11/vetzet
```

### Playwright tests
```sh
npx playwright codegen http://localhost:3000
npx playwright test --ui
npx playwright test test/e2e/about-page.test.ts --ui
```