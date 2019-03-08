function btnHTML()
{
	document.querySelector("#css_content").removeClass('fadein-left');
	document.querySelector("#css_content").addClass('none');

	document.querySelector("#js_content").removeClass('fadein-left');
	document.querySelector("#js_content").addClass('none');
    
    if(document.querySelector("#html_content").hasClass('none'))
    {
    	document.querySelector("#html_content").removeClass('none');
    	document.querySelector("#html_content").addClass('fadein-left');
    }
    else if(document.querySelector("#html_content").hasClass('none')){
        document.querySelector("#html_content").removeClass('none');
        document.querySelector("#html_content").addClass('fadein-left');
    }
    else{
        document.querySelector("#html_content").removeClass('fadein-left');
        document.querySelector("#html_content").addClass('none');
    }
}

function btnCSS()
{
	document.querySelector("#html_content").removeClass('fadein-left');
    document.querySelector("#html_content").addClass('none');

    document.querySelector("#js_content").removeClass('fadein-left');
    document.querySelector("#js_content").addClass('none');

    if(document.querySelector("#css_content").hasClass('none'))
    {
        document.querySelector("#css_content").removeClass('none');
        document.querySelector("#css_content").addClass('fadein-left');
    }
    else if(document.querySelector("#css_content").hasClass('none')){
        document.querySelector("#css_content").removeClass('none');
        document.querySelector("#css_content").addClass('fadein-left');
    }
    else{
        document.querySelector("#css_content").removeClass('fadein-left');
        document.querySelector("#css_content").addClass('none');
    }
}

function btnJS()
{
	if(document.querySelector("#js_content").hasClass('none'))
    {
        document.querySelector("#js_content").removeClass('none');
        document.querySelector("#js_content").addClass('fadein-left');
    }
    else if(document.querySelector("#js_content").hasClass('none')){
        document.querySelector("#js_content").removeClass('none');
        document.querySelector("#js_content").addClass('fadein-left');
    }
    else{
        document.querySelector("#js_content").removeClass('fadein-left');
        document.querySelector("#js_content").addClass('none');
    }
    document.querySelector("#html_content").removeClass('fadein-left');
    document.querySelector("#html_content").addClass('none');

    document.querySelector("#css_content").removeClass('fadein-left');
    document.querySelector("#css_content").addClass('none');
}
