const PROXY_CONFIG = [
  {
    context: [
      "/api/",
    ],
    secure: false,
    target: "https://localhost:7265",
    headers: {
      Connection: 'Keep-Alive'
    }
  }
]

module.exports = PROXY_CONFIG;
