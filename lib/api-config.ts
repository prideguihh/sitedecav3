// Configuracao da API do Backend PHP
// Altere esta URL para apontar para o seu servidor

export const API_BASE_URL = "https://tcc3eetecgrupo3t1.websiteseguro.com/api"

// Endpoints
export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/login.php`,
  cadastro: `${API_BASE_URL}/cadastro.php`,
}

// Resultado bruto de uma requisicao POST com FormData.
// O PHP retorna texto puro em caso de erro e JSON em caso de sucesso (login),
// por isso lemos sempre como texto e tentamos o parse de JSON manualmente.
export interface PostFormResult<T = Record<string, unknown>> {
  ok: boolean       // response.ok do fetch (status HTTP 200-299)
  status: number    // codigo HTTP retornado
  text: string      // corpo da resposta em texto puro (ja com trim)
  json: T | null    // objeto JSON parseado, ou null se nao for JSON valido
}

// Envia os dados via POST usando FormData (formato $_POST tradicional do PHP).
// NAO usa JSON.stringify nem Content-Type manual - o navegador define o
// multipart/form-data automaticamente para o FormData.
export async function postForm<T = Record<string, unknown>>(
  endpoint: string,
  data: Record<string, string | Blob>,
): Promise<PostFormResult<T>> {
  const formData = new FormData()
  for (const key in data) {
    formData.append(key, data[key])
  }

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  })

  // Le a resposta primeiro como texto puro
  const rawText = await response.text()
  const text = rawText.trim()

  // Tenta fazer o parse como JSON; se falhar, mantem null
  let json: T | null = null
  try {
    json = JSON.parse(text) as T
  } catch {
    json = null
  }

  return {
    ok: response.ok,
    status: response.status,
    text,
    json,
  }
}
