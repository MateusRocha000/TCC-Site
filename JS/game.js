function appendHTML()
{
  var text = document.getElementById("text").value;
  var item = document.getElementById("item");

  //Se o código contém os caracteres da tag, atribui o código à div
  if (text.includes('<') && text.includes('</') && text.includes('>'))
    item.innerHTML = text;
}


/*var game = {
  level: parseInt(localStorage.level, 10) || 0,
  answers: localStorage.answers || {},
  done: localStorage.done || [],
  user: localStorage.user || '',
  
  start: function()
  {
    
    $(document).ready(function(){
      var div = document.getElementById('item');
      var content = ('#text').value;
      div.innerHTML = content;
    });

  }
  
  changed: false,

  start: function()
  {
      //game.translate();
      $('#num-levels .num-levels').text(levels.length);
      $('#editor').show();

      if (!localStorage.user)
      {
        game.user = '' + (new Date()).getTime() + Math.random().toString(36).slice(1);
        localStorage.setItem('user', game.user);
      }

      this.setHandlers();
      this.loadMenu();
      game.loadLevel(levels[game.level]);
  },

  setHandlers: function()
  {
    $('#prox').on('click', function(){
      $('#text').focus();

      if ($(this).hasClass('disabled'))
      {
        if ($('.item').hasClass('disabled'))
        {
          game.tryagain();
        }
        return;
      }

      $('.item').addClass('animated fadeOut');
      $('.seta, #prox').addClass('disabled');

      setTimeout(function(){
        if (game.level >= levels.length - 1)
        {
          game.win();
        }
        else
        {
          game.prox();
        }
      }, 2000);
    });

    $('#text').on('keydown',function(e){
      if (e.keyCode === 13)
      {
        var max_lines = $(this).data('lines'); //salva a quantidade de linhas
        var code = $(this).val(); //salva o conteúdo do código digitado
        var trim = code.trim(); //remove espaços em branco antes e depois do código
        var codeLength = code.split('\n').length;
        var trimLength = trim.split('\n'). length;

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
    });

    $('#editor').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $(this).removeClass();
    });

    $(window).on('beforeunload', function(){
      game.saveAnswer();
      localStorage.setItem('level', game.level);
      localStorage.setItem('answers', JSON.stringify(game.answers));
      localStorage.setItem('done', JSON.stringify(game.done));
    });
  },

  loadMenu: function()
  {
    levels.forEach(function(level, i){
      var levelMarker = $('<span/>').addClass('level-marker').attr('data-level', i).text(i+1); //atribui uma classe e o número ao seu respectivo nível
      if ($.inArray(level.name, game.done) !== -1) //se o nível não foi cumprido ainda
      {
        levelMarker.addClass('done');
      }

      levelMarker.appendTo('#levels');
    });

    $('.level-marker').on('click', function(){ //salva o estado do nível caso clique em outro no menu e carrega aquele que foi clicado
      game.saveAnswer();

      var level = $(this).attr('data-level');
      game.level = parseInt(level, 10);
      game.loadLevel(levels[level]);
    });

    $('.seta.esq').on('click',function(){
      if ($(this).hasClass('disabled'))
      {
        return;
      }

      game.saveAnswer();
      game.ant();
    });

    $('.seta.dir').on('click', function(){
      if ($(this).hasClass('disabled'))
      {
        return;
      }

      game.saveAnswer();
      game.prox();
    });
  },

  loadLevel: function(level)
  {
    $('#editor').show(); //mostra o editor
    $('#levels-box').hide(); //esconde o popup dos níveis
    $('.level-marker').removeClass('current').eq(this.level).addClass('current'); //remove a classe atual do nível anterior para o verdadeiro atual
    $('#num-levels .current').text(this.level + 1); //na classe atual do identificador de número de níveis atualiza o número do nível
    $('before').text(level.before);
    $('after').text(level.after);
    $('prox').addClass('disabled');

    $('.seta.disabled').removeClass('disabled');

    if (this.level === 0) //se for o primeiro nível, não é possível voltar um nível
    {
      $('.seta.esq').addClass('disabled');
    }

    if (this.level === levels.length - 1)
    {
      $('.seta.dir').addClass('disabled');
    }

    var answer = game.answers[level.name]; //carrega a resposta do nível
    $('#text').val(answer).focus();

    var lines = Object.keys(level.html).length;
    $('#text').height(20 * lines).data("lines", lines);

    var string = level.board;
    var markup = '';

    for(var i = 0; i < string.length; i++)
    {
      var item = string.charAt(i);

      var itemRes = $('<div/>').addClass('item');

      $('<div/>').appendTo(itemRes);

      $('#pond').append(itemRes);
    }

    game.changed = false;
    game.applyHTML();
    game.check();
  },

  ant: function()
  {
    this.level--;
    var levelData = levels[this.level];
    this.loadLevel(levelData);
  },

  prox: function()
  {
    this.level++;
    var levelData = levels[this.level];
    this.loadLevel(levelData);
  },

  applyHTML: function()
  {
    var level = levels[game.level];
    var text = $('#text').val();
    $('#pond').attr('html',text);
    game.saveAnswer();
  },

  check: function()
  {
    game.applyHTML();

    var level = levels[game.level];
    var item = {};

    $('.item').each(function(){
      var pos = $(this).position();
      pos.top = Math.floor(pos.top);
      pos.left = Math.floor(pos.left);

    });
  },

  saveAnswer: function()
  {
    var level = levels[this.level];
    game.answers[level.name] = $('#text').val();
  },

  tryagain: function()
  {
    $('#editor').addClass('animated shake');
  },

  win: function()
  {
    var solved = $('#text').val();

    this.loadLevel(levelWin);

    $('#editor').hide();
    $('#text').val(solved);
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
  }
};

$(document).ready(function(){
  game.start();
})*/