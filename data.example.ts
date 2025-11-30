/**
 * Arquivo de exemplo de estrutura de dados
 * Copie este arquivo e personalize com suas informações
 */

// Dados pessoais para a seção About Me
export const aboutDataExample = {
  name: 'Seu Nome Completo',
  bio: 'Desenvolvedor apaixonado por tecnologia e design retro-futurista. Especializado em desenvolvimento web moderno.',
  location: 'São Paulo, Brasil',
  github: 'seu-usuario-github'
}

// Dados de contato
export const contactDataExample = [
  {
    label: 'Email',
    value: 'seu.email@exemplo.com',
    icon: 'Mail',
    link: 'mailto:seu.email@exemplo.com'
  },
  {
    label: 'GitHub',
    value: '@seu-usuario',
    icon: 'Github',
    link: 'https://github.com/seu-usuario'
  },
  {
    label: 'LinkedIn',
    value: 'Seu Perfil',
    icon: 'Linkedin',
    link: 'https://linkedin.com/in/seu-perfil'
  },
  {
    label: 'Website',
    value: 'www.seusite.com',
    icon: 'Globe',
    link: 'https://www.seusite.com'
  },
  {
    label: 'Twitter/X',
    value: '@seu-usuario',
    icon: 'Twitter',
    link: 'https://twitter.com/seu-usuario'
  }
]

// Exemplo de estrutura de projeto (caso não use a API do GitHub)
export const projectsExample = [
  {
    id: 1,
    name: 'portfolio-retro',
    description: 'Portfolio com tema retro-futurista desenvolvido com Nuxt.js, TypeScript e Tailwind CSS.',
    html_url: 'https://github.com/seu-usuario/portfolio-retro',
    language: 'TypeScript',
    languages_url: '',
    stargazers_count: 10,
    forks_count: 2,
    topics: ['nuxt', 'typescript', 'tailwind', 'vue']
  },
  {
    id: 2,
    name: 'projeto-exemplo',
    description: 'Descrição do seu projeto aqui.',
    html_url: 'https://github.com/seu-usuario/projeto-exemplo',
    language: 'JavaScript',
    languages_url: '',
    stargazers_count: 5,
    forks_count: 1,
    topics: ['javascript', 'node', 'express']
  }
]

// Exemplo de linguagens (caso não use a API do GitHub)
export const languagesExample = [
  { name: 'TypeScript', percentage: 35, repos: 12 },
  { name: 'JavaScript', percentage: 25, repos: 8 },
  { name: 'Python', percentage: 20, repos: 6 },
  { name: 'Vue', percentage: 15, repos: 5 },
  { name: 'Go', percentage: 5, repos: 2 }
]

