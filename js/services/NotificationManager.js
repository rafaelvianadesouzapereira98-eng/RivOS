export class NotificationManager {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.container = null;
        this.notifications = new Map();
        this.init();
    }

    init() {
        this.container = document.createElement('div');
        this.container.id = 'notification-container';
        this.container.className = 'notification-container';
        document.body.appendChild(this.container);
    }

    send({ id = Date.now().toString(), title, body, icon = '', actions = [] }) {
        const notif = { id, title, body, icon, actions };
        this.notifications.set(id, notif);
        
        const el = document.createElement('div');
        el.className = 'notification-toast material-you-card';
        el.setAttribute('data-id', id);

        const actionsHtml = actions.map(act => `
            <button class="notif-action-btn" data-action="${act.action}">${act.label}</button>
        `).join('');

        el.innerHTML = `
            <div class="notif-header">
                ${icon ? `<img src="${icon}" class="notif-icon"/>` : ''}
                <strong class="notif-title">${title}</strong>
                <button class="notif-close">&times;</button>
            </div>
            <div class="notif-body">${body}</div>
            ${actions.length ? `<div class="notif-actions">${actionsHtml}</div>` : ''}
        `;

        el.querySelector('.notif-close').addEventListener('click', () => this.dismiss(id));

        el.querySelectorAll('.notif-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                this.eventBus.emit(`notification:action:${action}`, { id, action });
                this.dismiss(id);
            });
        });

        this.container.appendChild(el);
        this.eventBus.emit('notification:created', notif);
        return id;
    }

    dismiss(id) {
        const el = this.container.querySelector(`[data-id="${id}"]`);
        if (el) {
            el.classList.add('dismissing');
            setTimeout(() => {
                el.remove();
                this.notifications.delete(id);
                this.eventBus.emit('notification:dismissed', { id });
            }, 200);
        }
    }
}
