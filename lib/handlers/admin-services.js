const _data = require('../data');

async function adminServicesPageHandler() {
    let headHTML = await _data.readTemplateHTML('head');
    const headerHTML = await _data.readTemplateHTML('header');
    const footerHTML = await _data.readTemplateHTML('footer');

    headHTML = headHTML.replace('{{page-css}}', 'home');

    return `<!DOCTYPE html>
            <html lang="en">
                ${headHTML}
                <body>
                    ${headerHTML}
                    <main>
                        SERVICES LIST
                    </main>
                    ${footerHTML}
                    <script src="/js/demo.js" type="module" defer></script>
                </body>
            </html>`;
}

module.exports = adminServicesPageHandler;