#!/bin/bash
# build.sh - Script de build pour Render

echo "🔨 Démarrage du build E-QOS Backend..."

# Installation des dépendances
echo "📦 Installation des dépendances..."
npm install

# Build TypeScript
echo "⚡ Compilation TypeScript..."
npm run build

# Vérification de la compilation
if [ -d "dist" ]; then
    echo "✅ Build réussi!"
    echo "📁 Fichiers dans dist/:"
    ls -la dist/
else
    echo "❌ Échec du build!"
    exit 1
fi

echo "🚀 Build terminé avec succès!"