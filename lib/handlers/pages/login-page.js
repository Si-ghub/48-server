const _data = require('../../data');
const header = require('../../components/header');

async function loginPageHandler(data) {
    let headHTML = await _data.readTemplateHTML('head');
    const headerHTML = header(data.user);
    const footerHTML = await _data.readTemplateHTML('footer');
    const loginHTML = await _data.readTemplateHTML('login');

    headHTML = headHTML.replace('{{page-css}}', 'login');

    const HTML = `<!DOCTYPE html>
            <html lang="en">
                ${headHTML}
                <body>
                    ${headerHTML}
                    <main>
                        ${loginHTML}
                    </main>
                    ${footerHTML}

                    <script src="/js/login.js" type="module" defer></script>
                </body>
            </html>`;

    return { HTML }
}

module.exports = loginPageHandler;