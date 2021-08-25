const _data = require('../../data');
const header = require('../../components/header');

async function notFoundPageHandler(data) {
    let headHTML = await _data.readTemplateHTML('head');
    const headerHTML = header();
    const footerHTML = await _data.readTemplateHTML('footer');
    const logoutHTML = await _data.readTemplateHTML('logout');

    headHTML = headHTML.replace('{{page-css}}', 'not-found');

    const HTML = `<!DOCTYPE html>
            <html lang="en">
                ${headHTML}
                <body>
                    ${headerHTML}
                    <main>
                        ${logoutHTML}
                    </main>
                    ${footerHTML}
                    <script src="/js/demo.js" type="module" defer></script>
                </body>
            </html>`;

    const cookies = [
        'login-token=',
        'path=/',
        'expires=Thu, 01 Jan 1970 00:00:00 UTC',
    ];
    const headers = {
        'Set-Cookie': cookies.join('; '),
    }

    return { HTML, headers }
}

module.exports = notFoundPageHandler;