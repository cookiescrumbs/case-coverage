https://travis-ci.org/cookiescrumbs/case-coverage.svg?branch=master
<h1 align="center">Case Coverage</h1>
<p align="center">
  <b>Visual representation of your apps case coverage.</b>
</p>

<p align="center">
  <img src="/case-coverage-graph.png">
</p>

<br>

[![Build Status][travis-image]][travis-url]

## Description :
Extracts use case coverage from a projects cucumber features and creates a bubble graph.

This is a visual representation of the amount of features you've got in each domain of your app.
The size of the bubble represents the total number of scenarios in a domain, the x-axis is the number of automated and the y-axis is the number of manual tests.

## Installation

```bash
npm install @cookiescrumbs/case-coverage -g
```

You'll need cucumberjs installed to use this package.

```bash
npm install cucumberjs --save-dev
```

## Usage :

### Simple Example

Split your app into domains and tag your feature files with an appropriate `@tag`.
Scenarios can be tagged `@manual` or `@wip`. It's assumed the rest will be automated.
You'll need to add your domain tags to the case-coverage JSON file along with the location of the feature files.

````json
{
   "domains": [
       "encouraging-independent-study",
       "discovering-content",
       "live-lesson",
       "getting-insights-and-performance",
       "encouraging-independent-study",
       "class-management",
       "enrolment",
       "sign-up-and-sign-in",
       "onboarding"
   ],
   "featuresFolder": "./features"
}
````

````bash
case-coverage  "./case-coverage.json"
````

This package creates a `case-coverage` folder, containing the graph, inside the directory it is run in.
