const clientId = 'b11e2ef0ed1a313772ad'
const baseUrl = 'http://localhost:3000'
const redirectUrl = `${baseUrl}/api/github-login`
const githubLoginuUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_url=${redirectUrl}`

export default githubLoginuUrl
