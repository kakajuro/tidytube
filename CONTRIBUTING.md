## Building Locally

Clone the project

```bash
  https://github.com/kakajuro/tidytube my-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies (using yarn)

```bash
  yarn
```

Edit the config.json to disable api calls (If you do not also have the server also running locally, it may error otherwise)

```bash
  Available at ./src/config.json
```

```json
  {
    "apiEnabled": false
  }
```

Start the extension with

```bash
  yarn app:YOUR_PLATFORM-dev
```

Extension output locations

```bash
  ./dist/YOUR_PLATFORM_dist
```

Build the extension with

```bash
  yarn app:YOUR_PLATFORM-dev
```

or build and zip for all platforms at once using

```bash
  yarn build:all
```

These will be available at 

```bash
  ./dist/YOUR_PLATFORM_dist
```