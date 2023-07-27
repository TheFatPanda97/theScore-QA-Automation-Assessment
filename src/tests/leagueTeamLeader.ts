import { getTeamStats, getTeamStanding } from '../utils/endpointUtils';
import { createNamedCheck, printTable, isNestedListSorted } from '../utils/testUtils';

import type { LeagueIDType } from '../types/api';
import type { JSONObject, JSONArray } from 'k6';

export default function () {
  const league = __ENV.LEAGUE as LeagueIDType;
  const season = __ENV.SEASON;
  const teamStatsCheck = createNamedCheck('getTeamStats');
  const teamStatsResponse = getTeamStats(league, season);

  teamStatsCheck(teamStatsResponse, {
    'response code was 200': (res) => res.status === 200,
  });

  const teamStatsJson = teamStatsResponse.json() as JSONObject;

  teamStatsCheck(teamStatsJson, { 'response body is json': (res) => res !== undefined });

  const teamStatsResultSets = teamStatsJson.resultSets as JSONArray;
  const teamStatsRowSet = (teamStatsResultSets[0] as JSONObject).rowSet as JSONArray[];
  const teamStatsHeaders = (teamStatsResultSets[0] as JSONObject).headers as JSONArray;
  const teamStatsPtsIndex = teamStatsHeaders.indexOf('PTS');
  const teamStatsNameIndex = teamStatsHeaders.indexOf('TEAM_NAME');

  teamStatsCheck(teamStatsRowSet, {
    'there are at least 10 teams returned': (res) => res.length >= 10,
  });
  teamStatsCheck(teamStatsPtsIndex, { 'the PTS column exists': (res) => res !== -1 });
  teamStatsCheck(teamStatsNameIndex, { 'the TEAM_NAME column exists': (res) => res !== -1 });

  const topTenTeams = (
    teamStatsRowSet.map((team) => [team[teamStatsNameIndex], team[teamStatsPtsIndex]]) as [
      string,
      number,
    ][]
  )
    .sort((a, b) => b[1] - a[1])
    .splice(0, 10);

  const teamStandingCheck = createNamedCheck('getTeamStanding');
  const teamStandingResponse = getTeamStanding(league, season);

  teamStandingCheck(teamStandingResponse, {
    'response code was 200': (res) => res.status === 200,
  });

  const teamStandingJson = teamStandingResponse.json() as JSONObject;

  teamStandingCheck(teamStandingJson, { 'response body is json': (res) => res !== undefined });

  const teamStandingResultSets = teamStandingJson.resultSets as JSONArray;
  const teamStandingRowSet = (teamStandingResultSets[0] as JSONObject).rowSet as JSONArray[];
  const teamStandingHeaders = (teamStandingResultSets[0] as JSONObject).headers as JSONArray;
  const teamStandingRankIndex = teamStandingHeaders.indexOf('PlayoffRank');
  const teamStandingCityIndex = teamStandingHeaders.indexOf('TeamCity');
  const teamStandingNameIndex = teamStandingHeaders.indexOf('TeamName');

  teamStandingCheck(teamStandingRowSet, {
    'there are at least 10 teams returned': (res) => res.length >= 10,
  });
  teamStandingCheck(teamStandingRankIndex, {
    'the PlayoffRank column exists': (res) => res !== -1,
  });
  teamStandingCheck(teamStandingNameIndex, { 'the TeamName column exists': (res) => res !== -1 });
  teamStandingCheck(teamStandingCityIndex, { 'the TeamCity column exists': (res) => res !== -1 });

  const teamStandings = teamStandingRowSet.reduce(
    (acc, team) => ({
      ...acc,
      [(team[teamStandingCityIndex] as string) + ' ' + (team[teamStandingNameIndex] as string)]:
        team[teamStandingRankIndex],
    }),
    {},
  ) as Record<string, number>;

  teamStandingCheck(teamStandingRowSet as string[][], {
    'the teams are sorted ascending by their rank': (res) =>
      isNestedListSorted(res, teamStandingRankIndex, 'asc'),
  });

  const tableTitle = `Top 10 Teams and their Rank in the ${season} Season Ordered by Points`;
  const tableData = topTenTeams.map(([name, points]) => [teamStandings[name], name, points]);

  printTable(tableTitle, tableData);
}
