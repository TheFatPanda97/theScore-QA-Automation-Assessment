# theScore QA Automation Assessment

This is a test suite written using Typescript and k6.io that retrieves player and team information from the [NBA stats API](https://www.nba.com/stats).

# Tech Stack

- Typescript
- k6.io
- node.js

# NBA Stats API

The NBA stats API is a RESTful API that provides information about NBA players, teams, and games. There is no official documentation for the API, but there is a [community-maintained GitHub repo](https://github.com/swar/nba_api/blob/master/docs/table_of_contents.md) that can be used to explore the API.

# Installation

### Prerequisites

- operating system: mac/linux
- node.js 18
- k6.io

### Steps

1. clone the repo: `git clone https://github.com/TheFatPanda97/theScore-QA-Automation-Assessment.git`
2. go into the repo: `cd theScore-QA-Automation-Assessment`
3. install the node dependencies: `npm ci`
4. run the tests: `npm run test -- -e LEAGUE="00" -e SEASON="2019-20"`

# Script Test Parameters
- LEAGUE: `00 | 10 | 20`
  - example:
    - LEAGUE="00" (NBA)
    - LEAGUE="10" (WNBA)
    - LEAGUE="20" (G-League)
- SEASON: `^\d{4}(-\d{2})?$`
  - example:
    - SEASON="2019-20" (when LEAGUE="00" or LEAGUE="20")
    - SEASON="2019" (when LEAGUE="10")


