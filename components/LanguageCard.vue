<template>
  <div class="bg-shindo-light/30 rounded-lg p-4 border border-shindo-purple/10 hover:border-shindo-purple/50 hover:shadow-[0_8px_30px_rgba(139,92,246,0.25)] hover:scale-[1.03] transition-all duration-300 cursor-pointer group relative overflow-hidden">
    <!-- Gradiente de fundo no hover -->
    <div class="absolute inset-0 bg-gradient-to-br from-shindo-purple/10 via-transparent to-shindo-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    <div class="flex items-start gap-4 relative z-10">
      <div class="p-2 bg-gradient-to-br from-shindo-purple/30 to-shindo-purple/10 rounded-lg flex-shrink-0 flex items-center justify-center w-12 h-12 group-hover:from-shindo-purple/50 group-hover:to-shindo-green/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
        <img
          :src="languageIconUrl"
          :alt="`${language} icon`"
          class="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300"
          @error="handleImageError"
        />
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="text-xs font-semibold text-shindo-text-dim group-hover:text-shindo-purple mb-1 uppercase tracking-wider transition-colors duration-300">
          {{ language }}
        </h3>
        <p class="text-base font-semibold text-shindo-text-light group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-shindo-purple group-hover:to-shindo-green transition-all duration-300">
          {{ percentage }}%
        </p>
        <p v-if="repos" class="text-sm text-shindo-text-dim group-hover:text-shindo-text-light mt-1 transition-colors duration-300">
          {{ repos }} {{ repos === 1 ? 'repositório' : 'repositórios' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  language: string
  percentage: number
  repos: number
}

const props = defineProps<Props>()

const imageError = ref(false)

const normalizeLanguageName = (lang: string): string => {
  const nameMap: Record<string, string> = {
    'JavaScript': 'js',
    'TypeScript': 'ts',
    'C++': 'cpp',
    'C#': 'csharp',
    'Node.js': 'nodejs',
    'PostgreSQL': 'postgresql',
    'MongoDB': 'mongodb',
    'PowerShell': 'powershell',
    'Dockerfile': 'docker',
  }
  
  return nameMap[lang] || lang.toLowerCase().replace(/\s+/g, '').replace(/\./g, '')
}

const languageIconUrl = computed(() => {
  if (imageError.value) {
    return `https://skillicons.dev/icons?i=code`
  }
  
  const normalizedName = normalizeLanguageName(props.language)
  return `https://skillicons.dev/icons?i=${normalizedName}`
})

const handleImageError = () => {
  imageError.value = true
  // Tentar novamente com nome alternativo se necessário
}
</script>

