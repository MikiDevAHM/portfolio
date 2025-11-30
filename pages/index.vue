<template>
  <div class="min-h-screen">
    <!-- Navigation -->
    <Navigation 
      :current-section="currentSection"
      @navigate="handleNavigation"
    />

    <!-- Main Content -->
    <main class="pt-16">
      <div class="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <!-- Hero Section (only on about page) -->
        <div v-if="currentSection === 'about'" class="mb-12 animate-fade-in">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-3 py-1 bg-shindo-green/20 text-shindo-green rounded-full text-xs font-semibold">
              DISPONÍVEL
            </span>
            <span class="text-shindo-text-dim text-sm">Desenvolvedor Java & C#</span>
          </div>
          <h1 class="text-4xl md:text-6xl font-bold text-shindo-text-light mb-4 leading-tight">
            Desenvolvedor<br />
            <span class="text-shindo-purple">Especializado em</span><br />
            Java, C# e Minecraft
          </h1>
          <p class="text-shindo-text-dim text-lg md:text-xl max-w-2xl mb-6">
            Criando mods e clients de Minecraft com Java, desenvolvendo soluções inovadoras para a comunidade.
          </p>
          <div class="flex flex-wrap gap-3">
            <span class="px-4 py-2 bg-shindo-purple/20 text-shindo-purple rounded-full text-sm font-semibold border border-shindo-purple/30">
              Java
            </span>
            <span class="px-4 py-2 bg-shindo-purple/20 text-shindo-purple rounded-full text-sm font-semibold border border-shindo-purple/30">
              C#
            </span>
            <span class="px-4 py-2 bg-shindo-green/20 text-shindo-green rounded-full text-sm font-semibold border border-shindo-green/30">
              Minecraft Mods
            </span>
            <span class="px-4 py-2 bg-shindo-green/20 text-shindo-green rounded-full text-sm font-semibold border border-shindo-green/30">
              Minecraft Clients
            </span>
          </div>
        </div>

        <!-- Content Sections -->
        <div class="space-y-12">
          <!-- About Me Section -->
          <section 
            v-show="currentSection === 'about'"
            class="animate-slide-up"
          >
            <AboutSection />
          </section>

          <!-- Known Languages Section -->
          <section 
            v-show="currentSection === 'languages'"
            class="animate-slide-up"
          >
            <LanguagesSection />
          </section>

          <!-- Projects Section -->
          <section 
            v-show="currentSection === 'projects'"
            class="animate-slide-up"
          >
            <ProjectsSection />
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Section } from '~/types'

const currentSection = ref<Section>('about')

const handleNavigation = (section: Section) => {
  currentSection.value = section
  // Scroll to top when navigating
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

