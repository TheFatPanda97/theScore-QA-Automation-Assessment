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
4. run the tests: `npm test -- -e LEAGUE="00" -e SEASON="2019-20"`

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

#### Test Result

```
Top 10 Players in 2019-20 Season Ordered by Points
--------------------------------------------------
James Harden | 2335
Damian Lillard | 1978
Devin Booker | 1863
Giannis Antetokounmpo | 1857
Trae Young | 1778
Luka Doncic | 1759
Bradley Beal | 1741
LeBron James | 1698
Donovan Mitchell | 1655
Anthony Davis | 1618

Top 10 Teams in 2019-20 Season and Rank Ordered by Points
---------------------------------------------------------
7 | Dallas Mavericks | 8776
1 | Milwaukee Bucks | 8663
8 | Portland Trail Blazers | 8508
4 | Houston Rockets | 8482
2 | LA Clippers | 8377
13 | New Orleans Pelicans | 8341
10 | Phoenix Suns | 8294
9 | Washington Wizards | 8238
9 | Memphis Grizzlies | 8222
3 | Boston Celtics | 8183

✓ getTopScoringPlayers: response code was 200
✓ getTopScoringPlayers: response body is json
✓ getTopScoringPlayers: there are at least 10 players returned
✓ getTopScoringPlayers: the PTS column exists
✓ getTopScoringPlayers: the PLAYER column exists
✓ getTopScoringPlayers: the top 10 individuals are sorted descending by their points
✓ getTeamStats: response code was 200
✓ getTeamStats: response body is json
✓ getTeamStats: there are at least 10 teams returned
✓ getTeamStats: the PTS column exists
✓ getTeamStats: the TEAM_NAME column exists
✓ getTeamStanding: response code was 200
✓ getTeamStanding: response body is json
✓ getTeamStanding: there are at least 10 teams returned
✓ getTeamStanding: the PlayoffRank column exists
✓ getTeamStanding: the TeamName column exists
✓ getTeamStanding: the TeamCity column exists
✓ getTeamStanding: the teams are sorted ascending by their rank
```

# Test Rational

This test suite is written using a load-testing framework (k6) because it is a simple and effective way to test the NBA stats API. Its ability to be deployed on Kubernetes makes it an extremely scalable solution to perform load-test on the NBA stats API in the future. Within each test, the test suite performs basic assertions such as verifying the response code, response body, and response data. The test suite also performs more complex assertions such as verifying that the top 10 teams are sorted by rank in ascending order. The test suite also prints the resulting table to the console to make it easier to debug and verify the results of the test.

# Test Coverage

The test suite covers the following endpoints:

- leagueleaders
- leaguedashteamstats
- leaguestandings

Verify **3/134** endpoints in total. Within each endpoint, the test suite verifies the following:

- response code is 200
- basic assertions on the response body
  - response body is JSON
  - response body contains at least 10 players/teams
  - response body contains the appropriate column
  - response body is sorted in the appropriate order (for leagueleaders and leaguestandings)
