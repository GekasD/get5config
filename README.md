# Get5 Config

<a href="https://www.npmjs.com/package/get5config"><img src="https://img.shields.io/npm/v/get5config.svg?maxAge=3600" alt="npm version" /></a>
<a href="https://www.npmjs.com/package/get5config"><img src="https://img.shields.io/npm/l/get5config.svg?maxAge=3600" alt="npm licence" /></a>
<a href="https://www.npmjs.com/package/get5config"><img src="https://img.shields.io/npm/dt/get5config.svg?maxAge=3600" alt="npm downloads" /></a>
<a href="https://github.com/GekasD/get5config"><img src="https://img.shields.io/github/repo-size/GekasD/get5config.svg?maxAge=3600" alt="github reposize" /></a>

A simple NodeJS module that helps in creating [get5 match configs](https://github.com/splewis/get5#match-schema) programmatically through JavaScript or TypeScript.

### Example usage

```js
import { Get5TeamBuilder, Get5ConfigBuilder } from 'get5config';
import { writeFileSync } from 'fs';

const team1 = new Get5TeamBuilder()
	.setName('Ninjas In Pyjamas')
	.setLogo('nip')
	.setPlayers([
		{ steamId: 'STEAM_0:1:36953343', username: 'REZ' },
		{ steamId: 'STEAM_0:0:87806535', username: 'Plopski' },
		{ steamId: 'STEAM_0:0:63340111', username: 'hampus' },
		{ steamId: 'STEAM_0:0:929823', username: 'es3tag' },
		{ steamId: 'STEAM_0:1:89281373', username: 'Brollan' }
	])
	.build();

const team2 = new Get5TeamBuilder()
	.setName('FaZe Clan')
	.setLogo('faze')
	.setPlayers([
		{ steamId: 'STEAM_0:1:1854273', username: 'rain' },
		{ steamId: 'STEAM_0:0:120677381', username: 'broky' },
		{ steamId: 'STEAM_0:1:27994738', username: 'Twistzz' },
		{ steamId: 'STEAM_0:1:14582262', username: 'karrigan' },
		{ steamId: 'STEAM_0:0:15503295', username: 'ropz' }
	])
	.build();


const get5Config = new Get5ConfigBuilder()
	.setSkipVeto()
	.setSideType('always_knife')
	.setMaps(['de_vertigo', 'de_nuke', 'de_mirage'])
	.setTeams({ team1, team2 });

const data = JSON.stringify(get5Config.build(), null, 4);
writeFileSync('examplematch.json', data);
```

#### Output on examplematch.json

```json
{
    "skip_veto": true,
    "side_type": "always_knife",
    "maplist": [
        "de_vertigo",
        "de_nuke",
        "de_mirage"
    ],
    "team1": {
        "name": "Ninjas In Pyjamas",
        "players": {
            "STEAM_0:1:36953343": "REZ",
            "STEAM_0:0:87806535": "Plopski",
            "STEAM_0:0:63340111": "hampus",
            "STEAM_0:0:929823": "es3tag",
            "STEAM_0:1:89281373": "Brollan"
        }
    },
    "team2": {
        "name": "FaZe Clan",
        "players": {
            "STEAM_0:1:18542739": "rain",
            "STEAM_0:0:120677381": "broky",
            "STEAM_0:1:27994738": "Twistzz",
            "STEAM_0:1:14582262": "karrigan",
            "STEAM_0:0:15503295": "ropz"
        }
    }
}
```

As you can see above the general intended use case is creating the object by using various methods, and then calling `.toJSON()` which will validate all the fields and construct an object that is using the [get5 JSON format](https://github.com/splewis/get5/blob/master/configs/get5/example_match.json).

### More information
For more information on what each property does you can read the [get5 readme](https://github.com/splewis/get5#match-schema).