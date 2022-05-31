import type { StringKVObject } from './generic';

export interface Get5PlayerInput {
	steamId: string;
	username?: string;
}

export type Get5SideType = 'standard' | 'always_knife' | 'never_knife';

export type Get5VetoFirstTeam = 'team1' | 'team2';

export interface Get5TeamsInput {
	team1: Get5Team;
	team2: Get5Team;
}

export interface Get5CvarInput {
    /**
     * The name of the csgo command
	 * @example mp_restartgame
     */
    command: string;
    /**
     * The value you want the command to use
	 * @example 5
     */
    value: string | number;
}

export interface Get5Team {
	name?: string;
	tag?: string;
	flag?: string;
	logo?: string;
	players: StringKVObject;
}

export interface Get5Spectators {
	players: string[];
}

export interface Get5Config {
	matchid?: string;
	num_maps?: number;
	players_per_team?: number;
	min_players_to_ready?: number;
	min_spectators_to_ready?: number;
	skip_veto?: boolean;
	veto_first?: Get5VetoFirstTeam;
	side_type?: Get5SideType;
	spectators?: Get5Spectators;
	maplist?: string[];
	favored_precentage_team1?: number;
	favored_precentage_text?: string;
	team1: Get5Team;
	team2: Get5Team;
	cvars?: StringKVObject;
}