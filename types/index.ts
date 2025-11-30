// Tipos para o projeto

export interface Project {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  languages_url: string
  stargazers_count: number
  forks_count: number
  topics: string[]
  fork?: boolean
}

export interface Language {
  name: string
  percentage: number
  repos: number
}

export interface ContactInfo {
  label: string
  value: string
  icon: string
  link?: string
}

export interface AboutData {
  name: string
  bio: string
  location: string
  github: string
}

export type Section = 'about' | 'languages' | 'projects'

