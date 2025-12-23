<template>
  <div class="space-y-12">
    <!-- Personal Projects -->
    <div class="shindo-card">
      <h2 class="text-2xl md:text-3xl font-bold text-shindo-text-light mb-8">
        Projetos Pessoais
      </h2>
      <div v-if="loadingPersonal" class="text-center py-12">
        <p class="text-shindo-text-dim animate-pulse">Carregando projetos pessoais...</p>
      </div>
      <div v-else-if="errorPersonal" class="text-center py-12">
        <p class="text-shindo-purple">{{ errorPersonal }}</p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          v-for="project in personalProjects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>

    <!-- Organization Projects -->
    <div class="shindo-card" v-if="organizationProjects.length > 0 || loadingOrg">
      <h2 class="text-2xl md:text-3xl font-bold text-shindo-text-light mb-8">
        Projetos ShindoClient
      </h2>
      <div v-if="loadingOrg" class="text-center py-12">
        <p class="text-shindo-text-dim animate-pulse">Carregando projetos da organização...</p>
      </div>
      <div v-else-if="errorOrg" class="text-center py-12">
        <p class="text-shindo-purple">{{ errorOrg }}</p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          v-for="project in organizationProjects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Project } from '~/types'

const personalProjects = ref<Project[]>([])
const organizationProjects = ref<Project[]>([])
const loadingPersonal = ref(true)
const loadingOrg = ref(true)
const errorPersonal = ref<string | null>(null)
const errorOrg = ref<string | null>(null)

const config = useRuntimeConfig()

const requestHeaders = {
  ...(config.public.githubToken && {
    'Authorization': `token ${config.public.githubToken}`
  })
}

const fetchProjects = async (url: string) => {
  try {
    const response = await fetch(`${url}?per_page=100&sort=updated`, {
      headers: requestHeaders
    })

    if (!response.ok) {
      throw new Error('Erro ao buscar projetos')
    }

    const projects = await response.json()
    return projects.filter((p: Project) => !p.fork) // Filtrar forks
  } catch (err) {
    throw err
  }
}

const fetchProjectLanguages = async (project: Project): Promise<string[]> => {
  if (!project.languages_url) {
    return []
  }

  try {
    const response = await fetch(project.languages_url, {
      headers: requestHeaders
    })

    if (!response.ok) {
      return []
    }

    const languages: Record<string, number> = await response.json()
    return Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name)
  } catch (err) {
    return []
  }
}

const addLanguagesToProjects = async (projects: Project[]): Promise<Project[]> => {
  const results: Project[] = new Array(projects.length)
  const limit = 6
  let index = 0

  const workers = Array.from({ length: Math.min(limit, projects.length) }, async () => {
    while (index < projects.length) {
      const currentIndex = index++
      const project = projects[currentIndex]
      const languages = await fetchProjectLanguages(project)
      results[currentIndex] = { ...project, languages }
    }
  })

  await Promise.all(workers)
  return results
}

const fetchPersonalProjects = async () => {
  try {
    loadingPersonal.value = true
    errorPersonal.value = null

    const username = config.public.githubUsername || 'MikiDevAHM'

    const projects = await fetchProjects(`https://api.github.com/users/${username}/repos`)
    personalProjects.value = await addLanguagesToProjects(projects)
  } catch (err) {
    errorPersonal.value = err instanceof Error ? err.message : 'Erro desconhecido'
    personalProjects.value = []
  } finally {
    loadingPersonal.value = false
  }
}

const fetchOrganizationProjects = async () => {
  try {
    loadingOrg.value = true
    errorOrg.value = null

    const org = config.public.githubOrg || 'ShindoClient'

    const projects = await fetchProjects(`https://api.github.com/orgs/${org}/repos`)
    organizationProjects.value = await addLanguagesToProjects(projects)
  } catch (err) {
    errorOrg.value = err instanceof Error ? err.message : 'Erro desconhecido'
    organizationProjects.value = []
  } finally {
    loadingOrg.value = false
  }
}

onMounted(() => {
  fetchPersonalProjects()
  fetchOrganizationProjects()
})
</script>

