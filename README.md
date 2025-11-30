# Portfolio Retro-Futurista

Portfolio desenvolvido com Nuxt.js, TypeScript, Tailwind CSS e Lucide Vue Next, com tema retro-futurista inspirado nos anos 80/90.

## 🚀 Tecnologias

- **Nuxt.js 3** - Framework Vue.js
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide Vue Next** - Ícones modernos

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd portfolio
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto:

```env
NUXT_PUBLIC_GITHUB_TOKEN=seu_token_do_github
NUXT_PUBLIC_GITHUB_USERNAME=seu-usuario-github
NUXT_PUBLIC_GITHUB_ORG=sua-organizacao-github
```

### Como obter um token do GitHub

1. Acesse [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens)
2. Clique em "Generate new token (classic)"
3. Dê um nome ao token e selecione o escopo `public_repo` (ou `repo` para acesso completo)
4. Copie o token gerado e adicione ao arquivo `.env`

**Nota:** O token é opcional, mas recomendado para evitar limites de rate limit da API do GitHub.

## 🎮 Uso

### Desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

Acesse `http://localhost:3000` no navegador.

### Build para Produção

```bash
npm run build
# ou
yarn build
```

### Preview da Build

```bash
npm run preview
# ou
yarn preview
```

## 🎨 Estrutura do Projeto

```
portfolio/
├── assets/
│   └── css/
│       └── main.css          # Estilos globais e tema retro-futurista
├── components/
│   ├── AboutSection.vue      # Seção sobre mim
│   ├── ContactSection.vue    # Seção de contato
│   ├── GameBoyNavigator.vue  # Navegador estilo GameBoy
│   ├── InfoCard.vue          # Card de informações reutilizável
│   ├── LanguagesSection.vue  # Seção de linguagens
│   └── ProjectCard.vue       # Card de projeto
├── pages/
│   └── index.vue             # Página principal
├── app.vue                   # Componente raiz
├── nuxt.config.ts            # Configuração do Nuxt
├── tailwind.config.js        # Configuração do Tailwind
└── tsconfig.json             # Configuração do TypeScript
```

## 🎯 Funcionalidades

### Navegação GameBoy

O componente `GameBoyNavigator` permite navegar entre as seções:
- **D-Pad**: Navegação direcional (cima, baixo, esquerda, direita)
- **Botões A, B, C**: Seleção rápida de seções

### Seções Disponíveis

1. **About Me**: Informações pessoais e perfil
2. **Known Languages**: Linguagens de programação detectadas automaticamente do GitHub
3. **Projects**: Projetos pessoais e da organização separados
4. **Contact**: Informações de contato

### Integração com GitHub API

O portfólio busca automaticamente:
- Repositórios pessoais do usuário
- Repositórios da organização (se configurado)
- Linguagens de programação utilizadas
- Estatísticas dos projetos (stars, forks)

## 🎨 Personalização

### Cores do Tema

As cores retro-futuristas podem ser ajustadas em `tailwind.config.js`:

```js
colors: {
  'retro-cyan': '#00ffff',
  'retro-pink': '#ff00ff',
  'retro-yellow': '#ffff00',
  // ...
}
```

### Dados Pessoais

Edite os componentes para personalizar suas informações:

- **AboutSection.vue**: Nome, bio, localização
- **ContactSection.vue**: Email, LinkedIn, website, etc.

### Fontes

As fontes utilizadas são:
- **Orbitron**: Títulos e elementos principais
- **Share Tech Mono**: Texto e código

Ambas são carregadas do Google Fonts.

## 📱 Responsividade

O portfólio é totalmente responsivo e se adapta a:
- Desktop (1920px+)
- Tablet (768px - 1919px)
- Mobile (< 768px)

## 🔧 Troubleshooting

### Erro ao buscar dados do GitHub

- Verifique se o token está configurado corretamente
- Confirme que o username/organização estão corretos
- Verifique a conexão com a internet
- O portfólio funciona sem token, mas pode atingir limites de rate limit

### Estilos não aparecem

- Execute `npm install` novamente
- Verifique se o Tailwind está configurado corretamente
- Limpe o cache: `.nuxt` e `.output`

## 📄 Licença

Este projeto está sob a licença MIT.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

Desenvolvido com ❤️ usando Nuxt.js e tema retro-futurista

