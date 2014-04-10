var principalVideoDisplayed = false;
$(document).ready(function() {
		$("#miniature").on("click",".miniature-video",function() {
				/* if there is already one video */
				if(principalVideoDisplayed) {
					$(".principal-video").remove();
				}
				/* if this video is not already displayed in the principal block */
				new_video = $(this).clone();
				new_video.attr("id",new_video.attr("id")+"_principal");
				new_video.attr("class","principal-video");
				$("#principal").append(new_video);
				principalVideoDisplayed = true;
			});

		$("#principal").on("click",".principal-video",function() {
				$(this).remove(); 
				principalVideoDisplayed = false;
			});
		});
        $("#home").on("mouseover",function() {
                $(this).css("font-weight","Bold");
        });
//gérer l'event suppression du flux 
//ajouter un onmouse event tooltip
