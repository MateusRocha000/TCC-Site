function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
}

function btnHTML()
{
	document.querySelector("#css_content").classList.remove('fadein-left');
	document.querySelector("#css_content").classList.add('none');

	/* document.querySelector("#js_content").classList.remove('fadein-left');
	document.querySelector("#js_content").classList.add('none'); */
    
    if(hasClass(document.querySelector("#html_content"), 'none'))
    {
    	document.querySelector("#html_content").classList.remove('none');
    	document.querySelector("#html_content").classList.add('fadein-left');
    }
    else{
        document.querySelector("#html_content").classList.remove('fadein-left');
        document.querySelector("#html_content").classList.add('none');
    }
}

function btnCSS()
{
	document.querySelector("#html_content").classList.remove('fadein-left');
    document.querySelector("#html_content").classList.add('none');

    /* document.querySelector("#js_content").classList.remove('fadein-left');
    document.querySelector("#js_content").classList.add('none'); */

    if(hasClass(document.querySelector("#css_content"), 'none'))
    {
        document.querySelector("#css_content").classList.remove('none');
        document.querySelector("#css_content").classList.add('fadein-left');
    }
    else{
        document.querySelector("#css_content").classList.remove('fadein-left');
        document.querySelector("#css_content").classList.add('none');
    }
}

/* function btnJS()
{
	document.querySelector("#html_content").classList.remove('fadein-left');
    document.querySelector("#html_content").classList.add('none');

    document.querySelector("#css_content").classList.remove('fadein-left');
    document.querySelector("#css_content").classList.add('none');
	
	if(hasClass(document.querySelector("#js_content"), 'none'))
    {
        document.querySelector("#js_content").classList.remove('none');
        document.querySelector("#js_content").classList.add('fadein-left');
    }
    else{
        document.querySelector("#js_content").classList.remove('fadein-left');
        document.querySelector("#js_content").classList.add('none');
    } 
    
}
*/