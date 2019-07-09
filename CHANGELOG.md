# Changelog

All notable changes to this package will be documented in this file.

The format os based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this package adheres to [Semantic Versioning][semver].

> File maintenance rules
> 
> - Unpublished changes accumulate in the section `### Unrealesed`
> - Description of every release begins from section like `## vX.X.X` _(`%major%.%minor%.%patch%`)_ and contains 5 optional sections _(but not less than 1 on release)_:
>   - `### Added` - Adding a functional
>   - `### Fixed` - Fixes
>   - `### Deprecated` - Functional marked as obsolete and to be removed soon
>   - `### Removed` - What was removed
>   - `### Changed` - Changes that are clearly not related to the previous three sections.
> - The release section **can** be accompanied by a release date and look like `## vX.X.X - YYYY-MM-DD`, but it must be displayed just before the release
> - The assignment of the value of the new version must comply with [Semantic Versioning][semver], with the exceptions:
>   - The reason for raising **major** version values is the presence of changes that are not backwards compatible with those that are currently on the product servers (a "soft" rollback is not possible). These can be - **migrations**, changes in namespaces of classes subject to **serialization** during the operation of the application, changes in the major version of the framework, appearance of dependency on any external service, and any other "dangerous" changes
> - All links should be in the form of footnotes `[LINK]: https: // ...` and located strictly in the release unit
> - Each entry **should** end with an indication of the link to the person who made these or other changes.


## v0.0.17 - 2019-07-09

### Added

- CHANGELOG file ([@gnklv])

### Changed 

- Change image cdn env ([@gnklv])

## v0.0.16 - 2019-07-08

### Added

- Test for VueBanCardBase, VueBankCardSmall, VueBankCardTooltip ([@gnklv])
- Add reset button on field ([@gnklv])

### Fixed

- Package fixes ([@gnklv])

### Changed

- Replace dependencies to dev ([@gnklv])
- Update README to english of the component and of the card-info service ([@gnklv])
- Change enable css export ([@gnklv])

## v0.0.15 - 2019-07-05

### Added

- CDN image path ([@gnklv])
- resetForm method ([@gnklv])
- Reset property and event ([@gnklv])
- Tests for VueBankCard component ([@gnklv])

### Changed

- Change install component ([@gnklv])
- Change image loading for package ([@gnklv])
- Reorganize utils ([@gnklv])

## v0.0.14 - 2019-07-04

### Added

- Pack component as a package ([@gnklv])

### Fixed

- Pre commit hook ([@gnklv])

### Changed

- Rename names in package ([@gnklv])
- Rename child components ([@gnklv])
- Replace error tooltip of number field to outside ([@gnklv])
- Minor changes of render input in card small component ([@gnklv])

## v0.0.13 - 2019-07-03

### Added

- Tests for card-info service ([@gnklv])
- Adding and setting `jest` and `@vue/test-utils` ([@gnklv])
- Bubbling event on enter ([@gnklv])

### Removed

- Remove formId returning ([@gnklv])

### Changed

- Update README ([@gnklv])

## v0.0.12 - 2019-07-01

### Added

- Hiding cvv code on blur ([@gnklv])
- Clear errors methods ([@gnklv])
- Support card number as object ([@gnklv])

### Fixed

- Minor fixes toggle type field ([@gnklv])

### Removed

- Click listener from card ([@gnklv])

### Changed

- Update README ([@gnklv])
- Update handler of external errors as object ([@gnklv])

## v0.0.11 - 2019-06-28

### Added

- Encapsulate field data into component ([@gnklv])
- Feature of render errors from outside ([@gnklv])
- Click events to small full card component ([@gnklv])
- Wrap fields in component and bubble formId to outside ([@gnklv])
- README for card-info service ([@gnklv])
- Finish changes to getting logo from `card-info` ([@gnklv])

### Removed

- Uninstall `card-info` package ([@gnklv])
- Old images ([@gnklv])

### Changed

- Minor changes ([@gnklv])
- Naming in components and scripts from `Mobile` to `Small` and from `Desktop` to `Base` ([@gnklv])
- Name logos from `-mob` to `-sm` ([@gnklv])

## v0.0.10 - 2019-06-27

### Added

- Integrate package `card-info` into project ([@gnklv])

## v0.0.9 - 2019-06-26

### Added

- isNew state for card component
- Generate unique id for labels and inputs ([@gnklv])
- Autocomplete to month and year fields ([@gnklv])

### Changed

- Few bank mobile logos
- Replace control of card field and options to outside
- Minor reworks

## v0.0.8 - 2019-06-25

### Added

- Mobile bank logos ([@gnklv])

## v0.0.7 - 2019-06-24

### Added

- JSDoc where it was not ([@gnklv])

## v0.0.6 - 2019-06-21

### Added

- Validate on card mobile component ([@gnklv])

### Changed

- Refactor card desktop and card mobile components ([@gnklv])

## v0.0.5 - 2019-06-20

### Added

- Create card mobile component ([@gnklv])

## v0.0.4 - 2019-06-19

### Changed

- Code style and code naming minor changes ([@gnklv])

## v0.0.3 - 2019-06-18

### Added

- Mask and validation to all fields of card ([@gnklv])

### Changed

- Separate card component into desktop and mobile view, init card mobile component ([@gnklv])
- Replace data from card desktop to parent card component ([@gnklv])

## v.0.0.2 - 2019-06-14

### Added

- Create card component ([@gnklv])

## v0.0.1 - 2019-06-13

### Added

- Initial ([@gnklv])

[semver]:https://semver.org/spec/v2.0.0.html
[@gnklv]:https://github.com/gnklv
