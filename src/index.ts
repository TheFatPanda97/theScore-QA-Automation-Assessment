import { fail } from 'k6';
import leaguePlayerLeaderTests from './tests/leaguePlayerLeader';
import leagueTeamLeaderTests from './tests/leagueTeamLeader';

function validateEnvVariables() {
  const league = __ENV.LEAGUE;
  const season = __ENV.SEASON;

  if (league === undefined) {
    fail('Please provide the LEAGUE test parameters');
  }

  if (season === undefined) {
    fail('Please provide the SEASON test parameters');
  }
}

export default function () {
  validateEnvVariables();

  leaguePlayerLeaderTests();
  leagueTeamLeaderTests();
}
