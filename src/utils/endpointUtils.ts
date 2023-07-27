import http from 'k6/http';
import { objectToQueryParams } from './testUtils';
import type {
  LeagueLeadersParamsType,
  LeagueDashTeamStatsParamsType,
  LeagueStandingsV3ParamsType,
} from '../types/api';

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

  return http.get(url, {
    headers: {
      Referer: 'https://www.nba.com/',
    },
  });
}

export function getTeamStats(
  league: LeagueDashTeamStatsParamsType['LeagueID'],
  season: LeagueDashTeamStatsParamsType['Season'],
) {
  const params: LeagueDashTeamStatsParamsType = {
    LeagueID: league,
    Season: season,
    MeasureType: 'Base',
    Month: 0,
    Period: 0,
    OpponentTeamID: '0',
    PaceAdjust: 'N',
    PerMode: 'Totals',
    PlusMinus: 'N',
    Rank: 'N',
    SeasonType: 'Regular Season',
    LastNGames: 82,
  };
  const queryParams = objectToQueryParams(params);
  const url = `${BASE_URL}/leaguedashteamstats${queryParams}`;

  return http.get(url, {
    headers: {
      'accept-encoding': 'Accepflate, sdch',
      'User-Agent': 'PostmanRuntime/7.4.0',
      referer: 'https://www.nba.com/',
    },
  });
}

export function getTeamStanding(
  league: LeagueStandingsV3ParamsType['LeagueID'],
  season: LeagueStandingsV3ParamsType['Season'],
) {
  const params: LeagueStandingsV3ParamsType = {
    LeagueID: league,
    Season: season,
    SeasonType: 'Regular Season',
  };
  const queryParams = objectToQueryParams(params);
  const url = `${BASE_URL}/leaguestandingsv3${queryParams}`;

  return http.get(url, {
    headers: {
      'accept-encoding': 'Accepflate, sdch',
      'User-Agent': 'PostmanRuntime/7.4.0',
      referer: 'https://www.nba.com/',
    },
  });
}
