# Smokey's Marketplace

Smokey's is a web app where members can come to trade or borrow items and services offered by their neighbors (in their zip code).

#### Overview:
Our client was looking for a community based web app a la Craiglist. On this application members could find other local members and initiate trades of goods or services.

#### Solution:
Utilizing the latest technologies our team implemented a robust back end supported by **Express**, **MongoDB** w/ **Mongoose**, and **AWS S3** to store and server user data. The front end was built out with **React** w/ hooks and **Axios** to provide clients with a responsive experience.

## Tech Stack
![JavaScript](https://img.shields.io/badge/JavaScript%20-%23323330.svg?&style=flat-square&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/React%20-%2320232a.svg?&style=flat-square&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5%20-%23E34F26.svg?&style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3%20-%231572B6.svg?&style=flat-square&logo=css3&logoColor=white)
![Git](https://img.shields.io/badge/Git%20-%23F05033.svg?&style=flat-square&logo=git&logoColor=white)
![VSCode](https://img.shields.io/badge/VS%20Code%20-%23007ACC.svg?&style=flat-square&logo=visual-studio-code&logoColor=white)
![Node](https://img.shields.io/badge/Node.js%20-%2343853D.svg?&style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express%20-%23404d59.svg?&style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=flat-square&logo=mongodb&logoColor=white)
![Amazon AWS](https://img.shields.io/badge/Amazon_AWS-232F3E?style=flat-square&logo=amazon-aws&logoColor=white)

**Client:** [React](https://www.reactjs.org), [React Router](https://reactrouter.com), [Axios](https://axios-http.com)

**Server:** [Node.js](https://nodejs.d), [Express](https://expressjs.com/), [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/), and [AWS S3](https://aws.amazon.com/s3/)

**Deployment:** 2x [AWS EC2](https://aws.amazon.com/ec2/) w/ [Ubuntu](https://ubuntu.com/) 20.04, [Nginx](https://www.nginx.com/), and [Certbot](https://certbot.eff.org/) for SSL

**Testing:** [Mocha](https://mochajs.org/), and [Chai](https://www.chaijs.com/) w/ Chai-HTTP

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`ACCESS_KEY_ID` - AWS S3 Access Key

`SECRET_ACCESS_KEY` - AWS S3 Secret Access Key

`BUCKET_NAME` - AWS S3 Bucket Name

`CLIENT_ACCESS_ID` - Google Oauth API Access ID

`CLIENT_SECRET` - Google Oauth API Secret Key

`ZIPCODE_API_KEY` - [Zipcode API Key](https://www.zipcodeapi.com/API#radius)

## Installation

Install Smokey's Marketplace...

```bash
  git clone repo
  cd smokeys-marketplace
  npm install
  npm run build
  npm start
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Screenshots

![Splash Screen](https://github.com/cjohansen11/Smokeys-Marketplace/blob/main/readme_files/splash.png)
![Marketplace](https://github.com/cjohansen11/Smokeys-Marketplace/blob/main/readme_files/marketplace.png)
![User Overview](https://github.com/cjohansen11/Smokeys-Marketplace/blob/main/readme_files/user_overview.png)
![Current Items](https://github.com/cjohansen11/Smokeys-Marketplace/blob/main/readme_files/current_items.png)
![Past Trades](https://github.com/cjohansen11/Smokeys-Marketplace/blob/main/readme_files/past_trades.png)
![Ratings & Reviews](https://github.com/cjohansen11/Smokeys-Marketplace/blob/main/readme_files/ratings.png)
![Add New Item](https://github.com/cjohansen11/Smokeys-Marketplace/blob/main/readme_files/add_new_item.png)
## API Reference - Transactions

### List Transactions
Returns all transactions for a given user.

```http
  GET /transactions/
```
#### Query Parameters
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user_id` | `string` | **Required**. Specifies the user for which to retrieve transactions for. |
| `page` | `uint` | **Optional**. Specifies the page of results to return. Default 0. |
| `count` | `uint` | **Optional**. Specifies the number of results per page to return. Default 5 |
| `sort` | `string` | **Optional**. Changes the sort order of transactions returned. Options: `created_at_desc`, `created_at_asc`, `recently_updated`. Default `recently_updated`. |

#### Response
```http
  Status: 200 OK
```

### Get all proposed Transactions
Returns all transactions, with details, that have been proposed to a given user.

i.e. Where the the given `user_id` is listed in the `transaction.to.user_id` field of a transaction.

```http
  GET /transactions/user/
```
#### Query Parameters
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id` | `string` | **Required**. Specifies the user ID that a trade was proposed to. |
| `status` | `string` | **Optional**. Specifies the status of the transaction. Options: `pending`, `completed`, and `cancelled`. Default `pending`. |

#### Response
```http
  Status: 200 OK
```

### Add Transaction
Adds transaction for the given from user ID, from item ID, to user ID, and to item ID.

```http
  POST /transactions/
```

#### Query Parameters
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `from_user_id` | `string` | **Required**. Specifies the user from which initiates the transaction. |
| `from_item_id` | `string` | **Required**. Specifies the item for which the `from_user_id` is offering. |
| `to_user_id` | `string` | **Required**. Specifies the user to which the transaction is being offered. |
| `to_item_id` | `string` | **Required**. Specifies the item for which the `to_user` is offering. |

#### Response

```http
  Status: 201 CREATED
```

### Mark Transaction Status as 'completed'
Changes the transaction status from initial 'pending' state to 'completed'.

```http
  PUT /transactions/:transaction_id/complete/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `transaction_id` | `string` | **Required**. Specifies the transaction to update the status on. |

#### Response
```http
  Status: 204 NO CONTENT
```

### Mark Transaction Status as 'cancelled'
Changes the transaction status from initial 'pending' state to 'cancelled'.

```http
  PUT /transactions/:transaction_id/cancel/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `transaction_id` | `string` | **Required**. Specifies the transaction to update the status on. |

#### Response
```http
  Status: 204 NO CONTENT
```

### Mark Review Status on Transaction as 'true'
Changes the review status on a transaction from initial 'false' state to 'true'.

```http
  PUT /transactions/:transaction_id/review-left/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `transaction_id` | `string` | **Required**. Specifies the transaction to update the review status on. |

#### Response
```http
  Status: 204 NO CONTENT
```

## API Reference - Users

### List User Information
Retrieves all users information for given user ID.

```http
  GET /user/:id/
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `string` | **Required**. Specifies the user for which user data to retrieve. |

#### Response

```http
  Status: 200 OK
```

### Add a User
Adds a new user to the database.

```http
  POST /user/
```

#### Body Parameters
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `firstName` | `string` | **Required**. Specifies the first name of the new user. |
| `lastName` | `string` | **Required**. Specifies the last name of the new user. |
| `email` | `string` | **Required**. Specifies the email for the new user. |
| `phone` | `string` | **Required**. Specifies the phone number for the new user. Format: '555-342-2512'. |
| `location` | `string`| **Required**. Specifies the zipcode location for the new user. |

#### Response
```http
  Status: 201 CREATED
```

### Update User Information
Updates the given user's information.

```http
  PUT /user/:id/
```

#### Parameter
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `string` | **Required**. Specifies the user for which you want to update. |

#### Body Parameters
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `firstName` | `string` | **Optional**. Specifies the first name of the new user. |
| `lastName` | `string` | **Optional**. Specifies the last name of the new user. |
| `email` | `string` | **Optional**. Specifies the email for the new user. |
| `phone` | `string` | **Optional**. Specifies the phone number for the new user. Format: '555-342-2512'. |
| `location` | `string`| **Optional**. Specifies the zipcode location for the new user. |

#### Response
```http
  Status: 200 OK
```

## API Reference - Items

### List Items
Retrieves all items for the marketplace based on the given user ID.

```http
  GET /items/
```
#### Body Parameters
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_object_id` | `string` | **Required**. Specifies the user to retrieve items for. |
| `location` | `string` | **Required**. Specifies the location from which to retrieve items for. |
| `radius` | `string` | **Optional**. Specifies the radius (in miles) in which to find items. Default 5. |
| `page` | `uint` | **Optional**. Specifies the page of results to return. Default 0. |
| `count` | `uint` | **Optional**. Specifies the numbers of items per page to return. Default 10. |

#### Response
```http
  Status: 200 OK
```

### List User Items
Retrieves all items belonging to the given user ID.

```http
  GET /items/:user_object_id/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_object_id` | `string` | **Required**. Specifies the user for which to retrieve items for. |

#### Response
```http
  Status: 200 OK
```

### Add New Item
Creates a new item for the given user ID.

```http
  POST /items/:user_object_id/
```
#### Body Parameters
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_object_id` | `string` | **Required**. Specifies the user for which to add the item for. |
| `name` | `string` | **Required**. Specifies the name of the new item. |
| `type` | `string` | **Required**. Specifies the type of the new item. Options: `goods` or `service`. |
| `description` | `string` | **Required**. Description of the new item. |
| `image_link` | `string` | **Required**. Specifies the image URI in S3 bucket. |

#### Response
```http
  Status: 201 CREATED
```

### Update Item Availability
Updates the given item ID's availability.

```http
  PUT /items/availability/:item_object_id/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `item_object_id` | `string` | **Required**. Specifies the item for which the availability status will be updated on. |
| `availability` | `boolean` | **Required**. Specifies the new availability status for the given item ID. |

#### Response
```http
  Status: 204 NO CONTENT
```

## API Reference - Ratings & Reviews

### List all Ratings & Reviews
Retrieves all ratings and reviews for the current user ID.

```http
  GET /reviews/:user_id/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id` | `string` | **Required**. Specifies the user for which to retrieve ratings and reviews for. |
| `page` | `uint` | **Optional**. Specifies the page of results to return. Default 0. |
| `count` | `uint` | **Optional**. Specifies the number of results to return per page. Default 5. |

#### Response
```http
  Status: 200 OK
```

### Create new Rating & Review
Creates a new rating and review entry for the given transaction ID.

```http
  POST /reviews/user_id/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `reviewer_id` | `string` | **Required**. Specifies the user leaving the review. |
| `reviewed_id` | `string` | **Required**. Specifies the user that is recieving the review. |
| `transaction_id` | `string` | **Required**. Specifies the transaction for which the new review is for. |
| `ratings` | `uint` | **Required**. Rating value for the new review. Options: 1 - 5. |
| `reviews` | `string` | **Required**. Specifies the review message left for the given `reviewed_id`. |

#### Response
```http
  Status: 200 OK
```

### Get Review Size
Returns the length of a ratings & reviews collection for a given user ID.

```http
  GET /reviewSize/:user_id/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id` | `string` | **Required**. Specifies the user for which to retrieve review size for. |

#### Response
```http
  Status: 200 OK
```
## Authors

- [@cjohansen11](https://www.github.com/cjohansen11)
- [@alyany34](https://www.github.com/alyant34)
- [@sunkim0330](https://www.github.com/sunkim0330)
- [@mjennings3](https://www.github.com/mjennings3)
- [@scopro220](https://www.github.com/scopro220)
- [@katieladd](https://www.github.com/katieladd)
- [@erfez](https://www.github.com/erfez)
