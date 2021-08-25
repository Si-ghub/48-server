const _data = require('../../data');
const header = require('../../components/header');

async function homePageHandler(data) {
    // susidedam visas reikalingas puslapio dalis: head, header, home-hero, services
    // kadangi data.js yra async funkcija t.b await
    let headHTML = await _data.readTemplateHTML('head'); // kadangi data.js yra async funkcija t.b await
    const headerHTML = header(data.user);
    const footerHTML = await _data.readTemplateHTML('footer');
    const heroHTML = await _data.readTemplateHTML('home-hero');
    const servicesHTML = await _data.readTemplateHTML('services');

    headHTML = headHTML.replace('{{page-css}}', 'home');

    // susidedam visas reikalingas dalis
    const HTML = `<!DOCTYPE html>
            <html lang="en">
                ${headHTML}
                <body>
                   ${headerHTML}
                    <main>
                        ${heroHTML}
                        ${servicesHTML}
                    </main>
                    ${footerHTML}
                    <script src="/js/demo.js" type="module" defer></script>
                </body>
            </html>`;

    return { HTML }
}

module.exports = homePageHandler;