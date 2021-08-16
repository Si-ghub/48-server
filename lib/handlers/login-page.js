const _data = require('../data');

async function loginPageHandler() {
    let headHTML = await _data.readTemplateHTML('head');
    const headerHTML = await _data.readTemplateHTML('header');
    const footerHTML = await _data.readTemplateHTML('footer');
    const loginHTML = await _data.readTemplateHTML('login');

    headHTML = headHTML.replace('{{page-css}}', 'login');

    return `<!DOCTYPE html>
            <html lang="en">
                ${headHTML}
                <body>
                    ${headerHTML}
                    <main>
                        ${loginHTML}
                    </main>
                    ${footerHTML}

                    <script src="/js/demo.js" type="module" defer></script>
                </body>
            </html>`;
}

module.exports = loginPageHandler;