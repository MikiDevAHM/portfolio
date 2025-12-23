<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-shindo-dark/80 backdrop-blur-md border-b border-shindo-purple/10">
    <div class="max-w-7xl mx-auto px-4 md:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-shindo-purple to-shindo-purple-dark flex items-center justify-center overflow-hidden">
            <img
              :src="discordAvatarSrc"
              :alt="discordAvatarAlt"
              class="w-10 h-10 rounded-full object-cover"
              @error="handleDiscordAvatarError"
            />
          </div>
          <div>
            <div class="text-shindo-text-light font-bold text-lg">MikiDevAHM</div>
            <div class="text-shindo-text-dim text-xs">DEVELOPER</div>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center gap-8">
          <button
            v-for="item in navItems"
            :key="item.id"
            @click="emit('navigate', item.id)"
            :class="[
              'shindo-nav-link',
              currentSection === item.id ? 'shindo-nav-link-active' : ''
            ]"
          >
            {{ item.label }}
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 text-shindo-text hover:text-shindo-text-light transition-colors"
          aria-label="Toggle menu"
        >
          <Menu v-if="!mobileMenuOpen" :size="24" />
          <X v-else :size="24" />
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden pb-4 space-y-2 animate-fade-in"
      >
        <button
          v-for="item in navItems"
          :key="item.id"
          @click="handleMobileNav(item.id)"
          :class="[
            'block w-full text-left px-4 py-2 rounded-lg shindo-nav-link',
            currentSection === item.id ? 'shindo-nav-link-active bg-shindo-light' : ''
          ]"
        >
          {{ item.label }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import type { Section } from '~/types'

interface Props {
  currentSection: Section
}

defineProps<Props>()

const emit = defineEmits<{
  navigate: [section: Section]
}>()

const mobileMenuOpen = ref(false)
const discordUserId = '928040478220382210'
const discordAvatarUrl = 'https://cdn.discordapp.com/avatars/928040478220382210/30444227d6a6e4cc1db862771cdc7d8d.png?size=2048'
const avatarError = ref(false)
const discordAvatarAlt = 'Discord avatar'
const fallbackAvatarIndex = computed(() => Number(BigInt(discordUserId) % 5n))
const fallbackAvatarUrl = computed(() => `https://cdn.discordapp.com/embed/avatars/${fallbackAvatarIndex.value}.png`)
const discordAvatarSrc = computed(() => (avatarError.value ? fallbackAvatarUrl.value : discordAvatarUrl))

const navItems = [
  { id: 'about' as Section, label: 'Sobre' },
  { id: 'languages' as Section, label: 'Linguagens' },
  { id: 'projects' as Section, label: 'Projetos' }
]

const handleMobileNav = (section: Section) => {
  mobileMenuOpen.value = false
  emit('navigate', section)
}

const handleDiscordAvatarError = () => {
  avatarError.value = true
}
</script>

