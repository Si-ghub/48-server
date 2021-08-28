const _data = require('../../data');
const header = require('../../components/header');
const helpers = require('../../helpers');

async function adminServicesPageHandler(data) {
    let headHTML = await _data.readTemplateHTML('head');
    const headerHTML = header(data.user);
    const footerHTML = await _data.readTemplateHTML('footer');
    const listServices = await _data.list('services');
    let listHTML = '';
    let index = 0;

    for (const service of listServices) {
        const serviceString = await _data.read('services', service);
        const serviceObj = helpers.parseJsonToObject(serviceString);
        listHTML += `<div class="item" id= "${serviceObj.urlSlug}">
                         <div class="cell">${++index}</div>
                         <div class="cell">${serviceObj.serviceName}</div>
                         <div class="cell">${serviceObj.price}</div>
                         <div class="cell">${serviceObj.isActive ? "Active" : "Draft"}</div>
                         <div class="cell">
                            <a href="/admin/update-service?urlSlug=${serviceObj.urlSlug}" class="fa fa-pencil"></a>
                            <button class="fa fa-trash"></button>
                         </div>
                    </div>`
    }

    headHTML = headHTML.replace('{{page-css}}', 'admin-services');

    const HTML = `<!DOCTYPE html>
            <html lang="en">
                ${headHTML}
                <body>
                    ${headerHTML}
                    <main>
                        <section class="center-table">
                        <a href="/admin/add-service">Add service</a>
                            <h2 class="section-title">Services</h2>
                            <div class="table">
                                <div class="head">
                                    <div class="cell">#</div>
                                    <div class="cell">Name</div>
                                    <div class="cell">Price</div>
                                    <div class="cell">Active</div>
                                    <div class="cell">Actions</div>
                                </div>
                                <div class="content">
                                    ${listHTML}
                                </div>
                            </div>
                        </section>
                    </main>
                    ${footerHTML}
                    <script src="/js/servicesList.js" type="module" defer></script>
                </body>
            </html>`;

    return { HTML }
}

module.exports = adminServicesPageHandler;