import type { Get5Teams, Get5Map, Get5Cvar, Get5TeamType, Get5SideType, Get5MatchConfigJSON, Get5PlayersWithEnforcedNames, Get5MatchConfigTeam, Get5MatchConfigCvars } from './types';
import SteamID from 'steamid';

export default class Get5Config {
	matchId?: string;
	teams?: Get5Teams;
	seriesSize?: number;
	maps: Get5Map[] = [];
	spectators: string[] = [];
	minPlayersToReady?: number;
	minSpectatorsToReady?: number;
	cvars: Get5Cvar[] = [];
	skipVeto?: boolean;
	favoredPercentageTeam1?: number;
	favoredPercentageText?: string;
	vetoFirst?: Get5TeamType;
	sideType?: Get5SideType;
	playersPerTeam?: number;

	/**
     * Sets the ID of this get5 match
     * @param id The id to set
     */
	public setMatchId(id: string): this {
		this.matchId = id;
		return this;
	}

	/**
     * Sets the amount of players allowed in a team
     * @param amount The ammount that will be set
     */
	public setPlayersPerTeam(amount: number): this {
		this.playersPerTeam = amount;
		return this;
	}

	/**
     * Sets the spectatos of this match (for example admins should go here)
     * @param spectators The spectators that will be set
     */
	public setSpectators(spectators: string[]): this {
		this.spectators = spectators;
		return this;
	}

	/**
     * Adds spectators to this match (for example admins should go here)
     * @param spectators The spectators to add to this match
     */
	public addSpectators(spectators: string[]): this {
		this.spectators.push(...spectators);
		return this;
	}

	/**
     * Sets the minimum amount of a player a team must have to ready
     * @param amount The amount of players that have to ready
     */
	public setMinPlayersToReady(amount: number): this {
		this.minPlayersToReady = amount;
		return this;
	}

	/**
     * Sets the minimum amount of spectators that must be ready to begin
     * @param amount The amount of spectators that need to be ready
     */
	public setMinSpectatorsToReady(amount: number): this {
		this.minSpectatorsToReady = amount;
		return this;
	}

	/**
     * Sets the teams of this get5 match
     * @param teams The teams that will be set
     */
	public setTeams(teams: Get5Teams): this {
		if (teams.a.players.length === 0) throw new Error('Team 1 has no players!');
		if (teams.b.players.length === 0) throw new Error('Team 2 has no players!');
		this.teams = teams;
		return this;
	}

	/**
     * Sets the amount of maps that will be played on this get5 match
     * Must be an odd number or 2 (1 = BO1, 2 = B02, 3 = BO3)
     * @param size The size of the series (must be an odd number or 2)
     */
	public setSeriesSize(size: number): this {
		if (size % 2 === 0 && size !== 2) throw new Error('Get5 series sizes must be an odd number or 2');
		this.seriesSize = size;
		return this;
	}

	/**
     * Sets the map pool of this get5 match
     * @param maps The maps that will be set
     */
	public setMaps(maps: Get5Map[]): this {
		this.maps = maps;
		return this;
	}

	/**
     * Adds some maps to this match's map pool
     * @param maps The maps to add to the match's map pool 
     */
	public addMaps(maps: Get5Map[]): this {
		this.maps.push(...maps);
		return this;
	}

	/**
     * Sets the CVARS that will be executed when the match loads or on each map start (for example hostname "Match server #1")
     * @param cvars The cvars that will be set
     */
	public setCvars(cvars: Get5Cvar[]): this {
		this.cvars = cvars;
		return this;
	}

	/**
     * Adds CVARS that will me executed when the config loads or on each map start (for example hostname "Match server #1") 
     * @param cvars 
     * @returns 
     */
	public addCvars(cvars: Get5Cvar[]): this {
		this.cvars.push(...cvars);
		return this;
	}

	/**
     * Sets it whether or not to skip the veto
     * @param input Whether or not to skip the veto
     */
	public setSkipVeto(input = true): this {
		this.skipVeto = input;
		return this;
	}

	/**
     * Set the favorite percentage of the first team, the second team will automatically get the remaining percentage
     * @param percentage The percentage to set
     */
	public setFavoredPercentageTeam1(percentage: number): this {
		this.favoredPercentageTeam1 = percentage;
		return this;
	}

	/**
     * Set the text that will appear with the favorite percentage (for example the source like HLTV Bets)
     * @param text The text to set
     */
	public setFavoredPercentageText(text: string): this {
		this.favoredPercentageText = text;
		return this;
	}

	/**
     * Set the type that will be used, standard
     * @param type 
     */
	public setSideType(type: Get5SideType): this {
		this.sideType = type;
		return this;
	}

	/**
     * Which team will start the veto
     * @param input The team that will the veto
     */
	public setVetoFirst(input: Get5TeamType): this {
		this.vetoFirst = input;
		return this;
	}

	/**
     * Validates all fields and creates a valid object that get5 can load
     */
	public toJSON(): Get5MatchConfigJSON {
		// Make sure the teams are not undefined
		if (!this.teams) throw new Error('This field is required');

		// Validate each player's SteamID
		for (const player of [...this.teams.a.players, ...this.teams.b.players]) {
			const sid = new SteamID(player.steamId);
			if (!sid.isValidIndividual()) throw new Error('The SteamID provided is not a valid individual SteamID');
		}

		// Validate players per team, if it has been set manually
		if (this.playersPerTeam) {
			const team1Length = this.teams.a.players.length;
			const team2Length = this.teams.b.players.length;
			if (this.playersPerTeam < team1Length || this.playersPerTeam < team2Length) throw new Error('Players per team property cannot be smaller than the amount of players in a team'); 
		}

		// Convert JS developer friendly players to the JSON format get5 uses
		const team1Players: Get5PlayersWithEnforcedNames = {};
		for (const player of this.teams.a.players) {
			team1Players[player.steamId] = player.username ? player.username : '';
		}
		const team2Players: Get5PlayersWithEnforcedNames = {};
		for (const player of this.teams.b.players) {
			team2Players[player.steamId] = player.username ? player.username : '';
		}
		const team1: Get5MatchConfigTeam = {
			name: this.teams.a.name,
			tag: this.teams.a.tag,
			flag: this.teams.a.flag,
			logo: this.teams.a.logo,
			players: team1Players
		};
		const team2: Get5MatchConfigTeam = {
			name: this.teams.b.name,
			tag: this.teams.b.tag,
			flag: this.teams.b.flag,
			logo: this.teams.b.logo,
			players: team2Players
		};

		// Convert cvars to get5 readdable format
		const cvars: Get5MatchConfigCvars = {};
		for (const { command, value } of this.cvars) {
			cvars[command] = `${value}`;
		}

		return {
			matchid: this.matchId,
			num_maps: this.seriesSize,
			players_per_team: this.playersPerTeam,
			min_players_to_ready: this.minPlayersToReady,
			min_spectators_to_ready: this.minSpectatorsToReady,
			spectators: this.spectators.length > 0 ? { players: this.spectators } : undefined,
			skip_veto: this.skipVeto,
			veto_first: this.vetoFirst,
			side_type: this.sideType,
			maplist: this.maps.length > 0 ? this.maps : undefined,
			favored_percentage_team1: this.favoredPercentageTeam1,
			favored_percentage_text: this.favoredPercentageText,
			team1,
			team2,
			cvars: this.cvars.length > 0 ? cvars : undefined
		};
	}
}