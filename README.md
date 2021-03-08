# Airline catalog

Recruitment solution for [EYSA](https://eysaservicios.com/?lang=en).

Task was to create an agnostic airline mutimedia catalog and its films module.

## Summary

- [Getting Started](#getting-started)
- [New technologies used](#new-technologies-used)
- [Modular architecture](#modular-architecture)
- [UX Design](#ux-design)
- [Login system](#login-system)
- [Styles](#styles)
- [Testing](#testing)
- [Packages used](#packages-used)
- [Authors](#authors)

## Getting Started

You will need to have `Yarn` and `Node.js` installed in your system in order to fetch and install packages required.

### Installing

Say what the step will be

    git clone <repoUrl>

And

    yarn install

then feel free to run

    yarn dev

And open `http://localhost:3000/` to start interacting with the app.

# New technologies used

In this project has been my first time using:

- Next.js framework
- Apollo
- Graph QL

It has been a journey where I learnt to build an stable app and get a step towards React´s server side rendered apps.

Final presented repo is the result of a frenetic learning week. I am satisfied with the result and at the same time I am aware that some requisites are not 100% fullfilled.

Here I will explain why code is as it is with its whys and hows.

## Modular architecture

As a main requisite briefing make special attention in construction of a modular app using yarn workspaces.

Despite this repo does not reflect the requested modularitation, It was present in the whole development process.

Prove of which, you can find in this [repo on my github](https://github.com/RobertoLlopis/EYSA-recruitment-challenge) a correct usage of yarn workspaces and modules.

Sadly, because of time it did not become a reallity due to two factors:

- Typescript compiling process
- git clone --recursive failure

Time would have fix it though.

**How was the final presented approach?**

Apart from this problems, code has been designed with encapsulation approach. Meaning that, that is easy to unplug and plug new modules or features.

- Code of home display and common elements is agnostic to the content
- Content is defined from a single source
- Constants are encapsulated so you need to change one file in order to make a change in for example, an app route, a query or mutation

## UX Design

App has 4 main views built:

- Home
  ![Home view](https://i.imgur.com/pVDuep8.png)
- Films Catalog
  ![Films catalog view](https://i.imgur.com/nQdPDCY.png)
- Film Detail
  ![Films detail view-1](https://i.imgur.com/m9Snvzt.png)
  ![Films detail view-2](https://i.imgur.com/FPy2rzb.png)
- Login
  ![Login view](https://i.imgur.com/awrszRo.png)

As UI tool is used Ant design. In home page had sense to gather different parts of catalog together so is used a TabCard to easily navigate through them.

Either in the Tabcard or in single Films catalog view, by clicking you will be redirect to the clicked film details page.

## Login system

Simple login system uses React context to store in the client the actual user.

It stores it in localStorage too in order to not need to login in any hard refresh.

Pages components use context to decide if should either send to login page or show content.

**Note**: Better server side managment can be used to avoid first moment content flash of info

## Styles

To be coherent with encapsulation approach refered above, I decided to modularize scss styles to each component sharing in global scope partials and global styles aswell as Ant design css.

Is written in scss to take the advantage of mixings and variables import.

### Dark mode

Dark toggle mode uses a simple theme context as Authentication one.

Is buggy due to interaction with server side render. It stores theme context but Ant designs items come prerender from server, so each time you change page in order to see theme applied again correctly need to toggle twice.

**Note**: If i had to start again I would have chosen styled components to manage easier themes.

### Responsiveness

App is responsive oriented since the begining. It means that items are distributed and keeping space one from others in dynamic way through flex-box.

At critical point of mobile screens, media-queries are not implemented but would be needed just really few direction and composition changes.

## Testing

Main components and pages are tested with unit approach. To run tests just write in your console `yarn test`.

## Packages used

Besides default `create-next-app` ones.

- `antd && ant-design/icons`
- `apollo/client && apollo-server-micro`
- `graphlql && graphql-tools/schema`
- `sass`

Dev:

- `apollo/react-testing`
- `testing-library/jest-dom && react`
- `identity-obj-proxy`
- `types/ node and react`
- `jest && babel-jest`
- `typescript`

## Author

- **Roberto Llopis** -> [LinkedIn](https://www.linkedin.com/in/robertollopis/)
