# Get5 Config

<a href="https://www.npmjs.com/package/get5config"><img src="https://img.shields.io/npm/v/get5config.svg?maxAge=3600" alt="npm version" /></a>
<a href="https://www.npmjs.com/package/get5config"><img src="https://img.shields.io/npm/dt/get5config.svg?maxAge=3600" alt="npm downloads" /></a>

A simple NodeJS module that helps in creating [get5 match configs](https://github.com/splewis/get5#match-schema) programmatically through JavaScript or TypeScript.

### Example usage
```js
import Get5Config from 'get5config';
import fs from 'fs';

// Construct the get5 config
const get5Config = new Get5Config()
    .setSkipVeto()
	.setSideType('always_knife')
	.setMaps(['de_vertigo', 'de_nuke', 'de_mirage'])
	.setTeams({
		a: {
			name: 'Ninjas In Pyjamas',
			players: [
				{ steamId: 'STEAM_0:1:36953343', username: 'REZ' },
				{ steamId: 'STEAM_0:0:87806535', username: 'Plopski' },
				{ steamId: 'STEAM_0:0:63340111', username: 'hampus' },
				{ steamId: 'STEAM_0:0:929823', username: 'es3tag' },
				{ steamId: 'STEAM_0:1:89281373', username: 'Brollan' }
			]
		},
		b: {
			name: 'FaZe Clan',
			players: [
				{ steamId: 'STEAM_0:1:18542739', username: 'rain' },
				{ steamId: 'STEAM_0:0:120677381', username: 'broky' },
				{ steamId: 'STEAM_0:1:27994738', username: 'Twistzz' },
				{ steamId: 'STEAM_0:1:14582262', username: 'karrigan' },
				{ steamId: 'STEAM_0:0:15503295', username: 'ropz' }
			]
		}
	});

// Generate a examplematch.json file using fs
const data = JSON.stringify(get5Config.toJSON(), null, 4);
fs.writeFileSync('examplematch.json', data);
```
### Documentation
There is an automatically generated documentation on each method and property [here]()
### More information
For more information on what each property does you can read the [get5 readme](https://github.com/splewis/get5#match-schema)