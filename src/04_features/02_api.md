# API

Natively, Hyperbase supports three types of APIs for use in your application. These three APIs have different uses.

## REST API

REST API provide all capabilities to access or manipulate the data. To access the data based on rules applied, you can explore the provided REST API hosted on Postman at [this link](https://bit.ly/hyperbase-postman).\
![REST API](_assets/rest_api.png)

Before using the API, there are a few things you need to set up.

### 1. Set base URL variable

```
{{base_url}} = http://{hyperbase_address}:{port}
```

![Variable](_assets/environment.png)

### 2. Authenticate

```
POST {{base_url}}/api/rest/auth/
```

There are two different ways to authenticate: password-based or token-based.

#### Password Based

Enter your email and password at this endpoint:

```
POST {{base_url}}/api/rest/auth/password-based
```

```JSON
{
    "email": "", // Required. String. Email
    "password": "" // Required. String
}
```

#### Token Based

Provide your token and token ID. The data field is optional.

```
POST {{base_url}}/api/rest/auth/token-based
```

```JSON
{
    "token_id": "",  // Required. UUID
    "token": "", // Required. String
    "collection_id": "", // Required if allow_anonymous is disabled
    "data": {
        "username": "",
        "password": ""
    }
}
```

### 3. Store token

Check the response, and you will receive a token.
Store this token in an environment variable named token.

### 4. Choose API

You can now use any API endpoint you want.

## WebSocket API

WebSocket is used to listen for updated data on a particular collection. Each successful insert, update, or delete operation will notify each WebSocket listener client.\
To listen to a specific collection, you can connect to WebSocket at the path below.

```
{WebSocketProtocol}://{HyperbaseBaseURL}/api/rest/project/{ProjectID}/collection/{CollectionID}/subscribe?token={AuthToken}
```

Below is an example.

```
wss://api.hyperbase.in/api/rest/project/4585def6-b2af-418f-8b31-926bd579b3f5/collection/4585def6-b2af-418f-8b31-926bd579b3f5/subscribe?token=eyJ0eXAiOiJKV1XiLCJhbGciOiJIUzI1NiJ9.eyJpZCa6eyJBaG1paaI6IaSpOgy3M2M4LWUo0gUtNzFiMy1iYjnklTdXYthhY2Q3MKY0ZGJ9LCJleHAiOjwwMjexMDmxNTh9.g4bkzf46RmIuUWYiJ4XI8g-i2c4dyEjb2VZxX2CGxFs
```

## MQTT

MQTT can be used to insert new records to a specific collection by publishing messages with a specific topic to an MQTT broker. Hyperbase server subscribes to the MQTT topic as set in [the configuration file](../03_installation/04_setup/04_hyperbase.md#configuration-file). A valid message received by the Hyperbase server will add the record into the collection. The added record will also be broadcast to the WebSocket listener client.\
A valid MQTT message has JSON structure as below.

```JSON
{
    "project_id": "project_id", // replace with your project id
    "token_id": "token_id", // replace with your token id
    "user": { // If using a token set to allow anonymous sign-in, this field becomes optional.
        "collection_id": "collection_id", // id of the collection where the user id exists
        "id": "user_id"
    },
    "collection_id": "target_collection_id", // id of the collection where the data will be inserted
    "data": { // this is an example of the data to be entered
        "field_a": "value_a",
        "field_b": 2,
        "field_c": 3.3,
        "field_d": {
            "sub_field_d": "value"
        }
    }
}
```

If MQTT authentication and/or authorization is enabled, the MQTT client must pass such authentication and/or authorization before sending valid messages.
