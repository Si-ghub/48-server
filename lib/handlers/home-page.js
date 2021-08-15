const _data = require('../data');

async function homePageHandler() {
    let headHTML = await _data.readTemplateHTML('head');
    const headerHTML = await _data.readTemplateHTML('header');
    const footerHTML = await _data.readTemplateHTML('footer');
    const heroHTML = await _data.readTemplateHTML('home-hero');
    const servicesHTML = await _data.readTemplateHTML('services');

    headHTML = headHTML.replace('{{page-css}}', 'home');

    return `<!DOCTYPE html>
            <html lang="en">
                ${headHTML}
                <body>
                    ${headerHTML}
                    ${footerHTML}
                    ${heroHTML}
                    ${servicesHTML}
                    <script src="./js/demo.js" type="module" defer></script>
                </body>
            </html>`;
}

module.exports = homePageHandler;