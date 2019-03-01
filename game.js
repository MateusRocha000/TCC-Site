$(function()
{
    

    $('#btn_html').on("click", function(){
        $("#css_content").removeClass('fadein-left');
        $("#css_content").addClass('none');

        $("#js_content").removeClass('fadein-left');
        $("#js_content").addClass('none');
        
        if($("#html_content").hasClass('none'))
        {
            $("#html_content").removeClass('none');
            $("#html_content").addClass('fadein-left');
        }
        else if($("#html_content").hasClass('none')){
            $("#html_content").removeClass('none');
            $("#html_content").addClass('fadein-left');
        }
        else{
            $("#html_content").removeClass('fadein-left');
            $("#html_content").addClass('none');
        }
    });

    $('#btn_css').on("click", function(){
        $("#html_content").removeClass('fadein-left');
        $("#html_content").addClass('none');

        $("#js_content").removeClass('fadein-left');
        $("#js_content").addClass('none');

        if($("#css_content").hasClass('none'))
        {
            $("#css_content").removeClass('none');
            $("#css_content").addClass('fadein-left');
        }
        else if($("#css_content").hasClass('none')){
            $("#css_content").removeClass('none');
            $("#css_content").addClass('fadein-left');
        }
        else{
            $("#css_content").removeClass('fadein-left');
            $("#css_content").addClass('none');
        }
    });

    $('#btn_js').on("click", function(){
        if($("#js_content").hasClass('none'))
        {
            $("#js_content").removeClass('none');
            $("#js_content").addClass('fadein-left');
        }
        else if($("#js_content").hasClass('none')){
            $("#js_content").removeClass('none');
            $("#js_content").addClass('fadein-left');
        }
        else{
            $("#js_content").removeClass('fadein-left');
            $("#js_content").addClass('none');
        }
        $("#html_content").removeClass('fadein-left');
        $("#html_content").addClass('none');

        $("#css_content").removeClass('fadein-left');
        $("#css_content").addClass('none');
    });
});