
<div align="center">
  <a href="https://tidytube.app"><img src="public/images/icons/icon128.png" alt="Logo"></img></a>
</div>

# tidytube

tidytube is an open-source web extension which allows you to remove parts of Youtube's UI. Users are able to remove elements from the search page, homepage as well as blocking shorts from playing.

Available on the Chrome, Firefox and Edge browsers.


## Install

* [**Chrome Webstore**](COMING SOON)
* [**Firefox**](COMING SOON)
* [**Edge**](COMING SOON)

## Server

The code for the server, website and pretty much anything that is not the extension itself is available in this seperate repository : https://github.com/kakajuro/tidytube-backend
## Build Locally

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

```json
  # ./src/config.json
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
### License

This project is licensed under the GPLv3 License - see [LICENSE.md](LICENSE) file for more information

