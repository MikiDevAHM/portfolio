# 🚀 Guia Rápido de Início

## Instalação Rápida

1. **Instale as dependências:**
```bash
npm install
```

2. **Configure as variáveis de ambiente:**
Crie um arquivo `.env` na raiz do projeto:
```env
NUXT_PUBLIC_GITHUB_TOKEN=seu_token_do_github
NUXT_PUBLIC_GITHUB_USERNAME=seu-usuario-github
NUXT_PUBLIC_GITHUB_ORG=sua-organizacao-github
```

3. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

4. **Acesse:** `http://localhost:3000`

## 🎨 Personalização Rápida

### Alterar Dados Pessoais

**AboutSection.vue** (`components/AboutSection.vue`):
```typescript
const aboutData = {
  name: 'Seu Nome',
  bio: 'Sua bio aqui',
  location: 'Sua localização',
  github: 'seu-usuario'
}
```

**ContactSection.vue** (`components/ContactSection.vue`):
```typescript
const contactData = [
  {
    label: 'Email',
    value: 'seu.email@exemplo.com',
    icon: 'Mail',
    link: 'mailto:seu.email@exemplo.com'
  },
  // ... adicione mais contatos
]
```

### Alterar Cores

Edite `tailwind.config.js`:
```js
colors: {
  'retro-cyan': '#00ffff',    // Cor principal
  'retro-pink': '#ff00ff',    // Cor secundária
  // ... outras cores
}
```

### Alterar Fontes

As fontes são carregadas do Google Fonts em `nuxt.config.ts`. Você pode alterar para outras fontes retro-futuristas.

## 📦 Build para Produção

```bash
npm run build
npm run preview
```

## 🔧 Troubleshooting

### Erro: "Cannot find module"
- Execute `npm install` novamente
- Limpe o cache: delete `.nuxt` e `.output`

### Erro ao buscar dados do GitHub
- Verifique se o token está correto
- Confirme que o username/organização estão corretos
- O portfólio funciona sem token, mas pode ter limites de rate limit

### Estilos não aparecem
- Verifique se o Tailwind está instalado: `npm list @nuxtjs/tailwindcss`
- Limpe o cache e reinicie o servidor

## 📚 Próximos Passos

1. Personalize seus dados em `AboutSection.vue` e `ContactSection.vue`
2. Configure suas variáveis de ambiente no `.env`
3. Ajuste as cores em `tailwind.config.js` se desejar
4. Adicione mais seções ou componentes conforme necessário

---

Para mais detalhes, consulte o [README.md](./README.md)

