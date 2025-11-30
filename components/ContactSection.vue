<template>
  <div class="shindo-card">
    <h2 class="text-2xl md:text-3xl font-bold text-shindo-text-light mb-8">
      Contato
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InfoCard
        v-for="contact in contactData"
        :key="contact.label"
        :title="contact.label"
        :value="contact.value"
        :icon="contact.icon"
        :link="contact.link"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const contactData = [
  {
    label: 'Email',
    value: 'seu.email@exemplo.com',
    icon: 'Mail',
    link: 'mailto:seu.email@exemplo.com'
  },
  {
    label: 'GitHub',
    value: '@MikiDevAHM',
    icon: 'Github',
    link: 'https://github.com/MikiDevAHM'
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
  }
]
</script>

