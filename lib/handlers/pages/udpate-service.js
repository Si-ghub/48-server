const _data = require('../../data');
const header = require('../../components/header');
const helpers = require('../../helpers');


async function adminUpdateServicePageHandler(data) {
    const service = data.queryStringObject.get('urlSlug');
    const updateService = await _data.read('services', service);
    const updateServiceObj = helpers.parseJsonToObject(updateService);
    console.log(updateServiceObj);
    let headHTML = await _data.readTemplateHTML('head');
    const headerHTML = header(data.user);
    const footerHTML = await _data.readTemplateHTML('footer');
    const addServiceHTML = await _data.readTemplateHTML('update-service');


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
                    <script src="/js/services.js" type="module" defer></script>
                </body>
            </html>`;

    return { HTML }
}

module.exports = adminUpdateServicePageHandler;