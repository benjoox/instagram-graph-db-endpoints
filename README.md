## Running the App

-   Follow the instruction in Database setup (Neo4j) section below.
-   Clone the repo
```
git clone git@github.com:benjoox/instagram-graph-db-endpoints.git
```
-   Install the dependencies
```
npm install
```
-   Copy the `.env.example` to `.env`. Uncomment the Neo4j. Edit if necessary.
-   Start the app with `npm start`.
-   Go to `localhost:3000` in your browser and try one of the endpoints in 'Endpoints' section below.

#### Database setup (Neo4j)

> :warning: Please load the seed files before running the tests or the app.

Make sure you have dockers installed

-   run

```
docker-compose up -d
```
With this you will have an instance of neo4j available at `localhost:7474`.
For each enitity there is a seed.cypher file. Open `localhost:7474` and paste the queries in the seed file in the browser console.

### Endpoints

#### User endpoints
`GET /users`
Lists all the users

`GET /users?id=<userID>`
Get the user with the provided id

`GET /users?username=<username>`
Get the user with the provided username

`GET /users/<username>/photos-liked`
Get the photos liked by the given username

`PUT /users/<username>`
Update the users property

`DELETE /users/<username>`
Delete a user node and its relations

#### Photos endpoints
`GET /photos`
Lists all the photos

`GET /photos?id=<photoID>`
Get the photo with the provided id

`GET /photos/<photoID>/user-liked`
Get the users who liked the given photo
