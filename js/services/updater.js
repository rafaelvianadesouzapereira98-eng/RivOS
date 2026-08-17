export class VersionUpdater {
    constructor(eventBus, registry) {
        this.eventBus = eventBus;
        this.registry = registry;
        
        // Mapeamento sequencial de BAPIs do RivOS
        this.versionChain = [
            { name: 'RivOS 0.5', api: 'BAPI 0.5', path: 'cache-os/local-packages/riv-0.5/' },
            { name: 'RivOS 1.0', api: 'BAPI 1.0', path: 'cache-os/local-packages/riv-1.0/' },
            { name: 'RivOS 1.5', api: 'BAPI 1.5', path: 'cache-os/local-packages/riv-1.5/' },
            { name: 'RivOS 2.0', api: 'BAPI 2.0', path: 'cache-os/local-packages/riv-2.0/' },
            { name: 'RivOS 3.0', api: 'BAPI 3.0', path: 'cache-os/local-packages/riv-3.0/' }
        ];

        this.currentStepIndex = 1; // Inicia por padrão na BAPI 1.0 (Índice 1)
    }

    getCurrentVersion() {
        return this.versionChain[this.currentStepIndex];
    }

    async transitionToTargetVersion(targetApiName) {
        const targetIndex = this.versionChain.findIndex(v => v.api === targetApiName);

        if (targetIndex === -1) {
            throw new Error(`Versão ${targetApiName} desconhecida.`);
        }

        if (targetIndex === this.currentStepIndex) {
            return;
        }

        const isUpgrade = targetIndex > this.currentStepIndex;
        const step = isUpgrade ? 1 : -1;

        // Executa a transição em cadeia, uma versão por vez
        while (this.currentStepIndex !== targetIndex) {
            const nextIndex = this.currentStepIndex + step;
            const nextVersion = this.versionChain[nextIndex];

            this.eventBus.emit('updater:stepStart', {
                from: this.versionChain[this.currentStepIndex].api,
                to: nextVersion.api,
                type: isUpgrade ? 'UPGRADE' : 'DOWNGRADE'
            });

            await this.applyPackage(nextVersion);
            this.currentStepIndex = nextIndex;

            this.eventBus.emit('updater:stepComplete', {
                current: nextVersion.api
            });
        }

        this.eventBus.emit('updater:done', { finalVersion: this.getCurrentVersion() });
    }

    async applyPackage(versionObj) {
        // Simulação de carregamento de pacote físico do kernel e manifesto (.ra / local-packages)
        return new Promise((resolve) => {
            setTimeout(() => {
                this.registry.setActiveApi(versionObj.api);
                resolve(true);
            }, 800);
        });
    }
}
