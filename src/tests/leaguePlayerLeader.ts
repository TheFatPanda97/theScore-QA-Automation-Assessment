import { check } from 'k6';
import type { JSONObject, JSONArray } from 'k6';
import { getTopScoringPlayers } from '../utils/endpointUtils';
import { printTable, isNestedListSorted } from '../utils/testUtils';

export default function () {
  const league = __ENV.LEAGUE;
  const season = __ENV.SEASON;
  const response = getTopScoringPlayers(league, season);

  check(response, {
    'response code was 200': (res) => res.status === 200,
  });

  const json = response.json() as JSONObject;

  check(json, { 'response body is json': (res) => res !== undefined });

  const resultSet = json.resultSet as JSONObject;
  const rowSet = resultSet.rowSet as JSONArray;
  const headers = resultSet.headers as JSONArray;
  const ptsIndex = headers.indexOf('PTS');
  const playerNameIndex = headers.indexOf('PLAYER');

  check(rowSet, { 'there are at least 10 players returned': (res) => res.length >= 10 });
  check(ptsIndex, { 'the PTS column exists': (res) => res !== -1 });
  check(playerNameIndex, { 'the PLAYER column exists': (res) => res !== -1 });

  const tableTitle = `Top 10 NBA Players in ${season} Season Ranked by Points`;
  const topTenIndividuals = (rowSet.splice(0, 10) as JSONArray[]).map((playerInfo) => [
    playerInfo[playerNameIndex],
    playerInfo[ptsIndex],
  ]) as string[][];

  check(topTenIndividuals, {
    'the top 10 individuals are sorted descending by their points': (res) =>
      isNestedListSorted(res, 1, 'dsc'),
  });

  printTable(tableTitle, topTenIndividuals);
}
