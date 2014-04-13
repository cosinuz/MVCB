$(document).ready(function() {
		$("#miniature").on("click",".miniature-video",function() {
				$(".principal-video").remove();
				/* if this video is not already displayed in the principal block */
				new_video = $(this).clone();
				new_video.attr("id",new_video.attr("id")+"_principal");
				new_video.attr("class","principal-video");
				$("#principal").append(new_video);
			});

		$("#principal").on("click",".principal-video",function() {
				$(this).remove();
			});
		});
        $("#home").on("mouseover",function() {
                $(this).css("font-weight","Bold");
        });
        $("#home").on("mouseout",function() {
                $(this).css("font-weight","normal");
        });
