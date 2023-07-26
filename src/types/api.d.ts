export type LeagueLeadersParamsType = {
  ActiveFlag: 'N' | 'Y';
  LeagueID: '00' | '10' | '20';
  PerMode: 'Totals' | 'PerGame' | 'Per48';
  /** Season, Rookies, Regular Season */
  Scope: 'S' | 'Rookies' | 'RS';
  /** in the form of 2019-20 */
  Season: string;
  SeasonType: 'Regular Season' | 'Playoffs' | 'All Star' | 'Pre Season';
  StatCategory:
    | 'PTS'
    | 'AST'
    | 'BLK'
    | 'DREB'
    | 'FG3_PCT'
    | 'FG3A'
    | 'FG3M'
    | 'FG_PCT'
    | 'FGA'
    | 'FGM'
    | 'FTA'
    | 'FTM'
    | 'OREB'
    | 'REB'
    | 'STL'
    | 'TOV';
};
