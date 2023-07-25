import { sleep } from 'k6';
import { getTopScoringPlayers } from './utils/nbaUtils';

export default function () {
  const body = getTopScoringPlayers('00', '2019-20');

  console.log(body);

  sleep(2);
}
