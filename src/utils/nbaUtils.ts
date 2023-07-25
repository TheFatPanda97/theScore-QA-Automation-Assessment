import http from 'k6/http';
import { objectToQueryParams } from './fetchUtils';
import type { LeagueLeadersParamsType } from '../types/nba';

const BASE_URL = 'https://stats.nba.com/stats';

export function getTopScoringPlayers(
  league: LeagueLeadersParamsType['LeagueID'],
  season: LeagueLeadersParamsType['Season'],
) {
  const params: LeagueLeadersParamsType = {
    ActiveFlag: 'Y',
    LeagueID: league,
    PerMode: 'Totals',
    Scope: 'S',
    Season: season,
    SeasonType: 'Regular Season',
    StatCategory: 'PTS',
  };
  const queryParams = objectToQueryParams(params);
  const url = `${BASE_URL}/leagueleaders${queryParams}`;

  console.log(url);

  const response = http.get(url);

  if (typeof response.body === 'string') {
    return JSON.parse(response.body);
  } else {
    return {};
  }
}

// export function getTopScoringTeams(league, season) {
// const url = `${BASE_URL}/${league}/${season}/standings`;
// const params = {
//   headers: {
//     'X-Auth-Token': API_KEY,
//   },
// };
// const response = http.get(url, params);
// return JSON.parse(response.body).standings[0].table;
// }
