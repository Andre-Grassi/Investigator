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
   - Build e deploy usando Node.js 18

## 🔧 Próximos Passos

### 1. Commitar e Enviar para GitHub

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
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
- ✅ Configurações de GitHub Pages prontas
- ⏳ Aguardando commit e push para GitHub
