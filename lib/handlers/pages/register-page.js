const _data = require('../../data');
const header = require('../../components/header');

async function loginPageHandler() {
    let headHTML = await _data.readTemplateHTML('head');

    const headerHTML = header(false);
    const footerHTML = await _data.readTemplateHTML('footer');
    const registerHTML = await _data.readTemplateHTML('register'); //nuo log-in skiriasi tik si eilute

    headHTML = headHTML.replace('{{page-css}}', 'register');

    return `<!DOCTYPE html>
            <html lang="en">
                ${headHTML}
                <body>
                    ${headerHTML}
                    <main>
                        ${registerHTML}
                    </main>
                    ${footerHTML}

                    <script src="/js/register.js" type="module" defer></script>
                </body>
            </html>`;
}

module.exports = loginPageHandler;