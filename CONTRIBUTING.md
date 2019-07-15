# Contribution Guidelines

Please ensure your pull request adheres to the following guidelines:

- Search previous suggestions before making a new one, as yours may be a duplicate.
- Suggested packages should be tested and documented.
- Make an individual pull request for each suggestion.
- Use the following format: `[service](link) - Description.`
- New categories, or improvements to the existing categorization are welcome.
- Keep descriptions short and simple, but descriptive.
- End all descriptions with a full stop/period.
- Check your spelling and grammar.
- Make sure your text editor is set to remove trailing whitespace.

Thank you for your suggestions!

## Folder structure

    ./
    ├── demo                                # Demostration and usage component files
    ├── dist                                # Builded component files
    ├── dist-demo                           # Builded demo application
    ├── public                              # Public files and assets
    ├── src                                 # Source files for developing
    │   ├── components                      # Vue components files
    │   ├── mixins                          # Vue mixins files
    │   ├── services                        # Services and factories files
    │   └── utils                           # Utilities and tools
    └── tests                               # Automated tests


 ## Tasks for a launch and developing

 ```bash
 # install dependencies
$ make install
 # serve demo directory with hot reload at localhost:8080
$ make watch
 # build component bundle into ./dist directory
$ make build
 # build demo application bundle ./dist directory
$ make build-demo
 # run linting and testing
$ make test
 # kill all spawned (and probably disowned) docker-containers
$ make destroy
 # install (reinstall) git hooks (required after repository cloning)
$ make git-hooks
 # show all available Makefile targets
$ make help 
```

 ## How to develop

1. Make new branch from `master`
2. Install git-hooks using `$ make git-hooks` command
2. Developing 
3. Write tests for your new feature in `/tests`
4. Add all changes in `CHANGELOG.md` 
5. Create pull request into branch `dev`
