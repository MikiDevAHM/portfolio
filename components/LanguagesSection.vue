<template>
  <div class="space-y-12">
    <!-- Linguagens usadas nos projetos -->
    <div class="shindo-card">
      <h2 class="text-2xl md:text-3xl font-bold text-shindo-text-light mb-8">
        Linguagens nos Projetos
      </h2>
      <p class="text-shindo-text-dim mb-6 text-sm">
        Linguagens de programação detectadas automaticamente dos meus repositórios do GitHub.
      </p>
      <div v-if="loading" class="text-center py-12">
        <p class="text-shindo-text-dim animate-pulse">Carregando linguagens...</p>
      </div>
      <div v-else-if="error" class="text-center py-12">
        <p class="text-shindo-purple">{{ error }}</p>
      </div>
      <div v-else-if="languages.length === 0" class="text-center py-12">
        <p class="text-shindo-text-dim">Nenhuma linguagem encontrada nos projetos.</p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <LanguageCard
          v-for="lang in languages"
          :key="lang.name"
          :language="lang.name"
          :percentage="lang.percentage"
          :repos="lang.repos"
        />
      </div>
    </div>

    <!-- Tecnologias que eu conheço -->
    <div class="shindo-card">
      <h2 class="text-2xl md:text-3xl font-bold text-shindo-text-light mb-8">
        Tecnologias que Conheço
      </h2>
      <p class="text-shindo-text-dim mb-6 text-sm">
        Linguagens, frameworks e ferramentas que tenho experiência.
      </p>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="tech in knownTechnologies"
          :key="tech"
          class="bg-shindo-light/30 rounded-lg p-4 border border-shindo-purple/10 hover:border-shindo-purple/50 hover:shadow-[0_8px_30px_rgba(139,92,246,0.25)] hover:scale-[1.03] transition-all duration-300 cursor-pointer group relative overflow-hidden"
        >
          <!-- Gradiente de fundo no hover -->
          <div class="absolute inset-0 bg-gradient-to-br from-shindo-purple/10 via-transparent to-shindo-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div class="relative z-10 flex flex-col items-center justify-center text-center">
            <div class="p-2 bg-gradient-to-br from-shindo-purple/30 to-shindo-purple/10 rounded-lg mb-2 group-hover:from-shindo-purple/50 group-hover:to-shindo-green/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <img
                :src="getTechIcon(tech)"
                :alt="`${tech} icon`"
                class="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300"
                @error="handleTechIconError"
              />
            </div>
            <span class="text-sm font-semibold text-shindo-text-light group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-shindo-purple group-hover:to-shindo-green transition-all duration-300">
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Language {
  name: string
  percentage: number
  repos: number
}

