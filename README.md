# Jungle test task
![Screen Shot 2019-09-16 at 7 44 28 PM](https://user-images.githubusercontent.com/8875863/65007364-be50e500-d8ba-11e9-843b-5a91648129ce.png)
```bash
# client port 3000
localhost:3000
# backend port 4000
localhost:4000
```

## Screenshots
Backend tests
![Screen Shot 2019-09-16 at 7 45 51 PM](https://user-images.githubusercontent.com/8875863/65007359-b85b0400-d8ba-11e9-8d9a-e130b8bbb066.png)

Client tests
![Screen Shot 2019-09-16 at 7 46 13 PM](https://user-images.githubusercontent.com/8875863/65007361-b98c3100-d8ba-11e9-9d01-0edfd7af3521.png)

Example of usung backend without frontend (parse product by asin)
![Screen Shot 2019-09-16 at 7 45 07 PM](https://user-images.githubusercontent.com/8875863/65007362-babd5e00-d8ba-11e9-9713-7b2a18c55170.png)

Example of using backend without frontend (Getting the database redcords)
![Screen Shot 2019-09-16 at 7 44 51 PM](https://user-images.githubusercontent.com/8875863/65007363-bc872180-d8ba-11e9-99e6-b3dc481c2950.png)



## All together
### Installation
```bash
git clone https://github.com/Lyncis/Jungle.git
cd Jungle
npm install
cd backend
npm install
cd ../client
npm install
cd ../
```

### Run
Launch backend and frontend (client) with one command from root catalog.
```bash
npm start
```

## Separate backend and client running
If you want to run backend and client separately, just follow the following steps.
```bash
# backend
cd backend
npm install
npm start

# client
cd client
npm install
npm start
```

## Addition
`.env` file with backend settings is in the root backend folder.
```bash
# example of .env
MONGODB_URL=mongodb://{mongodb_server}:27017/DBname
PORT=4000
```