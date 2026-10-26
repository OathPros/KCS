import { defineConfig } from '@playwright/test';
export default defineConfig({
 testDir:'./tests',
 fullyParallel:true,
 forbidOnly:!!process.env.CI,
 retries:process.env.CI?1:0,
 workers:process.env.CI?2:4,
 reporter:[['list']],
 use:{baseURL:'http://127.0.0.1:4173/KCS/',browserName:'chromium',launchOptions:{executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']},trace:'retain-on-failure'},
 webServer:{command:'npm run build && npm start',port:4173,reuseExistingServer:!process.env.CI}
});
