# Patient Profile Management Frontend

Patient profile management is an application dashboard that provides a way for an admin to add/update/delete/view patients.

## Installation

- Clone the repo.
- Update environment variables.
- Switch to node version 18 & run following commands.

```bash
nvm use 18
yarn
yarn dev
```

## Deployment

- Clone the repo.
- `sh nvm use 18 && yarn && yarn build`
  or use deploy.sh file

## Frontend Demo

[DEMO](https://ppm-4440.onrender.com)

## Screenshots

![Demo](screenshot_1.png?raw=true "Screenshot")
![Demo](screenshot_2.png?raw=true "Screenshot")
![Demo](screenshot_3.png?raw=true "Screenshot")
![Demo](screenshot_4.png?raw=true "Screenshot")

## Tools Used

- Render static for deployment (To Render, Github CI/CD)
- Typescript
- Vue 3 (with composition API)
- VITE

## Folder structure

| Folder     | Purpose                         |
| ---------- | ------------------------------- |
| src/       | Source code entrypoint          |
| components | UI Components                   |
| helpers    | Common helper modules           |
| interfaces | Interface for different modules |
| pages      | Pages built with components     |
| router     | Vue router entry                |
| schemas    | Validation schema               |
| store      | Pinia store                     |
| types      | Typescript types                |

## Packages used and their purpose

| Module       | Purpose         |
| ------------ | --------------- |
| pinia        | For store       |
| Yup          | Form Validation |
| vee-validate | Form validation |
