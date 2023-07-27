export type LeagueIDType = '00' | '10' | '20';

export type LeagueLeadersParamsType = {
  ActiveFlag: 'N' | 'Y';
  LeagueID: LeagueIDType;
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

export type LeagueDashTeamStatsParamsType = {
  Conference?: 'East' | 'West';
  DateFrom?: string;
  DateTo?: string;
  Division?: 'Atlantic' | 'Central' | 'Northwest' | 'Pacific' | 'Southeast' | 'Southwest';
  GameScope?: 'Yesterday' | 'Last 10';
  GameSegment?: 'First Half' | 'Overtime' | 'Second Half';
  LastNGames: number;
  LeagueID: LeagueIDType;
  Location?: 'Home' | 'Road';
  MeasureType:
    | 'Base'
    | 'Advanced'
    | 'Misc'
    | 'Four Factors'
    | 'Scoring'
    | 'Opponent'
    | 'Usage'
    | 'Defense';
  Month: number;
  OpponentTeamID: string;
  Outcome?: 'W' | 'L';
  PORound?: string;
  PaceAdjust: 'Y' | 'N';
  PerMode:
    | 'Totals'
    | 'PerGame'
    | 'MinutesPer'
    | 'Per48'
    | 'Per40'
    | 'Per36'
    | 'PerMinute'
    | 'PerPossession'
    | 'PerPlay'
    | 'Per100Possessions'
    | 'Per100Plays';
  Period: number;
  PlayerExperience?: 'Rookie' | 'Sophomore' | 'Veteran';
  PlayerPosition?: 'F' | 'C' | 'G' | 'C-F' | 'F-C' | 'F-G' | 'G-F';
  PlusMinus: 'Y' | 'N';
  Rank: 'Y' | 'N';
  Season: string;
  SeasonSegment?: 'Post All-Star' | 'Pre All-Star';
  SeasonType: 'Regular Season' | 'Pre Season' | 'Playoffs' | 'All Star';
  ShotClockRange?:
    | '24-22'
    | '22-18 Very Early'
    | '18-15 Early'
    | '15-7 Average'
    | '7-4 Late'
    | '4-0 Very Late'
    | 'ShotClock Off';
  StarterBench?: 'Starters' | 'Bench';
  TeamID?: string;
  TwoWay?: string;
  VsConference?: 'East' | 'West';
  VsDivision?:
    | 'Atlantic'
    | 'Central'
    | 'Northwest'
    | 'Pacific'
    | 'Southeast'
    | 'Southwest'
    | 'East'
    | 'West';
};

export type LeagueStandingsV3ParamsType = {
  LeagueID: LeagueIDType;
  Season: string;
  SeasonType: 'Regular Season' | 'Pre Season';
  SeasonYear?: string;
};
