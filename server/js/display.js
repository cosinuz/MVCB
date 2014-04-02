//every video displayed in the principal block
//has an index
var i=0;

var principalVideoDisplayed = false;
$(document).ready(function() {
		$("#miniature").on("click",".miniature-video",function() {
				/* if there is already one video */
				if(principalVideoDisplayed) {
					$(".principal-video").remove();
				}
				/* if this video is not already displayed in the principal block */
				new_video = $(this).clone();
				new_video.attr("id",new_video.attr("id")+"?"+i);
				new_video.attr("class","principal-video");
				$("#principal").append(new_video);
				principalVideoDisplayed = true;
			});

		$("#principal").on("click",".principal-video",function() {
				$(this).remove(); 
				principalVideoDisplayed = false;
			});
		});
//gérer l'event suppression du flux 
//ajouter un onmouse event tooltip