const languages = ref<Language[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Tecnologias que você conhece (em ordem alfabética)
const knownTechnologies = [
  'Astro',
  'C#',
  'CSS',
  'Discord',
  'Docker',
  'DotNet',
  'Electron',
  'Express',
  'Figma',
  'Firebase',
  'Git',
  'Github',
  'Gradle',
  'HTML',
  'Java',
  'JavaScript',
  'Kotlin',
  'Markdown',
  'Mysql',
  'Next',
  'npm',
  'Nuxt',
  'Python',
  'pnpm',
  'React',
  'Rust',
  'Shell',
  'Supabase',
  'Svelte',
  'Tailwind',
  'Tauri',
  'TypeScript',
  'Vercel',
  'Vite',
  'Vue'
]

const techIconErrors = ref<Set<string>>(new Set())

const config = useRuntimeConfig()
const requestHeaders = {
  ...(config.public.githubToken && {
    'Authorization': `token ${config.public.githubToken}`
  })
}

const fetchRepoLanguages = async (languagesUrl: string): Promise<Record<string, number>> => {
  if (!languagesUrl) {
    return {}
  }

  try {
    const response = await fetch(languagesUrl, {
      headers: requestHeaders
    })

    if (!response.ok) {
      return {}
    }

    return await response.json()
  } catch (err) {
    return {}
  }
}

const normalizeTechName = (tech: string): string => {
  const nameMap: Record<string, string> = {
    'TypeScript': 'ts',
    'JavaScript': 'js',
    'C#': 'cs',
    'Tailwind': 'tailwind',
    'Next': 'nextjs',
    'Nuxt': 'nuxtjs',
    'Express': 'express',
    'Shell': 'bash',
    'Fish': 'fish',
    'Markdown': 'md',
    'HTML': 'html',
    'CSS': 'css',
  }
  
  return nameMap[tech] || tech.toLowerCase().replace(/\s+/g, '').replace(/\./g, '').replace(/-/g, '')
}

const getTechIcon = (tech: string) => {
  if (techIconErrors.value.has(tech)) {
    return `https://skillicons.dev/icons?i=code`
  }
  
  const normalizedName = normalizeTechName(tech)
  return `https://skillicons.dev/icons?i=${normalizedName}`
}

const handleTechIconError = (event: Event) => {
  const img = event.target as HTMLImageElement
  const tech = img.alt.replace(' icon', '')
  techIconErrors.value.add(tech)
  img.src = `https://skillicons.dev/icons?i=code`
}

const fetchLanguages = async () => {
  try {
    loading.value = true
    error.value = null

    const username = config.public.githubUsername || 'MikiDevAHM'
    const org = config.public.githubOrg || 'ShindoClient'
    const allRepos: any[] = []

    // Buscar repositórios do usuário
    try {
      const userReposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
        headers: requestHeaders
      })

      if (userReposResponse.ok) {
        const userRepos = await userReposResponse.json()
        allRepos.push(...userRepos.filter((r: any) => !r.fork))
      }
    } catch (e) {
      console.warn('Erro ao buscar repositórios do usuário:', e)
    }

    // Buscar repositórios da organização
    try {
      const orgReposResponse = await fetch(`https://api.github.com/orgs/${org}/repos?per_page=100`, {
        headers: requestHeaders
      })

      if (orgReposResponse.ok) {
        const orgRepos = await orgReposResponse.json()
        allRepos.push(...orgRepos.filter((r: any) => !r.fork))
      }
    } catch (e) {
      console.warn('Erro ao buscar repositórios da organização:', e)
    }

    if (allRepos.length === 0) {
      throw new Error('Nenhum repositório encontrado')
    }
    
    // Contar linguagens pelo tamanho (bytes) por reposit¢rio
    const langCount: Record<string, { bytes: number, repos: number }> = {}
    const limit = 6
    let index = 0

    const workers = Array.from({ length: Math.min(limit, allRepos.length) }, async () => {
      while (index < allRepos.length) {
        const currentIndex = index++
        const repo = allRepos[currentIndex]
        const repoLanguages = await fetchRepoLanguages(repo.languages_url)

        for (const [name, bytes] of Object.entries(repoLanguages)) {
          if (!langCount[name]) {
            langCount[name] = { bytes: 0, repos: 0 }
          }
          langCount[name].bytes += bytes
          langCount[name].repos++
        }
      }
    })

    await Promise.all(workers)

    // Converter para array e calcular porcentagens
    const total = Object.values(langCount).reduce((sum, lang) => sum + lang.bytes, 0)

    if (total === 0) {
      const fallbackCount: Record<string, { count: number, repos: number }> = {}

      for (const repo of allRepos) {
        if (repo.language) {
          if (!fallbackCount[repo.language]) {
            fallbackCount[repo.language] = { count: 0, repos: 0 }
          }
          fallbackCount[repo.language].count++
          fallbackCount[repo.language].repos++
        }
      }

      const fallbackTotal = Object.values(fallbackCount).reduce((sum, lang) => sum + lang.count, 0)
      if (fallbackTotal === 0) {
        throw new Error('Nenhuma linguagem encontrada')
      }

      const fallbackArray: Language[] = Object.entries(fallbackCount).map(([name, data]) => ({
        name,
        percentage: Math.round((data.count / fallbackTotal) * 100),
        repos: data.repos
      }))

      languages.value = fallbackArray.sort((a, b) => b.percentage - a.percentage)
      return
    }

    const langArray: Language[] = Object.entries(langCount).map(([name, data]) => ({
      name,
      percentage: Math.round((data.bytes / total) * 100),
      repos: data.repos
    }))

    languages.value = langArray.sort((a, b) => b.percentage - a.percentage)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erro desconhecido'
    languages.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchLanguages()
})
</script>

