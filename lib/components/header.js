function header(userObj = {}) {
    const authLinksHTML = `<nav>
                                <a href="/login">Login</a>
                                <a href="/register">Register</a>
                            </nav>`;
    const accountHTML = `<nav class="user-section">
                            <a href="/admin">Welcome, ${userObj.username} <i class="fa fa-angle-right"></i></a>
                        </nav>`;

    return `<header>
                <img src="./img/28grLOGO.png" alt="Logo" class="logo">
                <nav>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                   ${userObj.isLoggedIn ? `<a href="/admin/services">Services</a>` : ''}
                </nav>
                 ${userObj.isLoggedIn ? accountHTML : authLinksHTML}
            </header > `;
}

module.exports = header;