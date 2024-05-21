## Links
- My Github: https://github.com/DavidMaydanyuk
- Test site: https://demo-bank.vercel.app/

## Commands I used
- check `NodeJS` version  
`node -v`
- new project with Playwright  
`npm init playwright@latest`
- record tests for given site  
`npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI  
`npx playwright test`
- run tests with browser GUI
`npx playwright test --headed`
- view report  
`npx playwright show-report`

## Playwright Config modifications
- config file `playwright.config.ts`
- disable browsers, i.e. Firefox  
    ```javascript
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    ```

    ## Playwright snippets
- import:
    ```typescript
    import { test, expect } from '@playwright/test';
    ```
- test:
    ```typescript
    test('test description', async ({ page }) => {
    
    });
    ```
- describe:
    ```typescript
     test.describe('Group description', () => {

     });
    ```
- running given test: `test.only`

 ## Playwright scripts for console
 
- test:  
"npx playwright test",   
- test:headed:  
"npx playwright test --headed",
- test:pulpit:  
"npm run test tests/pulpit.spec.ts",
- test:pulpit:headed:  
"npm run test tests/pulpit.spec.ts -- --headed",
- test:login:  
"npm run test tests/login.spec.ts",
- test:login:headed:  
"npm run test tests/login.spec.ts -- --headed"  