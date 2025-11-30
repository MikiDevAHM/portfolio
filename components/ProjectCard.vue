<template>
  <div class="shindo-card hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(139,92,246,0.3)] hover:border-shindo-purple/50 transition-all duration-300 cursor-pointer group relative overflow-hidden">
    <!-- Gradiente de fundo no hover -->
    <div class="absolute inset-0 bg-gradient-to-br from-shindo-purple/5 via-transparent to-shindo-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    <a
      :href="project.html_url"
      target="_blank"
      rel="noopener noreferrer"
      class="block relative z-10"
    >
      <div class="flex items-start gap-3 mb-4">
        <div class="p-2 bg-gradient-to-br from-shindo-purple/30 to-shindo-purple/10 rounded-lg flex-shrink-0 flex items-center justify-center w-10 h-10 group-hover:from-shindo-purple/50 group-hover:to-shindo-green/30 group-hover:scale-110 transition-all duration-300 group-hover:rotate-3">
          <img
            v-if="!logoError && projectIconUrl.startsWith('http')"
            :src="projectIconUrl"
            :alt="`${project.name} logo`"
            class="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-300"
            @error="handleLogoError"
          />
          <Code
            v-else
            :size="24"
            class="text-shindo-purple group-hover:text-shindo-green transition-colors duration-300"
          />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between">
            <h3 class="text-xl font-bold text-shindo-text-light group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-shindo-purple group-hover:to-shindo-green transition-all duration-300">
              {{ project.name }}
            </h3>
            <ExternalLink :size="18" class="text-shindo-purple opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0 ml-2" />
          </div>
        </div>
      </div>
      
      <p class="text-shindo-text-dim group-hover:text-shindo-text-light text-sm mb-4 line-clamp-3 transition-colors duration-300">
        {{ project.description || 'Sem descrição disponível.' }}
      </p>

      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-if="project.language"
          class="px-3 py-1 bg-gradient-to-r from-shindo-purple/30 to-shindo-purple/10 text-shindo-purple rounded-full text-xs font-medium border border-shindo-purple/20 group-hover:from-shindo-purple/50 group-hover:to-shindo-green/30 group-hover:border-shindo-green/40 group-hover:scale-105 transition-all duration-300"
        >
          {{ project.language }}
        </span>
        <span
          v-for="topic in project.topics?.slice(0, 3)"
          :key="topic"
          class="px-3 py-1 bg-shindo-light/50 text-shindo-text-dim rounded-full text-xs font-medium border border-shindo-purple/10 group-hover:bg-shindo-light/70 group-hover:border-shindo-purple/30 group-hover:text-shindo-text-light group-hover:scale-105 transition-all duration-300"
        >
          {{ topic }}
        </span>
      </div>

      <div class="flex items-center gap-6 text-xs text-shindo-text-dim group-hover:text-shindo-text-light transition-colors duration-300">
        <div class="flex items-center gap-1.5 group-hover:scale-110 transition-transform duration-300">
          <Star :size="14" class="text-shindo-purple group-hover:text-shindo-green transition-colors duration-300" />
          <span>{{ project.stargazers_count }}</span>
        </div>
        <div class="flex items-center gap-1.5 group-hover:scale-110 transition-transform duration-300">
          <GitFork :size="14" class="text-shindo-purple group-hover:text-shindo-green transition-colors duration-300" />
          <span>{{ project.forks_count }}</span>
        </div>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import { ExternalLink, Star, GitFork, Code } from 'lucide-vue-next'
import { computed, ref } from 'vue'

interface Project {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  languages_url: string
  stargazers_count: number
  forks_count: number
  topics: string[]
}

interface Props {
  project: Project
}

const props = defineProps<Props>()

const logoError = ref(false)
const currentBranch = ref('main')

// Extrair owner e repo do html_url
// Exemplo: https://github.com/MikiDevAHM/project-name -> owner: MikiDevAHM, repo: project-name
const repoInfo = computed(() => {
  const url = props.project.html_url
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/)
  if (match) {
    return {
      owner: match[1],
      repo: match[2]
    }
  }
  return null
})


// URL do logo do projeto
const projectIconUrl = computed(() => {
  // Se já tentou e deu erro, retornar string vazia para usar ícone padrão
  if (logoError.value) {
    return ''
  }
  
  // Tentar carregar logo.png do repositório
  if (repoInfo.value) {
    const branches = ['main', 'master', 'develop']
    const branch = branches[currentBranch.value === 'main' ? 0 : branches.indexOf(currentBranch.value)] || 'main'
    return `https://raw.githubusercontent.com/${repoInfo.value.owner}/${repoInfo.value.repo}/${branch}/logo.png`
  }
  
  // Fallback: retornar string vazia para usar ícone padrão
  return ''
})

const handleLogoError = () => {
  // Tentar outras branches antes de usar fallback
  const branches = ['main', 'master', 'develop']
  const currentIndex = branches.indexOf(currentBranch.value)
  
  if (currentIndex < branches.length - 1) {
    currentBranch.value = branches[currentIndex + 1]
    logoError.value = false
  } else {
    logoError.value = true
  }
}
</script>

