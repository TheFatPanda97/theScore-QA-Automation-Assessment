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

- operating system: Mac OS / Linux
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

# Test Specification:

### Test Objective:

Verify the functionality of the NBA stats API league leaders and team stats endpoints.

### Test Environment:

Desktop (Mac OS 13.4.1)

### Test Scenarios:

#### Valid League Leaders Request

**Description:** Verify that a valid request to the league leaders endpoint returns a 200 response code and the expected data.

**Steps:**

1. launch a k6 VU instance with the following environment variables:
   - LEAGUE="00"
   - SEASON="2019-20"
2. make a GET request to the league leaders endpoint (https://stats.nba.com/stats/leagueleaders) with the following query parameters:
   - PerMode="Totals"
   - Season="2019-20"
   - SeasonType="Regular Season"
   - LeagueID="00"
   - Scope="S"
   - StatCategory="PTS"
   - ActiveFlag="Y"
3. verify that the response code is 200
4. verify that the response body is JSON
5. verify that the JSON body contains at least 10 player
6. verify that each player contains the PTS column
7. verify that each player contains the PLAYER column
8. verify that the top 10 players are sorted by PTS in descending order
9. print the resulting table to the console

#### Valid League Team Stats Request

**Description:** Verify that a valid request to the league team stats endpoint returns a 200 response code and the expected data.

**Steps:**

1. use the previous k6 VU instance
2. make a GET request to the league team stats endpoint (https://stats.nba.com/stats/leaguedashteamstats) with the following query parameters:
   - LeagueID="00"
   - Season="2019-20"
   - MeasureType='Base'
   - Month=0
   - Period=0
   - OpponentTeamID='0'
   - PaceAdjust='N'
   - PerMode='Totals'
   - PlusMinus='N'
   - Rank='N'
   - SeasonType='Regular Season'
   - LastNGames=82
3. verify that the response code is 200
4. verify that the response body is JSON
5. verify that the JSON body contains at least 10 teams
6. verify that each team contains the PTS column
7. verify that each team contains the TEAM_NAME column

#### Valid League Team Standing Request

**Description:** Verify that a valid request to the league team standing endpoint returns a 200 response code and the expected data.

**Steps:**

1. use the previous k6 VU instance
2. make a GET request to the league team stats endpoint (https://stats.nba.com/stats/leaguestandings) with the following query parameters:
 - LeagueID="00"
 - Season="2019-20"
 - SeasonType='Regular Season'
3. verify that the response code is 200
4. verify that the response body is JSON
5. verify that the JSON body contains at least 10 teams
6. verify that each team contains the TeamName column
7. verify that each team contains the TeamCity column
8. verify that the top 10 teams are sorted by rank in ascending order
9. print the resulting table to the console