export class ThemeManager {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.currentWallpaper = '';
        this.currentTheme = 'dark'; // 'light' | 'dark' | 'monet'
    }

    init() {
        this.loadSettings();
    }

    setWallpaper(url, extractColors = true) {
        this.currentWallpaper = url;
        document.body.style.backgroundImage = `url('${url}')`;
        localStorage.setItem('rivos_wallpaper', url);

        if (extractColors) {
            this.applyMonetThemeFromImage(url);
        }

        this.eventBus.emit('theme:wallpaperChanged', { url });
    }

    setTheme(themeName) {
        this.currentTheme = themeName;
        document.documentElement.setAttribute('data-theme', themeName);
        localStorage.setItem('rivos_theme', themeName);
        this.eventBus.emit('theme:changed', { theme: themeName });
    }

    applyMonetThemeFromImage(imageUrl) {
        // Simulação do algoritmo Monet (Material You dynamic colors)
        const dummyPalette = {
            primary: '#a8c7fa',
            onPrimary: '#062e6f',
            surface: '#1b1b1f',
            onSurface: '#e3e2e6'
        };

        const root = document.documentElement;
        Object.entries(dummyPalette).forEach(([key, val]) => {
            root.style.setProperty(`--md-sys-color-${key}`, val);
        });
    }

    loadSettings() {
        const savedTheme = localStorage.getItem('rivos_theme') || 'dark';
        const savedWallpaper = localStorage.getItem('rivos_wallpaper') || 'assets/wallpapers/default.jpg';
        this.setTheme(savedTheme);
        this.setWallpaper(savedWallpaper, false);
    }
}
