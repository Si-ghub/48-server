const _data = require('../../data');
const header = require('../../components/header');

async function adminAddServicesPageHandler() {
    let headHTML = await _data.readTemplateHTML('head');
    const headerHTML = header(false);
    const footerHTML = await _data.readTemplateHTML('footer');
    const addServiceHTML = await _data.readTemplateHTML('add-service');

    headHTML = headHTML.replace('{{page-css}}', 'add-service');

    return `<!DOCTYPE html>
            <html lang="en">
                ${headHTML}
                <body>
                    ${headerHTML}
                    <main>
                        ${addServiceHTML}
                    </main>
                    ${footerHTML}
                    <script src="/js/demo.js" type="module" defer></script>
                </body>
            </html>`;
}

module.exports = adminAddServicesPageHandler;