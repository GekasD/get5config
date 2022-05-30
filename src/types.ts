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
    cvars?: StringKVObject;
}

export interface Get5MatchConfigTeam {
    name?: string;
    tag?: string;
    flag?: string;
    logo?: string;
    players: StringKVObject;
}

export type Get5TeamType = 'team1' | 'team2';
export type Get5SideType = 'standard' | 'always_knife' | 'never_knife';
export type StringKVObject = { [key: string]: string };

// ------------------------- //

export interface Get5Teams {
    /**
     * The first team (team1)
     */
    team1: Get5Team;
    /**
     * The second team (team2)
     */
    team2: Get5Team;
}

export interface Get5Team {
    /**
     * The team's name (will appear on the scoreboard, and other various parts of the ui)
     */
    name?: string;
    /**
     * The team's tag, will be set on each player before his username
     */
    tag?: string;
    /**
     * The team's flag, please provide a valid country ISO here (for example US for the USA flag etc)
     */
    flag?: string;
    /**
     * The team's logo code, here is a list of all available team logo codes: (https://steamcommunity.com/sharedfiles/filedetails/?id=1109861355)
     */
    logo?: string;
    /**
     * An array holding the team's players
     */
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
    /**
     * The name of the csgo command
     */
    command: string;
    /**
     * The value you want the command to use
     */
    value: string | number;
}

export type Get5Map = `${'de_' | 'cs_'}${string}`;