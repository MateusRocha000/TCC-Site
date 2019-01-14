var aulas = {
	lang: window.location.hash.substring(1) || 'en',
	difficulty: 'easy',
	level: parseInt(localStorage.level, 10) || 0,
	answers: (localStorage.answers && JSON.parse(localStorage.answers)) || {},
	done: (localStorage.done && JSON.parse(localStorage.done)) || [],
	user: localStorage.user || '',
	changed: false,

	start: function()
	{
		var requestLang = window.navigator.lang.split('-')[0];
		if(window.location.hash === '' && requestLang !== 'en' && messages.langActive.hasOwnProperty(requestLang))
		{
			game.lang = requestLang;
			window.location.hash = requestLang;
		}

		game.translate();
		$('#num-levels .total-level').text(levels.length);
		$('#editor').show();
		$('#lang').val(game.lang);

		if (!localStorage.user)
		{
			game.user = '' + (new Date()).getTime() + Math.random().toString(36).slice(1);
			localStorage.setItem('user',game.user);
		}

		this.setHandlers();
		this.loadMenu();
		game.loadLevel(levels[game.level]);
	},

	setHandlers: function()
	{
		$('#prox').on('click', function()
		{
			$('#text').focus();

			if ($(this).hasClass('disabled'))
			{
				if (!$('.placa').hasClass('animated')) //objeto a ser alterado na aula
				{
					game.tryagain();
				}

				return;
			}

			$('.placa').addClass('animated bounceOutUp'); //olhar animação melhor
			$('.seta, #prox').addClass('disabled');

			setTimeout(function()
			{
				if (game.level >= levels.length - 1)
				{
					game.win();
				}
				else
				{
					game.next();
				}
			}, 2000);
		});

		$('#text').on('keydown',function(e)
		{
			if (e.keyCode === 13)
			{
				e.preventDefault();
				game.check();
				$('#prox').click();
				return;
			
				var max_lines = $(this).data('lines');
				var code = $(this).val();
				var trim = code.trim();
				var codeLength = text.split('\n').length;
				var trimLength = trim.split('\n').length;

				if (codeLength >= max_lines)
				{
					if (codeLength === trimLength)
					{
						e.preventDefault();
						$('#prox').click();
					}
					else
					{
						$('#text').focus().val('').val(trim);
					}
				}
			}
		}).on('input',game.debounce(game.check, 500)).on('input',function(){
			game.changed = true;
		});

		$('#editor').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass();
		});

		$('#labelReset').on('click', function()
		{
	      var warningReset = messages.warningReset[game.lang] || messages.warningReset.en;
	      var r = confirm(warningReset);

	      if (r) {
	        game.level = 0;
	        game.answers = {};
	        game.done = [];
	        game.loadLevel(levels[0]);

	        $('.level-marker').removeClass('done');
	      }
	    });

	    $('#labelSettings').on('click', function()
	    {
	      $('#levels-box').hide();
	      $('#settings .tooltip').toggle();
	    });

	    $('#lang').on('change', function() {
	      window.location.hash = $(this).val();
	    });

	    $('#difficulty').on('change', function() {
	      game.difficulty = $('input:checked', '#difficulty').val();

	      // setting height will prevent a slight jump when the animation starts
	      var $inst = $('#inst');
	      var height = $inst.height();
	      $inst.css('height', height);
	      
	      if (game.difficulty == 'hard' || game.difficulty == 'medium') {
	        $inst.slideUp();
	      } else {
	        $inst.css('height', '').slideDown();
	      }
	    });

	    $('#colorblind').on('change', function() {
	      game.colorblind = $('input:checked', '#colorblind').val();

	      if (game.colorblind == 'true') {
	        $('.lilypad, .frog').addClass('cb-friendly');
	      } else {
	        $('.lilypad, .frog').removeClass('cb-friendly');
	      }
	    });

	    $('body').on('click', function() {
	      $('.tooltip').hide();
	    });

	    $('.tooltip, .toggle, #level-indicator').on('click', function(e) {
	      e.stopPropagation();
	    });

	    $(window).on('beforeunload', function() {
	      game.saveAnswer();
	      localStorage.setItem('level', game.level);
	      localStorage.setItem('answers', JSON.stringify(game.answers));
	      localStorage.setItem('done', JSON.stringify(game.done));
	      localStorage.setItem('colorblind', JSON.stringify(game.colorblind));
	    }).on('hashchange', function() {
	      game.lang = window.location.hash.substring(1) || 'en';
	      game.translate();

	      $('#tweet iframe').remove();
	      var html = '<a href="https://twitter.com/share" class="twitter-share-button"{count} data-url="http://flexboxfroggy.com" data-via="thomashpark">Tweet</a> ' +
	                 '<a href="https://twitter.com/thomashpark" class="twitter-follow-button" data-show-count="false">Follow @thomashpark</a>';
	      $('#tweet').html(html);
	      twttr.widgets.load();

	      if (game.lang === 'en') {
	        history.replaceState({}, document.title, './');
	      }
	    });
	},

	prev: function()
	{
		this.level--;

		var levelData = levels[this.level];
		this.loadLevel(levelData);
	},

	prox: function()
	{
		if(this.difficulty === "hard")
		{
			this.level = Math.floor(Math.random()* levels.length);
		}
		else
		{
			this.level++;
		}

		var levelData = levels[this.level];
		this.loadLevel(levelData);
	},

	loadMenu: function()
	{
		levels.forEach(function(level, i){
			var levelMarker = $('<span/>').addClass('level-marker').attr('data-level', i).text(i+1);

			if ($.inArray(level.name, game.done) !== -1)
			{
				levelMarker.addClass('done');
			}

			levelMarker.appendTo('#levels');
		});
		
		$('.level-marker').on('click', function() {
	      game.saveAnswer();

	      var level = $(this).attr('data-level');
	      game.level = parseInt(level, 10);
	      game.loadLevel(levels[level]);
	    });

	    $('#level-indicator').on('click', function() {
	      $('#settings .tooltip').hide();
	      $('#levels-box').toggle();
	    });

	    $('.esq-seta').on('click', function() {
	      if ($(this).hasClass('disabled')) {
	        return;
	      }

	      game.saveAnswer();
	      game.prev();
	    });

	    $('.dir-seta').on('click', function() {
	      if ($(this).hasClass('disabled')) {
	        return;
	      }

	      game.saveAnswer();
	      game.next();
	    });
	},

	loadLevel: function(level)
	{
		$('#editor').show();
	    $('#share').hide();
	    $('#background, #pond').removeClass('wrap').attr('style', '').empty();
	    $('#levels-box').hide();
	    $('.level-marker').removeClass('current').eq(this.level).addClass('current');
	    $('#num-levels .current').text(this.level + 1);
	    $('#before').text(level.before);
	    $('#after').text(level.after);
	    $('#prox').addClass('disabled');

	    var inst = level.inst[game.lang] || level.inst.en;
	    $('#inst').html(inst);

	    $('.arrow.disabled').removeClass('disabled');

	    if (this.level === 0) {
	      $('.esq-seta').addClass('disabled');
	    }

	    if (this.level === levels.length - 1) {
	      $('.dir-seta').addClass('disabled');
	    }

	    var answer = game.answers[level.name];
	    $('#code').val(answer).focus();

	    var lines = Object.keys(level.style).length;
	    $('#code').height(20 * lines).data("lines", lines);

	    var string = level.board;
	    var markup = '';
	    var colors = {
	      'g': 'green',
	      'r': 'red',
	      'y': 'yellow'
	    };
	    /*
	    for (var i = 0; i < string.length; i++) {
	      var c = string.charAt(i);
	      var color = colors[c];

	      var lilypad = $('<div/>').addClass('lilypad ' + color + (this.colorblind == 'true' ? ' cb-friendly' : '')).data('color', color);
	      var frog = $('<div/>').addClass('frog ' + color + (this.colorblind == 'true' ? ' cb-friendly' : '')).data('color', color);

	      $('<div/>').addClass('bg').css(game.transform()).appendTo(lilypad);
	      $('<div/>').addClass('bg animated pulse infinite').appendTo(frog);

	      $('#background').append(lilypad);
	      $('#pond').append(frog);
	    }
		*/
	    var classes = level.classes;

	    if (classes) {
	      for (var rule in classes) {
	        $(rule).addClass(classes[rule]);
	      }
	    }

	    game.changed = false;
	    game.applyHTML();
	    game.applyStyles();
	    game.check();
	},

	applyHTML: function()
	{
		var level = levels[game.level];
		var code = $('#text').val();
		var html = level.html || '';
		document.getElementById('pond').appendChild(html);
		game.saveAnswer();
	},

	applyStyles: function() {
	    var level = levels[game.level];
	    var code = $('#text').val();
	    var selector = level.selector || '';
	    $('#pond ' +  selector).attr('style', code);
	    game.saveAnswer();
	},

	check: function()
	{
		game.applyHTML();
		game.applyStyles();

	    var level = levels[game.level];
	    var lilypads = {};
	    var frogs = {};
	    var correct = true;

	    $('.frog').each(function() {
	      var position = $(this).position();
	      position.top = Math.floor(position.top);
	      position.left = Math.floor(position.left);

	      var key = JSON.stringify(position);
	      var val = $(this).data('color');
	      frogs[key] = val;
	    });

	    $('.lilypad').each(function() {
	      var position = $(this).position();
	      position.top = Math.floor(position.top);
	      position.left = Math.floor(position.left);

	      var key = JSON.stringify(position);
	      var val = $(this).data('color');

	      if (!(key in frogs) || frogs[key] !== val) {
	        correct = false;
	      }
	    });

	    if (correct) {
	      ga('send', {
	        hitType: 'event',
	        eventCategory: level.name,
	        eventAction: 'correct',
	        eventLabel: $('#code').val()
	      });

	      if ($.inArray(level.name, game.done) === -1) {
	        game.done.push(level.name);
	      }

	      $('[data-level=' + game.level + ']').addClass('done');
	      $('#next').removeClass('disabled');
	    } else {
	      ga('send', {
	        hitType: 'event',
	        eventCategory: level.name,
	        eventAction: 'incorrect',
	        eventLabel: $('#code').val()
	      });

	      $('#next').addClass('disabled');
	    }
	},

	saveAnswer: function() {
	    var level = levels[this.level];
	    game.answers[level.name] = $('#code').val();
	  },

	  tryagain: function() {
	    $('#editor').addClass('animated shake');
	  },

	  win: function() {
	    var solution = $('#code').val();

	    this.loadLevel(levelWin);

	    $('#editor').hide();
	    $('#code').val(solution);
	    $('#share').show();
	    $('.frog .bg').removeClass('pulse').addClass('bounce');
	  },

	  transform: function() {
	    var scale = 1 + ((Math.random() / 5) - 0.2);
	    var rotate = 360 * Math.random();

	    return {'transform': 'scale(' + scale + ') rotate(' + rotate + 'deg)'};
	},

	translate: function() {
	    document.title = messages.title[game.lang] || messages.title.en;
	    $('html').attr('lang', game.lang);

	    var level = levels[game.level];
	    var inst = level.inst[game.lang] || level.inst.en;
	    $('#inst').html(inst);

	    $('.translate').each(function() {
	      var label = $(this).attr('id');
	      if (messages[label]) {
	        var text = messages[label][game.lang] || messages[label].en;
		  }

	      $('#' + label).text(text);
	    });
	},

	debounce: function(func, wait, immediate) {
	    var timeout;
	    return function() {
	      var context = this, args = arguments;
	      var later = function() {
	        timeout = null;
	        if (!immediate) func.apply(context, args);
	      };
	      var callNow = immediate && !timeout;
	      clearTimeout(timeout);
	      timeout = setTimeout(later, wait);
	      if (callNow) func.apply(context, args);
	    };
	},
};
	$(document).ready(function(){
		aulas.start;
	});
