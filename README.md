### Hexlet tests and linter status:
[![Actions Status](https://github.com/AruMkh/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/AruMkh/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/41f42f0bf1b2e63d4c0c/maintainability)](https://codeclimate.com/github/AruMkh/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/41f42f0bf1b2e63d4c0c/test_coverage)](https://codeclimate.com/github/AruMkh/frontend-project-46/test_coverage)
[![Github Actions](https://github.com/AruMkh/frontend-project-46/actions/workflows/steps.yml/badge.svg)]()

# Difference Calculator
### Description:

**Difference calculator is a console utility designed to calculate and display the difference between two data structures. The utility can display the difference in 2 formats.**

**Supporting formats:** JSON, YML, YAML.

### Installation:
    git clone https://github.com/AruMkh/frontend-project-46.git
    cd frontend-project-46
    make install
    npm link

### Use:
$ gendiff <filepath1> <filepath2>: show diff with default format (default: "stylish")
$ gendiff -f, --format [plain, json, stylish] <filepath1> <filepath2>: show diff with plain, json or stylish format
$ gendiff -h, --help: display help for command

    Usage: gendiff [options] <filepath1> <filepath2>

    Compares two configuration files and shows a difference.
   
    Options:
    -V, --version         output the version number
    -f, --format, <type>  output format (default: "stylish")
    -h, --help            output usage information
