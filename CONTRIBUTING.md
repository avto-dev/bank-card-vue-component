# Contribution Guidelines

Please ensure your pull request adheres to the following guidelines:

- Search previous suggestions before making a new one, as yours may be a duplicate
- Suggested packages should be tested and documented
- Make an individual pull request for each suggestion
- Use the following format: `[service](link) - Description`
- New categories, or improvements to the existing categorization are welcome
- Keep descriptions short and simple, but descriptive
- End all descriptions with a full stop/period
- Check your spelling and grammar
- Make sure your text editor is set to remove trailing whitespace

## Folder structure

    .
    ├── demo                                # Demostration and usage component files
    ├── dist                                # Builded files
    ├── public                              # Public files and assets
    ├── src                                 # Source of files for developing
    │   ├── components                      # Vue components files
    │   ├── mixins                          # Vue mixins files
    │   ├── services                        # Services and factories files
    │   └── utils                           # Utilities and tools
    └── tests                               # Automated tests


## Tasks for a launch and developing

```bash
# install dependencies
npm install

# serve demo directory with hot reload at localhost:8080
npm run serve

# create UMD bundle into ./dist directory
npm run build

# run eslint
npm run lint

# run eslint with auto-fixes
npm run lint:fix

# run all tests
npm run test
```

## How to develop

1. Make new branch from `master`
2. Developing 
3. Write tests for your new feature in `/tests`
4. Add all changes in `CHANGELOG.md` 
5. Create pull request into branch `dev`
