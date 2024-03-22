# Client Side Repo of Travel Bucket

## Documentation

* [I use Admin Template from Core UI](https://github.com/coreui/coreui-free-react-admin-template)
* In order to run the project locally you need to run both server and client repo with different port and convigure the .env file for the URL of the [server](https://github.com/daffavcd/satyr-server) of the client repo.
* The database is hosted on CockroachDB (Credentials are provided in my message), considering initially i want to use cloud hosting MySQL using PlanetScale but it's free version has been deprecated.

## Installation Locally

``` bash
$ npm install
```

or

``` bash
$ yarn install
```

### Basic usage

``` bash
# dev server with hot reload at http://localhost:3000
$ npm start 
```

or 

``` bash
# dev server with hot reload at http://localhost:3000
$ yarn start
```

Navigate to [http://localhost:3000](http://localhost:3000). The app will automatically reload if you change any of the source files.

#### Build

Run `build` to build the project. The build artifacts will be stored in the `build/` directory.

```bash
# build for production with minification
$ npm run build
```

or

```bash
# build for production with minification
$ yarn build
```