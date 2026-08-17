export class ApiRegistry {
    constructor() {
        this.activeApiLevel = 'BAPI 1.0';
        this.apiLayers = new Map();
    }

    registerApi(apiLevel, apiImplementation) {
        this.apiLayers.set(apiLevel, apiImplementation);
    }

    setActiveApi(apiLevel) {
        if (!this.apiLayers.has(apiLevel)) {
            console.warn(`[RivOS API Registry] BAPI '${apiLevel}' não registrada. Registrando dinamica.`);
        }
        this.activeApiLevel = apiLevel;
        document.body.setAttribute('data-bapi', apiLevel);
    }

    getApi() {
        return this.apiLayers.get(this.activeApiLevel) || null;
    }
}
