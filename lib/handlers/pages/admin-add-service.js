const _data = require('../../data');
const header = require('../../components/header');

async function adminAddServicesPageHandler(data) {
    let headHTML = await _data.readTemplateHTML('head');
    const headerHTML = header(data.user);
    const footerHTML = await _data.readTemplateHTML('footer');
    const addServiceHTML = await _data.readTemplateHTML('add-service');

    headHTML = headHTML.replace('{{page-css}}', 'add-service');

    const HTML = `<!DOCTYPE html>
            <html lang="en">
                ${headHTML}
                <body>
                    ${headerHTML}
                    <main>
                        ${addServiceHTML}
                    </main>
                    ${footerHTML}
                    <script src="/js/add-service.js" type="module" defer></script>
                </body>
            </html>`;

    return { HTML }
}

module.exports = adminAddServicesPageHandler;