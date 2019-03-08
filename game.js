function btnHTML()
{
	document.querySelector("#css_content").classList.remove('fadein-left');
	document.querySelector("#css_content").classList.add('none');

	document.querySelector("#js_content").classList.remove('fadein-left');
	document.querySelector("#js_content").classList.add('none');
    
    if(document.querySelector("#html_content").hasClass('none'))
    {
    	document.querySelector("#html_content").classList.remove('none');
    	document.querySelector("#html_content").classList.add('fadein-left');
    }
    else if(document.querySelector("#html_content").hasClass('none')){
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

    document.querySelector("#js_content").classList.remove('fadein-left');
    document.querySelector("#js_content").classList.add('none');

    if(document.querySelector("#css_content").hasClass('none'))
    {
        document.querySelector("#css_content").classList.remove('none');
        document.querySelector("#css_content").classList.add('fadein-left');
    }
    else if(document.querySelector("#css_content").hasClass('none')){
        document.querySelector("#css_content").classList.remove('none');
        document.querySelector("#css_content").classList.add('fadein-left');
    }
    else{
        document.querySelector("#css_content").classList.remove('fadein-left');
        document.querySelector("#css_content").classList.add('none');
    }
}

function btnJS()
{
	if(document.querySelector("#js_content").hasClass('none'))
    {
        document.querySelector("#js_content").classList.remove('none');
        document.querySelector("#js_content").classList.add('fadein-left');
    }
    else if(document.querySelector("#js_content").hasClass('none')){
        document.querySelector("#js_content").classList.remove('none');
        document.querySelector("#js_content").classList.add('fadein-left');
    }
    else{
        document.querySelector("#js_content").classList.remove('fadein-left');
        document.querySelector("#js_content").classList.add('none');
    }
    document.querySelector("#html_content").classList.remove('fadein-left');
    document.querySelector("#html_content").classList.add('none');

    document.querySelector("#css_content").classList.remove('fadein-left');
    document.querySelector("#css_content").classList.add('none');
}
