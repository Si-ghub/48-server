function header(isLoggedIn = false) {
    const authLinksHTML = `<nav>
                                <a href="/login">Login</a>
                                <a href="/register">Register</a>
                            </nav>`;
    const accountHTML = `<nav class="user-section">
                            <a href="/admin">Welcome, Username <i class="fa fa-angle-right"></i></a>
                        </nav>`;

    return `<header>
                <img src="./img/28grLOGO.png" alt="Logo" class="logo">
                <nav>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    ${isLoggedIn ? `<a href="/admin/services">Services</a>` : ''}
                </nav>
                ${isLoggedIn ? accountHTML : authLinksHTML}
            </header > `;
}

module.exports = header;