function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
}

$(window).on("load", function(){
	console.log(hasClass(document.querySelector("#content"), 'none'));
	if(hasClass(document.querySelector("#content"), 'none'))
    {
    	document.querySelector("#content").classList.remove('none');
    	document.querySelector("#content").classList.add('fadein-down');
    }
});