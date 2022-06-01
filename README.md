# TOP/PKO Website

Website for ToP/PkO Private Server, tested locally with files 1.38.

## Local config & test

Make a file named `.env.local`, paste this and configure with your data:

```bash
SQL_USER=                #SQL User
SQL_DATABASE=            #AccountServer database name
SQL_DATABASE_GDB=        #GameDB database name
API_KEY=                 #Your API KEY
```

Open `config/db.js` and edit `password` with your own password (SQL).\

```bash
user: process.env.SQL_USER,
password: 'Y87dc#$98',  # <------ EDIT HERE
database: process.env.SQL_DATABASE,
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

![web1](https://user-images.githubusercontent.com/53408118/171515498-2c064d08-1ecd-4702-8325-bff7cb5b9a92.PNG)
![web2](https://user-images.githubusercontent.com/53408118/171515524-031cfe2c-ec25-4f0c-a63b-1aad85188a2f.PNG)
![web3](https://user-images.githubusercontent.com/53408118/171515573-9400e0ba-7735-48b5-851d-cd2600cec52a.PNG)
![web5](https://user-images.githubusercontent.com/53408118/171515584-591ffd90-9ad4-4366-9986-bbb452e0e4d7.PNG)


### Links

Client, Server Files & DB tested (v1.38)

[Client](https://pkodev.net/topic/6130-release-clean-top-138-client/)\
[Server Files + Database](https://pkodev.net/topic/206-pirate-king-online-138/)

### Credits
