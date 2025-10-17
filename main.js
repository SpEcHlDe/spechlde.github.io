const Github_Username = "SpEcHlDe";

const Email_Id = "spechlde@themails.ml";

// Helper to safely set text or attribute on an element if it exists
function setText(id, text) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = text ?? '';
}

function setHTML(id, html) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = html ?? '';
}

function setAttr(id, attr, value) {
    const el = document.getElementById(id);
    if (!el) return;
    el.setAttribute(attr, value ?? '');
}

async function loadGitHubProfile(username) {
    const url = `https://api.github.com/users/${encodeURIComponent(username)}`;
    try {
        const resp = await fetch(url, { cache: 'no-store' });
        if (!resp.ok) throw new Error(`GitHub API returned ${resp.status}`);
        const data = await resp.json();

        // Update document title if available
        if (data.name) document.title = data.name;

        // Avatar
        const avatarEl = document.getElementById('avatar');
        if (avatarEl && data.avatar_url) avatarEl.src = data.avatar_url;

        setText('name', data.name ?? '');
        setText('bio', data.bio ?? '');
        if (data.html_url) setAttr('github', 'href', data.html_url);

        // Twitter handling: GitHub returns null (not the string "null") when absent
        const twitterEl = document.getElementById('twitter');
        const spaceEl = document.getElementById('space');
        if (twitterEl) {
            if (data.twitter_username) {
                twitterEl.style.display = '';
                twitterEl.href = `https://twitter.com/${data.twitter_username}`;
                if (spaceEl) spaceEl.innerHTML = '&nbsp;';
            } else {
                twitterEl.style.display = 'none';
                if (spaceEl) spaceEl.innerHTML = '';
            }
        }
    } catch (err) {
        // Fail silently but keep console info for debugging
        console.error('Failed to load GitHub profile:', err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Kick off profile load
    loadGitHubProfile(Github_Username);

    // Email display and mail function
    const emailEl = document.getElementById('email');
    if (emailEl) emailEl.textContent = Email_Id;

    window.mailF = function mailF() {
        window.open(`mailto:${Email_Id}`);
    };
});

/*!
 * Made by Tuhin Kanti Pal
 * Visit https://tu.hin.life
 */
