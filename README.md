# Krypton Wallet / App

This project is using VueJS, Capacitor and Ionic 4.
It allows to write javascript code once and compile
as

- standard website code (inside /dist)
- mobile apps for iOS and Android
- electron desktop apps (Linux, Mac, Windows)

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production (access wallet in /dist)

```
npm run build
```

### Copy assets created during npm run build (used before you compile for electron)

```
npx cap copy
```

### Run electron app

```
npx cap open electron
```

### Run android build

```
npx cap open android
```

### Build for linux app (electron)

```
cd electron
```

```
electron-packager . --platform=linux
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```
