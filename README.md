# Twinkl React Tech Test

## Task description

You are tasked with creating a React application that interacts with a Posts management API (https://jsonplaceholder.typicode.com/posts) to perform CRUD operations (Create, Read, Update, Delete). The application should be implemented using TypeScript and designed to be production-ready.

Refer to the guide on how to use the jsonplaceholder API:
https://jsonplaceholder.typicode.com/guide/

#### Time Limit: We don't expect you to spend longer than 3 hours on this task. If you'd like to capture any decisions, thoughts, or next steps you would take, feel free to do so.

#### Requirements

##### Fetch and display posts

- Implement a component that fetches the list of posts from https://jsonplaceholder.typicode.com/posts - [ ]
- Display all fetched posts in a list format. - [ ]

##### Search mechanism

- Implement a search bar that allows a user to search for posts by title and display only the desired posts. The search should be triggered on change. - [ ]

##### Delete post

- For each post in the list, provide a "Remove" button. - [ ]
- Implement the functionality to delete a post when the "Remove" button is clicked, using the appropriate server-side REST API method DELETE. - [ ]

##### Testing

- Write sufficient tests to satisfy a production-ready application. - [ ]

##### Documentation

- Add appropriate documentation for your application. - [ ]

#### Wireframes

##### Mobile

![mobile_view](src/assets/mobile_view.png?raw=true)

##### Desktop

![pc_view](src/assets/pc_view.png?raw=true)

## Getting Started

### Prerequisites

- Node.js: Ensure you have Node.js version 20 or higher installed.

### Installation

#### Clone the repository:

```
git clone https://github.com/twinkltech/twinkl-react-tech-test.git
```

```
cd twinkl-react-tech-test
```

#### Install dependencies:

```
yarn
```

### Scripts

#### Development Server: Start the development server.

```
yarn dev
```

#### Lint: Lint the codebase.

```
yarn lint
```

#### Lint & Fix: Lint and automatically fix issues in the codebase.

```
yarn lint:fix
```

#### Format: Format the codebase using Prettier.

```
yarn format
```

#### Test: Run the unit test suite.

```
yarn test:unit
```

#### Test: Run the e2e test suite.

```
yarn test:e2e
```

### Using the application

Once the application is running (after running yarn run dev) navigate to http://localhost:5173/

There you will see a list of posts from the JSON placeholder endpoint.

You can use the "Search" input to filter these posts by their title.

You can use the "Remove" button to send a DELETE request (this does not remove the post data)

### Consuming the application inside a host

The table is exposed as a micro frontend using module federation. To consume the module you will need to add it as a remote to the project.

https://module-federation.io/guide/start/quick-start.html

rsbuild.config.ts may look like this.

```

import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'jsonTable',
      remotes: {
        jsonTable:
          jsonTable@http://localhost:3000/mf-manifest.json',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    port: 2000,
  },
});

```
