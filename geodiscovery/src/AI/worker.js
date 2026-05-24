export default {
  async fetch(request, env) {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: headers })
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: headers })
    }

    try {
      const body   = await request.json()
      const prompt = body.prompt

      const risposta = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: [
          { role: 'user', content: prompt }
        ],
        max_tokens: 600
      })

      return new Response(JSON.stringify({ result: risposta.response }), { headers: headers })
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: headers })
    }
  }
}
