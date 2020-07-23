# Final Project - wallaclone

This repository consist on a MERN aplication based on the modules of:

- NodeJs (Advanced) of the "Fullstack Web Developer Bootcamp" imparted by "Keepcoding"
- React (Advanced) of the "Fullstack Web Developer Bootcamp" imparted by "Keepcoding"

The app consist on:

- Backend made with NodeJs
- Database on MongoDb Atlas
- JWT authentication
- Nodemailer + SendGrid for transport
- Frontend made with React
- Hooks running on Redux
- Multi languages through i18n
- Styles provided by material-ui

## Architecture

```
https://drive.google.com/file/d/1dGFcg-TuFyJE2HlZNw22XkjC1wJ9x7Pv/view
```

## INSTALATION

### Download

To download this repository:

```
git clone https://github.com/Josu-Rubio/Final-Project.git
```

### NPM i (Module installation)

On the server folder:

```
npm install
```

On the client folder:

```
npm install
```

### DB initializing

Init the database in Mongo. There's a file `install_db.js` with an User and some products to start testing de web.

On the server folder:

```
npm run init
```

### Config

Before starting the App, theres a `.env.example` file on the server folder. Change the name to `.env` and follow the instructions inside. This way you will set your App ready to start.

### Starting de App

Unce generated the .env file, start the app:

```
nodemon start
```

Run as well the worker to generate the thumbnail:

```
npm run worker
```

Finally, we run the frontend from the client folder:

```
npm start
```

## REST API

### Authentication

The API product routes are secured by JWT. It is necessary to make a call to get the token back to the next endpoint:

```
https://localhost:8000/apiv1/authenticate
```

That call will retrieve a JWT authentication which will last for 60 minutes.
The result should be something like:

```js
{
    "success": true,
    "description": "Authorization successful",
    "user": {
        "name": "User Example",
        "email": "user@example.com",
        "token": "9a0e8nqdwisa938º2b1eicddianc8e123enicqwwac9edn29weu0q293e12'"
    }
}
```

### User

The user model for the authentication consist:

#### User-schema

- \_id (string) --> user id
- name (string) --> user name
- email (string) --> user email
- password (string) --> user password
- jwt (string) --> JWT for authentication
- expire (Date) --> JWT expiration date

#### Creating an user

To create an user a `POST` call should be made throug the URL base. All the params should be sent to define the new user(name, email, password)

This proccess is made automatically through the frontend App.

```
https://localhost:8000/apiv1/user
```

This should generate an "Inactive" user. To activate such user, it should be necessary to validate through the `link` sent to the new user email.

**During the moment, we are working on the transport system. So far, all the users are created with the status "Active".**

### Products

Este recurso proporciona el modelo de anunción que utiliza la aplicación como modelo básico para su funcionalidad tipo "tienda"

#### Products-Schema

\_id (string) --> product id
name (string) --> product name
desc (string) --> product description
price | (number) --> product price
type (string) --> product type (sell/buy)
img (string) --> product url img
thumbnail (string) --> product url img thumbnail|
tags (array) --> product tags

#### Get products

to obtain all the products, it is necessary to go through th endpoint:

```
https://localhost:8000/apiv1/products
```

```js
{
  "success": true,
  "results": [
    {
      "tags": [
        "lifestyle"
      ],
      "_id": "5d3a0a5f9bd7ed2ece463ab4",
      "name": 'Green Card',
      "desc": 'I offer a green-card',
      "price": 999.99,
      "type": 'sell',
      "img": 'images/products/original/2020-7-22194622__6627603.jpg',
      "tags": ['lifestyle'],
      "thumbnail": "/images/products/thumbnail/2020-7-22194622__6627603.jpg",
      "__v": 0,
      "createdAt":"2020-07-22T20:44:36.764+00:00",
      "updatedAt":"2020-07-22T20:44:36.764+00:00"
    },

  ]
}
```

#### Create a product

To create a product it is necessary to make a `POST` call to the endpoint:

```
https://localhost:8000/apiv1/products
```

#### Update a product

To create a product it is necessary to make a `PUT` call to the endpoint named before PLUS adding the id of the product:

```
https://localhost:8000/apiv1/products/5d3a0a5f9bd7ed2ece463abb
```
