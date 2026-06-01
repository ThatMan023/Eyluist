// Wait for the page to load
document.addEventListener('DOMContentLoaded', () => {
    // 1. Fetch the base template (Ensure this URL points to your latest base HTML)
    fetch('char-base.html')
        .then(response => response.text())
        .then(html => {
            // Insert the base template into the DOM
            const container = document.getElementById('header-container');
            if (container) container.innerHTML = html;
            
            // 2. Check if the character data exists, then populate it
            if (typeof cardData !== 'undefined') {
                initCard(cardData);
            } else {
                console.error("Oops! No cardData found for this character.");
            }
        })
        .catch(err => console.error("Error loading template:", err));
});

// 3. The Population Logic
function initCard(data) {
    document.getElementById('char-image').src = data.logoUrl;
    document.getElementById('char-name').textContent = data.name;
    document.getElementById('char-gender').textContent = data.gender;
    document.getElementById('char-gender').style.color = data.genderColor;
    document.getElementById('char-dob').textContent = data.dob;
    document.getElementById('char-id').textContent = data.crimsoftId;
    document.getElementById('char-status').textContent = data.status;
    document.getElementById('char-status').style.color = data.statusColor;
    document.getElementById('char-description').textContent = data.description;
    loadChips(data.csvFile);
}

// 4. The CSV Chip Logic
async function loadChips(url) {
    const container = document.getElementById('chip-target');
    try {
        const res = await fetch(url);
        const data = await res.text();
        const rows = data.split('\n').slice(1).filter(r => r.trim() !== "");
        rows.forEach(r => {
            const [t, i, c, l] = r.split(',').map(x => x.trim());
            const el = document.createElement(l ? 'a' : 'div');
            if (l) { el.href = l; el.target = "_blank"; }
            el.className = 'trait-chip';
            el.style.setProperty('--icon-color', c);
            el.innerHTML = `<span class="trait-icon material-symbols-outlined">${i}</span><span>${t.toUpperCase()}</span>`;
            container.appendChild(el);
        });
    } catch(e) { console.error("Error loading CSV:", e); }
}