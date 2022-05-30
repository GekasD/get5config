export interface Get5MatchConfigJSON {
    matchid?: string;
    num_maps?: number;
    players_per_team?: number;
    min_players_to_ready?: number;
    min_spectators_to_ready?: number;
    spectators?: { players: string[] };
    skip_veto?: boolean;
    veto_first?: Get5TeamType;
    side_type?: Get5SideType;
    maplist?: string[];
    favored_percentage_team1?: number;
    favored_percentage_text?: string;
    team1: Get5MatchConfigTeam;
    team2: Get5MatchConfigTeam;
    cvars?: Get5MatchConfigCvars;
}

export type Get5TeamType = 'team1' | 'team2';
export type Get5SideType = 'standard' | 'always_knife' | 'never_knife';
export type Get5MatchConfigCvars = { [key: string]: string };

export interface Get5MatchConfigTeam {
    name?: string;
    tag?: string;
    flag?: string;
    logo?: string;
    players: Get5PlayersWithEnforcedNames | Get5PlayersWithoutEnforcedNames;
}

export type Get5PlayersWithEnforcedNames = { [key: string]: string };
export type Get5PlayersWithoutEnforcedNames = string[];

export interface Get5Teams {
    a: Get5Team;
    b: Get5Team;
}

export interface Get5Team {
    name?: string;
    tag?: string;
    flag?: string;
    logo?: string;
    players: Get5Player[];
}

export interface Get5Player {
    /**
     * The player's SteamID, can be any valid SteamID type (SteamID64 etc)
     */
    steamId: string;
    /**
     * The username that will be put on the player when he joins the server, useful for consistent naming across different platforms.
     */
    username?: string;
}

export interface Get5Cvar {
    command: string;
    value: string | number;
}

export type Get5Map = `${'de_' | 'cs_'}${string}`;