const _data = require('../../data');
const header = require('../../components/header');

async function aboutPageHandler(data) {
    let headHTML = await _data.readTemplateHTML('head');
    const headerHTML = header(data.user);
    const footerHTML = await _data.readTemplateHTML('footer');

    headHTML = headHTML.replace('{{page-css}}', 'admin-main');

    const HTML = `<!DOCTYPE html>
            <html lang="en">
                ${headHTML}
                <body>
                    ${headerHTML}
                    <main>
                        ADMIN DASHBOARD
                        <a href="/logout" class="btn">Log out</a>
                    </main>
                    ${footerHTML}
                    <script src="/js/demo.js" type="module" defer></script>
                </body>
            </html>`;

    return { HTML }
}

module.exports = aboutPageHandler;