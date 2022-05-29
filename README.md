# TOP/PKO Website

Website for ToP/PkO Private Server, tested locally with files 1.38.

## Local config & test

Make a file named `.env.local`, paste this and configure with your data:

```bash
SQL_USER=UserSQL         #SQL User
SQL_DATABASE=            #AccountServer database name
SQL_DATABASE_GDB=        #GameDB database name
SQL_HOST=                #EXAMPLE: localhost\\SQLEXPRESS
API_KEY=                 #Your API KEY
```

Open `config/db.js` and edit `password` with your own password (SQL).\

```bash
user: process.env.SQL_USER,
password: 'Y87dc#$98',  # <------ EDIT HERE
database: process.env.SQL_DATABASE,
server: process.env.SQL_HOST,
```

Open `next.config.js` and edit `secret` with your `API_KEY`.

```bash
serverRuntimeConfig: {
  secret: 'yourApiKey',
},
```

Install dependencies and Run:

```bash
npm i
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Pages

`pages/api` Request to Database\
`page/user` User module\
`page/register` New USER

## Images

![1](https://user-images.githubusercontent.com/53408118/170852799-d6375fe8-bcf3-4765-ab27-57497c0d6f4e.png)

### Links

Client, Server Files & DB tested (v1.38)

[Client](https://pkodev.net/topic/6130-release-clean-top-138-client/)\
[Server Files + Database](https://pkodev.net/topic/206-pirate-king-online-138/)

### Credits
