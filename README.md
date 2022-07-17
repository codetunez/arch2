# Arch II
A PoC for using semantic markup and component frameworks to render a webpage. This codebase is cross platform and does not require any dependencies beyond those installed

## Pre-reqs
Install LTS version of [NodeJS](https://nodejs.org/en/)

## Services & Libraries
The codebase is made up of 4 parts

- Client - A user experience to author Sites, Pages and Content
- Middle - The data access service
- Library - A library that provides markup transformations for supported CSS frameworks. Designed for browser or server usage
- Server - A web server for server side rendering of webpages and static content

## Installing
Review each of the individual README.md files and follow the instruction. Each service will need to be run in its own console window

## Startup sequence
This doesn't matter as the system will correct itself. But here is the optimal order

1. Middle
2. Server
3. Client

## Usage
Once all services are up and running visit http://locahost:3000 in a web browser
