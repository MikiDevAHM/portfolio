<template>
  <div class="bg-shindo-light/30 rounded-lg p-4 border border-shindo-purple/10 hover:border-shindo-purple/50 hover:shadow-[0_8px_30px_rgba(139,92,246,0.2)] hover:scale-[1.02] transition-all duration-300 cursor-pointer group relative overflow-hidden">
    <!-- Gradiente de fundo no hover -->
    <div class="absolute inset-0 bg-gradient-to-br from-shindo-purple/10 via-transparent to-shindo-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    <div class="flex items-start gap-4 relative z-10">
      <div class="p-2 bg-gradient-to-br from-shindo-purple/30 to-shindo-purple/10 rounded-lg flex-shrink-0 group-hover:from-shindo-purple/50 group-hover:to-shindo-green/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
        <component
          :is="iconComponent"
          :size="20"
          class="text-shindo-purple group-hover:text-shindo-green transition-colors duration-300"
        />
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="text-xs font-semibold text-shindo-text-dim group-hover:text-shindo-purple mb-1 uppercase tracking-wider transition-colors duration-300">
          {{ title }}
        </h3>
        <p v-if="link" class="text-base font-semibold text-shindo-text-light group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-shindo-purple group-hover:to-shindo-green transition-all duration-300">
          <a :href="link" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 group/link">
            {{ value }}
            <ExternalLink :size="14" class="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
          </a>
        </p>
        <p v-else class="text-base font-semibold text-shindo-text-light group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-shindo-purple group-hover:to-shindo-green transition-all duration-300">
          {{ value }}
        </p>
        <p v-if="subtitle" class="text-sm text-shindo-text-dim group-hover:text-shindo-text-light mt-1 transition-colors duration-300">
          {{ subtitle }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  User, FileText, MapPin, Github, Mail, Linkedin, Globe,
  Code2, FileCode, Terminal, Database, Smartphone, ExternalLink
} from 'lucide-vue-next'
import { computed } from 'vue'

interface Props {
  title: string
  value: string
  icon?: string
  subtitle?: string
  link?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'FileText'
})

const iconMap: Record<string, any> = {
  User,
  FileText,
  MapPin,
  Github,
  Mail,
  Linkedin,
  Globe,
  Code2,
  FileCode,
  Terminal,
  Database,
  Smartphone,
  ExternalLink
}

const iconComponent = computed(() => {
  return iconMap[props.icon] || FileText
})
</script>

