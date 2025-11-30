import type { Project, Language } from '~/types'

export const useGitHub = () => {
  const config = useRuntimeConfig()

  const fetchRepos = async (url: string): Promise<Project[]> => {
    try {
      const response = await fetch(`${url}?per_page=100&sort=updated`, {
        headers: {
          ...(config.public.githubToken && {
            'Authorization': `token ${config.public.githubToken}`
          })
        }
      })

      if (!response.ok) {
        throw new Error(`Erro ao buscar repositórios: ${response.statusText}`)
      }

      const repos: Project[] = await response.json()
      return repos.filter((repo) => !repo.fork) // Filtrar forks
    } catch (error) {
      console.error('Erro ao buscar repositórios:', error)
      throw error
    }
  }

  const fetchLanguages = async (username: string): Promise<Language[]> => {
    try {
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100`,
        {
          headers: {
            ...(config.public.githubToken && {
              'Authorization': `token ${config.public.githubToken}`
            })
          }
        }
      )

      if (!reposResponse.ok) {
        throw new Error('Erro ao buscar repositórios')
      }

      const repos: Project[] = await reposResponse.json()

      // Contar linguagens
      const langCount: Record<string, { count: number; repos: number }> = {}

      for (const repo of repos) {
        if (repo.language) {
          if (!langCount[repo.language]) {
            langCount[repo.language] = { count: 0, repos: 0 }
          }
          langCount[repo.language].count++
          langCount[repo.language].repos++
        }
      }

      // Converter para array e calcular porcentagens
      const total = Object.values(langCount).reduce(
        (sum, lang) => sum + lang.count,
        0
      )

      if (total === 0) {
        return []
      }

      const langArray: Language[] = Object.entries(langCount).map(
        ([name, data]) => ({
          name,
          percentage: Math.round((data.count / total) * 100),
          repos: data.repos
        })
      )

      return langArray.sort((a, b) => b.percentage - a.percentage)
    } catch (error) {
      console.error('Erro ao buscar linguagens:', error)
      throw error
    }
  }

  return {
    fetchRepos,
    fetchLanguages
  }
}

