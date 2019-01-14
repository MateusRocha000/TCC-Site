var levels = [
	{
		name: 'teste',
		inst: { 'en': '<p>Testanto o codigo</p>'},
		board: '',
		before: "<html><head><title>Teste</title></head><body>",
		after: "</body></html>"
	}
];

var levelWin = {
	name: 'win',
	inst: {
		'en': '<p>You win!</p>'
	},
	board: '',
	classes: {'#pond, #background': 'wrap'},
	style: {},
	before: "",
	after: ""
};