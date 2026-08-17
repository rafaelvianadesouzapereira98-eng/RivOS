export class AppDrawer {
    constructor(eventBus, elementId = 'app-drawer') {
        this.eventBus = eventBus;
        this.drawerEl = document.getElementById(elementId);
        this.searchInput = null;
        this.appsGrid = null;
        this.appsList = [];
        this.isOpen = false;
    }

    init(registeredApps = []) {
        this.appsList = registeredApps;
        this.render();
        this.attachEvents();
    }

    render() {
        if (!this.drawerEl) return;

        this.drawerEl.innerHTML = `
            <div class="drawer-content material-you-card">
                <div class="search-bar-container">
                    <input type="text" id="drawer-search-input" placeholder="Pesquisar apps..." autocomplete="off" />
                </div>
                <div class="apps-grid" id="drawer-apps-grid"></div>
            </div>
        `;

        this.searchInput = this.drawerEl.querySelector('#drawer-search-input');
        this.appsGrid = this.drawerEl.querySelector('#drawer-apps-grid');
        this.updateAppsGrid(this.appsList);
    }

    attachEvents() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                const filtered = this.appsList.filter(app => app.name.toLowerCase().includes(query));
                this.updateAppsGrid(filtered);
            });
        }
    }

    updateAppsGrid(apps) {
        if (!this.appsGrid) return;
        this.appsGrid.innerHTML = apps.map(app => `
            <div class="app-item" data-app-id="${app.id}">
                <img src="${app.icon}" alt="${app.name}" class="app-icon" />
                <span class="app-label">${app.name}</span>
            </div>
        `).join('');

        this.appsGrid.querySelectorAll('.app-item').forEach(el => {
            el.addEventListener('click', () => {
                const appId = el.getAttribute('data-app-id');
                this.eventBus.emit('app:launch', { appId });
                this.toggle(false);
            });
        });
    }

    toggle(forceState = null) {
        this.isOpen = forceState !== null ? forceState : !this.isOpen;
        this.drawerEl.classList.toggle('open', this.isOpen);
        if (this.isOpen && this.searchInput) {
            this.searchInput.focus();
        }
    }
}
