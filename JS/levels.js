var levels = [
	{
		html: {
			name: 'intro-html',
			instr: {
				'pt' : '<p>Intro de html</p>',
				'en' : '<p>Html intro</p>'
			}
		},
		h1: {
			name: 'title',
			instr: {
				'pt' : '<p>Tag de título para a página</p>',
				'en' : '<p>Title tag for the web page</p>'
			},
			before: "<body>",
			after: "</body>"
		},
		p: {
			name: 'parag',
			instr: {
				'pt' : '<p>Tag de parágrafo para a página</p>',
				'en' : '<p>Paragraph tag for the web page</p>'
			},
			before: "<body>",
			after: "</body>"
		}
	},
	{
		css: {
			name: 'intro-css',
			instr: {
				'pt' : '<p>Intro de css</p>',
				'en' : '<p>css intro</p>'
			}
		},
		selector: {
			name: 'sel',
			instr: {
				'pt' : '<p>Seletores de CSS</p>',
				'en' : '<p>CSS selectores</p>'
			},
			before: "body{\nbackground-color: blue;\n}"
		}
	},
	{
		javascript: {
			name: 'intro-js',
			instr: {
				'pt' : '<p>Intro de javascript</p>',
				'en' : '<p>javascript intro</p>'
			}
		},
		var: {
			name: 'variable',
			instr: {
				'pt' : '<p>Variáveis em javascript</p>',
				'en' : '<p>Variables in javascript</p>'
			}
		}
	}
];

var levelWin = {
	name: 'win',
	instr: {
		'pt' : '<p>Parabéns!</p>',
		'en' : '<p>Congratulations</p>'
	}
};