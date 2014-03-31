//every video displayed in the principal block
//has an index
var i=0;
//to check if a miniature is already displayed
//in the main block or not
var miniatureDisplayed = new Object();

var principalVideoDisplayed = false;
$(document).ready(function() {
        $("#miniature").on("click",".miniature-video",function() {
            console.log("click -> miniature");
            console.log($(this).attr("id"));
            /* if there is already one video */
            if(principalVideoDisplayed) {
                miniatureDisplayed[$(".principal-video").attr("id").split("?")[0]] = false;
                $(".principal-video").remove();
            }
            /* if this video is not already displayed in the principal block */
            if(!miniatureDisplayed[$(this).attr("id")]) {
                console.log("miniature display false");
                new_video = $(this).clone();
                new_video.attr("id",new_video.attr("id")+"?"+i);
                new_video.attr("class","principal-video");
                $("#principal").append(new_video);
                miniatureDisplayed[$(this).attr("id")] = true;
            }
                principalVideoDisplayed = true;
            });

        $("#principal").on("click",".principal-video",function() {
                miniatureDisplayed[$(this).attr("id").split("?")[0]] = false;
                $(this).remove(); 
                principalVideoDisplayed = false;
                });
});
//gérer l'event suppression du flux 
//ajouter un onmouse event tooltip
