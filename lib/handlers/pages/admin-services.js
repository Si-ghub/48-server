const _data = require('../../data');
const header = require('../../components/header');

async function adminServicesPageHandler() {
    let headHTML = await _data.readTemplateHTML('head');
    const headerHTML = header(false);
    const footerHTML = await _data.readTemplateHTML('footer');

    headHTML = headHTML.replace('{{page-css}}', 'admin-services');

    return `<!DOCTYPE html>
            <html lang="en">
                ${headHTML}
                <body>
                    ${headerHTML}
                    <main>
                        <section class="center-table">
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
                                    <div class="item">
                                        <div class="cell">1</div>
                                        <div class="cell">Service name</div>
                                        <div class="cell">9.90 EUR</div>
                                        <div class="cell">Active</div>
                                        <div class="cell">
                                            <button class="fa fa-pencil"></button>
                                            <button class="fa fa-trash"></button>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="cell">1</div>
                                        <div class="cell">Service name</div>
                                        <div class="cell">9.90 EUR</div>
                                        <div class="cell">Active</div>
                                        <div class="cell">
                                            <button class="fa fa-pencil"></button>
                                            <button class="fa fa-trash"></button>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="cell">1</div>
                                        <div class="cell">Service name</div>
                                        <div class="cell">9.90 EUR</div>
                                        <div class="cell">Active</div>
                                        <div class="cell">
                                            <button class="fa fa-pencil"></button>
                                            <button class="fa fa-trash"></button>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="cell">1</div>
                                        <div class="cell">Service name</div>
                                        <div class="cell">9.90 EUR</div>
                                        <div class="cell">Active</div>
                                        <div class="cell">
                                            <button class="fa fa-pencil"></button>
                                            <button class="fa fa-trash"></button>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="cell">1</div>
                                        <div class="cell">Service name</div>
                                        <div class="cell">9.90 EUR</div>
                                        <div class="cell">Active</div>
                                        <div class="cell">
                                            <button class="fa fa-pencil"></button>
                                            <button class="fa fa-trash"></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                    ${footerHTML}
                    <script src="/js/demo.js" type="module" defer></script>
                </body>
            </html>`;
}

module.exports = adminServicesPageHandler;