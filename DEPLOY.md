# 🚀 Deploy Instructions for GitHub Pages

## ✅ Configurações Realizadas

O projeto foi configurado para GitHub Pages com:

1. **package.json** atualizado com:

   - Homepage configurada
   - Script de deploy adicionado
   - gh-pages instalado como dependência

2. **vite.config.ts** configurado com:

   - Base path `/Investigator/` para GitHub Pages
   - Configurações de build otimizadas

3. **GitHub Actions** configurado em `.github/workflows/deploy.yml`:
   - Deploy automático no push para main
   - Build e deploy usando Node.js 20 (compatível com Vite 7)
   - Instalação robusta de dependências

## 🔧 Problemas Resolvidos

### ❌ Problemas Anteriores:

- **EBADENGINE**: Vite 7 requer Node.js >=20, mas GitHub Actions usava Node 18
- **package-lock.json**: Arquivo não sincronizado com package.json

### ✅ Soluções Aplicadas:

- Atualizado GitHub Actions para Node.js 20
- Regenerado package-lock.json sincronizado
- Configurado instalação robusta de dependências no workflow

## 🔧 Próximos Passos

### 1. Commitar e Enviar para GitHub

```bash
git add .
git commit -m "Fix GitHub Pages deployment - Node 20 + regenerated lock file"
git push origin main
```

### 2. Configurar GitHub Pages no Repositório

1. Vá para **Settings** > **Pages** no seu repositório GitHub
2. Em **Source**, selecione **GitHub Actions**
3. O deploy será automático a cada push na branch main

### 3. Acessar o App

Após o deploy, o app estará disponível em:

```
https://[seu-usuario].github.io/Investigator/
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview local do build
- `npm run deploy` - Deploy manual (alternativo ao GitHub Actions)

## 📱 Funcionalidades do App

- ✅ Envelope Super Secreto
- ✅ Distribuição de Cartas
- ✅ Dados 3D com Three.js
- ✅ Tabuleiro Interativo
- ✅ Tema Detetive Moderno
- ✅ Responsivo para Mobile

## 🎯 Status Atual

- ✅ Build realizado com sucesso
- ✅ Preview funcionando em http://localhost:4173/Investigator/
- ✅ Configurações de GitHub Pages corrigidas
- ✅ Node.js 20 configurado no GitHub Actions
- ✅ package-lock.json regenerado e sincronizado
- ⏳ Aguardando commit e push para GitHub
