var videoDisplayed = false;
$(document).ready(function() {
		$("#miniature").on("click",".miniature-video",function() {
				        
                        $(".principal-video").remove();
				        new_video = $(this).clone();
				        new_video.attr("id",new_video.attr("id")+"_principal");
                        $("#principal").append(new_video);
                        //no animation effect if a video is already displayed
                        if(!videoDisplayed) {
                            //to emphasize the animate effect
                            new_video.css("width","0px");
                            new_video.css("height","0px");
                            $("#"+new_video.attr("id")).animate(
                                {
                                "width": "+=400px",
                                "height":"+=400px"
                                },
                                "slow");
                        }
    				    new_video.attr("class","principal-video");
                        videoDisplayed = true;
			});

		$("#principal").on("click",".principal-video",function() {
                $(".principal-video").animate(
                    {"width":"-=400px",
                     "height":"-=400px"
                     },
                     "slow",
                     function() {
                        $(this).remove();
                     });
                videoDisplayed = false;
			});
        $("#home").on("mouseover",function() {
                $(this).css("font-weight","Bold");
            });
        $("#home").on("mouseout",function() {
                $(this).css("font-weight","normal");
            });
		});
