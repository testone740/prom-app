## Node + Express

A basic backend application for Prometheus metrics scraping

- https://expressjs.com/en/5x/starter/installing/

### Setup and Install Dependencies

```sh
npm init -y
npm install express @prometheus-io/client
```

### Add Scripts to Package.json

```
"dev": "node --watch ./server.js",
```

### Start Server

```sh
npm run dev
```
