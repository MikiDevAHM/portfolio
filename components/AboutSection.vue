<template>
  <div class="shindo-card">
    <h2 class="text-2xl md:text-3xl font-bold text-shindo-text-light mb-8">
      Sobre Mim
    </h2>
    <div class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard
          title="Nome"
          :value="aboutData.name"
          icon="User"
        />
        <InfoCard
          title="Localização"
          :value="aboutData.location"
          icon="MapPin"
        />
      </div>
      <InfoCard
        title="GitHub"
        :value="aboutData.github"
        icon="Github"
        :link="`https://github.com/${aboutData.github}`"
      />
      <InfoCard
        title="Bio"
        :value="aboutData.bio"
        icon="FileText"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

const config = useRuntimeConfig()

const aboutData = {
  name: 'Miki',
  bio: 'Desenvolvedor especializado em Java e C#, com foco em desenvolvimento de mods e clients de Minecraft. Apaixonado por criar soluções inovadoras para a comunidade de jogadores.',
  location: 'Austria',
  github: 'MikiDevAHM'
}
</script>

