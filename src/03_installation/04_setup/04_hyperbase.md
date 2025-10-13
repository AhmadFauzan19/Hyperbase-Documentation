# Hyperbase

To run Hyperbase, you can run this command.

```console
$ docker run --name hyperbase -v config.yml:/app/config.yml -p 8080:8080 mnaufalhilmym/hyperbase
```

> **NOTE**: Adjust the config.yml path and the exposed port.

## Configuration file

You need a `config.yml` file. Below is an example of a configuration file.

```yml
app:
  mode: "development" # development or production

log:
  display_level: true
  level_filter: "info"
  db_ttl: 604800 # seconds

hash:
  argon2:
    algorithm: "Argon2id"
    version: "V0x13"
    salt: "cGSkx2yuzi6aHcHPyRQD2Tfi8CupDKu6HqKaMdT47nBBWaY2KS9tiLXKi4zEiwxd"

token:
  jwt:
    secret: "cGSkx2yuzi6aHcHPyRQD2Tfi8CupDKu6HqKaMdT47nBBWaY2KS9tiLXKi4zEiwxd7E4xBw2VKuMYRVd45bQHJ6TdWi27CiMEjQ4dsFPnn2hLA2UpenKBZEjppSe4A9Jy"
    expiry_duration: 604800 # seconds

mailer:
  smtp_host: "smtp.gmail.com"
  smtp_username: "smtp_username"
  smtp_password: "smtp_password"
  sender_name: "sender_name"
  sender_email: "sender_email"

db: # choose one database backend
  postgres:
    user: "user"
    password: "password"
    host: "localhost"
    port: "5432"
    db_name: "database_name"
    max_connections: 100
  mysql:
    user: "user"
    password: "password"
    host: "localhost"
    port: "3306"
    db_name: "database_name"
    max_connections: 100
  sqlite:
    path: "hyperbase.db"
    max_connections: 100
  scylladb:
    port:
      - "127.0.0.1"   
      - "127.0.0.2"
    port: 9042
    keyspace: "hyperbase_keyspace"
    username: "user"     
    password: "password" 

bucket:
  path: "/app/hyperbase-bucket"

api:
  internal:
    gossip:
      host: "0.0.0.0"
      port: 7472
      peers:
        - "0.0.0.0:7473"
        - "0.0.0.0:7474"
      view_size: 4
      actions_size: 30
  rest:
    host: "0.0.0.0"
    port: 8080
    allowed_origin: "example.org"
  websocket:
    heartbeat_interval: "5s"
    client_timeout: "10s"
  mqtt:
    host: "localhost"
    port: 1883
    topic: "mqtt_topic"
    username: "username"
    password: "password"
    channel_capacity: 100
    timeout: "10s"

auth:
  admin_registration: true
  access_token_length: 20
  registration_ttl: 600 # seconds
  reset_password_ttl: 600 # seconds
```

### Explanation

- app
  - mode\
    You can choose between `development` or `production`. Choosing `production` will enforce [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) origin as configured in api.rest.allowed_origin.

- log
  - display_level\
    You can choose `false` or `true`. This sets whether or not an event's level is displayed in the log.
  - level_filter\
    You can choose `error`, `warn`, `info`, `debug`, `trace`, or `off`. This sets the maximum verbosity level that will be enabled by the log.
  - db_ttl\
    You can choose any positive 32-bit integer. This sets how long the logs will be kept in the database in seconds.

- hash
  - argon2
    - algorithm\
      You can choose between `Argon2d`, `Argon2i`, or `Argon2id`. `Argon2id` is [the recommended argon2 hash algorithm](https://datatracker.ietf.org/doc/html/rfc9106#name-recommendations).
    - version\
      You can either choose `V0x10` or `V0x13`. It is recommended to use `V0x13` as it is the latest version and vulnerabilities have been fixed.
    - salt\
      This sets [salt](<https://en.wikipedia.org/wiki/Salt_(cryptography)>). The salt length should be between 4-bytes and 64-bytes. The recommended salt length is 16-bytes.

- token
  - jwt
    - secret\
      The JWT secret key.
    - expiry_duration\
      The expiration duration of JWT token in seconds. You can choose any positive 64-bit integer.

- mailer\
  This email configuration is used primarily in admin auth (registration code, reset password code, etc.).
  - smtp_host
  - smtp_username
  - smtp_password
  - sender_name
  - sender_email

- db\
  Database backend configuration. Choose one.
  - postgres
    - user
    - password
    - host
    - port
    - db_name
    - max_connections
  - mysql
    - user
    - password
    - host
    - port
    - db_name
    - max_connections
  - sqlite
    - path
    - max_connections

- bucket
  - path\
    Absolute path to store file uploaded by admin or user.

- api
  - internal
    - [gossip](https://en.wikipedia.org/wiki/Gossip_protocol)
      - host
      - port
      - peers
      - view_size
      - actions_size
  - rest
    - host
    - port
    - allowed_origin\
      This sets [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) origin. This only works if app.mode is set to `production`.
  - websocket
    - heartbeat_interval
    - client_timeout
  - mqtt
    - host
    - port
    - topic
    - username
    - password
    - channel_capacity
    - timeout

- auth
  - admin_registration\
    If set to `true`, it will enable admin account registration. If set to `false`, it will disable admin account registration. Note that first-run Hyperbase instance does not have admin accounts, so this must be set to `true`. You can set this to `false` after registering one admin account.
  - access_token_length\
    Specify access token length used in auth token for app user signin.
  - registration_ttl\
    This sets how long the temporary data of admin account registration will be stored in the database in seconds. After the time has passed, you must repeat from the first step.
  - reset_password_ttl\
    This sets how long the temporary data of admin account reset password will be stored in the database in seconds. After the time has passed, you must repeat from the first step.
