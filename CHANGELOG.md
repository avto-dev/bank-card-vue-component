# Changelog

All notable changes to this package will be documented in this file.

The format os based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this package adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v1.0.8

### Changed

- Updated trash button view

## v1.0.7

### Added

- Added event `delete-card` and trash button on small card

## v1.0.6

### Fixed

 - Fixed "flying" labels in small card
 - Fixed focus in small card for iOS

## v1.0.5

### Fixed

- Fixed auto focus on the next field on iOS
- Fixed emit clear-errors event

## v1.0.4

### Fixed

- Fixed brands icons and width of date text fields in Mozilla

## v1.0.3

### Changed

- Changed icons of brands: `jcb`, `master-card`, `maestro`, `visa`, `mir`

## v1.0.2

### Fixed

- Fixed bad behavior on input and delete events of fields

## v1.0.1

### Added

- New prefixes for banks: `Otkritie`, `Pochta bank`, `Sberbank`, `Sovkom Bank`, `Tinkoff bank`
- Shows brand logo after brand definition and before bank definition
- New prop `isFocus`

### Changed

- Changed placeholder color to gray

### Fixed

- Fixed caret behavior on backspace

## v1.0.0

- Initial release

## v0.1.11

### Changed

- Update securing cvv field from changing types to changing ccs classes with text-secure-font
- Changed "stars" to "bull" in collapsed number
- Fix double input events
- Optimize components and mixins
- Fix focus on fields after reset

## v0.1.10

### Deprecated

- Changed images paths to dev, while there is not release

## v0.1.9

### Fixed

- Fix paths while installing git hooks.

## v0.1.8

### Added

- Added git hooks
- Added Makefile target for installing git-hooks
- Added info about git-hooks to `CONTRIBUTING.md`

## v0.1.7

### Changed

- Return additional content of `CONTRIBUTING.md` file
- Some changes in `README.md`
- Ignoring `./dist/demo.html` file for npm package
- Make control of npm package content using `.npmignore` instead of `files` section in `package.json`
- Add defining needed env vars in build config

## v0.1.6

### Changed

- Changed link to readme.md in demo application

### Fixed 

- Fixed some typos in readme.md

## v0.1.5

### Changed

- Change version number position in demo app

## v0.1.4

### Changed

- Images moved back to public folder
- Changed dynamic path for images

### Added

- Added notes about base images path in readme file

## v0.1.3

### Changed

- Images moved from /public to /src/assets dir
- Changed build config for including content of /src/assets/images dir in any dist directory (for demo app and lib)

## v0.1.2

### Added

- Docker integrated
- Travis integrated
- Npm package publish
- Demo page
- Deploy demo application to gh-pages branch
- Image base path property in component
- Added test versions in package and changelog

### Changed

- Compressed all images
- Update README

## v0.0.17

### Added

- CONTRIBUTING.md file
- CHANGELOG.md file

### Changed 

- Updated README.md
- Change image cdn env

## v0.0.16

### Added

- Test for VueBanCardBase, VueBankCardSmall, VueBankCardTooltip
- Add reset button on field

### Fixed

- Package fixes

### Changed

- Replace dependencies to dev
- Update README to english of the component and of the card-info service
- Change enable css export

## v0.0.15

### Added

- CDN image path
- resetForm method
- Reset property and event
- Tests for VueBankCard component

### Changed

- Change install component
- Change image loading for package
- Reorganize utils

## v0.0.14

### Added

- Pack component as a package

### Fixed

- Pre commit hook

### Changed

- Rename names in package
- Rename child components
- Replace error tooltip of number field to outside
- Minor changes of render input in card small component

## v0.0.13

### Added

- Tests for card-info service
- Adding and setting `jest` and `@vue/test-utils`
- Bubbling event on enter

### Removed

- Remove formId returning

### Changed

- Update README

## v0.0.12

### Added

- Hiding cvv code on blur
- Clear errors methods
- Support card number as object

### Fixed

- Minor fixes toggle type field

### Removed

- Click listener from card

### Changed

- Update README
- Update handler of external errors as object

## v0.0.11

### Added

- Encapsulate field data into component
- Feature of render errors from outside
- Click events to small full card component
- Wrap fields in component and bubble formId to outside
- README for card-info service
- Finish changes to getting logo from `card-info`

### Removed

- Uninstall `card-info` package
- Old images

### Changed

- Minor changes
- Naming in components and scripts from `Mobile` to `Small` and from `Desktop` to `Base`
- Name logos from `-mob` to `-sm`

## v0.0.10

### Added

- Integrate package `card-info` into project

## v0.0.9

### Added

- isNew state for card component
- Generate unique id for labels and inputs
- Autocomplete to month and year fields

### Changed

- Few bank mobile logos
- Replace control of card field and options to outside
- Minor reworks

## v0.0.8

### Added

- Mobile bank logos

## v0.0.7

### Added

- JSDoc where it was not

## v0.0.6

### Added

- Validate on card mobile component

### Changed

- Refactor card desktop and card mobile components

## v0.0.5

### Added

- Create card mobile component

## v0.0.4

### Changed

- Code style and code naming minor changes

## v0.0.3

### Added

- Mask and validation to all fields of card

### Changed

- Separate card component into desktop and mobile view, init card mobile component
- Replace data from card desktop to parent card component

## v.0.0.2

### Added

- Create card component

## v0.0.1

### Added

- Initial
