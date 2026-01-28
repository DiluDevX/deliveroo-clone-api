### Building and running your application

When you're ready, start your application by running:
`docker compose up --build`.

Your application will be available at http://localhost:4000.

## API Endpoints

All API endpoints are now prefixed with `/api`. For example:

- `http://localhost:4000/api/auth`
- `http://localhost:4000/api/restaurants`
- `http://localhost:4000/api/dishes`
- `http://localhost:4000/api/categories`
- `http://localhost:4000/api/users`
- `http://localhost:4000/api/cart`

The Swagger API documentation is available at:

- `http://localhost:4000/api/api-docs`

### Deploying your application to the cloud

First, build your image, e.g.: `docker build -t myapp .`.
If your cloud uses a different CPU architecture than your development
machine (e.g., you are on a Mac M1 and your cloud provider is amd64),
you'll want to build the image for that platform, e.g.:
`docker build --platform=linux/amd64 -t myapp .`.

Then, push it to your registry, e.g. `docker push myregistry.com/myapp`.

Consult Docker's [getting started](https://docs.docker.com/go/get-started-sharing/)
docs for more detail on building and pushing.

### References

- [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)
