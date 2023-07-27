import { fail } from 'k6';
import leaguePlayerLeaderTests from './tests/leaguePlayerLeader';
import leagueTeamLeaderTests from './tests/leagueTeamLeader';

function validateEnvVariables() {
  const league = __ENV.LEAGUE;
  const season = __ENV.SEASON;

  if (league === undefined) {
    fail('Please provide the LEAGUE test parameters');
  }

  if (league !== '00' && league !== '10' && league !== '20') {
    fail('LeagueID must be: 00 (for NBA), 10 (for WNBA), 20 (for G-League)');
  }

  if (season === undefined) {
    fail('Please provide the SEASON test parameters');
  }

  if (league === '10' && !/^\d{4}$/gm.test(season)) {
    fail('For LeagueID 10, please provide just the beginning year of the season. Eg. 2019');
  }

  if (league !== '10' && !/^\d{4}-\d{2}$/gm.test(season)) {
    fail('For LeagueID 00 or 20, please provide a season in the form of 2019-20.');
  }
}

export default function () {
  validateEnvVariables();
  leaguePlayerLeaderTests();
  leagueTeamLeaderTests();
}
