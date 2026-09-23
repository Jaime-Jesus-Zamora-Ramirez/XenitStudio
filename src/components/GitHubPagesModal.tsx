import React, { useState } from 'react';
import { X, Check, Copy, Terminal, ExternalLink, ShieldCheck } from 'lucide-react';
import { sound } from './AudioController';

interface GitHubPagesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubPagesModal: React.FC<GitHubPagesModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const workflowSnippet = `name: Deploy XENIT STUDIO to GitHub Pages

on:
  push:
    branches: [ "main" ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build static site
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`;

  const manualCommands = `# 1. Compila el sitio 100% estático
npm run build

# 2. Despliega la carpeta /dist a la rama gh-pages con un comando
npx gh-pages -d dist`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-2xl rounded-xl border border-white/15 bg-[#0d0d12] p-6 text-neutral-200 shadow-2xl overflow-y-auto max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="font-display text-lg font-bold text-white tracking-wide">
                Arquitectura 100% Estática para GitHub Pages
              </h3>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Esta landing page no requiere servidor, base de datos ni backend Node.js en tiempo de ejecución.
            </p>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Verification Checklist */}
        <div className="my-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              <span>base: './' Configurado</span>
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">
              Rutas relativas activadas en Vite para evitar errores 404 en subdirectorios de repositorios de GitHub.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              <span>Cero Dependencias Backend</span>
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">
              Todo el audio, interactividad, partículas y visuales se ejecutan de forma nativa en el navegador del usuario.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              <span>Vector Logo SVG</span>
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">
              El logo de XENIT STUDIO está renderizado en vectores puros independientes de resoluciones y alojado en /public.
            </p>
          </div>
        </div>

        {/* Option 1: GitHub Actions */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-white bg-white/10 px-2 py-0.5 rounded">Opción 1</span>
              <span className="text-xs font-semibold text-white">Despliegue Automático con GitHub Actions (Recomendado)</span>
            </div>
            <button
              onClick={() => copyToClipboard(workflowSnippet, 'workflow')}
              className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white bg-white/10 px-2.5 py-1 rounded transition-colors"
            >
              {copiedKey === 'workflow' ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copiar YAML</span>
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-neutral-400 mb-2">
            Crea el archivo <code className="text-neutral-200">.github/workflows/deploy.yml</code> en tu repositorio y cada commit a la rama principal actualizará tu sitio automáticamente:
          </p>
          <pre className="p-3 bg-black/60 rounded-lg text-[11px] font-mono text-neutral-300 border border-white/10 overflow-x-auto max-h-48 leading-relaxed">
            {workflowSnippet}
          </pre>
        </div>

        {/* Option 2: Manual Terminal Commands */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-white bg-white/10 px-2 py-0.5 rounded">Opción 2</span>
              <span className="text-xs font-semibold text-white">Despliegue Rápido por Terminal</span>
            </div>
            <button
              onClick={() => copyToClipboard(manualCommands, 'commands')}
              className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white bg-white/10 px-2.5 py-1 rounded transition-colors"
            >
              {copiedKey === 'commands' ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copiar Comandos</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-3 bg-black/60 rounded-lg text-xs font-mono text-neutral-200 border border-white/10 overflow-x-auto leading-relaxed">
            {manualCommands}
          </pre>
        </div>

        {/* Quick Instructions list */}
        <div className="rounded-lg bg-neutral-900/60 p-4 border border-white/5 text-xs text-neutral-400 space-y-1.5">
          <div className="text-white font-medium mb-1">Pasos en GitHub:</div>
          <p>1. Sube este proyecto a tu repositorio en GitHub.</p>
          <p>2. Ve a <strong>Settings → Pages</strong> en tu repositorio.</p>
          <p>3. En <strong>Build and deployment → Source</strong>, selecciona <strong>GitHub Actions</strong> (o la rama <code className="text-neutral-300">gh-pages</code> si usas la opción 2).</p>
          <p>4. En menos de 60 segundos tu landing de XENIT STUDIO estará en línea con HTTPS gratis.</p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3 border-t border-white/10 pt-4">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="rounded-md bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-neutral-200 transition-colors"
          >
            Entendido, cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
