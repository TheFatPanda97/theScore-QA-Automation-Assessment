import { check } from 'k6';
import { getTopScoringPlayers } from '../utils/testUtils';

export default function () {
  const body = getTopScoringPlayers('00', '2019-20');

  check(body, {
    'response code was 200': (res) => res.status === 200,
    'response code is not 400': (res) => res.status !== 400,
  });
}
