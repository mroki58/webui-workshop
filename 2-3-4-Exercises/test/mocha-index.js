const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const assert = require('assert');

let browser, page, server;

before(async function () {
    this.timeout(10000); 
    
    server = spawn('node', ['index.js'], { stdio: 'inherit' });

    await new Promise(resolve => setTimeout(resolve, 3000));

    browser = await puppeteer.launch();
    page = await browser.newPage();
});

after(async function () {
    await browser.close();
    server.kill(); // Zatrzymanie serwera po testach
});

describe('Application Connection Test', function () {
    it('should connect successfully to the application', async function () {
        this.timeout(5000);
        
        await page.goto('http://localhost:8080');
        const title = await page.title();
        
        assert.ok(title.length > 0, 'Strona powinna mieć tytuł');
    });
});

describe('Integration test - button/title, checks if we route', function() {
        it('Checks if title tells where the user is', async function() {      
            await Promise.all([
                page.waitForNavigation(), 
                page.click('.content > button.btn-primary') 
            ])

            this.timeout(2000)
            
            const url = await page.url(); 
            const pageEx = url.split('?')[1].split('=')[1] + '!'

            const title = await page.$eval('.title', el => el.textContent)
            const pageTr = title.split(" ")[1]

            assert.deepEqual(pageTr, pageEx, `${pageEx} != ${pageTr}`)

        })
})

describe('Checks if button looks the way it is supposed to', function() {
    it('aboutButton check', async function() {
        const classListEx = "btn-primary"

        await page.goto("http://localhost:8080")
        this.timeout(2000)

        let classListReal = await page.$eval('.btn', (el) => Array.from(el.classList))
        classListReal = classListReal.join(" ")
        if (!classListReal.includes(classListEx))
        {
            assert.ok(undefined, `${classListReal}`)
        }
    })
})