import type { Get5Team, Get5PlayerInput } from '../types/get5';
import type { StringKVObject } from '../types/generic';

export class Get5TeamBuilder implements Get5Team {
	name?: string;
	tag?: string;
	flag?: string;
	logo?: string;
	players: StringKVObject = {};
	
	/**
	 * Sets the name of this team
	 * @param name The name that will be set
	 */
	public setName(name: string): this {
		this.name = name;
		return this;
	}

	/**
	 * Sets the tag of this team
	 * @param tag The tag that will be set
	 */
	public setTag(tag: string): this {
		this.tag = tag;
		return this;
	}

	/**
	 * Sets the flag of this team
	 * @param flag A valid country ISO code
	 */
	public setFlag(flag: string): this {
		this.flag = flag;
		return this;
	}

	/**
	 * Set the logo of this team
	 * @param logo The logo that will be used
	 */
	public setLogo(logo: string): this {
		this.logo = logo;
		return this;
	}

	/**
	 * Set the players of this team
	 * @param players The players that will be set
	 */
	public setPlayers(players: Get5PlayerInput[]): this {
		for (const player of players) {
			this.players[player.steamId] = player.username ? player.username : '';
		}
		return this;
	}

	/**
	 * Adds a player to this team
	 * @param player The player to add
	 */
	public addPlayer(player: Get5PlayerInput): this {
		this.players[player.steamId] = player.username ? player.username : '';
		return this;
	}

	/**
	 * Returns an object with the valid format to be used by get5
	 */
	public build(): Get5Team {
		// TODO: validate
		return { ...this };
	}
}