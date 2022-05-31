import type { Get5Config, Get5VetoFirstTeam, Get5SideType, Get5Spectators, Get5Team, Get5TeamsInput, Get5CvarInput } from '../types/get5';
import type { StringKVObject } from '../types/generic';
import SteamID from 'steamid';

export class Get5ConfigBuilder implements Get5Config {
	/**
	 * The id of this match
	 */
	public matchid?: string;

	/**
	 * The amount of maps to be played in this match
	 */
	public num_maps?: number;

	/**
	 * The amount of players each team can have
	 */
	public players_per_team?: number;

	/**
	 * The minimum amount of players that need to !ready on each team for the match to start
	 */
	public min_players_to_ready?: number;

	/**
	 * The minimun amount of spectators that beed to !ready for the match to start
	 */
	public min_spectators_to_ready?: number;

	/**
	 * Whether or not to skip the veto
	 */
	public skip_veto?: boolean;

	/**
	 * The team that will vote first on the veto
	 */
	public veto_first?: Get5VetoFirstTeam;

	/**
	 * The method that will be used to determine which side each team will start on
	 */
	public side_type?: Get5SideType;

	/**
	 * The spectators of this match
	 */
	public spectators: Get5Spectators = { players: [] };

	/**
	 * The map list of this match
	 */
	public maplist?: string[] = [];

	/**
	 * The favorite precentage of team 1
	 */
	public favored_precentage_team1?: number;

	/**
	 * The favorite precentage text
	 */
	public favored_precentage_text?: string;

	/**
	 * The 1st team of this match
	 */
	public team1: Get5Team = undefined!;

	/**
	 * The 2nd team of this match
	 */
	public team2: Get5Team = undefined!;

	/**
	 * CVARs that will be executed on the match config load, or on each map start
	 */
	public cvars?: StringKVObject;

	/**
     * Sets the ID of this get5 match
     * @param id The id to set
     */
	public setMatchId(id: string): this {
		this.matchid = id;
		return this;
	}

	/**
     * Sets the amount of players allowed in a team
     * @param amount The ammount that will be set
     */
	public setPlayersPerTeam(amount: number): this {
		this.players_per_team = amount;
		return this;
	}

	/**
     * Sets the spectators of this match (for example admins should go here)
     * @param spectators The spectators that will be set
     */
	public setSpectators(spectators: string[]): this {
		this.spectators.players = [...spectators];
		return this;
	}

	/**
     * Adds spectators to this match (for example admins should go here)
     * @param spectators The spectators to add to this match
     */
	public addSpectators(spectators: string[]): this {
		this.spectators.players.push(...spectators);
		return this;
	}

	/**
     * Sets the minimum amount of a player a team must have to ready
     * @param amount The amount of players that have to ready
     */
	public setMinPlayersToReady(amount: number): this {
		this.min_players_to_ready = amount;
		return this;
	}

	/**
     * Sets the minimum amount of spectators that must be ready to begin
     * @param amount The amount of spectators that need to be ready
     */
	public setMinSpectatorsToReady(amount: number): this {
		this.min_spectators_to_ready = amount;
		return this;
	}

	/**
     * Sets the teams of this get5 match
     * @param teams The teams that will be set
     */
	public setTeams(teams: Get5TeamsInput): this {
		//if (teams.team1.players.length === 0) throw new Error('Team 1 has no players!');
		//if (teams.team2.players.length === 0) throw new Error('Team 2 has no players!');
		this.team1 = teams.team1;
		this.team2 = teams.team2;
		return this;
	}

	/**
     * Sets the amount of maps that will be played on this get5 match
     * Must be an odd number or 2 (1 = BO1, 2 = B02, 3 = BO3)
     * @param num The number of maps in the series (must be an odd number or 2)
     */
	public setNumMaps(num: number): this {
		if (num % 2 === 0 && num !== 2) throw new Error('Get5 num_maps must be an odd number or 2');
		this.num_maps = num;
		return this;
	}

	/**
     * Sets the map pool of this get5 match
     * @param maps The maps that will be set
     */
	public setMaps(maps: string[]): this {
		this.maplist = maps;
		return this;
	}

	/**
     * Adds some maps to this match's map pool
     * @param maps The maps to add to the match's map pool 
     */
	public addMaps(maps: string[]): this {
		if (!this.maplist) this.maplist = [];

		this.maplist.push(...maps);

		return this;
	}

	/**
     * Sets the CVARS that will be executed when the match loads or on each map start (for example hostname "Match server #1")
     * @param cvars The cvars that will be set
     */
	public setCvars(cvars: Get5CvarInput[]): this {
		this.cvars = {}; // Define the object

		for (const cvar of cvars) {
			this.cvars[cvar.command] = `${cvar.value}`;
		}

		return this;
	}

	/**
     * Adds CVARS that will me executed when the config loads or on each map start (for example hostname "Match server #1") 
     * @param cvars 
     */
	public addCvars(cvars: Get5CvarInput[]): this {
		if (!this.cvars) this.cvars = {}; // Define the object if it doesn't exist

		for (const cvar of cvars) {
			this.cvars[cvar.command] = `${cvar.value}`;
		}

		return this;
	}

	/**
     * Sets it whether or not to skip the veto
     * @param input Whether or not to skip the veto
     */
	public setSkipVeto(input = true): this {
		this.skip_veto = input;
		return this;
	}

	/**
     * Set the favorite percentage of the first team, the second team will automatically get the remaining percentage
     * @param percentage The percentage to set
     */
	public setFavoredPercentageTeam1(percentage: number): this {
		this.favored_precentage_team1 = percentage;
		return this;
	}

	/**
     * Set the text that will appear with the favorite percentage (for example the source like HLTV Bets)
     * @param text The text to set
     */
	public setFavoredPercentageText(text: string): this {
		this.favored_precentage_text = text;
		return this;
	}

	/**
     * Set the type that will be used, standard
     * @param type 
     */
	public setSideType(type: Get5SideType): this {
		this.side_type = type;
		return this;
	}

	/**
     * Which team will start the veto
     * @param input The team that will the veto
     */
	public setVetoFirst(input: Get5VetoFirstTeam): this {
		this.veto_first = input;
		return this;
	}

	/**
     * Validates all fields and creates a valid object that get5 can load
     */
	public build(): Get5Config {
		const team1PlayerCount = Object.keys(this.team1.players).length;
		const team2PlayerCount = Object.keys(this.team2.players).length;

		// Make sure the teams aren't empty
		if (team1PlayerCount < 1 || team2PlayerCount < 1) throw new Error('Both teams need at least 1 player');

		// Validate each player's SteamID
		for (const steamId of [...Object.keys(this.team1.players), ...Object.keys(this.team2.players)]) {
			const sid = new SteamID(steamId);
			if (!sid.isValidIndividual()) throw new Error('The SteamID provided is not a valid individual SteamID');
		}

		// Validate players per team, if it has been set manually
		if (this.players_per_team) {
			if (this.players_per_team < team1PlayerCount || this.players_per_team < team2PlayerCount) throw new Error('Players per team property cannot be smaller than the amount of players in a team'); 
		}

		return { ...this };
	}
}